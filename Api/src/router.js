const express = require('express');
const loginController = require('./controllers/loginController');
const authenticate = require('./middleware/authenticate');
const torneiosController = require('./controllers/torneiosController');
const dataBaseByDomain = require('./middleware/dataBaseByDomain');
const vendasController = require('./controllers/vendaController');




const router = express.Router();


router.post('/login',dataBaseByDomain.dataBaseByDomain,(req,res)=> loginController.login(req,res,req.database));


router.post('/venda-produto-principal', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaProdutoPrincipal(req,res,req.database));

router.post('/venda-retrato-colorido', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaRetratoColorido(req,res,req.database));

router.post('/venda-envio-imediato', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaEnvioImediato(req,res,req.database));

router.post('/venda-informacoes-alma', dataBaseByDomain.dataBaseByDomain,(req,res)=> vendasController.VendaInformacoesAlma(req,res,req.database));

/*
router.delete('/deleteTorneio', dataBaseByDomain.dataBaseByDomain, authenticate.authenticate,(req,res)=> torneiosController.deleteTorneio(req,res,req.database));
router.get('/getTorneioByPlayer', dataBaseByDomain.dataBaseByDomain,(req,res)=> torneiosController.getTorneioByPlayer(req,res,req.database));

*/
module.exports = router;