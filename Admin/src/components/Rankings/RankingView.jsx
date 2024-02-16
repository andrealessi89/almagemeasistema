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
import RankingAddModal from "./RankingAddModal";
import { PlayersContext } from "../../store/PlayersContext";
import { getAllPlayers, getAllTorneios, getInfoTorneioById, deleteRanking, getAllRanking } from "../../services/api";
import RankingViewModal from "./RankingViewModal";
import DeleteConfirm from "../../utils/deleteConfirm";
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


const RankingView = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const { players, setPlayers } = useContext(PlayersContext);
    const [listTorneios, setListTorneios] = useState();
    const [currentRow, setCurrentRow] = useState();

    //Carrega os players cadastrados e salva no state no context

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllRanking();
                setListTorneios(result.data['torneios']);
                //console.log('aquiiiii', listTorneios)
            } catch (error) {
                console.error("ops! ocorreu um erro" + error);
            }
        }
        fetchData();
    },[]);



    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };


    const handleDelete = (idTorneio, confirmaModal) => {
        if (confirmaModal === true) {
    
        deleteRanking(`id=${idTorneio}`).then( response => {
                console.log(response);
                getAllRanking().then(result => {
                    console.log(result.data);
                    setListTorneios(result.data['torneios'])
                });
                toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });

            }).catch(error => {
                toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
            });
        }

    }

    const renderRows = () => {
        if (Array.isArray(listTorneios)) {
            return listTorneios.map((row) => (
                <>
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">{format(parseISO(row.data_inicio), 'dd/MM/yy')}</TableCell>
                        <TableCell align="center">{row.nome}</TableCell>
                        <TableCell align="center">{format(parseISO(row.data_fim), 'dd/MM/yy')}</TableCell>
                        <TableCell align="center">
                            <DeleteConfirm
                                callbackConfirm={(confirmaModal) => handleDelete(row.id, confirmaModal)}
                                context="torneio"
                                info="Deletando esse torneio os pontos destribuidos aos jogadores neste torneio serão deletados também"
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
                    <Item>Inicio  Partida</Item>
                </Grid>
                <Grid item xs={12} container justify="flex-end">
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Criar Ranking
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            
                            <TableCell>Data Inicio</TableCell>
                            <TableCell align="center">Nome Torneio</TableCell>
                            <TableCell align="center">Data Final</TableCell>
                            <TableCell align="center">Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows(listTorneios)}
                    </TableBody>
                </Table>
                <RankingAddModal
                    openModal={openModal}
                    handleClose={setOpenModal}
                    setListTorneios={setListTorneios}
                    listTorneios={listTorneios}
                />
                <RankingViewModal
                    data={currentRow}
                    openModal={openModalView}
                    handleClose={setOpenModalView}
                />
            </TableContainer>
        </Box>
    )
}

export default RankingView;