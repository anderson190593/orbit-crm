// Define o formato exato que um Contato tem no banco
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: Date;
}

// Define o que precisamos receber para criar um novo (o ID e a Data o banco gera)
export interface CreateContactDTO {
  name: string;
  email: string;
  phone?: string;
}