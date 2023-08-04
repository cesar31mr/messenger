var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    email: String,
    password: String,
    imagen: String,
    telefono: String,
    bio: String,
    facebook: String,
    twitter: String,
    github: String,
    estado: Boolean
})

module.exports = mongoose.model('user', UserSchema);