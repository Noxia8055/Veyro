import React from 'react';
import { 
  Building2, 
  Users, 
  Inbox, 
  FileText, 
  Wallet, 
  Calendar, 
  Settings, 
  Sparkles, 
  CheckCircle2, 
  Percent,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { VeyroLogo } from '../VeyroLogo';
import { CurrentUser, ManagerNavTab } from '../../types';

interface ManagerSidebarProps {
  activeTab: ManagerNavTab;
  onSelectTab: (tab: ManagerNavTab) => void;
  currentUser: CurrentUser;
  onSwitchRole: (role: 'brand' | 'creator' | 'manager') => void;
  inboundCount?: number;
}

export function ManagerSidebar({
  activeTab,
  onSelectTab,
  currentUser,
  onSwitchRole,
  inboundCount = 3,
}: ManagerSidebarProps) {
  const navItems = [
    { id: 'manager_overview' as const, label: 'Agency Overview', icon: Building2 },
    { id: 'manager_roster' as const, label: 'Roster Management', icon: Users },
    { id: 'manager_pipeline' as const, label: 'Deal Inbound & Pipeline', icon: Inbox, badge: inboundCount > 0 ? inboundCount : undefined },
    { id: 'manager_pitch' as const, label: 'Media Kit & Pitch Builder', icon: FileText },
    { id: 'manager_financials' as const, label: 'Commission & Financials', icon: Wallet },
    { id: 'manager_calendar' as const, label: 'Deliverables Calendar', icon: Calendar },
    { id: 'manager_settings' as const, label: 'Agency Settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-64 shrink-0 bg-white border-r border-[#E2E8F0] min-h-screen sticky top-0 h-screen overflow-y-auto z-20 flex flex-col justify-between p-2.5 md:p-5 select-none transition-all duration-200">
      <div className="space-y-4 md:space-y-6">
        {/* Agency Logo Header */}
        <div 
          onClick={() => onSelectTab('manager_overview')}
          className="cursor-pointer group flex items-center justify-center md:justify-start px-2 md:px-2.5 py-1.5 transition-opacity hover:opacity-90"
          title="SponsorShield Max - Agency Operations"
        >
          <div className="hidden md:flex items-center min-h-[40px]">
            <VeyroLogo size="md" />
          </div>
          <div className="md:hidden flex items-center justify-center">
            <VeyroLogo size="sm" showWordmark={false} />
          </div>
        </div>

        {/* Agency Role Indicator Card */}
        <div className="hidden md:block p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">
              Agency Portal
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-700 text-white font-mono">
              TALENT REP
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900 truncate">
            {currentUser.organization || 'Apex Talent Agency'}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-0.5 font-medium">
            <Percent className="w-3 h-3 text-indigo-600" />
            <span className="font-mono text-[10px]">15% Programmatic Split</span>
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
                    ? 'bg-indigo-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100/80'
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                  }`}
                />
                <span className="hidden md:block truncate">{item.label}</span>
                {item.badge && (
                  <span className={`hidden md:inline-block ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Agency Metrics */}
      <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center gap-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
          />
          <div className="hidden md:block min-w-0 text-left">
            <span className="text-xs font-bold text-slate-900 block truncate">{currentUser.name}</span>
            <span className="text-[10px] text-indigo-600 font-semibold block truncate">Principal Agent</span>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Roster: 5 Talent</span>
          <span>Verified 85/15</span>
        </div>
      </div>
    </aside>
  );
}
