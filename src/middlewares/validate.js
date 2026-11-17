const validadores = {
  texto: (v) => typeof v === 'string' && v.trim() !== '',
  numero: (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0,
  entero: (v) => Number.isInteger(v) && v > 0,
  fecha: (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(Date.parse(v)),
};

const validarBody = (esquema) => (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'El cuerpo de la petición debe ser un objeto JSON' });
  }
  const errores = [];
  const limpio = {};
  for (const [campo, tipo] of Object.entries(esquema)) {
    if (body[campo] === undefined) errores.push(`El campo "${campo}" es obligatorio`);
    else if (!validadores[tipo](body[campo])) errores.push(`El campo "${campo}" no es válido (se espera ${tipo})`);
    else limpio[campo] = typeof body[campo] === 'string' ? body[campo].trim() : body[campo];
  }
  if (errores.length) return res.status(400).json({ errores });
  req.body = limpio; 
  next();
};

const validarId = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'El id debe ser un entero positivo' });
  }
  req.params.id = id;
  next();
};

module.exports = { validarBody, validarId };
