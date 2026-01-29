import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';
import { pool } from './database'; // <--- Importamos o banco

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);

    // TESTE DE CONEXÃO AO INICIAR
    try {
        const { rows } = await pool.query('SELECT NOW()');
        console.log(`🔌 Database connection test passed: ${rows[0].now}`);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
});