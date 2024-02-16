import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { editPlayer, getAllPlayers } from "../../services/api";
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';


const CadastroPlayersEditModal = ({ openModal, handleClose, data, setListPlayer }) => {

    const [apelido, setApelido] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [datanacimento, setDatanacimento] = useState("");

    useEffect(() => {
        if (data) {
            setApelido(data.apelido);
            setNome(data.nome);
            setCpf(data.cpf);
            setDatanacimento(data.datanacimento);
        }
    }, [data]);


    const handleExitModal = () => {
        handleClose(false);
        setApelido("");
        setNome("");
        setCpf("");
        setDatanacimento("");
    }

    const handleEditPlayer = (id) => {
        const apelido = document.getElementById('apelido').value;
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const datanacimento = document.getElementById('datanacimento').value;

        const ArrEditPlayer = {
            id: id,
            apelido: apelido,
            nome: nome,
            cpf: cpf,
            datanacimento: datanacimento,
        }

        editPlayer(`id=${id}`, ArrEditPlayer).then(response => {
            console.log(response);
            toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });
            handleClose(false);
            setApelido("");
            setNome("");
            setCpf("");
            setDatanacimento("");
            getAllPlayers().then(result => {
                console.log(result)
                setListPlayer(result.data.players);
            })


        }).catch(error => {
            toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });

        });

    }

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xl"
        >
            <DialogTitle id="alert-dialog-title" style={{ marginBottom: '15px' }}>
                Editar Jogador: {data?.apelido}
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        disabled
                        id="apelido"
                        label="Apelido"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={apelido}
                        onChange={(e) => setApelido(e.target.value)}
                    />
                    <TextField
                        required
                        id="nome"
                        label="Nome"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <br />
                    <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        disabled={false}
                        maskChar=" "
                    >
                        {() => <TextField
                            required
                            id="cpf"
                            label="CPF"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />}
                    </InputMask>
                    <InputMask
                        mask="99/99/9999"
                        value={datanacimento} // Aqui parece haver um erro, pois você está usando a variável de estado 'telefone' para 'data de nascimento'
                        onChange={(e) => setDatanacimento(e.target.value)} // Isso deve ser ajustado para usar a variável de estado correta para a data de nascimento
                        disabled={false}
                        maskChar=" "
                    >
                        {() => <TextField
                            required
                            id="datanacimento"
                            label="Data de Nascimento"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />}
                    </InputMask>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExitModal}>Fechar</Button>
                <Button onClick={() => handleEditPlayer(data?.id)}>Salvar</Button>
            </DialogActions>
        </Dialog >
    )
}

export default CadastroPlayersEditModal;