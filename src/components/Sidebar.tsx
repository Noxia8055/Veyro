import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  Shield, 
  Wallet, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { VeyroLogo, VeyroWatermark } from './VeyroLogo';
import { CurrentUser } from '../types';

export type DashboardNavTab = 
  | 'overview' 
  | 'deals' 
  | 'create_deal' 
  | 'escrow' 
  | 'payouts' 
  | 'creators' 
  | 'analytics' 
  | 'settings'
  | 'creator_workspace'
  | 'creator_marketplace'
  | 'creator_trends'
  | 'creator_checker'
  | 'creator_settlement';

interface SidebarProps {
  activeTab: DashboardNavTab;
  onSelectTab: (tab: DashboardNavTab) => void;
  currentUser: CurrentUser;
  onOpenCreateDeal: () => void;
  onSwitchRole?: (role: 'brand' | 'creator' | 'manager') => void;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenCreateDeal,
  onSwitchRole,
}: SidebarProps) {
  const isCreator = currentUser.role === 'creator';

  const brandNavItems = [
    { id: 'overview' as const, label: 'Overview & Vault', icon: LayoutDashboard },
    { id: 'deals' as const, label: 'Deals & Campaigns', icon: Briefcase },
    { id: 'create_deal' as const, label: 'Launch Brief', icon: PlusCircle, isAction: true },
    { id: 'escrow' as const, label: 'Escrow Vault (₹)', icon: Shield },
    { id: 'creators' as const, label: 'Agency & Talent', icon: Users },
    { id: 'analytics' as const, label: 'Brand Intelligence', icon: BarChart3 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const creatorNavItems = [
    { id: 'creator_workspace' as const, label: 'Monetization Hub', icon: LayoutDashboard },
    { id: 'creator_marketplace' as const, label: 'Verified Deal Hub', icon: Briefcase },
    { id: 'creator_trends' as const, label: 'Regional Trends', icon: Sparkles },
    { id: 'creator_checker' as const, label: 'AI Brief Pre-Checker', icon: Shield },
    { id: 'creator_settlement' as const, label: 'Instant Settlements', icon: Wallet },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const navItems = isCreator ? creatorNavItems : brandNavItems;

  const handleNavClick = (item: typeof navItems[number]) => {
    if ('isAction' in item && item.isAction) {
      onOpenCreateDeal();
    } else {
      onSelectTab(item.id);
    }
  };

  return (
    <aside className="w-16 md:w-64 shrink-0 bg-white border-r border-slate-200/80 min-h-screen sticky top-0 h-screen overflow-y-auto z-20 flex flex-col justify-between p-2.5 md:p-5 select-none transition-all duration-200">
      <div className="space-y-4 md:space-y-6">
        {/* VEYRO Brand Logo Header */}
        <div 
          onClick={() => onSelectTab('overview')}
          className="cursor-pointer group flex items-center justify-center md:justify-start px-2 md:px-2.5 py-1.5 transition-opacity hover:opacity-90"
          title="VEYRO"
        >
          <div className="hidden md:flex items-center min-h-[40px]">
            <VeyroLogo size="md" />
          </div>
          <div className="flex md:hidden items-center justify-center w-full min-h-[40px]">
            <VeyroLogo size="sm" showWordmark={false} />
          </div>
        </div>

        {/* Workspace Selector Pill */}
        <div className="p-2 md:p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-100/80 transition-colors cursor-pointer group flex items-center justify-center md:justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="hidden md:block min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs truncate">
                  {currentUser.role === 'creator' ? (currentUser.handle || 'Sarah Creates') : (currentUser.organization || 'Veyro Media')}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 uppercase tracking-wider shrink-0 font-mono">
                  {currentUser.role === 'creator' ? 'Talent' : 'Advertiser'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate">
                {currentUser.role === 'creator' ? 'Creator Monetization' : currentUser.role === 'manager' ? 'Agency Manager' : 'Brand Operations'}
              </span>
            </div>
          </div>
          <ChevronRight className="hidden md:block w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                title={item.label}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-2.5 md:px-3 py-2.5 md:py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="hidden md:inline truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Luxury Card with VEYRO Logo & Watermark */}
      <div className="hidden md:block relative mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#121620] via-[#0D1017] to-[#07090E] text-white overflow-hidden shadow-md border border-slate-800/80">
        {/* Background VEYRO Monogram Watermark */}
        <div className="absolute -right-4 -bottom-6 w-32 h-32 text-white/5 pointer-events-none">
          <VeyroWatermark className="w-full h-full text-white/10" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <img 
              src="/image.png" 
              alt="VEYRO" 
              className="h-6 w-auto max-w-[120px] object-contain object-left filter brightness-110" 
            />
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 font-bold shrink-0">
              ₹ INR Vault
            </span>
          </div>

          <h4 className="text-xs font-bold tracking-tight text-white leading-snug pt-1">
            Transparent Sponsorships. Real Value.
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Secure ₹ INR escrow, API-verified deliverables, and automated 85/15 payouts for India's creator economy.
          </p>
          <div 
            onClick={() => onSelectTab('escrow')}
            className="pt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-200 hover:text-white cursor-pointer transition-colors"
          >
            <span>View Escrow Ledger</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </aside>
  );
}
