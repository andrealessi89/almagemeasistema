import React, { useEffect, useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, Autocomplete, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { PlayersContext } from "../../store/PlayersContext";
import { savePontuacao } from "../../services/api";
import { toast } from 'react-toastify';
import { getTorneioByPlayer } from "../../services/api";





const CadastroPlayersViewModal = ({ openModal, handleClose, data }) => {

    const [apelido, setApelido] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [torneios, setTorneios] = useState([]);

    useEffect(() => {
        if (data) {
            setApelido(data.apelido);
            setNome(data.nome);
            setCpf(data.cpf);
            setTelefone(data.telefone);

            getTorneioByPlayer(data.apelido).then(result => {
                setTorneios(result.data.torneio)
            });
        }
    }, [data]);



    const handleExitModal = () => {
        handleClose(false);
    }

    const renderTorneios = (torneios) => {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Torneio</TableCell>
                        <TableCell>Posição</TableCell>
                        <TableCell>Pontução</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {torneios?.map(torneio => (
                        <TableRow key={torneio.id}>
                            <TableCell>{torneio.data_torneio}</TableCell>
                            <TableCell>{torneio.nome_torneio}</TableCell>
                            <TableCell>{torneio.posicao}</TableCell>
                            <TableCell>{torneio.pontuacao_jogador}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };


    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xl"
        >
            <DialogTitle id="alert-dialog-title">
                <b>Player:</b> {apelido}
                <br /><b>Nome: </b>{nome}
            </DialogTitle>
            <DialogContent>
                CPF: {cpf}
                <br />
                Telefone: {telefone}
                {renderTorneios(torneios)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExitModal}>Fechar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CadastroPlayersViewModal;