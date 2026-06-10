import { Users, LayoutDashboard, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      {/* Logotipo / Nome da Empresa */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-xl">O</span>
        </div>
        <span className="text-white font-bold text-lg tracking-wide">Orbit CRM</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <a href="#" className="flex items-center px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl transition-colors">
          <LayoutDashboard className="w-5 h-5 mr-3" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Users className="w-5 h-5 mr-3" />
          <span className="font-medium">Contatos</span>
        </a>
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="p-4 border-t border-slate-800">
        <a href="#" className="flex items-center px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Configurações</span>
        </a>
      </div>
    </aside>
  );
}