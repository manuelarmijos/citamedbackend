var router = require('express').Router();
var configuracionMySQL = require('../../config/config');

//OBTENER CITA    
router.post('/obtener-citas', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerCitas(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerCitas(req, res) {

    configuracionMySQL.ejecutarResSQL(SQL_OBTENER_CITAS, [], function (citas) {
        if (citas.length <= 0)
            return res.status(200).send({ en: -1, m: 'No existen citas disponibles' });
        return res.status(200).send({ en: 1, citas: citas });
    }, res);
}

const SQL_OBTENER_CITAS =
    "SELECT c.idCita, c.idEspecialidad, c.idPaciente, c.nombre AS name, ADDTIME(c.fecha, c.hora) AS start, c.fecha, c.hora, ADDTIME(ADDTIME(c.fecha, c.hora), c.fraccion) AS end, e.color, 'false' AS timed, fraccion FROM " + process.env._BD_ + ".cita c INNER JOIN " + process.env._BD_ + ".especialidad e ON c.idEspecialidad = e.idEspecialidad AND e.habilitado = 1 WHERE c.habilitado = 1;";



//REGISTRAR CITA    
router.post('/registrar-citas', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return registrarCitas(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function registrarCitas(req, res) {
    console.log('REgistar citas');
    console.log(req.body);
    let idEspecialidad = req.body.idEspecialidad;
    let idAdministrador = req.body.idAdministrador;
    let idPaciente = req.body.idPaciente;
    let fecha = req.body.fecha;
    let fraccion = req.body.fraccion;
    let nombre = req.body.nombre;
    let hora = req.body.hora;

    if (!idEspecialidad)
        return res.status(400).send({ error: 1, param: 'idEspecialidad' });
    if (!idAdministrador)
        return res.status(400).send({ error: 2, param: 'idAdministrador' });
    if (!idPaciente)
        return res.status(400).send({ error: 3, param: 'idPaciente' });
    if (!fecha)
        return res.status(400).send({ error: 4, param: 'fecha' });
    if (!fraccion)
        return res.status(400).send({ error: 5, param: 'fraccion' });
    if (!nombre)
        return res.status(400).send({ error: 6, param: 'nombre' });
    if (!hora)
        return res.status(400).send({ error: 7, param: 'hora' });

    configuracionMySQL.ejecutarResSQL(SQL_REGISTRAR_CITAS, [idEspecialidad, idPaciente, idAdministrador, nombre, fraccion, fecha, hora], function (citas) {
        if (citas.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo registrar la cita' });
        return res.status(200).send({ en: 1, m: 'Cita registrada correctamente' });
    }, res);
}

const SQL_REGISTRAR_CITAS =
    "INSERT INTO  " + process.env._BD_ + ".cita (idEspecialidad, idPaciente, idAdministrador, nombre, fraccion, fecha, hora) VALUES ( ?, ?, ?, ?, ?, ?, ?);";



//EDITAR CITA    
router.post('/editar-citas', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return editarCitas(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function editarCitas(req, res) {
    console.log('editar citas');
    console.log(req.body);
    let idEspecialidad = req.body.idEspecialidad;
    let idAdministrador = req.body.idAdministrador;
    let idPaciente = req.body.idPaciente;
    let fecha = req.body.fecha;
    let fraccion = req.body.fraccion;
    let nombre = req.body.nombre;
    let hora = req.body.hora;
    let idCita = req.body.idCita;

    if (!idEspecialidad)
        return res.status(400).send({ error: 1, param: 'idEspecialidad' });
    if (!idAdministrador)
        return res.status(400).send({ error: 2, param: 'idAdministrador' });
    if (!idPaciente)
        return res.status(400).send({ error: 3, param: 'idPaciente' });
    if (!fecha)
        return res.status(400).send({ error: 4, param: 'fecha' });
    if (!fraccion)
        return res.status(400).send({ error: 5, param: 'fraccion' });
    if (!nombre)
        return res.status(400).send({ error: 6, param: 'nombre' });
    if (!hora)
        return res.status(400).send({ error: 7, param: 'hora' });
    if (!idCita)
        return res.status(400).send({ error: 7, param: 'idCita' });

    configuracionMySQL.ejecutarResSQL(SQL_EDITAR_CITAS, [idEspecialidad, idPaciente, idAdministrador, nombre, fraccion, fecha, hora, idCita], function (citas) {
        if (citas.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo registrar la cita' });
        return res.status(200).send({ en: 1, m: 'Cita editada correctamente' });
    }, res);
}

const SQL_EDITAR_CITAS =
    "UPDATE " + process.env._BD_ + ".cita  SET idEspecialidad = ?, idPaciente = ?, idAdministrador = ?, nombre = ?, fraccion = ?, fecha = ?, hora = ? WHERE idCita = ?;";


//ELIMINAR CITA    
router.post('/eliminar-citas', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return eliminarCitas(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function eliminarCitas(req, res) {
    console.log('editar citas');
    console.log(req.body);
    let idAdministrador = req.body.idAdministrador;
    let idCita = req.body.idCita;

    if (!idAdministrador)
        return res.status(400).send({ error: 2, param: 'idAdministrador' });
    if (!idCita)
        return res.status(400).send({ error: 7, param: 'idCita' });

    configuracionMySQL.ejecutarResSQL(SQL_ELIMINAR_CITAS, [idCita], function (citas) {
        if (citas.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo registrar la cita' });
        return res.status(200).send({ en: 1, m: 'Cita eliminada correctamente' });
    }, res);
}

const SQL_ELIMINAR_CITAS =
    "UPDATE " + process.env._BD_ + ".cita  SET habilitado = 0 WHERE idCita = ?;";


module.exports = router;