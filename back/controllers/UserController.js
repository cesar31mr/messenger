const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");
const path = require("path");

function registro(req, res) {
    const params = req.body;
    var user = new User();

    user.nombre = params.nombre;
    user.email = params.email;
    user.password = params.password;
    user.imagen = "null";
    user.telefono = "";
    user.bio = "";
    user.facebook = "undefined";
    user.twitter = "undefined";

    user.estado = true;

    if (params.password) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;

            User.findOne({ email: params.email })
                .then((user_data) => {
                    if (user_data) {
                        res.status(404).send({
                            message: "Ese correo ya existe",
                        });
                    } else {
                        user.save()
                            .then((user) => {
                                res.status(200).send({ user: user });
                            })
                            .catch((err) => {
                                res.status(404).send({ message: err });
                            });
                    }
                })
                .catch((err) => {
                    res.status(404).send({ message: err });
                });
        });
    } else {
        res.status(500).send({ message: "Ingrese la contraseña" });
    }
}

function login(req, res) {
    const data = req.body;

    User.findOne({ email: data.email })
        .then((user_data) => {
            if (!user_data) {
                res.status(404).send({ message: "Usuario no registrado" });
            } else {
                bcrypt.compare(
                    data.password,
                    user_data.password,
                    (err, check) => {
                        if (check) {
                            if (data.gettoken) {
                                res.status(200).send({
                                    jwt: jwt.createToken(user_data),
                                    user: user_data,
                                    message: "With token",
                                });
                            } else {
                                res.status(200).send({
                                    jwt: jwt.createToken(user_data),
                                    user: user_data,
                                    message: "No token",
                                });
                            }
                        } else {
                            res.status(404).send({
                                message: "Error al validar contraseña",
                            });
                        }
                    }
                );
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
        });
}

function get_user(req, res) {
    let id = req.params["id"];

    User.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).send({ user: user });
            } else {
                res.status(500).send({
                    message: "Error al validar el usuario",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
        });
}

function get_users(req, res) {
    User.find()
        .then((users) => {
            if (users) {
                res.status(200).send({ users: users });
            } else {
                res.status(204).send({});
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
        });
}

function update_foto(req, res) {
    let id = req.params["id"];

    if (req.files.imagen) {
        let imagen_path = req.files.imagen.path;
        let name = imagen_path.split("\\");
        let imagen_name = name[2];

        User.findByIdAndUpdate(id, { imagen: imagen_name })
            .then((user_update) => {
                if (user_update) {
                    res.status(200).send({ user: user_update });
                } else {
                    res.status(500).send({
                        message: "No se pudo actualizar el registro.",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err });
            });
    } else {
        res.status(404).send({ message: "Debe seleccionar una imagen" });
    }
}

function get_img(req, res) {
    var img = req.params["img"];
    var path_img = "./uploads/perfiles/";

    if (img != "null") {
        path_img += img;
    } else {
        path_img += "default.png";
    }

    console.log("path:", path_img);
    res.status(200).sendFile(path.resolve(path_img));
}

function editar_config(req, res) {
    const id = req.params["id"];
    const data = req.body;

    if (req.files) {
        let imagen_pat = req.files.imagen.path;
        let name = imagen_pat.split("\\");
        let image_name = name[2];

        if (data.password) {
            bcrypt.hash(data.password, null, null, (err, hash) => {
                if (err) res.status(500).send({ message: err });
                else {
                    console.log("1");
                    User.findByIdAndUpdate(id, {
                        nombre: data.nombre,
                        password: hash,
                        imagen: image_name,
                        telefono: data.telefono,
                        bio: data.bio,
                        facebook: data.facebook,
                        twitter: data.twitter,
                        estado: data.estado,
                    })
                        .then((user_data) => {
                            res.status(200).send({ user: user_data });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err });
                        });
                }
            });
        } else {
            console.log("2");
            User.findByIdAndUpdate(id, {
                nombre: data.nombre,
                imagen: image_name,
                telefono: data.telefono,
                bio: data.bio,
                facebook: data.facebook,
                twitter: data.twitter,
                estado: data.estado,
            })
                .then((user_data) => {
                    res.status(200).send({ user: user_data });
                })
                .catch((err) => {
                    res.status(500).send({ message: err });
                });
        }
    } else {
        if (data.password) {
            bcrypt.hash(data.password, null, null, (err, hash) => {
                if (err) res.status(500).send({ message: err });
                else {
                    console.log("3");
                    User.findByIdAndUpdate(id, {
                        nombre: data.nombre,
                        password: hash,
                        telefono: data.telefono,
                        bio: data.bio,
                        facebook: data.facebook,
                        twitter: data.twitter,
                        estado: data.estado,
                    })
                        .then((user_data) => {
                            res.status(200).send({ user: user_data });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: err });
                        });
                }
            });
        } else {
            console.log("4");
            User.findByIdAndUpdate(id, {
                nombre: data.nombre,
                telefono: data.telefono,
                bio: data.bio,
                facebook: data.facebook,
                twitter: data.twitter,
                estado: data.estado,
            })
                .then((user_data) => {
                    res.status(200).send({ user: user_data });
                })
                .catch((err) => {
                    res.status(500).send({ message: err });
                });
        }
    }
}

module.exports = {
    registro,
    login,
    get_user,
    get_users,
    update_foto,
    get_img,
    editar_config,
};
