const Produto = require('../models/produto');

// Buscar todos os produtos
exports.getAll = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo produto
exports.create = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar um produto
exports.update = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    await produto.update(req.body);
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar um produto
exports.delete = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    await produto.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
