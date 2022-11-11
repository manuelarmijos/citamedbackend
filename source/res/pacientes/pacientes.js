var router = require('express').Router();
var configuracionMySQL = require('../../config/config');


router.post('/combo-pacientes', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerComboPacientes(req, res);
    return res.status(320).send({
        en: -1,
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerComboPacientes(req, res) {
    configuracionMySQL.ejecutarResSQL(SQL_OBTENER_COMBO_PACIENTES, [], function (pacientes) {
        if (pacientes.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo obtener las especialidades' });
        return res.status(200).send({ en: 1, pacientes: pacientes });
    }, res);
}

const SQL_OBTENER_COMBO_PACIENTES =
    "SELECT idPaciente, CONCAT(nombres , ' ' , apellidos) as nombres FROM   " + process.env._BD_ + ".paciente where habilitado = 1;";

router.post('/obtener-pacientes', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerPacientes(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerPacientes(req, res) {

    configuracionMySQL.ejecutarResSQL(OBTENER_PACIENTES, [], function (pacientes) {
        if (pacientes.length <= 0)
            return res.status(200).send({ en: -1, m: 'No existen pacientes disponibles' });
        return res.status(200).send({ en: 1, pacientes: pacientes });
    }, res);
}

const OBTENER_PACIENTES = " SELECT p.idPaciente, p.usuario, p.nombres, p.apellidos, p.correo, p.cedula, p.imagen, p.fechaRegistro, p.celular, p.direccion, p.contrasenia FROM " + process.env._BD_ + ".paciente p WHERE p.habilitado = 1; ";


router.post('/registrar-pacientes', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return registrarPaciente(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function registrarPaciente(req, res) {
    console.log('REgistar paciente');
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

    configuracionMySQL.ejecutarResSQL(SQL_REGISTRAR_PACIENTE, [usuario, contrasenia, process.env.SECRETMD5KEY, nombres, apellidos, correo, celular, cedula, idRegistro, direccion], function (paciente) {
        if (paciente.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo registrar el paciente' });
        console.log(paciente)
        return res.status(200).send({ en: 1, m: 'Paciente registrado correctamente' });
    }, res);
}

const SQL_REGISTRAR_PACIENTE =
    "INSERT INTO  " + process.env._BD_ + ".paciente (usuario, contrasenia, nombres, apellidos, correo, celular, cedula, idRegistro, direccion) VALUES (?, MD5(CONCAT(?, ?)), ?, ?, ?, ?, ?, ?, ?);";


router.post('/editar-pacientes', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return editarPacientes(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function editarPacientes(req, res) {
    console.log('editar pacientes');
    console.log(req.body);
    let usuario = req.body.usuario;
    let contrasenia = req.body.contrasenia;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let celular = req.body.celular;
    let cedula = req.body.cedula;
    let correo = req.body.correo;
    let direccion = req.body.direccion;
    let idPaciente = req.body.idPaciente;
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
    if (!idPaciente)
        return res.status(400).send({ error: 6, param: 'idPaciente' });

    let sql = SQL_EDITAR_PACIENTE;
    let params = [
        usuario, nombres, apellidos, correo, celular, cedula, direccion, idPaciente
    ]

    if (cambioPassword == 1) {
        sql = SQL_EDITAR_PACIENTE_CONTRA;
        params = [
            usuario, nombres, contrasenia + process.env.SECRETMD5KEY, apellidos, correo, celular, cedula, direccion, idPaciente
        ]
    }

    configuracionMySQL.ejecutarResSQL(sql, params, function (paciente) {
        if (paciente.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo editar el paciente' });
        return res.status(200).send({ en: 1, m: 'Paciente editado correctamente' });
    }, res);
}

const SQL_EDITAR_PACIENTE_CONTRA =
    "UPDATE " + process.env._BD_ + ".paciente  SET usuario = ?, nombres = ?, contrasenia = MD5(?), apellidos = ?, correo = ?, celular = ?, cedula = ?, direccion = ? WHERE idPaciente = ?;";

const SQL_EDITAR_PACIENTE =
    "UPDATE " + process.env._BD_ + ".paciente  SET usuario = ?, nombres = ?, apellidos = ?, correo = ?, celular = ?, cedula = ?, direccion = ? WHERE idPaciente = ?;";


router.post('/eliminar-paciente', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return eliminarPaciente(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function eliminarPaciente(req, res) {
    console.log('eliminar paciente');
    console.log(req.body);
    let idPaciente = req.body.idPaciente;

    if (!idPaciente)
        return res.status(400).send({ error: 2, param: 'idPaciente' });

    configuracionMySQL.ejecutarResSQL(SQL_ELIMINAR_ADMINISTRADOR, [idPaciente], function (paciente) {
        if (paciente.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo eliminar al paciente' });
        return res.status(200).send({ en: 1, m: 'Paciente eliminado correctamente' });
    }, res);
}

const SQL_ELIMINAR_ADMINISTRADOR =
    "UPDATE " + process.env._BD_ + ".paciente  SET habilitado = 0 WHERE idPaciente = ?;";
module.exports = router;