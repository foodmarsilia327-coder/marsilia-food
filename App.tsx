import { useState, useEffect } from 'react';
import Login, { type Role, ROLE_NAMES } from '@/components/Login';
import Admin from '@/components/Admin';
import Serveur from '@/components/Serveur';
import Cuisine from '@/components/Cuisine';
import Caisse from '@/components/Caisse';
import { supabase, type Utilisateur } from '@/lib/supabase';
import { LogOut } from 'lucide-react';

const STORAGE_KEY = 'marsilia_user';

export default function App() {
  const [user, setUser] = useState<Utilisateur | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleLogin = (u: Utilisateur) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const role = user.role as Role;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur border-b border-gray-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <span className="text-white font-bold text-sm">Marsilia Food</span>
            <span className="text-gray-500 text-xs ml-2 hidden sm:inline">
              {user.nom} · {ROLE_NAMES[role]}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </header>

      <main className="pt-14">
        {role === 'admin' && <Admin />}
        {role === 'serveur' && <Serveur serveurNom={user.nom} />}
        {role === 'cuisine' && <Cuisine />}
        {role === 'caisse' && <Caisse />}
      </main>
    </div>
  );
}
