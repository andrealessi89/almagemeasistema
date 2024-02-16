require('dotenv').config();
const app = require('./app');

const PORT = process.env.API_PORT || 3333;

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));