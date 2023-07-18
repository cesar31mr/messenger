const express = require('express');
const userController = require('../controllers/UserController');
const multiparty = require('connect-multiparty');

const path = multiparty({uploadDir: './uploads/perfiles'});
const app = express.Router();

app.post('/registro', userController.registro);
app.post('/login', userController.login);
app.get('/get_user/:id', userController.get_user);
app.get('/get_users', userController.get_users);
app.put('/usuario/editar/imagen/:id', path, userController.update_foto);
app.get('/usuario/img/:img', path, userController.get_img);

module.exports = app;