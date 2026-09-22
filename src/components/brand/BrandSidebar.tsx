import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  Building2,
  Lock,
  Wallet,
  Coins
} from 'lucide-react';
import { VeyroLogo } from '../VeyroLogo';
import { CurrentUser, BrandNavTab } from '../../types';

interface BrandSidebarProps {
  activeTab: BrandNavTab;
  onSelectTab: (tab: BrandNavTab) => void;
  currentUser: CurrentUser;
  onOpenCreateDeal: () => void;
  onSwitchRole: (role: 'brand' | 'creator' | 'manager') => void;
}

export function BrandSidebar({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenCreateDeal,
  onSwitchRole,
}: BrandSidebarProps) {
  const navItems = [
    { id: 'brand_dashboard' as const, label: 'Campaign Dashboard', icon: LayoutDashboard },
    { id: 'brand_create' as const, label: 'Create Campaign', icon: PlusCircle, isAction: true },
    { id: 'brand_discovery' as const, label: 'Talent & Roster Discovery', icon: Search },
    { id: 'brand_audits' as const, label: 'Active Audits & Proofs', icon: ShieldCheck },
    { id: 'brand_roas' as const, label: 'ROAS & Analytics', icon: BarChart3 },
    { id: 'brand_settings' as const, label: 'Brand Settings', icon: Settings },
  ];

  const handleNavClick = (item: typeof navItems[number]) => {
    if ('isAction' in item && item.isAction) {
      onOpenCreateDeal();
    } else {
      onSelectTab(item.id);
    }
  };

  return (
    <aside className="w-16 md:w-64 shrink-0 bg-white border-r border-[#E2E8F0] min-h-screen sticky top-0 h-screen overflow-y-auto z-20 flex flex-col justify-between p-2.5 md:p-5 select-none transition-all duration-200">
      <div className="space-y-4 md:space-y-6">
        {/* Brand Header Logo */}
        <div 
          onClick={() => onSelectTab('brand_dashboard')}
          className="cursor-pointer group flex items-center justify-center md:justify-start px-2 md:px-2.5 py-1.5 transition-opacity hover:opacity-90"
          title="SponsorShield Max - Brand Operations"
        >
          <div className="hidden md:flex items-center min-h-[40px]">
            <VeyroLogo size="md" />
          </div>
          <div className="md:hidden flex items-center justify-center">
            <VeyroLogo size="sm" showWordmark={false} />
          </div>
        </div>

        {/* Brand Role Indicator Pill */}
        <div className="hidden md:block p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Active Environment
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white font-mono">
              BRAND
            </span>
          </div>
          <p className="text-xs font-bold text-[#0F172A] truncate">
            {currentUser.organization || 'Veyro Media'}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span className="font-mono text-[10px]">Aave V3 Escrow Active</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isAction = 'isAction' in item && item.isAction;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : isAction
                    ? 'text-slate-800 bg-slate-100 hover:bg-slate-200/80 font-bold border border-[#E2E8F0]'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100/80'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-white'
                      : isAction
                      ? 'text-slate-900'
                      : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                />
                <span className="hidden md:block truncate">{item.label}</span>
                {isAction && (
                  <span className="hidden md:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-900 font-bold border border-slate-200">
                    +DEAL
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Switcher Hint */}
      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center gap-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
          />
          <div className="hidden md:block min-w-0 text-left">
            <span className="text-xs font-bold text-slate-900 block truncate">{currentUser.name}</span>
            <span className="text-[10px] text-slate-400 block truncate">Marketing Director</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>SponsorShield Max</span>
          <span>v3.0 • Mainnet</span>
        </div>
      </div>
    </aside>
  );
}
