import React, { useState, useEffect } from 'react';
import { getInfoBuyByEmail } from '../../services/api';
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import { differenceInSeconds, addHours } from 'date-fns'; // Importando funções do date-fns
import { Link } from 'react-router-dom'; // Adicione isto se você estiver usando react-router
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const cartaStyle = {
  padding: '20px',
  backgroundColor: '#f4f1e9', // Cor de fundo para parecer papel antigo
  color: '#5a4a42', // Cor da fonte para imitar tinta
  fontFamily: '"Times New Roman", Times, serif', // Fonte para parecer escrita à mão ou máquina de escrever
  fontStyle: 'italic', // Itálico para dar um toque elegante
  fontSize: '16px', // Tamanho da fonte
  lineHeight: '1.6', // Espaçamento entre linhas
  boxShadow: '5px 5px 10px rgba(0,0,0,0.1)', // Sombra suave para dar um efeito elevado
  //margin: '20px', // Margem para separar do resto do conteúdo
};

const countdownStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
};

const buttonStyle = {
  display: 'block',
  width: 'max-content',
  margin: '0 auto', // Centraliza o botão
  padding: '10px 20px',
  backgroundColor: '#1976d2',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
};


const RetratoPretoView = () => {
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [urlImg, setUrlImg] = useState(null);

  const urlBanner = 'fotos/btnColorido.jpg';
  const urlHoriochoi = 'fotos/horiochi.png';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Não autorizado.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getInfoBuyByEmail(userEmail);
        if (response.data.success && response.data.userDetails) {
          const { retrato_preto, envio_imediato, vendaRetratoPreto, signo, url_img, interesse } = response.data.userDetails;
          setUrlImg('fotos/' + interesse + '/' + url_img);

          if (signo === null || signo === '') {
            setErrorMessage(<div>Você precisa preencher o <Link to="/form-almagemela">formulário</Link>.</div>);
            return;
          }

          if (retrato_preto !== 1) {
            setErrorMessage(<div>Você precisa comprar esse produto.</div>);
            return;
          }

          if (vendaRetratoPreto && vendaRetratoPreto.length > 0) {
            const dataVenda = new Date(vendaRetratoPreto[0].dataVenda);
            const now = new Date();
            const deadline = addHours(dataVenda, 24);
            const diffSeconds = differenceInSeconds(deadline, now);

            if (envio_imediato === 1 || diffSeconds <= 0) {
              setIsAvailable(true);
            } else {
              setIsAvailable(false);
              const interval = setInterval(() => {
                const newDiffSeconds = differenceInSeconds(deadline, new Date());
                updateCountdown(newDiffSeconds);

                if (newDiffSeconds <= 0) {
                  clearInterval(interval);
                  setIsAvailable(true);
                }
              }, 1000);
            }
          } else {
            setErrorMessage(
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center" // Centraliza verticalmente
                style={{ minHeight: '100vh' }} // Altura mínima para ocupar a tela inteira
              >
                <img src={urlHoriochoi} height={150}></img>
                <Grid item>

                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    Você precisa comprar esse produto.
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = 'https://www.exemplo.com/pagina-de-compra'}
                  >
                    Comprar Retrato Preto
                  </Button>
                </Grid>
              </Grid>
            );

          }
        } else {
          throw new Error('Falha ao obter informações do usuário');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        setErrorMessage(<div>Erro ao buscar informações do usuário.</div>);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateCountdown = (seconds) => {
    if (seconds <= 0) {
      setIsAvailable(true);
      setCountdown('');
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setCountdown(`${hours}h ${minutes}m ${secs}s`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (errorMessage) {
    return errorMessage; // Agora errorMessage pode ser um elemento JSX
  }

  if (!isAvailable) {
    

    return (
      <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center" // Centraliza verticalmente
      style={{ minHeight: '80vh' }} // Altura mínima para ocupar a tela inteira
    >
      <img src={urlHoriochoi} height={150}></img>
      <Grid item>

        <Typography variant="body1" style={{ textAlign: 'center' }}>
        <Typography style={countdownStyle}>Aguarde {countdown} para ver seu retrato.</Typography>
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.href = 'https://www.exemplo.com/pagina-de-compra'}
        >
          Comprar envio imediato
        </Button>
      </Grid>
    </Grid>
    );

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Banner */}

        {/* Imagem à esquerda */}
        <Grid item xs={12} lg={6}>
          <img src={urlImg} alt="Descrição da Imagem" style={{ width: '100%', height: 'auto', filter: 'grayscale(100%)' }} />
        </Grid>
        {/* Texto em forma de carta à direita */}
        <Grid item xs={12} lg={6}>
          <Grid item xs={12}>
            <img src={urlBanner} alt="Descrição do Banner" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Paper style={cartaStyle}>
            <Typography variant="body1" component="p">
              <b>Estimado ser de luz,</b>
              <br /><br />
              En este sagrado intercambio, donde el arte se encuentra con el alma, tu confianza en mi visión es el mayor honor. Al adquirir la imagen de tu alma gemela, has dado un paso valiente hacia el encuentro con tu esencia divina y tu conexión cósmica.
              <br /><br />
              Que este retrato sea un reflejo de la belleza infinita que reside en ti, y que su presencia en tu vida sirva como un constante recordatorio de la unidad y el amor que el universo tiene reservado para ti. Esta no es simplemente una transacción; es una afirmación de fe, un acto de reconocimiento de que las fuerzas mayores nos guían hacia nuestros destinos entrelazados.
              <br /><br />
              Con profunda gratitud y respeto, celebro tu camino hacia la iluminación y el amor verdadero. Que la imagen de tu alma gemela ilumine tu hogar con la misma luz con la que iluminaste mi camino al elegir mi obra.
              <br /><br />
              Con amor y luz,
              <br />
              <b>Maestro Horiochi</b>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>


  );

};

export default RetratoPretoView;
