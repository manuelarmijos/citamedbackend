var router = require('express').Router();
var configuracionMySQL = require('../../config/config');

//OBTENER ADMINISTRADOR    
router.post('/obtener-administrador', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerAdministrador(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerAdministrador(req, res) {

    configuracionMySQL.ejecutarResSQL(SQL_OBTENER_ADMINISTRADOR, [], function (administrador) {
        if (administrador.length <= 0)
            return res.status(200).send({ en: -1, m: 'No existen administrador disponibles' });
        return res.status(200).send({ en: 1, administrador: administrador });
    }, res);
}

const SQL_OBTENER_ADMINISTRADOR =
    "SELECT a.idAdministrador, a.usuario, a.nombres, a.apellidos, a.correo, a.cedula, a.imagen, a.fechaRegistro, a.celular, a.direccion, ar.idRol, r.rol AS nombreRol, a.contrasenia FROM " + process.env._BD_ + ".administrador a INNER JOIN " + process.env._BD_ + ".administrador_rol ar ON ar.idAdministrador = a.idAdministrador AND ar.habilitado = 1 INNER JOIN " + process.env._BD_ + ".rol r ON r.idRol = ar.idRol WHERE a.habilitado = 1; ";




//REGISTRAR ADMINISTRADOR    
router.post('/registrar-administrador', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return registrarAdministrador(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function registrarAdministrador(req, res) {
    console.log('REgistar administrador');
    console.log(req.body);
    let usuario = req.body.usuario;
    let contrasenia = req.body.contrasenia;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let celular = req.body.celular;
    let cedula = req.body.cedula;
    let idRegistro = req.body.idRegistro;
    let correo = req.body.correo;
    let direccion = req.body.direccion;
    let idRol = req.body.idRol;

    if (!usuario)
        return res.status(400).send({ error: 1, param: 'usuario' });
    if (!contrasenia)
        return res.status(400).send({ error: 2, param: 'contrasenia' });
    if (!nombres)
        return res.status(400).send({ error: 3, param: 'nombres' });
    if (!apellidos)
        return res.status(400).send({ error: 4, param: 'apellidos' });
    if (!celular)
        return res.status(400).send({ error: 5, param: 'celular' });
    if (!cedula)
        return res.status(400).send({ error: 6, param: 'cedula' });
    if (!idRegistro)
        return res.status(400).send({ error: 7, param: 'idRegistro' });
    if (!correo)
        return res.status(400).send({ error: 8, param: 'correo' });
    if (!direccion)
        return res.status(400).send({ error: 9, param: 'direccion' });
    if (!idRol)
        return res.status(400).send({ error: 10, param: 'rol' });

    configuracionMySQL.ejecutarResSQL(SQL_REGISTRAR_ADMINISTRADOR, [usuario, contrasenia, process.env.SECRETMD5KEY, nombres, apellidos, correo, celular, cedula, idRegistro, direccion, idRol], function (administrador) {
        if (administrador.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo registrar el administrador' });
        console.log(administrador)
        configuracionMySQL.ejecutarResSQL(SQL_CREATE_ARMIN_ROL, [administrador.insertId, idRol, idRegistro], function (adminrol) {
            if (adminrol.length <= 0)
                return res.status(200).send({ en: -1, m: 'No se pudo registrar el rol del administrador' });
            return res.status(200).send({ en: 1, m: 'Administrador registrado correctamente' });
        }, res);
    }, res);
}

const SQL_REGISTRAR_ADMINISTRADOR =
    "INSERT INTO  " + process.env._BD_ + ".administrador (usuario, contrasenia, nombres, apellidos, correo, celular, cedula, idRegistro, direccion) VALUES (?, MD5(CONCAT(?, ?)), ?, ?, ?, ?, ?, ?, ?);";


const SQL_CREATE_ARMIN_ROL =
    "INSERT INTO  " + process.env._BD_ + ".administrador_rol (idAdministrador, idRol, idRegistro) VALUES (?,?,?);";



//EDITAR ADMINISTRADOR    
router.post('/editar-administrador', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return editarAdministrador(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function editarAdministrador(req, res) {
    console.log('editar administrador');
    console.log(req.body);
    let usuario = req.body.usuario;
    let contrasenia = req.body.contrasenia;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let celular = req.body.celular;
    let cedula = req.body.cedula;
    let correo = req.body.correo;
    let direccion = req.body.direccion;
    let idRol = req.body.idRol;
    let idAdministrador = req.body.idAdministrador;
    let cambioPassword = req.body.cambioPassword;

    if (!usuario)
        return res.status(400).send({ error: 1, param: 'usuario' });
    if (!contrasenia)
        return res.status(400).send({ error: 2, param: 'contrasenia' });
    if (!nombres)
        return res.status(400).send({ error: 3, param: 'nombres' });
    if (!apellidos)
        return res.status(400).send({ error: 4, param: 'apellidos' });
    if (!celular)
        return res.status(400).send({ error: 5, param: 'celular' });
    if (!cedula)
        return res.status(400).send({ error: 6, param: 'cedula' });
    if (!correo)
        return res.status(400).send({ error: 6, param: 'correo' });
    if (!direccion)
        return res.status(400).send({ error: 6, param: 'direccion' });
    if (!idRol)
        return res.status(400).send({ error: 6, param: 'correo' });
    if (!idAdministrador)
        return res.status(400).send({ error: 6, param: 'idAdministrador' });

    let sql = SQL_EDITAR_ADMINISTRADOR;
    let params = [
        usuario, nombres, apellidos, correo, celular, cedula, direccion, idAdministrador
    ]

    if (cambioPassword == 1){
        sql = SQL_EDITAR_ADMINISTRADOR_CONTRA;
        params = [
            usuario, nombres, contrasenia + process.env.SECRETMD5KEY, apellidos, correo, celular, cedula, direccion, idAdministrador
        ]
    }

    configuracionMySQL.ejecutarResSQL(sql, params, function (administrador) {
        if (administrador.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo editar el administrador' });
        configuracionMySQL.ejecutarSQL(SQL_EDITAR_ROL, [idRol, idAdministrador]);
        return res.status(200).send({ en: 1, m: 'Adminstrador editado correctamente' });
    }, res);
}

const SQL_EDITAR_ADMINISTRADOR_CONTRA =
    "UPDATE " + process.env._BD_ + ".administrador  SET usuario = ?, nombres = ?, contrasenia = MD5(?), apellidos = ?, correo = ?, celular = ?, cedula = ?, direccion = ? WHERE idAdministrador = ?;";

const SQL_EDITAR_ADMINISTRADOR =
    "UPDATE " + process.env._BD_ + ".administrador  SET usuario = ?, nombres = ?, apellidos = ?, correo = ?, celular = ?, cedula = ?, direccion = ? WHERE idAdministrador = ?;";

const SQL_EDITAR_ROL =
    "UPDATE " + process.env._BD_ + ".administrador_rol  SET idRol = ? WHERE idAdministrador = ?;";


//ELIMINAR ADMINISTRADOR    
router.post('/eliminar-administrador', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return eliminarAdministrador(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function eliminarAdministrador(req, res) {
    console.log('editar administrador');
    console.log(req.body);
    let idAdministrador = req.body.idAdministrador;

    if (!idAdministrador)
        return res.status(400).send({ error: 2, param: 'idAdministrador' });

    configuracionMySQL.ejecutarResSQL(SQL_ELIMINAR_ADMINISTRADOR, [idAdministrador], function (administrador) {
        if (administrador.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo eliminar el administrador' });
        return res.status(200).send({ en: 1, m: 'Administrador eliminado correctamente' });
    }, res);
}

const SQL_ELIMINAR_ADMINISTRADOR =
    "UPDATE " + process.env._BD_ + ".administrador  SET habilitado = 0 WHERE idAdministrador = ?;";


module.exports = router;