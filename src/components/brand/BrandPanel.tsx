import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  TrendingUp, 
  Wallet, 
  Plus, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  BarChart3, 
  Search, 
  Filter, 
  ExternalLink, 
  AlertCircle, 
  ArrowUpRight, 
  Building2, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Check, 
  Clock, 
  Zap, 
  Percent, 
  Globe, 
  Activity, 
  ChevronRight,
  CreditCard,
  Flame,
  Info
} from 'lucide-react';
import { 
  Deal, 
  AgencyProfile, 
  CreatorProfileExtended, 
  YieldVaultState,
  SocialPlatform,
  BrandNavTab
} from '../../types';
import { AGENCIES_DATA, CREATORS_EXTENDED, INITIAL_YIELD_VAULT } from '../../data/sponsorShieldData';
import { PanelSkeleton } from '../PanelSkeleton';
import { CampaignReachChart } from './CampaignReachChart';

interface BrandPanelProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onOpenCreateDeal: () => void;
  onReleasePayout: (dealId: string) => void;
  onAddCampaign?: (deal: Partial<Deal>) => void;
  activeBrandTab?: BrandNavTab;
}

export function BrandPanel({
  deals,
  onSelectDeal,
  onOpenCreateDeal,
  onReleasePayout,
  activeBrandTab,
}: BrandPanelProps) {
  const [activeTab, setActiveTab] = useState<'vault' | 'campaigns' | 'roster' | 'intelligence'>('vault');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeBrandTab) return;
    if (activeBrandTab === 'brand_discovery') {
      setActiveTab('roster');
    } else if (activeBrandTab === 'brand_audits') {
      setActiveTab('campaigns');
    } else if (activeBrandTab === 'brand_roas') {
      setActiveTab('intelligence');
    } else {
      setActiveTab('vault');
    }
  }, [activeBrandTab]);
  
  // Escrow Vault state
  const [yieldState, setYieldState] = useState<YieldVaultState>(INITIAL_YIELD_VAULT);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('5000');
  const [depositMethod, setDepositMethod] = useState<'stripe' | 'web3'>('stripe');
  const [depositSuccess, setDepositSuccess] = useState(false);

  // Selected Creator for Deep Dive
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfileExtended | null>(null);

  // ROAS Interactive Calculator State
  const [calcBudget, setCalcBudget] = useState(5000);
  const [calcTargetCpm, setCalcTargetCpm] = useState(24);
  const [calcEstCtr, setCalcEstCtr] = useState(2.8);
  const [calcConvRate, setCalcConvRate] = useState(3.2);
  const [calcAvgOrderVal, setCalcAvgOrderVal] = useState(65);

  // Filter for Creator Roster
  const [rosterSearch, setRosterSearch] = useState('');
  const [rosterPlatform, setRosterPlatform] = useState<'all' | SocialPlatform>('all');

  // Simulated quick tab switch loading
  const handleTabChange = (tab: typeof activeTab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 200);
  };

  // Calculations
  const activeDeals = deals.filter(
    (d) => d.status === 'deposited' || d.status === 'signed' || d.status === 'submitted' || d.status === 'verified'
  );
  const totalLocked = activeDeals.reduce((acc, d) => acc + (d.grossBudget || 0), 0);
  const totalReleased = deals
    .filter((d) => d.status === 'released')
    .reduce((acc, d) => acc + (d.grossBudget || 0), 0);

  // Calculator outputs
  const projectedImpressions = Math.round((calcBudget / calcTargetCpm) * 1000);
  const projectedClicks = Math.round(projectedImpressions * (calcEstCtr / 100));
  const projectedConversions = Math.round(projectedClicks * (calcConvRate / 100));
  const projectedRevenue = Math.round(projectedConversions * calcAvgOrderVal);
  const projectedRoas = (projectedRevenue / (calcBudget || 1)).toFixed(2);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setIsDepositModalOpen(false);
    }, 1500);
  };

  const filteredCreators = CREATORS_EXTENDED.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      c.handle.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(rosterSearch.toLowerCase());
    const matchesPlatform = rosterPlatform === 'all' || c.platform === rosterPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6 text-[#0F172A]">
      {/* Brand Header Banner with Escrow Health status */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0F172A] text-white">
              Brand Manager Operations
            </span>
            <span className="text-xs text-slate-500 font-semibold">• SponsorShield Max Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A]">
            Advertiser Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Non-custodial smart escrow deployment, AI brief compliance verification, algorithmic roster matchmaking, and Aave V3 yield generation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-slate-800 font-bold text-xs hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Wallet className="w-4 h-4 text-slate-600" />
            <span>Fund Escrow Vault</span>
          </button>
          <button
            onClick={onOpenCreateDeal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Campaign Brief</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Brand Panel */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'vault' as const, label: 'Escrow Vault & Budget Controller', icon: ShieldCheck },
          { id: 'campaigns' as const, label: 'Active Campaigns & Escrows', icon: Layers },
          { id: 'roster' as const, label: 'Agency & Creator Directory', icon: Users },
          { id: 'intelligence' as const, label: 'Brand Intelligence & ROAS Engine', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <PanelSkeleton type="dashboard" />
      ) : (
        <>
          {/* TAB 1: ESCROW VAULT & BUDGET CONTROLLER */}
          {activeTab === 'vault' && (
            <div className="space-y-6">
              {/* Escrow Health Status Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Total Capital Locked
                    </span>
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-[#0F172A] mt-2">
                    ${(totalLocked / 85).toLocaleString('en-US', { maximumFractionDigits: 0 })} USDC
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Equivalent to ₹{totalLocked.toLocaleString('en-IN')} in active vaults
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Active Escrows
                    </span>
                    <Layers className="w-4 h-4 text-indigo-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-[#0F172A] mt-2">
                    {activeDeals.length} Campaigns
                  </p>
                  <p className="text-xs text-emerald-700 mt-1 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% On-Chain Protected
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Yield Accumulated
                    </span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 mt-2">
                    +${yieldState.yieldAccumulatedUsdc.toFixed(2)} USDC
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Offsets 100% of gas & protocol fees
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Released Payouts
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-slate-800 mt-2">
                    ${(totalReleased / 85).toLocaleString('en-US', { maximumFractionDigits: 0 })} USDC
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Zero Net-30 payment delays
                  </p>
                </div>
              </div>

              {/* Yield-Bearing Vault Toggle Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#0F172A]">
                          Aave V3 Yield-Bearing Escrow Vault
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {yieldState.apyPercent}% APY LIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 max-w-xl font-medium">
                        Routes idle campaign USDC into audited Aave V3 lending pools while talent produces content. Yield earned offsets protocol gas, reducing net brand fees to 0.0%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-slate-600">
                      {yieldState.isYieldEnabled ? 'Yield Routing Enabled' : 'Yield Routing Paused'}
                    </span>
                    <button
                      onClick={() => setYieldState(prev => ({ ...prev, isYieldEnabled: !prev.isYieldEnabled }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        yieldState.isYieldEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          yieldState.isYieldEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold block uppercase">
                      Lending Pool Protocol
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">
                      Aave V3 Arbitrum / Ethereum Sepolia
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Smart contract verified & non-custodial
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold block uppercase">
                      Est. 30-Day Escrow Yield
                    </span>
                    <span className="text-sm font-bold text-emerald-700 mt-1 block">
                      +${((totalLocked / 85) * (yieldState.apyPercent / 100) * (30 / 365)).toFixed(2)} USDC
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Auto-credited upon deliverable completion
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold block uppercase">
                      Instant Liquidity Guarantee
                    </span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">
                      0-Second Flash Unwind
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Never delays creator instant settlement
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Escrow List */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Live Vault Contracts & Disbursement Control
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Funds remain locked until creator submits verified post URL matching campaign brief parameters.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {deals.length} Total Contracts
                  </span>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {deals.map((deal) => (
                    <div key={deal.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={deal.thumbnailUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80'}
                          alt={deal.title}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#0F172A] truncate">
                              {deal.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-[#E2E8F0]">
                              {deal.dealNumber}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
                            <span>{deal.creatorName} ({deal.creatorHandle})</span>
                            <span>•</span>
                            <span>{deal.platform}</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">Gross: ₹{deal.grossBudget.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <span className="text-xs font-bold font-mono text-[#0F172A] block">
                            ${Math.round(deal.grossBudget / 85).toLocaleString()} USDC
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                            {deal.status === 'released' ? 'Settled to Creator' : 'Locked in Escrow'}
                          </span>
                        </div>

                        {deal.status === 'submitted' || deal.status === 'verified' ? (
                          <button
                            onClick={() => onReleasePayout(deal.id)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Release Escrow</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onSelectDeal(deal)}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-[#E2E8F0] text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
                          >
                            <span>Inspect Audit</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE CAMPAIGNS & ESCROWS */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Campaign Management & Virality Bonus Pools
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Configure base escrow budgets plus conditional virality pools (e.g., $1,500 for 100k views within 48 hours).
                    </p>
                  </div>
                  <button
                    onClick={onOpenCreateDeal}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Campaign Brief</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {deals.map((deal) => {
                    const hasBonus = deal.viralityBonus?.enabled || true;
                    return (
                      <div key={deal.id} className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-400 transition-all space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-[#0F172A] block">{deal.title}</span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              Talent: {deal.creatorName} • {deal.platform}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 uppercase font-bold border border-[#E2E8F0]">
                            {deal.status}
                          </span>
                        </div>

                        {/* Base Budget vs Virality Bonus Breakdown */}
                        <div className="p-3 rounded-lg bg-slate-50 border border-[#E2E8F0] space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Base Guaranteed Escrow:</span>
                            <span className="font-mono font-bold text-slate-900">
                              ₹{deal.grossBudget.toLocaleString('en-IN')} (${Math.round(deal.grossBudget / 85).toLocaleString()} USDC)
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-emerald-800">
                            <span className="flex items-center gap-1 font-semibold">
                              <Flame className="w-3.5 h-3.5 text-amber-500" />
                              Virality Bonus Pool (48h):
                            </span>
                            <span className="font-mono font-bold">+$1,500 USDC (at 100k views)</span>
                          </div>
                        </div>

                        {/* AI Compliance Rules summary */}
                        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Min. 10s visual logo & voice tags
                          </span>
                          <button
                            onClick={() => onSelectDeal(deal)}
                            className="text-xs font-bold text-[#0F172A] hover:underline flex items-center gap-0.5"
                          >
                            View Contract <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recharts Projected vs Actual Campaign Reach & Engagement Bar Chart */}
              <CampaignReachChart />
            </div>
          )}

          {/* TAB 3: AGENCY & CREATOR DIRECTORY (ROSTER INTELLIGENCE) */}
          {activeTab === 'roster' && (
            <div className="space-y-6">
              {/* Agency Roster Aggregator Section */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Verified Agency Roster Aggregator
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Browse premier creator management collectives, aggregate historical reach, and send bulk campaign briefs.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    4 Verified Agencies Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {AGENCIES_DATA.map((agency) => (
                    <div key={agency.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={agency.logo}
                          alt={agency.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#E2E8F0]"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {agency.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate font-mono">
                            {agency.handle}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Roster Talent:</span>
                          <span className="font-bold text-slate-900">{agency.managedCreatorsCount} Creators</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Historical Reach:</span>
                          <span className="font-bold text-slate-900">{agency.totalHistoricalReach}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Reliability Score:</span>
                          <span className="font-bold text-emerald-700">{agency.reliabilityScore}%</span>
                        </div>
                      </div>

                      <button
                        onClick={onOpenCreateDeal}
                        className="w-full py-2 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-slate-800 hover:bg-slate-100 transition-all shadow-2xs"
                      >
                        Send Bulk Roster Brief
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creator Deep-Dive & Rate Cards Section */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Creator Deep-Dive Profiles & Verified Rate Cards
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Audience geo demographics, p50 and p90 90-day views, EQI ratings, and audience customer overlap.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Filter talent..."
                        value={rosterSearch}
                        onChange={(e) => setRosterSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E2E8F0] bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCreators.map((creator) => (
                    <div key={creator.id} className="p-5 rounded-2xl border border-[#E2E8F0] bg-white hover:border-slate-400 transition-all space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-[#0F172A]">{creator.name}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-xs text-slate-400 font-mono block">{creator.handle}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{creator.category} • {creator.followers}</span>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          {creator.projectedRoas}x Est. ROAS
                        </span>
                      </div>

                      {/* Verified Rate Cards */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-slate-50 border border-[#E2E8F0]">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Shorts</span>
                          <span className="text-xs font-bold font-mono text-slate-900">${creator.rates.shorts}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-[#E2E8F0]">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Reels</span>
                          <span className="text-xs font-bold font-mono text-slate-900">${creator.rates.reels}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 border border-[#E2E8F0]">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Dedicated</span>
                          <span className="text-xs font-bold font-mono text-slate-900">${creator.rates.dedicated}</span>
                        </div>
                      </div>

                      {/* Metrics: p50/p90 views and audience overlap */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">90-Day Views (p50 / p90):</span>
                          <span className="font-mono font-bold text-slate-900">{creator.p50Views} / {creator.p90Views}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Audience Overlap with Brand:</span>
                          <span className="font-bold text-emerald-700">{creator.audienceOverlapScore}% Match</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Authentic Audience Score:</span>
                          <span className="font-bold text-slate-900">{creator.botAuthenticityScore}% (Verified Human)</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedCreator(creator)}
                          className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1"
                        >
                          <span>Demographics Breakdown</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={onOpenCreateDeal}
                          className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-2xs"
                        >
                          Send Escrow Offer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BRAND INTELLIGENCE & PREDICTIVE ROI ENGINE */}
          {activeTab === 'intelligence' && (
            <div className="space-y-6">
              {/* Top Intelligence Scoring Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                      Engagement Quality Index (EQI)
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-3xl font-black text-[#0F172A] font-mono">94.8 / 100</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Filters out bot traffic by assessing comment-to-view ratios and positive consumer intent.
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                      Bot & Fake Follower Detection
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-3xl font-black text-emerald-700 font-mono">97.2%</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Real-time audience authenticity scoring across all active and invited creator rosters.
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                      Brand Safety & Conflict Scanner
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-3xl font-black text-[#0F172A] font-mono">A+ Rated</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Zero high-risk language or competitor exclusivity conflicts detected in past 180 days.
                  </p>
                </div>
              </div>

              {/* Recharts Projected vs Actual Campaign Reach & Engagement Bar Chart */}
              <CampaignReachChart />

              {/* Machine Learning Projected ROAS Calculator */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
                <div className="pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Predictive ROAS & Conversion Simulator
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-[#E2E8F0]">
                      ML Campaign Predictor
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Simulate returns, conversion volumes, and CPM efficiency before deploying capital into escrow.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Interactive Sliders */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700">Campaign Escrow Budget:</span>
                        <span className="font-mono text-slate-900">${calcBudget.toLocaleString()} USDC</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="25000"
                        step="500"
                        value={calcBudget}
                        onChange={(e) => setCalcBudget(Number(e.target.value))}
                        className="w-full accent-slate-900"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700">Target Platform CPM ($ per 1,000 views):</span>
                        <span className="font-mono text-slate-900">${calcTargetCpm} CPM</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        step="2"
                        value={calcTargetCpm}
                        onChange={(e) => setCalcTargetCpm(Number(e.target.value))}
                        className="w-full accent-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-700">Estimated Click-Through Rate (CTR):</span>
                          <span className="font-mono text-slate-900">{calcEstCtr}%</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          step="0.2"
                          value={calcEstCtr}
                          onChange={(e) => setCalcEstCtr(Number(e.target.value))}
                          className="w-full accent-slate-900"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-700">Landing Page Conv. Rate:</span>
                          <span className="font-mono text-slate-900">{calcConvRate}%</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={calcConvRate}
                          onChange={(e) => setCalcConvRate(Number(e.target.value))}
                          className="w-full accent-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Projected Yield Output Card */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex flex-col justify-between space-y-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                      Forecasted Campaign Output
                    </span>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Projected ROAS Multiplier</span>
                        <span className="text-3xl font-black font-mono text-emerald-700">{projectedRoas}x</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E2E8F0]">
                        <div>
                          <span className="text-slate-400 block font-medium">Est. Impressions</span>
                          <span className="font-bold text-slate-900">{projectedImpressions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Est. Converted Orders</span>
                          <span className="font-bold text-slate-900">{projectedConversions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Est. Clicks</span>
                          <span className="font-bold text-slate-900">{projectedClicks.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Est. Gross Revenue</span>
                          <span className="font-bold text-emerald-700">${projectedRevenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onOpenCreateDeal}
                      className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
                    >
                      Apply to Campaign Brief
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* STRIPE FIAT ONRAMP & WEB3 DEPOSIT MODAL */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  ₹ / $
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">Fund Escrow Vault</h3>
                  <p className="text-[11px] text-slate-500">Stripe Fiat Onramp or Web3 Wallet</p>
                </div>
              </div>
              <button
                onClick={() => setIsDepositModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {depositSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Escrow Capital Deposited!</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Funds converted to USDC and locked in Aave V3 yield vault.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDepositSubmit} className="space-y-4">
                {/* Method selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDepositMethod('stripe')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      depositMethod === 'stripe'
                        ? 'border-slate-950 bg-slate-50 text-slate-950'
                        : 'border-[#E2E8F0] text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Stripe Fiat Onramp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositMethod('web3')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      depositMethod === 'web3'
                        ? 'border-slate-950 bg-slate-50 text-slate-950'
                        : 'border-[#E2E8F0] text-slate-600'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Web3 Wallet (USDC)</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Deposit Amount ({depositMethod === 'stripe' ? 'USD / INR' : 'USDC'})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-slate-50 focus:bg-white focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Auto-converts to USDC at 1:1 parity and enters Aave V3 4.82% yield pool.
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Protocol Escrow Fee:</span>
                    <span className="font-bold text-emerald-700">0.00% (Subsidized by Yield)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated 30-day Yield:</span>
                    <span className="font-mono font-bold text-emerald-700">+${(Number(depositAmount) * 0.0482 * (30 / 365)).toFixed(2)} USDC</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
                >
                  Confirm Escrow Vault Deposit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CREATOR DEMOGRAPHICS DEEP DIVE MODAL */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCreator.avatar}
                  alt={selectedCreator.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#E2E8F0]"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">{selectedCreator.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">{selectedCreator.handle} • {selectedCreator.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCreator(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Geo Distribution */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Audience Geographic Distribution</span>
              <div className="space-y-1.5">
                {selectedCreator.audienceGeo.map((geo) => (
                  <div key={geo.country} className="text-xs flex items-center justify-between">
                    <span className="text-slate-600">{geo.country}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-slate-900 rounded-full" style={{ width: `${geo.percent}%` }} />
                      </div>
                      <span className="font-mono font-bold text-slate-900 w-8 text-right">{geo.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Breakdown */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <span className="text-xs font-bold text-slate-700 block">Audience Age Demographics</span>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {selectedCreator.audienceAge.map((age) => (
                  <div key={age.bracket} className="p-2 rounded-lg bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">{age.bracket}</span>
                    <span className="font-bold text-slate-900 font-mono">{age.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCreator(null)}
                className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCreator(null);
                  onOpenCreateDeal();
                }}
                className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800"
              >
                Launch Escrow Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
