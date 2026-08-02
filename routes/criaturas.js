const express = require('express');
const router = express.Router();
const {
    getCriaturas,
    getCriaturaById,
    createCriatura,
    updateCriatura,
    deleteCriatura
} = require('../controllers/criaturas.controller');

// Las rutas ahora solo llaman a la función correspondiente del controlador:
router.get('/', getCriaturas);
router.get('/:id', getCriaturaById);
router.post('/', createCriatura);
router.put('/:id', updateCriatura);
router.delete('/:id', deleteCriatura);

module.exports = router;