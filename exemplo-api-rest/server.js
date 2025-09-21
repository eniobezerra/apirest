// server.js

// Importa o Express
const express = require('express');

// Cria uma aplicação Express
const app = express();
const PORT = 3000;

// Habilita o uso de JSON no corpo das requisições
app.use(express.json());

// Dados simulados (em memória)
let livros = [
    { id: 1, titulo: '1984', autor: 'George Orwell' },
    { id: 2, titulo: 'O Sol é Para Todos', autor: 'Harper Lee' }
];

// --- Rotas da API ---

// GET: Retorna todos os livros
app.get('/livros', (req, res) => {
    res.json(livros);
});

// GET: Retorna um livro específico por ID
app.get('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) {
        return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    res.json(livro);
});

// POST: Adiciona um novo livro
app.post('/livros', (req, res) => {
    const novoLivro = {
        id: livros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor
    };
    if (!novoLivro.titulo || !novoLivro.autor) {
        return res.status(400).json({ mensagem: 'Título e autor são obrigatórios' });
    }
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// PUT: Atualiza um livro existente
app.put('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) {
        return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    livro.titulo = req.body.titulo || livro.titulo;
    livro.autor = req.body.autor || livro.autor;
    res.json(livro);
});

// DELETE: Remove um livro por ID
app.delete('/livros/:id', (req, res) => {
    const livroIndex = livros.findIndex(l => l.id === parseInt(req.params.id));
    if (livroIndex === -1) {
        return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
    livros.splice(livroIndex, 1);
    res.status(204).send(); // 204 indica sucesso sem conteúdo
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
