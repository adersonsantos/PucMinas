const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let filmes = [
    { id: 1, nome: "O Senhor dos Anéis", categoria: "Fantasia" },
    { id: 2, nome: "Matrix", categoria: "Ficção científica" }
];

app.get('/filmes', (req, res) => {
    res.json(filmes);
});

app.get('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);
    
    if (!filme) {
        return res.status(404).json({ message: "Filme não encontrado!" });
    }

    res.json(filme);
});

app.post('/filmes', (req, res) => {
    const { nome, categoria } = req.body;
    
    if (!nome || !categoria) {
        return res.status(400).json({ message: "Nome e categoria são obrigatórios!" });
    }

    const novoFilme = {
        id: filmes.length + 1,
        nome,
        categoria
    };

    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

app.put('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, categoria } = req.body;
    
    const filmeIndex = filmes.findIndex(f => f.id === id);

    if (filmeIndex === -1) {
        return res.status(404).json({ message: "Filme não encontrado!" });
    }

    if (!nome || !categoria) {
        return res.status(400).json({ message: "Nome e categoria são obrigatórios!" });
    }

    filmes[filmeIndex] = { id, nome, categoria };
    res.json(filmes[filmeIndex]);
});

app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const filmeIndex = filmes.findIndex(f => f.id === id);

    if (filmeIndex === -1) {
        return res.status(404).json({ message: "Filme não encontrado!" });
    }

    filmes.splice(filmeIndex, 1);
    res.status(204).send();  // No content
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
