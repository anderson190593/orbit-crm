import { Request, Response } from 'express';
import ContactRepository from '../repositories/ContactRepository';

class ContactController {
  // Método que lida com a requisição de criação
  async store(req: Request, res: Response) {
    const { name, email, phone } = req.body;

    // 1. Validação Básica
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // 2. Regra de Negócio: Não permitir emails duplicados
    const contactExists = await ContactRepository.findByEmail(email);
    if (contactExists) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    // 3. Chamada ao Repositório para criar
    const contact = await ContactRepository.create({
      name,
      email,
      phone,
    });

    // 4. Resposta (201 = Created)
    return res.status(201).json(contact);
  }
}

// Singleton: Exportamos uma instância única
export default new ContactController();