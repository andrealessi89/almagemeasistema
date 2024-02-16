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
import { getInfoTorneioById } from "../../services/api";





const PartidasViewModal = ({ openModal, handleClose, data }) => {

    const [idTorneio, setIdTorneio] = useState("");
    const [infoTorneioPos, setInfoTorneioPos] = useState([]);

    console.log(data);

    useEffect(() => {
        setIdTorneio(data?.id);
        try {
            getInfoTorneioById({ id: data.id }).then((response) => {
                console.log(response.data.infoTorneio);
                setInfoTorneioPos(response.data.infoTorneio);
            });
        } catch (error) {
            console.error("ops! ocorreu um erro" + error);
        }

    }, [data]);

    const handleExitModal = () => {
        handleClose(false);
        setInfoTorneioPos([]);
    }

    const renderPlayers = (players) => {

        return (
            <Table>
                <TableHead>
                    Pontos distribuidos:
                    <TableRow>
                        <TableCell>Posição</TableCell>
                        <TableCell>Apelido</TableCell>
                        <TableCell>Pontução</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players?.map(player => (
                        <TableRow>
                            <TableCell>{player.posicao}</TableCell>
                            <TableCell>{player.apelido}</TableCell>
                            <TableCell>{player.pontuacao_jogador}</TableCell>
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
                <b>Torneio</b>: {data?.nome}
                <br /><b>Data</b> - {data?.data_torneio}
            </DialogTitle>
            <DialogContent>
                {renderPlayers(infoTorneioPos.sort((a, b) => a.posicao - b.posicao))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExitModal}>Fechar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PartidasViewModal;