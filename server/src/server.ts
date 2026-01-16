import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';

// Carrega variáveis de ambiente (se existirem)
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Libera acesso externo
app.use(express.json()); // Permite que o servidor entenda JSON enviado no corpo da requisição

// Rotas
app.use('/api', router); // Todas as rotas começarão com /api

// Definição da porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});