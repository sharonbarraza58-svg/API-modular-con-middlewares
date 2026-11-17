const airplaneModel = require('../models/airplaneModel');
const assignmentModel = require('../models/assignmentModel');
const { HttpError } = require('../utils/errors');

const listar = () => airplaneModel.findAll();

const obtener = async (id) => {
  const avion = await airplaneModel.findById(id);
  if (!avion) throw new HttpError(404, 'Avión no encontrado');
  return avion;
};

const validarMatriculaUnica = async (matricula, idActual) => {
  const todos = await airplaneModel.findAll();
  if (todos.some((a) => a.matricula === matricula && a.id !== idActual)) {
    throw new HttpError(409, 'Ya existe un avión con esa matrícula');
  }
};

const crear = async (datos) => {
  await validarMatriculaUnica(datos.matricula);
  return airplaneModel.create(datos);
};

const actualizar = async (id, datos) => {
  await obtener(id);
  await validarMatriculaUnica(datos.matricula, id);
  return airplaneModel.update(id, datos);
};

const eliminar = async (id) => {
  await obtener(id);
  const asignaciones = await assignmentModel.findAll();
  if (asignaciones.some((a) => a.idAvion === id)) {
    throw new HttpError(409, 'No se puede eliminar: el avión tiene asignaciones');
  }
  await airplaneModel.remove(id);
};

module.exports = { listar, obtener, crear, actualizar, eliminar };
