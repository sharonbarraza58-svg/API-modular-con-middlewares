const express = require('express');
const logger = require('./middlewares/logger');
const pilotRoutes = require('./routes/pilotRoutes');
const airplaneRoutes = require('./routes/airplaneRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/pilotos', pilotRoutes);
app.use('/aviones', airplaneRoutes);
app.use('/asignaciones', assignmentRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Aerolínea', rutas: ['/pilotos', '/aviones', '/asignaciones'] });
});

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err, req, res, next) => {
  const status = err.status || (err.type === 'entity.parse.failed' ? 400 : 500);
  res.status(status).json({ error: status === 400 ? 'JSON inválido' : 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
}

module.exports = app;
