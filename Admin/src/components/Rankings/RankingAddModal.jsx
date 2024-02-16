import React, { useEffect, useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, Autocomplete } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { PlayersContext } from "../../store/PlayersContext";
import { savePontuacao, getAllTorneios, saveRanking, getAllRanking } from "../../services/api";
import { toast } from 'react-toastify';




const RankingAddModal = ({ openModal, handleClose, setListTorneios, listTorneios }) => {
    const [playersQtInputs, setPlayersQtInputs] = useState(0);
    const [playerInputs, setPlayerInputs] = useState([]);
    const { players, setPlayers } = useContext(PlayersContext);


    const handleSaveModal = async () => {
        const date = document.getElementById('date').value;
        const date_fim = document.getElementById('date_fim').value;
        const nome = document.getElementById('nome').value;

        const jsonApi = {
            nome_torneio: nome,
            date_fim: date_fim,
            date: date,
        };

        saveRanking(jsonApi).then(response => {
            console.log(response);
            handleClose(false);
            getAllRanking().then(result => {
                setListTorneios(result.data['torneios'])
            });
            handleClose(false);

            toast.success('Torneio Salvo com Sucesso', { position: toast.POSITION.TOP_CENTER });
        }).catch(error => {
            toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
        });
    };

    const handleExitModal = () => {
        handleClose(false);
        setPlayersQtInputs(0);
        setPlayerInputs([])
    }

    const handleChangeQtPlayers = (event) => {
        setPlayersQtInputs(event.target.value);
        setPlayerInputs([]);
        for (let i = 1; i <= event.target.value; i++) {
            setPlayerInputs((prevInputs) => [
                ...prevInputs,
                <Autocomplete
                    freeSolo
                    key={i}
                    id={`jogador-${i}`}
                    options={Object.values(players['players']).map(player => ({ label: player.apelido, name: player.apelido }))}
                    renderInput={(params) => <TextField {...params} label={i} className="campoPlayer" />}
                />
            ]);
        }
    }

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xl"
        >
            <DialogTitle id="alert-dialog-title">
                {"Adicionar Pontuações - Partidas"}
            </DialogTitle>
            <DialogContent>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="nome"
                            label="Nome do Ranking"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            required
                            id="date"
                            label="Data inicio"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            required
                            id="date_fim"
                            label="Data final"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>

                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={0} justify="left" alignItems="center" alignContent='flex-start' style={{ width: '800px' }}>
                            {playerInputs}
                        </Grid>
                    </Box>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExitModal}>Fechar</Button>
                <Button onClick={handleSaveModal} autoFocus>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default RankingAddModal;