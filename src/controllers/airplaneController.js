const { crearControlador } = require('./crudController');
const servicio = require('../services/airplaneService');

module.exports = crearControlador(servicio);
