const { Router } = require('express');
const controller = require('../controllers/airplaneController');
const { validarBody, validarId } = require('../middlewares/validate');

const router = Router();
const esquema = { modelo: 'texto', matricula: 'texto', capacidadMaxima: 'entero', fabricante: 'texto' };

router.get('/', controller.getAll);
router.get('/:id', validarId, controller.getById);
router.post('/', validarBody(esquema), controller.create);
router.put('/:id', validarId, validarBody(esquema), controller.update);
router.delete('/:id', validarId, controller.remove);

module.exports = router;
