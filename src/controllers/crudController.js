const crearControlador = (servicio) => {
  const manejar = (accion, status = 200) => async (req, res) => {
    try {
      const resultado = await accion(req);
      if (resultado === undefined) return res.status(204).send();
      return res.status(status).json(resultado);
    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  };

  return {
    getAll: manejar(() => servicio.listar()),
    getById: manejar((req) => servicio.obtener(req.params.id)),
    create: manejar((req) => servicio.crear(req.body), 201),
    update: manejar((req) => servicio.actualizar(req.params.id, req.body)),
    remove: manejar((req) => servicio.eliminar(req.params.id)),
  };
};

module.exports = { crearControlador };
