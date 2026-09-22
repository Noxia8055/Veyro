import { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Video, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Lock,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export function AuthModal({ onClose, onSelectRole }: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<UserRole>('brand');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoSignIn = (selectedRole: UserRole) => {
    onSelectRole(selectedRole);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-900">
              VEYRO Access
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* Quick Demo Presets */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
              1-Click Demo Presets
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleDemoSignIn('brand')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold">
                    B
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Sign In as AuraLabs (Brand)</span>
                    <span className="text-[10px] text-slate-500">Fund escrows & review creator proofs</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('creator')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">
                    C
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Sign In as Alex Vance (Creator)</span>
                    <span className="text-[10px] text-slate-500">Co-sign deals & submit YouTube deliverables</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('manager')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-slate-700 text-white flex items-center justify-center font-bold">
                    M
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Sign In as Apex Talent (Manager)</span>
                    <span className="text-[10px] text-slate-500">Oversee 15% agency split allocations</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-2 text-[10px] uppercase font-mono text-slate-400">or manual login</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('brand')}
                  className={`py-2 rounded border text-center font-medium transition-all ${
                    role === 'brand' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Brand / Sponsor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`py-2 rounded border text-center font-medium transition-all ${
                    role === 'creator' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Creator / Talent
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md shadow-xs transition-colors"
            >
              Sign In to Workspace
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
