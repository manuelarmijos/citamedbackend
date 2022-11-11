const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

//configuracion .env
require('dotenv').config();

//Cofiguraciones de servidor
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false, parameterLimit: 50 }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let oneof = false
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    oneof = true;
  }
  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }
  return next();
});

//Rutas
var login = require('./source/res/administrador/login.js');
var modulos = require('./source/res/administrador/modulos.js');
var especialidades = require('./source/res/especialidades/especialidades.js');
var citas = require('./source/res/citas/citas.js');
var administrador = require('./source/res/administrador/administrador.js');
var roles = require('./source/res/roles/roles.js');
var pacientes = require('./source/res/pacientes/pacientes.js');
//var gamificacion = require('./source/gamificacion/gamificacion.js');

app.get('/', (req, res) => {
  res.send('Hola mundo !') //
})

app.use('/administrador/login', login);
app.use('/administrador/modulos', modulos);
app.use('/administrador/', administrador);
app.use('/especialidades/', especialidades);
app.use('/citas/', citas);
app.use('/roles/', roles);
app.use('/pacientes/', pacientes);

const server = app.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`SERVIDOR CORRIENDO PUERTO: ${port}`);
});

module.exports = { app, server };
