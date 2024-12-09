const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes');

app.use(express.json());
app.use('/api/items', itemRoutes);

app.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});