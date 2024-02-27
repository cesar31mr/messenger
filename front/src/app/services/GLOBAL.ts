const my_api = `http://${process.env["API_HOST"]}:${process.env["API_PORT"]}/api`;

export var GLOBAL = {
    url: `http://${process.env["API_HOST"]}:${process.env["API_PORT"]}`,
    registro: `${my_api}/registro`,
    login: `${my_api}/login`,
    get_users: `${my_api}/get_users`,
    get_user: `${my_api}/get_user`,
    get_img: `${my_api}/usuario/img/`,
    editar_config: `${my_api}/usuario/editar`,
    activar_estado: `${my_api}/usuario/activar`,
    desactivar_estado: `${my_api}/usuario/desactivar`,



    data_msm: `${my_api}/mensajes`,
    send_msm: `${my_api}/mensaje/enviar`
}