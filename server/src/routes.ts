import { Router, Request, Response } from 'express';

const router = Router();

// Rota de Health Check (Para sabermos se o servidor está vivo)
router.get('/health', (req: Request, res: Response) => {
    // Retornamos um JSON com status e timestamp
    res.json({ 
        status: 'ok', 
        message: 'Orbit CRM Server is running!',
        timestamp: new Date() 
    });
});

export { router };