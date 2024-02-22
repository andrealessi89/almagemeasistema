import React from 'react'
import { AuthProvider } from './store/AuthContext'
import Layout from './components/Layout/Layout'
import LoginPage from './components/Layout/LoginPage'
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import EsqueciSenha from './components/Layout/EsqueciSenha';
import PartidasView from './components/Partidas/PartidasView'
import PlayersProvider from './store/PlayersContext'
import CadastroPlayersView from './components/CadastroPlayers/CadastroPlayersView'
import RankingView from './components/Rankings/RankingView';
import FormAlmaGemelaView from './components/FormAlmaGemela/FormAlmaGemelaView';
import RetratoColoridoView from './components/RetratoColorido/RetratoColoridoView';
import RetratoPretoView from './components/RetratoPreto/RetratoPretoView';
import InformacoesView from './components/Informacoes/InformacoesView';
import HoroscopoView from './components/Horoscopo/HoroscopoView';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/esqueci-senha" element={<EsqueciSenha />} />
                        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                        <Route path='/home' element={<RetratoPretoView />} />
                        <Route path='/retrato-colorido' element={<RetratoColoridoView />} />
                        <Route path='/retrato-preto' element={<RetratoPretoView />} />
                        <Route path='/informacoes' element={<InformacoesView />} />
                        <Route path='/form-almagemela' element={<FormAlmaGemelaView />} />
                        <Route path='/horoscopo' element={<HoroscopoView />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default AppRoutes