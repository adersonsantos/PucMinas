const express = require('express');
const sequelize = require('./db');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
app.use(express.json());

app.use('/api', produtoRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('API rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados', err);
  });
