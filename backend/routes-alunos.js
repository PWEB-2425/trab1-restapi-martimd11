const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alunoController');

router.get('/', ctrl.getAlunos);
router.post('/', ctrl.criarAluno);
router.put('/:id', ctrl.atualizarAluno);
router.delete('/:id', ctrl.apagarAluno);

module.exports = router;
