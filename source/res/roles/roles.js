var router = require('express').Router();
var configuracionMySQL = require('../../config/config');


router.post('/combo-roles', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerComboRoles(req, res);
    return res.status(320).send({
        en: -1,
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerComboRoles(req, res) {
    configuracionMySQL.ejecutarResSQL(SQL_OBTENER_COMBO_ROLES, [], function (roles) {
        if (roles.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo obtener las especialidades' });
        return res.status(200).send({ en: 1, roles: roles });
    }, res);
}

const SQL_OBTENER_COMBO_ROLES =
    "SELECT idRol, rol FROM   " + process.env._BD_ + ".rol where habilitado = 1;";

module.exports = router;