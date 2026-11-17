const { crearControlador } = require('./crudController');
const servicio = require('../services/pilotService');

module.exports = crearControlador(servicio);
