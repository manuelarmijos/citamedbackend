var router = require('express').Router();
var configuracionMySQL = require('../../config/config');


router.post('/obtener-modulos', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerModulos(req, res);
    return res.status(320).send({
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerModulos(req, res) {
    const idPlataforma = req.body.idPlataforma;
    let idAdministrador = req.body.idAdministrador;

    if (!idAdministrador)
        return res.status(200).send({ error: 1, m: 'idAdministrador' });
    if (!idPlataforma)
        return res.status(400).send({ error: 3, param: 'idPlataforma' });

    configuracionMySQL.ejecutarResSQL(SQL_OBETENER_MODULOS, [idAdministrador], function (modulos) {
        if (modulos.length <= 0)
            return res.status(200).send({ en: -1, m: 'No posee modulos asignados, contactarse con el administrador' });
        return res.status(200).send({ en: 1, modulos: modulos });
    }, res);
}

const SQL_OBETENER_MODULOS =
    "SELECT m.idModulo, m.modulo, m.vista, m.orden, m.icono FROM " + process.env._BD_ + ".modulo_rol mra  INNER JOIN " + process.env._BD_ + ".administrador_rol ar ON ar.idRol = mra.idRol AND ar.idAdministrador = ? AND ar.habilitado = 1 INNER JOIN " + process.env._BD_ + ".modulo m ON mra.idModulo = m.idModulo AND m.habilitado = 1 GROUP BY mra.idModulo ORDER BY m.modulo, m.orden ASC;";

module.exports = router;