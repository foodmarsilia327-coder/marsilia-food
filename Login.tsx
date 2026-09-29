import { useState } from 'react';
import { supabase, type Utilisateur } from '@/lib/supabase';
import { UtensilsCrossed, Lock, AlertCircle } from 'lucide-react';

export type Role = 'admin' | 'serveur' | 'cuisine' | 'caisse';

export const ROLE_NAMES: Record<Role, string> = {
  admin: 'Administrateur',
  serveur: 'Serveur',
  cuisine: 'Cuisine',
  caisse: 'Caisse',
};

export default function Login({ onLogin }: { onLogin: (user: Utilisateur) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError('Veuillez entrer un code');
      return;
    }
    const { data } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('code', code)
      .eq('actif', true)
      .maybeSingle();

    if (data) {
      setError('');
      onLogin(data as Utilisateur);
    } else {
      setError('Code incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] mb-4 shadow-lg shadow-orange-500/20">
            <UtensilsCrossed className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Marsilia Food</h1>
          <p className="text-gray-500 mt-1 text-sm">Système de gestion restaurant</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-2xl p-6 shadow-xl border border-gray-800">
          <label className="block text-sm font-medium text-gray-400 mb-2">Code d'accès</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="password"
              inputMode="numeric"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Entrez votre code"
              className="w-full bg-[#0A0A0A] text-white text-center text-2xl tracking-[0.5em] font-bold rounded-xl py-4 pl-12 pr-4 border border-gray-700 focus:border-[#FF6B00] focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-[#FF6B00] hover:bg-[#FF7A1A] text-white font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.98]"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
