import { useEffect, useState } from 'react';
import { UserPlus, Mail, Phone, Calendar } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/contacts')
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Contatos</h1>
          <p className="text-slate-500 mt-1">Gerencie a pipeline de leads e clientes da sua empresa.</p>
        </div>
        <button className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-sm shadow-sm cursor-pointer">
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Contato
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Carregando contatos...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Criado em</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{contact.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400"/> {contact.email}</span>
                      <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400"/> {contact.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center text-xs">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {/* O método toLocaleDateString transforma o padrão ISO em uma data amigável */}
                      {new Date(contact.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800 mr-4 cursor-pointer">Editar</button>
                    <button className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer">Excluir</button>
                  </td>
                </tr>
              ))}
              
              {/* Fallback de UX: O que mostrar se não houver dados? */}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                    Nenhum cliente cadastrado no momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}