var router = require('express').Router();
var configuracionMySQL = require('../../config/config');


router.post('/autenticar', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return autenticar(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function autenticar(req, res) {
    console.log('Dentro de login')
    let usuario = req.body.usuario;
    let clave = req.body.clave;

    if (!usuario)
        return res.status(400).send({ error: 1, param: 'usuario' });
    if (!clave)
        return res.status(400).send({ error: 2, param: 'clave' });

    configuracionMySQL.ejecutarResSQL(SQL_AUTENTICAR, [usuario, usuario, usuario, clave, process.env.SECRETMD5KEY], async (usuarios) => {
        if (usuarios.length <= 0)
            return res.status(200).send({ en: -1, m: 'Usuario y/o Contraseña incorrectos.' });
        if (usuarios[0].estado == 1)
            return res.status(200).send({ en: -1, m: 'Usuario bloquedo. Comuniquese con el administrador.' });
        configuracionMySQL.ejecutarResSQL(SQL_OBETENER_ROLES, [usuarios[0]['idAdministrador']], function (roles) {
            if (roles.length <= 0)
                return res.status(200).send({ en: -1, m: 'No posee roles asignados' });
            return res.status(200).send({ en: 1, usuario: usuarios[0], roles: roles });
        }, res);
    }, res);
}

const SQL_AUTENTICAR =
    "SELECT a.idAdministrador, a.usuario, a.nombres, a.apellidos, a.correo, a.celular, a.imagen, a.estado, a.habilitado, a.fechaRegistro FROM " +
    process.env._BD_ + ".administrador a WHERE (a.usuario = ? OR a.correo = ? OR a.cedula = ?) AND a.contrasenia = MD5(CONCAT(?, ?)) LIMIT 1;";

const SQL_OBETENER_ROLES =
    "SELECT r.idRol, r.rol FROM " + process.env._BD_ + ".administrador_rol ar INNER JOIN " + process.env._BD_ + ".rol r ON ar.idRol = r.idRol AND r.habilitado = 1 WHERE ar.idAdministrador = ?;";

module.exports = router;