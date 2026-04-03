import { Request, Response } from 'express';
import ContactRepository from '../repositories/ContactRepository';

class ContactController {
  // --- CREATE ---
  async store(req: Request, res: Response) {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);
    if (contactExists) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactRepository.create({ name, email, phone });
    return res.status(201).json(contact);
  }

  // --- READ (Listar Todos) ---
  async index(req: Request, res: Response) {
    const contacts = await ContactRepository.findAll();
    return res.json(contacts);
  }

  // --- READ (Mostrar um específico) ---
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.json(contact);
  }

  // --- UPDATE ---
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (email && email !== contactExists.email) {
      const emailInUse = await ContactRepository.findByEmail(email);
      if (emailInUse) {
        return res.status(400).json({ error: 'This email is already in use' });
      }
    }

    const contact = await ContactRepository.update(id, {
      name: name || contactExists.name,
      email: email || contactExists.email,
      phone: phone !== undefined ? phone : contactExists.phone,
    });

    return res.json(contact);
  }

  // --- DELETE ---
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);
    return res.sendStatus(204); 
  }
}

export default new ContactController();