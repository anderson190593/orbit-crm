import { Router } from 'express';
import ContactController from './controllers/ContactController';

const router = Router();

// Rota de Teste do Servidor
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// --- ROTAS DO CRUD DE CONTATOS ---
router.get('/contacts', ContactController.index);         // Lista todos os contatos
router.get('/contacts/:id', ContactController.show);      // Traz apenas um contato pelo ID
router.post('/contacts', ContactController.store);        // Cria um novo contato
router.put('/contacts/:id', ContactController.update);    // Atualiza um contato existente
router.delete('/contacts/:id', ContactController.delete); // Deleta um contato

export { router };