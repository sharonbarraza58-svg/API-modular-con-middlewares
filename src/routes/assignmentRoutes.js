const { Router } = require('express');
const controller = require('../controllers/assignmentController');
const { validarBody, validarId } = require('../middlewares/validate');

const router = Router();
const esquema = { idPiloto: 'entero', idAvion: 'entero', fechaVuelo: 'fecha', rutaAsignada: 'texto' };

router.get('/', controller.getAll);
router.get('/:id', validarId, controller.getById);
router.post('/', validarBody(esquema), controller.create);
router.put('/:id', validarId, validarBody(esquema), controller.update);
router.delete('/:id', validarId, controller.remove);

module.exports = router;
