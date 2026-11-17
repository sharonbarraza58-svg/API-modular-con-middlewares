const pilotModel = require('../models/pilotModel');
const assignmentModel = require('../models/assignmentModel');
const { HttpError } = require('../utils/errors');

const listar = () => pilotModel.findAll();

const obtener = async (id) => {
  const piloto = await pilotModel.findById(id);
  if (!piloto) throw new HttpError(404, 'Piloto no encontrado');
  return piloto;
};

const validarLicenciaUnica = async (licencia, idActual) => {
  const todos = await pilotModel.findAll();
  if (todos.some((p) => p.licencia === licencia && p.id !== idActual)) {
    throw new HttpError(409, 'Ya existe un piloto con esa licencia');
  }
};

const crear = async (datos) => {
  await validarLicenciaUnica(datos.licencia);
  return pilotModel.create(datos);
};

const actualizar = async (id, datos) => {
  await obtener(id);
  await validarLicenciaUnica(datos.licencia, id);
  return pilotModel.update(id, datos);
};

const eliminar = async (id) => {
  await obtener(id);
  const asignaciones = await assignmentModel.findAll();
  if (asignaciones.some((a) => a.idPiloto === id)) {
    throw new HttpError(409, 'No se puede eliminar: el piloto tiene asignaciones');
  }
  await pilotModel.remove(id);
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
