const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

let usuarios = [];

const handler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        if (parsedUrl.pathname === '/usuarios' && req.method === 'GET') {
            res.end(JSON.stringify({ usuarios }));
        } else if (parsedUrl.pathname === '/usuarios' && req.method === 'POST') {
            const usuario = JSON.parse(buffer);
            if (usuario && usuario.nome) {
                usuarios.push(usuario);
                res.statusCode = 201;
                res.end(JSON.stringify({ mensagem: 'Usuário adicionado com sucesso!' }));
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ mensagem: 'Nome do usuário é obrigatório!' }));
            }
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ mensagem: 'Rota não encontrada!' }));
        }
    });
};

const server = http.createServer(handler);

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
