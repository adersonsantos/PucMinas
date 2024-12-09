const express = require('express');
const ProdutoController = require('../controllers/produtoController');

const router = express.Router();

router.get('/produtos', ProdutoController.getAll);
router.post('/produtos', ProdutoController.create);
router.put('/produtos/:id', ProdutoController.update);
router.delete('/produtos/:id', ProdutoController.delete);

module.exports = router;
