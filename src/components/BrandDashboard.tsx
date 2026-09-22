import React from 'react';
import { 
  Plus, 
  Lock, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Shield, 
  Users, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Wallet,
  Settings,
  Briefcase
} from 'lucide-react';
import { Deal } from '../types';
import { formatINR } from '../utils/format';
import { VeyroLogo } from './VeyroLogo';

interface BrandDashboardProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onOpenCreateDeal: () => void;
  onReleasePayout: (dealId: string) => void;
  onNavigateToView?: (view: 'overview' | 'deals' | 'escrow' | 'payouts' | 'creators' | 'analytics' | 'settings') => void;
  activeView?: string;
}

export function BrandDashboard({
  deals,
  onSelectDeal,
  onOpenCreateDeal,
  onReleasePayout,
  onNavigateToView,
  activeView = 'overview',
}: BrandDashboardProps) {
  // Calculations
  const activeDeals = deals.filter(
    (d) => d.status === 'deposited' || d.status === 'signed' || d.status === 'submitted' || d.status === 'verified'
  );

  const totalLocked = activeDeals.reduce((acc, d) => acc + d.grossBudget, 0);
  const totalReleased = deals
    .filter((d) => d.status === 'released')
    .reduce((acc, d) => acc + d.grossBudget, 0);

  const pendingVerificationDeal = deals.find(
    (d) => d.status === 'submitted' || d.status === 'verified'
  );

  const pendingActionsCount = deals.filter(
    (d) => d.status === 'submitted' || d.status === 'verified'
  ).length;

  // Donut chart calculations
  const creatorShareAmount = Math.round(totalLocked * 0.85);
  const managerShareAmount = Math.round(totalLocked * 0.15);
  const platformFeeAmount = Math.round(totalLocked * 0.02);

  // Take the 4 most prominent deals as seen in the mockup
  const displayDeals = deals.slice(0, 4);

  // Direct feature navigation tabs right in the dashboard (so no 3-line hamburger is ever needed!)
  const dashboardTabs = [
    { id: 'overview' as const, label: 'Overview', icon: ShieldCheck },
    { id: 'deals' as const, label: 'Deals & Campaigns', icon: Briefcase },
    { id: 'escrow' as const, label: '₹ Escrow Vault', icon: Shield },
    { id: 'payouts' as const, label: 'Instant Payouts', icon: Wallet },
    { id: 'creators' as const, label: 'Creator Roster', icon: Users },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* DIRECT IN-DASHBOARD FEATURE NAVIGATION BAR (No 3-line hamburger menu required!) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigateToView?.(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenCreateDeal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs ml-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create Deal</span>
          </button>
        </div>
      </div>

      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold tracking-wide uppercase mb-2 border border-slate-200/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>VEYRO BRAND WORKSPACE • ₹ INR PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
            <span>Good morning, Alex</span>
            <span className="inline-block animate-bounce origin-bottom-right">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time snapshot of your creator campaigns, ₹ escrow deposits, and automated deliverable settlements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold font-mono flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>INR Escrow Active</span>
          </div>
          <button
            onClick={onOpenCreateDeal}
            className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 hover:shadow hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Deal</span>
          </button>
        </div>
      </div>

      {/* 4 TOP KPI METRIC CARDS (ALL IN RUPEES - ₹) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Locked in Escrow */}
        <div 
          onClick={() => onNavigateToView?.('escrow')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              ₹ LOCKED
            </span>
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500 block">Locked in Escrow</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight font-mono">
              {formatINR(totalLocked)}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <span>↗</span>
            <span>+12% vs. last 30 days (₹ INR)</span>
          </div>
        </div>

        {/* Card 2: Active Campaigns */}
        <div 
          onClick={() => onNavigateToView?.('deals')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500 block">Active Campaigns</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              {activeDeals.length > 0 ? activeDeals.length : 3}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <span>↗</span>
            <span>+1 new deal this week</span>
          </div>
        </div>

        {/* Card 3: Pending Actions */}
        <div 
          onClick={() => {
            if (pendingVerificationDeal) onSelectDeal(pendingVerificationDeal);
            else onNavigateToView?.('deals');
          }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
              ACTION REQ.
            </span>
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500 block">Pending Actions</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
              {pendingActionsCount > 0 ? pendingActionsCount : 1}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-amber-700">
            <span>↘</span>
            <span>Deliverable awaiting release</span>
          </div>
        </div>

        {/* Card 4: Completed Payouts */}
        <div 
          onClick={() => onNavigateToView?.('escrow')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-slate-500 block">Completed Payouts</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1 tracking-tight font-mono">
              {formatINR(totalReleased > 0 ? totalReleased : 1050000)}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <span>↗</span>
            <span>0% dispute rate • Net-0 settlement</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Recent Deals & Deliverable Ready Alert (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* DELIVERABLES VERIFIED & READY FOR RELEASE ALERT BANNER */}
          <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-blue-50/50 border border-emerald-300 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-950">
                    Deliverables Verified & Ready for Release
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    {formatINR(552500)} Pending
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                  Sarah Jenkins published Summer Vibes Campaign video. YouTube scan passed. 1-click authorize 85/15 release.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (pendingVerificationDeal) {
                  onSelectDeal(pendingVerificationDeal);
                } else if (deals.length > 0) {
                  onSelectDeal(deals[0]);
                }
              }}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-1.5 hover:shadow"
            >
              <span>Review Deliverable & Release</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recent Deals Table Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-950">
                  Recent Deals
                </h2>
                <span className="text-xs font-mono text-slate-400">({deals.length} Total)</span>
              </div>
              <button
                onClick={() => onNavigateToView?.('deals')}
                className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                <span>View all deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-400 font-medium border-b border-slate-100 pb-2">
                  <tr>
                    <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Campaign</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Creator</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Budget (₹)</th>
                    <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                    <th className="pb-3 text-right font-semibold uppercase tracking-wider text-[10px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayDeals.map((deal) => {
                    let statusLabel = 'Funded';
                    let statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                    let dotColor = 'bg-emerald-500';

                    if (deal.status === 'submitted' || deal.status === 'verified') {
                      statusLabel = 'In Verification';
                      statusColor = 'bg-blue-50 text-blue-800 border-blue-200';
                      dotColor = 'bg-blue-500';
                    } else if (deal.status === 'signed') {
                      statusLabel = 'In Progress';
                      statusColor = 'bg-purple-50 text-purple-800 border-purple-200';
                      dotColor = 'bg-purple-500';
                    } else if (deal.status === 'deposited') {
                      if (deal.id === 'deal-004' || deal.title.includes('Product')) {
                        statusLabel = 'Awaiting Creator';
                        statusColor = 'bg-amber-50 text-amber-800 border-amber-200';
                        dotColor = 'bg-amber-500';
                      } else {
                        statusLabel = 'Funded';
                        statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                        dotColor = 'bg-emerald-500';
                      }
                    } else if (deal.status === 'released') {
                      statusLabel = 'Settled & Paid';
                      statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
                      dotColor = 'bg-slate-500';
                    }

                    return (
                      <tr key={deal.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Campaign */}
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={deal.thumbnailUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80'}
                              alt={deal.title}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-950 block truncate text-xs sm:text-sm">
                                {deal.title}
                              </span>
                              <span className="text-[11px] text-slate-500 block truncate">
                                {deal.deliverableSummary || `${deal.platform} • 1 deliverable`}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Creator */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={deal.creatorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                              alt={deal.creatorName}
                              className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-semibold text-slate-900 block truncate text-xs">
                                {deal.creatorHandle}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {deal.creatorFollowers || '1.2M followers'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Budget in INR (₹) */}
                        <td className="py-3.5 px-3 font-bold text-slate-950 font-mono">
                          {formatINR(deal.grossBudget)}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                            <span>{statusLabel}</span>
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 pl-3 text-right">
                          <button
                            onClick={() => onSelectDeal(deal)}
                            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors shadow-2xs"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Escrow Overview & Quick Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Escrow Overview Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-950">
                  Escrow Allocation
                </h2>
                <span className="text-[11px] text-slate-400">Non-custodial split model</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>₹ Live</span>
              </div>
            </div>

            {/* Donut Chart with Center Display */}
            <div className="flex flex-col items-center py-2">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG Donut Ring */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="#F1F5F9"
                    strokeWidth="16"
                    fill="none"
                  />
                  {/* Creator Share (85%) - Emerald */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="#10B981"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray="376.99"
                    strokeDashoffset={376.99 * (1 - 0.85)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Manager Share (15%) - Slate */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="#0F172A"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray="376.99"
                    strokeDashoffset={376.99 * (1 - 0.15)}
                    transform="rotate(306 80 80)"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Platform Fee (2%) - Light Slate */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    stroke="#94A3B8"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray="376.99"
                    strokeDashoffset={376.99 * (1 - 0.03)}
                    transform="rotate(350 80 80)"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center Content in ₹ */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-lg sm:text-xl font-black text-slate-950 tracking-tight font-mono">
                    {formatINR(totalLocked)}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    Locked in Vault
                  </span>
                </div>
              </div>

              {/* Legend with exact amounts in INR (₹) */}
              <div className="w-full mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                    <span className="font-medium">Creator Share (85%)</span>
                  </div>
                  <span className="font-bold text-slate-950 font-mono">
                    {formatINR(creatorShareAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F172A]"></span>
                    <span className="font-medium">Manager/Agency (15%)</span>
                  </div>
                  <span className="font-bold text-slate-950 font-mono">
                    {formatINR(managerShareAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]"></span>
                    <span className="font-medium">Platform Fee (2%)</span>
                  </div>
                  <span className="font-bold text-slate-950 font-mono">
                    {formatINR(platformFeeAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Contract Vault Card Link */}
            <div
              onClick={() => onNavigateToView?.('escrow')}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 flex items-center justify-between transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs block group-hover:text-slate-950">
                    Smart Escrow Vault (₹ INR)
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Secured with automated releases
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-950">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenCreateDeal}
                className="p-3.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 border border-slate-900 flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white">
                  + Create Deal
                </span>
              </button>

              <button
                onClick={() => onNavigateToView?.('escrow')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-2xs group"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  ₹ Escrow Ledger
                </span>
              </button>

              <button
                onClick={() => onNavigateToView?.('creators')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-2xs group"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Creators Directory
                </span>
              </button>

              <button
                onClick={() => onNavigateToView?.('analytics')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-2xs group"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Analytics & ROI
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
