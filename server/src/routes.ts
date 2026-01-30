import { Router } from 'express';
import ContactController from './controllers/ContactController';

const router = Router();

// Rota de Health Check (Mantenha se quiser)
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Rotas de Contatos
router.post('/contacts', ContactController.store);

export { router };