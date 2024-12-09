const itemModel = require('../models/itemModel');

const createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = await itemModel.createItem(name, description);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o item' });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens' });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemModel.getItemById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o item' });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedItem = await itemModel.updateItem(id, name, description);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o item' });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await itemModel.deleteItem(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o item' });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};