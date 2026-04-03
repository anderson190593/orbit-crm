import { pool } from '../database';
import { Contact, CreateContactDTO } from '../types/Contact';

class ContactRepository {
  // --- CREATE (Criar) ---
  async create({ name, email, phone }: CreateContactDTO): Promise<Contact> {
    const query = `
      INSERT INTO contacts (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [name, email, phone || null];
    const { rows } = await pool.query<Contact>(query, values);
    return rows[0];
  }

  // --- READ (Buscar por Email - Regra de Negócio) ---
  async findByEmail(email: string): Promise<Contact | null> {
    const query = 'SELECT * FROM contacts WHERE email = $1';
    const { rows } = await pool.query<Contact>(query, [email]);
    return rows[0] || null;
  }

  // --- READ (Listar Todos) ---
  async findAll(): Promise<Contact[]> {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const { rows } = await pool.query<Contact>(query);
    return rows;
  }

  // --- READ (Buscar um específico pelo ID) ---
  async findById(id: string): Promise<Contact | null> {
    const query = 'SELECT * FROM contacts WHERE id = $1';
    const { rows } = await pool.query<Contact>(query, [id]);
    return rows[0] || null;
  }

  // --- UPDATE (Atualizar) ---
  async update(id: string, { name, email, phone }: Partial<CreateContactDTO>): Promise<Contact> {
    const query = `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [name, email, phone || null, id];
    const { rows } = await pool.query<Contact>(query, values);
    return rows[0];
  }

  // --- DELETE (Deletar) ---
  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM contacts WHERE id = $1';
    await pool.query(query, [id]);
  }
}

export default new ContactRepository();