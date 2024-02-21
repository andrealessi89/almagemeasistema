import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333',
})

//params tem que ser id e email para criar a sessão
export const createSession = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-database-name': 'alma'};
    return api.post('/login', params, { headers })
}

export const getUserFromEmail = async (email) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.get('/getUserFromEmail?email='+email, { headers });
}

export const editUserFromEmail = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.post('/editUserFromEmail', params, { headers });
}

export const getInfoBuyByEmail = async (email) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.get('/getInfoBuyByEmail?email='+email, { headers });
}


///////////////////////////EXEMPLOS///////////////////////

export const getAllPlayers = async () => {

    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.get('/getAllPlayers', { headers });
}

//Envia posicoes e data dos jogadores para salvar os pontos
export const savePontuacao = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.post('/savePontuacoes', params, { headers });
}

export const saveRanking = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.post('/saveRanking', params, { headers });
}

export const savePlayer = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.post('/savePlayer', params, { headers });
}

export const getAllTorneios = async () => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.get('/getAllTorneios', { headers });
}

export const getAllRanking= async () => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.get('/getAllRanking', { headers });
}

export const getTorneioByPlayer = async (apelido) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.get('/getTorneioByPlayer?apelido='+apelido, { headers });
}

export const getInfoTorneioById = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.post('/getInfoTorneioById', params, { headers });
}

export const getRankingById = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.post('/getRankingById', params, { headers });
}

export const deleteTorneio = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.delete('/deleteTorneio?'+params, { headers });
}

export const deleteRanking = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.delete('/deleteRanking?'+params, { headers });
}

export const deletePlayer = async (params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.delete('/deletePlayer?'+params, { headers });
}

export const editPlayer = async (id, params) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token,  'x-database-name': 'alma'};
    return api.put('/editPlayer?'+id, params, { headers });
}
