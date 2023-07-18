const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'cesarmtz';

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        bio: user.bio,
        facebook: user.facebook,
        imagen: user.imagen,
        estado: user.estado,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix,
    }

    return jwt.encode(payload, secret);
}