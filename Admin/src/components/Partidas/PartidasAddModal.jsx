import React, { useEffect, useState, useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import { Button, TextField, Autocomplete, Box } from "@mui/material";
import { toast } from 'react-toastify';
import { PlayersContext } from "../../store/PlayersContext";
import { savePontuacao, getAllTorneios, getAllRanking } from "../../services/api";

const PartidasAddModal = ({ openModal, handleClose, setListTorneios }) => {
    const { players } = useContext(PlayersContext);
    const [playerApelido, setPlayerApelido] = useState('');
    const [playerInputs, setPlayerInputs] = useState([]);
    const [nomeTorneio, setNomeTorneio] = useState('');
    const [dataTorneio, setDataTorneio] = useState('');
    const [rankingId, setRankingId] = useState('');
    const [rankings, setRankings] = useState([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [autocompleteKey, setAutocompleteKey] = useState(0);



    // Carregar rankings do servidor
    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await getAllRanking();
                const fetchedRankings = response.data.torneios;
                setRankings(fetchedRankings);
                // Se houver apenas um ranking, selecione-o automaticamente
                if (fetchedRankings.length === 1) {
                    setRankingId(fetchedRankings[0].id.toString());
                }
            } catch (error) {
                toast.error('Erro ao carregar rankings');
            }
        };
        fetchRankings();
    }, []);


    // Carregar dados do localStorage quando o componente é montado
    useEffect(() => {
        const savedData = localStorage.getItem('partidaData');
        if (savedData) {
            const data = JSON.parse(savedData);
            setPlayerInputs(data.playerInputs || []);
            setRankingId(data.rankingId || '');
            setNomeTorneio(data.nome || '');
            setDataTorneio(data.date || '');
        }
    }, [openModal]);

    // Salvar dados no localStorage quando ocorrerem mudanças
    useEffect(() => {
        if (playerInputs.length > 0 || rankingId || nomeTorneio || dataTorneio) {
            const data = {
                playerInputs,
                rankingId,
                nome: nomeTorneio,
                date: dataTorneio,
            };
            localStorage.setItem('partidaData', JSON.stringify(data));
        }
    }, [playerInputs, rankingId, nomeTorneio, dataTorneio]);

    const handleAddPlayer = () => {
        const isDuplicate = playerInputs.some(player => player.apelido.toLowerCase() === playerApelido.toLowerCase());
        if (isDuplicate) {
            toast.error('Jogador já adicionado');
            return;
        }
        if (playerApelido) {
            const newPlayerInput = { apelido: playerApelido, posicao: 1 };
            const updatedPlayerInputs = [newPlayerInput, ...playerInputs]
                .map((player, index) => ({ ...player, posicao: index + 1 }));
            setPlayerInputs(updatedPlayerInputs);
            setPlayerApelido('');
            setAutocompleteKey(prevKey => prevKey + 1); // Incrementa a chave para forçar a remontagem
        } else {
            toast.error('Por favor, insira um apelido');
        }
    };


    const handleClearData = () => {
        // Limpar os estados
        setPlayerInputs([]);
        setNomeTorneio('');
        setDataTorneio('');

        // Remover do localStorage
        localStorage.removeItem('partidaData');

        // Tentar pré-selecionar o ranking se houver apenas um disponível
        if (rankings.length === 1) {
            setRankingId(rankings[0].id.toString());
        } else {
            setRankingId('');
        }

        // Fechar o diálogo de confirmação
        setOpenConfirmationDialog(false);

        toast.success('Dados limpos com sucesso');
    };




    const handleSaveModal = async () => {
        const jsonApi = {
            nome_torneio: nomeTorneio,
            qt_players: playerInputs.length,
            data_torneio: dataTorneio,
            jogadores: playerInputs,
            ranking_id: rankingId,
        };

        try {
            await savePontuacao(jsonApi);
            handleClose();
            localStorage.removeItem('partidaData'); // Limpar dados após salvar
            setPlayerInputs([]);
            setRankingId('');
            setNomeTorneio('');
            setDataTorneio('');
            const result = await getAllTorneios();
            setListTorneios(result.data.torneios);
            toast.success('Torneio salvo com sucesso');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleRemovePlayer = (indexToRemove) => {
        // Remove o jogador com base no índice
        const updatedPlayerInputs = playerInputs.filter((_, index) => index !== indexToRemove);
        setPlayerInputs(updatedPlayerInputs);

        // Atualiza as posições com base na nova ordem
        const repositionedPlayers = updatedPlayerInputs.map((player, index) => ({
            ...player,
            posicao: index + 1,
        }));
        setPlayerInputs(repositionedPlayers);

        // Atualiza o localStorage
        updateLocalStorage(repositionedPlayers);
    };

    const updateLocalStorage = (players) => {
        const data = {
            playerInputs: players,
            rankingId,
            nome: nomeTorneio,
            date: dataTorneio,
        };
        localStorage.setItem('partidaData', JSON.stringify(data));
    };



    return (
        <>

            <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth="xl">
                <DialogTitle id="alert-dialog-title">{"Adicionar Pontuações - Partidas"}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
                        <TextField
                            required
                            id="nome"
                            label="Nome do torneio"
                            type="text"
                            value={nomeTorneio}
                            onChange={(e) => setNomeTorneio(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            select
                            label="Ranking"
                            id="ranking"
                            required
                            value={rankingId}
                            onChange={(e) => setRankingId(e.target.value)}
                            SelectProps={{ native: true }}
                        >
                            {rankings.map(ranking => (
                                <option key={ranking.id} value={ranking.id}>{ranking.nome}</option>
                            ))}
                        </TextField>
                        <TextField
                            required
                            id="date"
                            label="Data do torneio"
                            type="date"
                            value={dataTorneio}
                            onChange={(e) => setDataTorneio(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Autocomplete
                            key={autocompleteKey} // Chave única que força a remontagem
                            freeSolo
                            value={playerApelido ? { label: playerApelido } : null}
                            onChange={(event, newValue) => {
                                setPlayerApelido(newValue ? newValue.label : '');
                            }}
                            options={players && players['players'] ? Object.values(players['players']).map(player => ({ label: player.apelido })) : []}
                            renderInput={(params) => <TextField {...params} label="Apelido" />}
                            fullWidth
                        />

                        <Button variant="contained" onClick={handleAddPlayer} sx={{ mt: 2 }}>Adicionar Eliminação</Button>
                    </Box>
                    {playerInputs.map((player, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginTop: '8px' }}>
                            {`${player.posicao}º Apelido: ${player.apelido}`}
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleRemovePlayer(index)}
                                size="small" // Torna o botão menor
                                sx={{ ml: 2, fontSize: '0.75rem' }} // Ajustes adicionais de estilo, se necessário
                            >
                                Excluir
                            </Button>
                        </div>
                    ))}


                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={() => setOpenConfirmationDialog(true)}>Limpar</Button>
                    <Button onClick={handleSaveModal} style={{ background: "rgb(42 195 68)", color: 'white' }} autoFocus>Salvar</Button>
                </DialogActions>

            </Dialog>
            <Dialog
                open={openConfirmationDialog}
                onClose={() => setOpenConfirmationDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar Limpeza"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja limpar todos os dados?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmationDialog(false)}>Cancelar</Button>
                    <Button onClick={handleClearData} autoFocus>
                        Limpar
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    );
};

export default PartidasAddModal;
