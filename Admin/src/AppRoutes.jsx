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

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/esqueci-senha" element={<EsqueciSenha />} />
                   
                        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                            <Route path='/partidas' element={<PartidasView />} />
                            <Route path="/cadastro-players" element={<CadastroPlayersView />} />
                            <Route path="/rankings" element={<RankingView />} />
                        </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default AppRoutes