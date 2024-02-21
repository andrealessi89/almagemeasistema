const express = require('express');
const loginController = require('./controllers/loginController');
const authenticate = require('./middleware/authenticate');
const dataBaseByDomain = require('./middleware/dataBaseByDomain');
const vendasController = require('./controllers/vendaController');
const userController = require('./controllers/userController');
const fs = require('fs');
const path = require('path');




const router = express.Router();


router.post('/login',dataBaseByDomain.dataBaseByDomain,(req,res)=> loginController.login(req,res,req.database));


router.post('/venda-produto-principal', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaProdutoPrincipal(req,res,req.database));

router.post('/venda-retrato-colorido', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaRetratoColorido(req,res,req.database));

router.post('/venda-envio-imediato', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaEnvioImediato(req,res,req.database));

router.post('/venda-informacoes-alma', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaInformacoesAlma(req,res,req.database));









router.get('/getUserFromEmail', dataBaseByDomain.dataBaseByDomain,(req,res)=> userController.getUserFromEmail(req,res,req.database));
router.post('/editUserFromEmail', dataBaseByDomain.dataBaseByDomain,(req,res)=> userController.editUserFromEmail(req,res,req.database));


router.get('/getInfoBuyByEmail', dataBaseByDomain.dataBaseByDomain,(req,res)=> userController.getInfoBuyByEmail(req,res,req.database));


const baseImagesFolderPath = path.join(__dirname, '../../Admin/fotos');

router.get('/get-random-image', (req, res) => {
    // Obtém o interesse da query string
    const interesse = req.query.interesse;

    // Verifica se o interesse foi fornecido
    if (!interesse) {
        return res.status(400).send('Interesse não especificado.');
    }

    // Constrói o caminho para a pasta específica baseada no interesse
    const specificFolderPath = path.join(baseImagesFolderPath, interesse);

    console.log(specificFolderPath);

    fs.readdir(specificFolderPath, (err, files) => {
        if (err) {
            console.error('Erro ao ler a pasta:', err);
            return res.status(500).send('Erro ao processar sua solicitação');
        }

        // Verifica se a pasta está vazia
        if (files.length === 0) {
            return res.status(404).send('Nenhuma imagem encontrada.');
        }

        const randomIndex = Math.floor(Math.random() * files.length);
        const randomImageName = files[randomIndex];

        // Retorna o nome da imagem aleatória
        res.json({ url_img: randomImageName });
    });
});

/*
router.delete('/deleteTorneio', dataBaseByDomain.dataBaseByDomain, authenticate.authenticate,(req,res)=> torneiosController.deleteTorneio(req,res,req.database));
router.get('/getTorneioByPlayer', dataBaseByDomain.dataBaseByDomain,(req,res)=> torneiosController.getTorneioByPlayer(req,res,req.database));

*/
module.exports = router;