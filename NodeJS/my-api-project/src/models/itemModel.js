const db = require('../db/database');

const createItem = (name, description) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO items (name, description) VALUES (?, ?)";
    db.run(sql, [name, description], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, description });
      }
    });
  });
};

const getAllItems = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM items";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getItemById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM items WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const updateItem = (id, name, description) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE items SET name = ?, description = ? WHERE id = ?";
    db.run(sql, [name, description, id], function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve(null);
        } else {
          resolve({ id, name, description });
        }
      }
    });
  });
};

const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM items WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes > 0);
      }
    });
  });
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};