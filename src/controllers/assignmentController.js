const { crearControlador } = require('./crudController');
const servicio = require('../services/assignmentService');

module.exports = crearControlador(servicio);
