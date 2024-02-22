import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { toast } from 'react-toastify';
import { editUserFromEmail } from "../../services/api";
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FormAlmaGemelaView = () => {
    const [open, setOpen] = useState(true);
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [interesse, setInteresse] = useState('');
    const [sexo, setSexo] = useState('');
    const [signo, setSigno] = useState('');
    const [horarioNascimento, setHorarioNascimento] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const navigate = useNavigate();

    const generateInformacoes = () => {
        const randomize = array => array[Math.floor(Math.random() * array.length)];

        let signos = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
        let gradosDeEscolaridad = ["Sin estudios", "Educación secundaria", "Bachillerato", "Formación Profesional", "Grado universitario", "Máster", "Doctorado"];
        let religiones = ["Cristianismo", "Budismo", "Católico"];
        let rasgosPositivos = ["Amable", "Cariñoso", "Compasivo", "Confiable", "Valiente", "Creativo", "Decidido", "Resiliente", "Generoso", "Honesto", "Humilde", "Humorístico", "Inspirador", "Inteligente", "Leal", "Optimista", "Paciente", "Respetuoso", "Responsable", "Sabio"];
        let generosMusicales = ["Pop", "Rock", "Jazz", "Blues", "Hip Hop", "Reggaeton", "Salsa", "Bachata", "Clásica", "Country", "Electrónica", "Folk", "Heavy Metal", "Indie", "Opera", "Punk", "Rap", "Reggae", "R&B", "Samba", "Soul", "Techno", "Trance", "Tropical"];
        let gustosCulinarios = ["Comida italiana", "Comida mexicana", "Comida china", "Comida japonesa", "Comida francesa", "Comida española", "Comida tailandesa", "Comida india", "Comida vegetariana", "Comida vegana", "Comida mediterránea", "Comida brasileña", "Comida peruana", "Comida griega", "Comida de mariscos", "Comida de barbacoa", "Comida rápida", "Comida kosher", "Comida halal", "Comida orgánica"];
        let deportesFavoritos = ["Fútbol", "Baloncesto", "Béisbol", "Voleibol", "Tenis", "Golf", "Rugby", "Críquet", "Hockey", "Boxeo", "Natación", "Atletismo", "Ciclismo", "Esquí", "Snowboarding", "Surf", "Escalada", "Gimnasia", "Artes marciales", "Yoga"];
        let percepcionRelacionIdeal = [
            "Para mí, un relación ideal se basa en la confianza y la comunicación abierta.",
            "Creo que un buen relacionamiento debe tener mucho respeto mutuo.",
            "En mi opinión, la compatibilidad y los intereses compartidos son clave para un relación duradera.",
            "Pienso que un relación ideal es aquel donde ambos pueden crecer y aprender juntos.",
            "Para mí, un relación ideal es donde ambas partes se sienten seguras y amadas.",
            "Creo que en una relación ideal, los conflictos se resuelven a través del diálogo y la comprensión mutua.",
            "Un relación ideal para mí sería aquella donde hay tanto amor como amistad.",
            "Un buen relacionamiento, para mí, es aquel donde ambas partes mantienen su individualidad.",
            "Pienso que un relación ideal es donde cada uno apoya los sueños y aspiraciones del otro.",
            "Creo que un relación ideal es aquel donde ambos se sienten libres para expresar sus sentimientos y pensamientos sin miedo al juicio.",
            "Un relación ideal para mí sería aquella donde se pueda reír juntos, incluso en los momentos difíciles.",
            "Para mí, un relación ideal es uno en el que se celebren tanto las fortalezas como las debilidades del otro.",
            "Creo que un relación ideal se trata de construir una vida juntos, pero también de disfrutar del momento.",
            "En mi opinión, un relación ideal se trata de encontrar el equilibrio entre dar y recibir.",
            "Un relación ideal para mí es aquel donde no hay necesidad de esconder nuestros errores y fallos.",
            "Creo que un relación ideal es aquel donde hay un compromiso mutuo de mejorar cada día.",
            "Para mí, un buen relacionamiento implica comprender que el amor no es sólo un sentimiento, sino una decisión consciente.",
            "Pienso que en un relación ideal, cada uno se siente motivado para ser la mejor versión de sí mismo.",
            "En mi opinión, un relación ideal es aquel donde los pequeños gestos de cariño se valoran tanto como los grandes.",
            "Para mí, un relación ideal es uno en el que hay un intercambio constante de gratitud y apreciación.",
            "Creo que un relación ideal es aquel en el que el amor es una fuente de inspiración y fortaleza.",
            "Para mí, un buen relacionamiento es aquel en el que cada uno se siente valorado y respetado.",
            "Creo que un relación ideal es aquel donde se puede ser completamente uno mismo sin miedo al rechazo.",
            "Un relación ideal para mí es aquel en el que cada pequeño desacuerdo no se convierte en un gran problema.",
            "Pienso que en un relación ideal, cada uno puede tener su propio espacio y tiempo para sí mismo cuando lo necesite.",
            "En mi opinión, un buen relacionamiento es aquel en el que las partes trabajan juntas para superar los obstáculos y desafíos que se presenten.",
            "Creo que un relación ideal es aquel en el que cada uno está comprometido a mantener viva la chispa del amor.",
            "Para mí, un relación ideal es uno en el que las partes se sienten cómodas para hablar de cualquier tema, por más difícil que sea."
        ];

        return {
            signo: randomize(signos),
            gradosDeEscolaridad: randomize(gradosDeEscolaridad),
            religion: randomize(religiones),
            rasgosPositivos: randomize(rasgosPositivos),
            generosMusicales: randomize(generosMusicales),
            gustosCulinarios: randomize(gustosCulinarios),
            deportesFavoritos: randomize(deportesFavoritos),
            percepcionRelacionIdeal: randomize(percepcionRelacionIdeal),
            // Adicionar a seleção aleatória para os demais campos...
        };
    };




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nome || !dataNascimento || !interesse || !sexo || !signo || !estadoCivil) {
            toast.error('Todos os campos são obrigatórios.', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Não autorizado.', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }

        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;

        try {

            const baseUrl = import.meta.env.VITE_API_URL;
            const url = `${baseUrl}/get-random-image?interesse=${interesse}`;

            console.log(interesse);
            const imageUrlData = await imageUrlResponse.json();

            if (!imageUrlData.url_img) {
                throw new Error('Não foi possível obter a URL da imagem.');
            }

            const informacoesData = generateInformacoes();


            const params = {
                email,
                nome,
                dataNascimento,
                interesse,
                sexo,
                signo,
                estadoCivil,
                url_img: imageUrlData.url_img,
                informacoes: informacoesData
            };

            const response = await editUserFromEmail(params);

            // Verifique a resposta antes de mostrar a mensagem de sucesso
            if (response.data && response.data.success) {
                toast.success(response.data.message || 'Informações atualizadas com sucesso!', {
                    position: toast.POSITION.TOP_CENTER,
                });

                setOpen(false); // Supondo que setOpen é como você está controlando a visibilidade do modal
                navigate('/retrato-preto'); // Redireciona para /partidas após sucesso
            } else {
                // Trate a resposta como erro se não for bem-sucedida
                throw new Error(response.data.message || 'Erro ao atualizar informações.');
            }
        } catch (error) {
            console.error('Erro ao atualizar informações:', error);
            toast.error(error.message || 'Erro ao atualizar informações.', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgb(0, 0, 0)' // Define a cor e a transparência do fundo
                }
            }}
        >
            <Box sx={style} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Informações Adicionais
                </Typography>
                <TextField
                    fullWidth
                    label="Nombre"
                    margin="normal"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Fecha de Nacimiento"
                    margin="normal"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Interesado en</InputLabel>
                    <Select
                        value={interesse}
                        label="Interesado en"
                        onChange={(e) => setInteresse(e.target.value)}
                        required
                    >
                        <MenuItem value="homem">Hombre</MenuItem>
                        <MenuItem value="mulher">Mujer</MenuItem>
                    </Select>
                    {!interesse && <FormHelperText>Required</FormHelperText>}
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Sexo</InputLabel>
                    <Select
                        value={sexo}
                        label="Sexo"
                        onChange={(e) => setSexo(e.target.value)}
                        required
                    >
                        <MenuItem value="masculino">Masculino</MenuItem>
                        <MenuItem value="feminino">Femenino</MenuItem>
                    </Select>
                    {!sexo && <FormHelperText>Required</FormHelperText>}
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Signo Zodiacal</InputLabel>
                    <Select
                        value={signo}
                        label="Signo Zodiacal"
                        onChange={(e) => setSigno(e.target.value)}
                        required
                    >
                        {/* Adicione os signos aqui */}
                        <MenuItem value="aries">Aries</MenuItem>
                        <MenuItem value="touro">Tauro</MenuItem>
                        <MenuItem value="gemeos">Géminis</MenuItem>
                        <MenuItem value="cancer">Cáncer</MenuItem>
                        <MenuItem value="leao">Leo</MenuItem>
                        <MenuItem value="virgem">Virgo</MenuItem>
                        <MenuItem value="libra">Libra</MenuItem>
                        <MenuItem value="escorpiao">Escorpio</MenuItem>
                        <MenuItem value="sagitario">Sagitario</MenuItem>
                        <MenuItem value="capricornio">Capricornio</MenuItem>
                        <MenuItem value="aquario">Acuario</MenuItem>
                        <MenuItem value="peixes">Piscis</MenuItem>
                        {/* Mais signos */}
                    </Select>
                    {!signo && <FormHelperText>Required</FormHelperText>}
                </FormControl>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Estado Civil</InputLabel>
                    <Select
                        value={estadoCivil}
                        label="Estado Civil"
                        onChange={(e) => setEstadoCivil(e.target.value)}
                        required
                    >
                        <MenuItem value="solteira">Soltera</MenuItem>
                        <MenuItem value="solteira">Casada</MenuItem>
                        <MenuItem value="solteira">Divorciada</MenuItem>
                        <MenuItem value="solteira">En una relación</MenuItem>
                        <MenuItem value="solteira">Viuda</MenuItem>
                        {/* Mais estados civis */}
                    </Select>
                    {!estadoCivil && <FormHelperText>Required</FormHelperText>}
                </FormControl>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                    Enviar
                </Button>
            </Box>
        </Modal>
    );
};

export default FormAlmaGemelaView;
