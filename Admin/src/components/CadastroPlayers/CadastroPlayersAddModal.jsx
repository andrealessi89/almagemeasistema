import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { editPlayer, getAllPlayers, savePlayer } from "../../services/api";
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';



const CadastroPlayersAddModal = ({ openModal, handleClose, setListPlayer }) => {

    const [apelido, setApelido] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");


    const handleAddPlayer = () => {
        const apelido = document.getElementById('apelido').value;
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const datanacimento = document.getElementById('datanacimento').value;

        const ArrAddPlayer = {
            apelido: apelido,
            nome: nome,
            cpf: cpf,
            datanacimento: datanacimento,
        }

        savePlayer(ArrAddPlayer).then(response => {
            console.log(response);
            toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });
            handleClose(false);
            getAllPlayers().then(result => {
                console.log(result)
                setListPlayer(result.data.players);
            })

        }).catch(error => {
            toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
        });
    }

    const handleExitModal = () => {
        handleClose(false);
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
                Cadastrar Player
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
                        required
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
                        value={telefone} // Aqui parece haver um erro, pois você está usando a variável de estado 'telefone' para 'data de nascimento'
                        onChange={(e) => setTelefone(e.target.value)} // Isso deve ser ajustado para usar a variável de estado correta para a data de nascimento
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
                <Button onClick={() => handleAddPlayer()}>Salvar</Button>
            </DialogActions>
        </Dialog >
    )
}

export default CadastroPlayersAddModal;