const assignmentModel = require('../models/assignmentModel');
const pilotModel = require('../models/pilotModel');
const airplaneModel = require('../models/airplaneModel');
const { HttpError } = require('../utils/errors');

const listar = () => assignmentModel.findAll();

const obtener = async (id) => {
  const asignacion = await assignmentModel.findById(id);
  if (!asignacion) throw new HttpError(404, 'Asignación no encontrada');
  return asignacion;
};

// Validación relacional: el piloto y el avión deben existir
const validarRelaciones = async ({ idPiloto, idAvion }) => {
  if (!(await pilotModel.findById(idPiloto))) {
    throw new HttpError(400, `El piloto con id ${idPiloto} no existe`);
  }
  if (!(await airplaneModel.findById(idAvion))) {
    throw new HttpError(400, `El avión con id ${idAvion} no existe`);
  }
};

const crear = async (datos) => {
  await validarRelaciones(datos);
  return assignmentModel.create(datos);
};

const actualizar = async (id, datos) => {
  await obtener(id);
  await validarRelaciones(datos);
  return assignmentModel.update(id, datos);
};

const eliminar = async (id) => {
  await obtener(id);
  await assignmentModel.remove(id);
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
