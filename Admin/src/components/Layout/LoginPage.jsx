import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { createSession, getUserFromEmail } from "../../services/api"
import { toast } from 'react-toastify';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { AuthContext } from '../../store/AuthContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>

    </Typography>
  );
}
const theme = createTheme();
export default function LoginPage() {
  const navigate = useNavigate();
  const login = (email, password) => {
    const params = {
      email: email,
      senha: password,
    };
    createSession(params)
      .then((response) => {
        const decodeToken = jwtDecode(response.data.token);
        const token = response.data.token;
        const loggedUser = {
          id: decodeToken.id,
          email: decodeToken.email,
          nome_completo: decodeToken.nome_completo,
          create_time: decodeToken.create_time,
        };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
  
        // Agora que o login foi bem-sucedido, verifique o signo do usuário
        getUserFromEmail(email).then((userResponse) => {
          const user = userResponse.data.user[0]; // Assumindo que sempre haverá pelo menos um usuário na resposta
          if (user.signo) {
            // Se o usuário tem um signo definido
            navigate('/partida');
          } else {
            // Se o signo do usuário é null
            navigate('/form-almagemela');
          }
        }).catch((error) => {
          console.error("Erro ao buscar informações do usuário:", error);
          // Tratamento de erro, caso não consiga buscar as informações do usuário
        });
  
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          //EMAIL OU SENHA INVÁLIDOS
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          console.error(error.response);
        } else {
          console.error("Erro desconhecido:", error);
          toast.error("Erro ao fazer login", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get('email'), data.get('password'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Faça seu Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Cadastrar"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}