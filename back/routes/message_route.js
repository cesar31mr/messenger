const express = require('express');
const messageController = require('../controllers/MessageController');


const api = express.Router();

api.post('/mensaje/enviar', messageController.send);
api.get('/mensajes/:de/:para', messageController.data_msm);

module.exports = api;