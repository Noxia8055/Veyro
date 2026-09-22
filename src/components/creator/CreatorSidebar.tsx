import React from 'react';
import { 
  Home, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Wallet, 
  Settings, 
  CheckCircle2, 
  Lock,
  Layers,
  Award
} from 'lucide-react';
import { VeyroLogo } from '../VeyroLogo';
import { CurrentUser, CreatorNavTab } from '../../types';

interface CreatorSidebarProps {
  activeTab: CreatorNavTab;
  onSelectTab: (tab: CreatorNavTab) => void;
  currentUser: CurrentUser;
  onSwitchRole: (role: 'brand' | 'creator' | 'manager') => void;
  pendingCoSignsCount?: number;
}

export function CreatorSidebar({
  activeTab,
  onSelectTab,
  currentUser,
  onSwitchRole,
  pendingCoSignsCount = 1,
}: CreatorSidebarProps) {
  const navItems = [
    { id: 'creator_home' as const, label: 'Creator Home', icon: Home },
    { id: 'creator_marketplace' as const, label: 'Deal Hub & Marketplace', icon: Target, badge: pendingCoSignsCount > 0 ? pendingCoSignsCount : undefined },
    { id: 'creator_audit' as const, label: 'Gross Budget Audit', icon: ShieldCheck },
    { id: 'creator_checker' as const, label: 'AI Brief Pre-Checker', icon: Sparkles },
    { id: 'creator_trends' as const, label: 'Country & Niche Trends', icon: TrendingUp },
    { id: 'creator_wallet' as const, label: 'My Wallet & Settlements', icon: Wallet },
    { id: 'creator_settings' as const, label: 'Creator Settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-64 shrink-0 bg-white border-r border-[#E2E8F0] min-h-screen sticky top-0 h-screen overflow-y-auto z-20 flex flex-col justify-between p-2.5 md:p-5 select-none transition-all duration-200">
      <div className="space-y-4 md:space-y-6">
        {/* Creator Header Logo */}
        <div 
          onClick={() => onSelectTab('creator_home')}
          className="cursor-pointer group flex items-center justify-center md:justify-start px-2 md:px-2.5 py-1.5 transition-opacity hover:opacity-90"
          title="SponsorShield Max - Creator Monetization"
        >
          <div className="hidden md:flex items-center min-h-[40px]">
            <VeyroLogo size="md" />
          </div>
          <div className="md:hidden flex items-center justify-center">
            <VeyroLogo size="sm" showWordmark={false} />
          </div>
        </div>

        {/* Creator Role Indicator Card */}
        <div className="hidden md:block p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              Talent Portal
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white font-mono">
              CREATOR
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900 truncate">
            {currentUser.handle || '@sarahcreates'}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-0.5 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span className="font-mono text-[10px]">Guaranteed 85% Escrow</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100/80'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'
                  }`}
                />
                <span className="hidden md:block truncate">{item.label}</span>
                {item.badge && (
                  <span className={`hidden md:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Settlements */}
      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center gap-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
          />
          <div className="hidden md:block min-w-0 text-left">
            <span className="text-xs font-bold text-slate-900 block truncate">{currentUser.name}</span>
            <span className="text-[10px] text-emerald-700 font-semibold block truncate">Verified Creator</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Net-0 Instant Payouts</span>
          <span>zk-Privacy: Ready</span>
        </div>
      </div>
    </aside>
  );
}
