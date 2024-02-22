import React, { useState, useEffect } from 'react';
import { getInfoBuyByEmail } from '../../services/api';
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const urlHoriochoi = 'fotos/iconehoroscopo.png';

const HoroscopoView = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [informacoesData, setInformacoesData] = useState(null);

    const renderInformacoes = (informacoes) => {
        // Transforma a string JSON em objeto, se necessário
        const informacoesObj = typeof informacoes === 'string' ? JSON.parse(informacoes) : informacoes;

        // Gera elementos de UI para cada par chave-valor
        return Object.entries(informacoesObj).map(([chave, valor]) => (
            <Grid item xs={12} key={chave}>
                <Paper elevation={3} style={{ margin: '10px', padding: '10px' }}>
                    <Typography variant="h6" style={{ textTransform: 'capitalize' }}>{chave.replace(/([A-Z])/g, ' $1')}</Typography>
                    <Typography variant="body1">{valor}</Typography>
                </Paper>
            </Grid>
        ));
    };

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
                    const { informacoes_alma, signo, informacoes } = response.data.userDetails;

                    if (signo === null || signo === '') {
                        setErrorMessage(<div>Necesitas completar el formulario - <Link to="/form-almagemela">formulário</Link>.</div>);
                        return;
                    }

                    if (informacoes_alma !== 1) {
                        setErrorMessage(
                            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center" // Centraliza verticalmente
                style={{ minHeight: '80vh' }} // Altura mínima para ocupar a tela inteira
              >
                {/* Preço riscado e novo preço */}


                <img src={urlHoriochoi} alt="Descrição do Horiochi" height={150} />
                <Grid item>
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                  Necesitas comprar este producto.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="span" style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                    $49,90
                  </Typography>
                  <Typography variant="h5" component="span" style={{ color: 'red' }}>
                    $19,90
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = 'https://pay.hotmart.com/A88821707G?off=kxy9fbw7'}
                  >
                    Comprar horóscopo diario
                  </Button>
                </Grid>
              </Grid>
                          );
                        return;
                    }

                    // Se o produto foi comprado
                    setInformacoesData(informacoes);
                } else {
                    throw new Error('Error al buscar información del usuario:');
                }
            } catch (error) {
                console.error('Error al buscar información del usuario:', error);
                setErrorMessage("Error al buscar información del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <Typography>Carregando...</Typography>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    ¡El camino hacia tu alma gemela comienza aquí!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    ¡Hola!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Estamos encantados de compartir contigo algunas informaciones vitales que pueden ser clave para encontrar a tu alma gemela. Hemos dedicado tiempo y cuidado para reunir estos datos que podrían acercarte a la conexión significativa que has estado buscando.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    La travesía para encontrar a tu alma gemela puede ser larga y llena de desafíos, pero cada paso que das te acerca a esa conexión maravillosa. Recuerda, cada alma gemela es única y lleva consigo un propósito y una energía especial.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Esperamos sinceramente que esta información te ayude en tu viaje hacia el verdadero amor. Ya sea una chispa instantánea o una llama lenta y constante, te deseamos todo el éxito del mundo en tu búsqueda de tu alma gemela.
                </Typography>
            </Grid>
            {informacoesData && renderInformacoes(informacoesData)}
        </Grid>
    );
};

export default HoroscopoView;
