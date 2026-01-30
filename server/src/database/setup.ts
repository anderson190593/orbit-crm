import { pool } from './index';
import fs from 'fs';
import path from 'path';

async function setup() {
  try {
    console.log('⏳ Iniciando criação das tabelas...');

    // Lê o arquivo SQL que está na mesma pasta
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Executa o SQL no banco
    await pool.query(schemaSql);

    console.log('✅ Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
  } finally {
    // Fecha a conexão para liberar o terminal
    await pool.end();
  }
}

setup();