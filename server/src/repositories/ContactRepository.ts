import { pool } from '../database';
import { Contact, CreateContactDTO } from '../types/Contact';

class ContactRepository {
  // Função para criar um novo contato
  async create({ name, email, phone }: CreateContactDTO): Promise<Contact> {
    // $1, $2, $3 são variáveis de segurança (previnem SQL Injection)
    const query = `
      INSERT INTO contacts (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const values = [name, email, phone || null];
    
    const { rows } = await pool.query<Contact>(query, values);
    
    // Retornamos o primeiro item criado (que inclui o ID gerado pelo banco)
    return rows[0];
  }

  // Função para buscar por email (para evitar duplicatas)
  async findByEmail(email: string): Promise<Contact | null> {
    const query = 'SELECT * FROM contacts WHERE email = $1';
    const { rows } = await pool.query<Contact>(query, [email]);
    
    return rows[0] || null;
  }
}

// Exportamos uma instância já pronta para uso
export default new ContactRepository();