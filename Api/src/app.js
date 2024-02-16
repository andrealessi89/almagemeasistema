const express = require('express');
const router = require('./router');
const app = express();
const cors = require('cors');
/*
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
};
*/

const corsOptions = {
    origin: true,
    credentials: true, // Se você precisa de credenciais (cookies, sessões)
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));




app.use(express.json());
app.use(router);
module.exports = app;