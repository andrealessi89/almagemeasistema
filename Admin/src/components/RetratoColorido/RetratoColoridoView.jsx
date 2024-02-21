import React, { useState, useEffect } from 'react';
import { getInfoBuyByEmail } from '../../services/api';
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import { differenceInSeconds, addHours } from 'date-fns'; // Importando funções do date-fns
import { Link } from 'react-router-dom'; // Adicione isto se você estiver usando react-router

const RetratoColoridoView = () => {
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [urlImg, setUrlImg] = useState(null);

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
          const { retrato_colorido, envio_imediato, vendaRetratoColorido, signo, url_img, interesse } = response.data.userDetails;
          setUrlImg('fotos/' + interesse + '/' + url_img);

          if (signo === null || signo === '') {
            setErrorMessage(<div>Você precisa preencher o <Link to="/form-almagemela">formulário</Link>.</div>);
            return;
          }

          if (retrato_colorido !== 1) {
            setErrorMessage(<div>Você precisa comprar esse produto.</div>);
            return;
          }

          if (vendaRetratoColorido && vendaRetratoColorido.length > 0) {
            const dataVenda = new Date(vendaRetratoColorido[0].dataVenda);
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
            setErrorMessage(<div>Retrato preto não encontrado ou não comprado.</div>);
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
    return <div>Aguarde {countdown} para ver seu retrato.</div>;
  }

  return (
    <div>
      <img src={urlImg} alt="Descrição da Imagem" />
    </div>
  );
  
};

export default RetratoColoridoView;
