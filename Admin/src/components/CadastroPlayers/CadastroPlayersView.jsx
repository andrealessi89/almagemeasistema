import React, { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PlayersContext } from "../../store/PlayersContext";
import { getAllPlayers, getAllTorneios, deletePlayer } from "../../services/api";
import DeleteConfirm from "../../utils/deleteConfirm";
import { toast } from 'react-toastify';
import ModeIcon from '@mui/icons-material/Mode';
import CadastroPlayersEditModal from "./CadastroPlayersEditModal";
import CadastroPlayersAddModal from "./CadastroPlayersAddModal";
import CadastroPlayersViewModal from "./CadastroPlayersViewModal";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));





const CadastroPlayersView = () => {
    const [listPlayers, setListPlayer] = useState();
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [currentRow, setCurrentRow] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllPlayers();
                console.log(result)
                setListPlayer(result.data.players);
            } catch (error) {
                console.error("ops! ocorreu um erro" + error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = (idPlayer, confirmaModal) => {
        if (confirmaModal === true) {
            deletePlayer(`id=${idPlayer}`).then(response => {
                console.log(response);
                getAllPlayers().then(result => {
                    console.log('aqui', result)
                    setListPlayer(result.data['players'])
                });
                toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });

            }).catch(error => {
                toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
            });
        }
    }

    const handleOpenModalEdit = (row) => {
        setCurrentRow(row)
        setOpenModalEdit(true);
    }

    const handleOpenModalAdd = () => {
        setOpenModalAdd(true);
    }

    const handleOpenModalView = (row) => {
        setCurrentRow(row)
        setOpenModalView(true);
    }

    const renderRows = () => {
        if (Array.isArray(listPlayers)) {
            return listPlayers.map((row) => (
                <>
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" >{row.apelido}
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => handleOpenModalView(row)}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">{row.nome}</TableCell>
                        <TableCell align="left">- Torneios</TableCell>
                        <TableCell align="left">{row.datanacimento}</TableCell>
                        <TableCell align="left">
                        <IconButton aria-label="edit" onClick={() => handleOpenModalEdit(row)}>
                                <ModeIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            <DeleteConfirm
                                callbackConfirm={(confirmaModal) => handleDelete(row.id, confirmaModal)}
                                context="jogador"
                                info="Você deletando esse jogador, deletará também sua pontuação no torneio"
                            />
                        </TableCell>
                    </TableRow>
                </>
            ));
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>Players</Item>
                </Grid>
                <Grid item xs={12} container justify="flex-end">
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleOpenModalAdd()}>
                        Adicionar
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Apelido</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Jogou</TableCell>
                            <TableCell align="left">Data de Nacimento</TableCell>
                            <TableCell align="left">Editar</TableCell>
                            <TableCell align="left">Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows(listPlayers)}
                    </TableBody>
                </Table>
                <CadastroPlayersEditModal
                    data={currentRow}
                    openModal={openModalEdit}
                    handleClose={setOpenModalEdit}
                    setListPlayer = {setListPlayer}
                />
                <CadastroPlayersAddModal
                    openModal={openModalAdd}
                    handleClose={setOpenModalAdd}
                    setListPlayer = {setListPlayer}
                />
                <CadastroPlayersViewModal 
                    data={currentRow}
                    openModal={openModalView}
                    handleClose={setOpenModalView}
                />
            </TableContainer>
        </Box>
    )
}

export default CadastroPlayersView;