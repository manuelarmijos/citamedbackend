var router = require('express').Router();
var configuracionMySQL = require('../../config/config');


router.post('/combo-especialidades', (req, res) => {
    const version = req.headers.version;
    if (version === '1.0.0')
        return obtenerComboEspecialidades(req, res);
    return res.status(320).send({
        en: -1,
        m: process.env.MENSAJE_DEPRECATE
    });
});

function obtenerComboEspecialidades(req, res) {
    configuracionMySQL.ejecutarResSQL(SQL_OBTENER_COMBO_ESPECIALIDADES, [], function (especialidades) {
        if (especialidades.length <= 0)
            return res.status(200).send({ en: -1, m: 'No se pudo obtener las especialidades' });
        return res.status(200).send({ en: 1, especialidades: especialidades });
    }, res);
}

const SQL_OBTENER_COMBO_ESPECIALIDADES =
    "SELECT idEspecialidad, nombre, color FROM  " + process.env._BD_ + ".especialidad WHERE habilitado = 1;";

module.exports = router;