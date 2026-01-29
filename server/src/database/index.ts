import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Criamos um "Pool" (piscina) de conexões.
// É mais eficiente que abrir e fechar uma conexão a cada pedido.
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Esse log aparecerá quando o banco conectar com sucesso
pool.on('connect', () => {
    console.log('📦 Database connected successfully!');
});