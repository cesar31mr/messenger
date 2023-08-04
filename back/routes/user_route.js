const express = require('express');
const userController = require('../controllers/UserController');
const multiparty = require('connect-multiparty');

const path = multiparty({uploadDir: './uploads/perfiles'});
const app = express.Router();

app.post('/registro', userController.registro);
app.post('/login', userController.login);
app.get('/get_user/:id', userController.get_user);
app.get('/get_users', userController.get_users);
app.put('/usuario/activar/:id', userController.activar_estado);
app.put('/usuario/desactivar/:id', userController.desactivar_estado);
app.put('/usuario/editar/imagen/:id', path, userController.update_foto);
app.get('/usuario/img/:img', path, userController.get_img);
app.put('/usuario/editar/:id', path, userController.editar_config);

module.exports = app;