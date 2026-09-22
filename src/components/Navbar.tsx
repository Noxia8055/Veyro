import { useState } from 'react';
import { 
  Briefcase, 
  Video, 
  Menu, 
  X,
  ChevronDown,
  Sparkles,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CurrentUser, UserRole } from '../types';
import { VeyroLogo } from './VeyroLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
  currentUser: CurrentUser;
  onSwitchUserRole: (role: UserRole) => void;
  onOpenCreateDeal: () => void;
  onOpenAuth: () => void;
}

export function Navbar({
  currentView,
  onNavigate,
  currentUser,
  onSwitchUserRole,
  onOpenCreateDeal,
  onOpenAuth,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Mark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <img
                src="/image.png"
                alt="VEYRO"
                className="h-9 w-auto max-w-[170px] object-contain object-left select-none transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-slate-200">
              <button
                onClick={() => onNavigate('overview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  currentView === 'overview'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => onNavigate('deals')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  currentView === 'deals'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Deals
              </button>

              <button
                onClick={() => onNavigate('escrow')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  currentView === 'escrow' || currentView === 'payouts'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Escrow & Payouts
              </button>

              <button
                onClick={() => onNavigate('creators')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  currentView === 'creators'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Creators
              </button>

              <button
                onClick={() => onNavigate('landing')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  currentView === 'landing'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Public Site
              </button>
            </nav>
          </div>

          {/* Right Controls: Role Switcher, CTAs & User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="capitalize">{currentUser.role} Role</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Test Persona
                  </div>

                  <button
                    onClick={() => {
                      onSwitchUserRole('brand');
                      onNavigate('overview');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      currentUser.role === 'brand' ? 'font-semibold text-slate-900 bg-slate-50' : 'text-slate-600'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">Brand (Alex Carter)</span>
                      <span className="text-[10px] text-slate-400">Campaign Escrow & Release</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSwitchUserRole('creator');
                      onNavigate('creator');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      currentUser.role === 'creator' ? 'font-semibold text-slate-900 bg-slate-50' : 'text-slate-600'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">Creator (Sarah Jenkins)</span>
                      <span className="text-[10px] text-slate-400">Co-Sign & Submit Video</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSwitchUserRole('manager');
                      onNavigate('escrow');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      currentUser.role === 'manager' ? 'font-semibold text-slate-900 bg-slate-50' : 'text-slate-600'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">Manager (Apex Agency)</span>
                      <span className="text-[10px] text-slate-400">Audit 15% Transparent Cut</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Create Deal Button */}
            <button
              onClick={onOpenCreateDeal}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-2xs hover:shadow"
            >
              + Create Deal
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                onNavigate('overview');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 font-semibold text-xs text-left"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                onNavigate('deals');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 font-semibold text-xs text-left"
            >
              Deals
            </button>
            <button
              onClick={() => {
                onNavigate('escrow');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 font-semibold text-xs text-left"
            >
              Escrow & Payouts
            </button>
            <button
              onClick={() => {
                onNavigate('creators');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 font-semibold text-xs text-left"
            >
              Creators
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenCreateDeal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl shadow-xs text-center"
            >
              + Create Sponsorship Deal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
