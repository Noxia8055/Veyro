import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  CheckCircle2, 
  Shield, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Building2,
  Users
} from 'lucide-react';
import { CurrentUser, UserRole, Deal } from '../types';
import { formatINR } from '../utils/format';
import { VeyroLogo } from './VeyroLogo';

interface TopHeaderProps {
  currentUser: CurrentUser;
  onSwitchRole: (role: UserRole) => void;
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onLogoClick?: () => void;
}

export function TopHeader({
  currentUser,
  onSwitchRole,
  deals,
  onSelectDeal,
  onLogoClick,
}: TopHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationOpen(false);
        setIsUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = deals.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Brand Logo & Global Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        {/* Brand Logo in header with responsive scaling & vertical alignment */}
        <div 
          onClick={onLogoClick}
          className="top-header-brand flex items-center cursor-pointer group shrink-0 pr-1"
          title="VEYRO Logo"
        >
          <img
            src="/image.png"
            alt="VEYRO Logo"
            aria-label="VEYRO Logo"
            className="h-7 sm:h-8 w-auto object-contain select-none transition-opacity duration-200 hover:opacity-80 group-hover:opacity-80 cursor-pointer"
            style={{
              filter: 'brightness(0) invert(1)',
              opacity: 0.92,
              mixBlendMode: 'difference',
              transition: 'opacity 0.2s ease',
            }}
          />
        </div>

        {/* Global Search Bar with ⌘ K */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search deals, creators, or ₹ INR escrows..."
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            className="w-full pl-9 pr-14 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all font-medium"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-2xs font-semibold">
              ⌘ K
            </kbd>
          </div>

          {/* Quick Search Dropdown Palette */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 flex items-center justify-between">
                <span>Matching Campaigns ({searchResults.length})</span>
                <span className="text-slate-400 font-mono">Currency: INR (₹)</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No matching campaigns found.
                  </div>
                ) : (
                  searchResults.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => {
                        onSelectDeal(deal);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={deal.thumbnailUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=80&auto=format&fit=crop&q=80'}
                          alt={deal.title}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-slate-900 block truncate">
                            {deal.title}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {deal.creatorName} ({deal.creatorHandle}) • <strong className="text-slate-700 font-semibold">{formatINR(deal.grossBudget)}</strong>
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 uppercase px-2 py-0.5 rounded bg-slate-100 border border-slate-200 shrink-0 ml-2">
                        {deal.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Panel Switcher, Currency Badge, Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* 3-Role Triple-Panel Role Switcher */}
        <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 gap-1">
          <button
            onClick={() => onSwitchRole('brand')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentUser.role === 'brand'
                ? 'bg-white text-slate-950 shadow-2xs font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Switch to Brand / Advertiser Operations"
          >
            <Building2 className={`w-3.5 h-3.5 ${currentUser.role === 'brand' ? 'text-slate-900' : 'text-slate-500'}`} />
            <span>Brand / Sponsor</span>
          </button>

          <button
            onClick={() => onSwitchRole('manager')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentUser.role === 'manager'
                ? 'bg-white text-indigo-950 shadow-2xs font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Switch to Talent Manager / Agency Operations"
          >
            <Users className={`w-3.5 h-3.5 ${currentUser.role === 'manager' ? 'text-indigo-700' : 'text-slate-500'}`} />
            <span>Agency / Manager</span>
          </button>

          <button
            onClick={() => onSwitchRole('creator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentUser.role === 'creator'
                ? 'bg-white text-emerald-950 shadow-2xs font-black'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Switch to Creator / Influencer Operations"
          >
            <Sparkles className={`w-3.5 h-3.5 ${currentUser.role === 'creator' ? 'text-emerald-600' : 'text-slate-500'}`} />
            <span>Creator / Talent</span>
          </button>
        </div>

        {/* Currency Pill: Indian Rupee (INR) & USDC */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-900 font-black font-mono">₹ INR / $ USDC</span>
          <span className="text-[10px] text-slate-400 font-medium border-l border-slate-200 pl-1.5">Escrow</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="w-9 h-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors relative shadow-2xs"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-slate-900">Escrow Notifications</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  1 pending
                </span>
              </div>
              <div className="mt-2 space-y-2">
                <div 
                  onClick={() => {
                    const readyDeal = deals.find(d => d.status === 'submitted' || d.status === 'verified');
                    if (readyDeal) onSelectDeal(readyDeal);
                    setIsNotificationOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Deliverable Verified & Ready for Release
                      </span>
                      <span className="text-[11px] text-slate-600 block mt-0.5 leading-snug">
                        Sarah Jenkins published Summer Vibes video. API verified live. Release <strong className="text-emerald-800">{formatINR(552500)}</strong>.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        Escrow Deposit Confirmed
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        <strong className="text-slate-800">{formatINR(450000)}</strong> locked into Tech Lifestyle Review vault.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs group"
          >
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover border border-slate-200"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 group-hover:text-slate-950 leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                {currentUser.role === 'brand' ? 'Brand Manager' : currentUser.role === 'creator' ? 'Verified Creator' : 'Agency Manager'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform ml-0.5" />
          </button>

          {/* User Persona Switcher Dropdown */}
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Interactive Persona
              </div>

              <button
                onClick={() => {
                  onSwitchRole('brand');
                  setIsUserDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                  currentUser.role === 'brand' ? 'font-bold text-slate-900 bg-slate-50' : 'text-slate-600'
                }`}
              >
                <div>
                  <span className="block font-semibold">Brand: Alex Carter</span>
                  <span className="text-[10px] text-slate-400">Veyro Media (₹ Deposits & Releases)</span>
                </div>
                {currentUser.role === 'brand' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                onClick={() => {
                  onSwitchRole('creator');
                  setIsUserDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                  currentUser.role === 'creator' ? 'font-bold text-slate-900 bg-slate-50' : 'text-slate-600'
                }`}
              >
                <div>
                  <span className="block font-semibold">Creator: Sarah Jenkins</span>
                  <span className="text-[10px] text-slate-400">@sarahcreates (Co-Sign & ₹ Payouts)</span>
                </div>
                {currentUser.role === 'creator' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                onClick={() => {
                  onSwitchRole('manager');
                  setIsUserDropdownOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                  currentUser.role === 'manager' ? 'font-bold text-slate-900 bg-slate-50' : 'text-slate-600'
                }`}
              >
                <div>
                  <span className="block font-semibold">Manager: Marcus Sterling</span>
                  <span className="text-[10px] text-slate-400">Apex Agency (15% Split Audits)</span>
                </div>
                {currentUser.role === 'manager' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
