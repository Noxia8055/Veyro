import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Wallet, 
  ArrowRight, 
  Video, 
  FileText, 
  ExternalLink, 
  Flame, 
  Globe, 
  BarChart3, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Clock, 
  Play, 
  Sliders, 
  Search, 
  ChevronRight,
  Zap,
  DollarSign,
  Layers,
  Award
} from 'lucide-react';
import { 
  Deal, 
  BrandLeaderboardItem, 
  CountryTrendGenre, 
  PlatformCpmBenchmark,
  CreatorNavTab
} from '../../types';
import { 
  BRAND_LEADERBOARD, 
  REGIONAL_TRENDS, 
  PLATFORM_CPM_BENCHMARKS 
} from '../../data/sponsorShieldData';
import { PanelSkeleton } from '../PanelSkeleton';

interface CreatorPanelProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onOpenCoSign: (deal: Deal) => void;
  onOpenSubmitVideo: (deal: Deal) => void;
  activeCreatorTab?: CreatorNavTab;
}

export function CreatorPanel({
  deals,
  onSelectDeal,
  onOpenCoSign,
  onOpenSubmitVideo,
  activeCreatorTab,
}: CreatorPanelProps) {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'workspace' | 'trends' | 'checker' | 'settlement'>('marketplace');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeCreatorTab) return;
    if (activeCreatorTab === 'creator_home' || activeCreatorTab === 'creator_audit') {
      setActiveTab('workspace');
    } else if (activeCreatorTab === 'creator_marketplace') {
      setActiveTab('marketplace');
    } else if (activeCreatorTab === 'creator_checker') {
      setActiveTab('checker');
    } else if (activeCreatorTab === 'creator_trends') {
      setActiveTab('trends');
    } else if (activeCreatorTab === 'creator_wallet' || activeCreatorTab === 'creator_settings') {
      setActiveTab('settlement');
    }
  }, [activeCreatorTab]);

  // Regional Trends Country filter
  const [selectedCountry, setSelectedCountry] = useState<'US' | 'IN' | 'GB' | 'BR'>('US');

  // zk-SNARK Private Earnings State
  const [zkPrivacyEnabled, setZkPrivacyEnabled] = useState(false);

  // Pre-Posting AI Brief Pre-Checker State
  const [checkerUrl, setCheckerUrl] = useState('https://youtube.com/watch?v=draft_preview_77a');
  const [checkerScript, setCheckerScript] = useState('Hey guys, today we are breaking down our morning productivity routine, sponsored by Veyro. Their smart escrow protocol guarantees instant creator payouts...');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    completed: boolean;
    logoSeconds: number;
    requiredLogoSeconds: number;
    logoPassed: boolean;
    audioKeywordsFound: string[];
    missingKeywords: string[];
    sentimentScore: number;
    ftcTagPassed: boolean;
    allPassed: boolean;
  } | null>(null);

  // Simulated quick tab switch loading
  const handleTabChange = (tab: typeof activeTab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 200);
  };

  // Run AI Brief Pre-Audit
  const handleRunAiAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult({
        completed: true,
        logoSeconds: 14,
        requiredLogoSeconds: 10,
        logoPassed: true,
        audioKeywordsFound: ['#ad', 'Veyro', 'smart escrow', 'instant payouts'],
        missingKeywords: [],
        sentimentScore: 98,
        ftcTagPassed: true,
        allPassed: true,
      });
      setIsAuditing(false);
    }, 1200);
  };

  // Earnings calculations
  const completedDeals = deals.filter((d) => d.status === 'released');
  const inActiveEscrow = deals
    .filter((d) => d.status === 'deposited' || d.status === 'signed' || d.status === 'submitted' || d.status === 'verified')
    .reduce((acc, d) => acc + (d.creatorPayout || 0), 0);
  const totalEarned = completedDeals.reduce((acc, d) => acc + (d.creatorPayout || 0), 0);

  // Virality Tracker demo deal
  const viralityDeal = deals.find(d => d.status === 'submitted' || d.status === 'verified') || deals[0];

  return (
    <div className="space-y-6 text-[#0F172A]">
      {/* Creator Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-800 text-white">
              Creator Operations Portal
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Guaranteed Gross Pay & Instant Settlement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A]">
            Creator Monetization Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            100% smart-contract verified escrows, transparent 85/15 agency fee audits, regional CPM benchmarks, and instant Net-0 disbursements.
          </p>
        </div>

        {/* Financial Badges */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="p-2.5 px-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50 text-right">
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">
              {zkPrivacyEnabled ? 'zk-Shielded Vault' : 'In Protected Escrow'}
            </span>
            <span className="text-base font-black font-mono text-slate-900">
              {zkPrivacyEnabled ? '●●●●●●●' : `₹${inActiveEscrow.toLocaleString('en-IN')}`}
            </span>
          </div>

          <div className="p-2.5 px-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-right">
            <span className="text-[10px] font-mono text-emerald-700 block font-bold uppercase">
              {zkPrivacyEnabled ? 'zk-Shielded Net' : 'Total Settled Payouts'}
            </span>
            <span className="text-base font-black font-mono text-emerald-800">
              {zkPrivacyEnabled ? '●●●●●●●' : `₹${totalEarned.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Creator Panel */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'marketplace' as const, label: 'Deal Hub & "Best Payers" Index', icon: ShieldCheck },
          { id: 'workspace' as const, label: 'Active Deals & Virality Tracker', icon: Layers },
          { id: 'trends' as const, label: 'Regional Trends & CPM Benchmarks', icon: Globe },
          { id: 'checker' as const, label: 'AI Brief Pre-Checker & Rules', icon: Sparkles },
          { id: 'settlement' as const, label: 'Instant Earnings & zk-Privacy', icon: Wallet },
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
          {/* TAB 1: HIGH-YIELD CAMPAIGN MARKETPLACE & TRANSPARENCY HUB */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              {/* "Which Brands Pay Best" Verified Index */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#0F172A]">
                        "Which Brands Pay Best" Verified Index
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Top Advertiser Ranking
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Verified leaderboard of brands offering top-tier rates, fastest smart-contract approval times, and active virality pools.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    4 Verified Brands Ranked
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BRAND_LEADERBOARD.map((brand, index) => (
                    <div key={brand.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={brand.logo}
                            alt={brand.brandName}
                            className="w-8 h-8 rounded-lg object-cover border border-[#E2E8F0]"
                          />
                          <span className="text-xs font-bold text-slate-900 truncate">{brand.brandName}</span>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">#{index + 1}</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Total Escrow Disbursed:</span>
                          <span className="font-mono font-bold text-slate-900">${brand.totalPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Avg. Approval Speed:</span>
                          <span className="font-bold text-emerald-700">{brand.avgApprovalHours} hrs (Net-0)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Reliability Score:</span>
                          <span className="font-bold text-slate-900">{brand.reliabilityScore}%</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E2E8F0] text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                        <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{brand.viralityBonusFrequency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gross Budget & Split Transparency Console */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h3 className="text-base font-bold text-[#0F172A]">
                    100% Gross Budget Exposure & Agency Split Verification
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Every offer shows the exact dollar amount deposited by the brand into smart escrow. Pre-agreed 85/15 fee distribution is enforced on-chain with zero hidden agency markups.
                  </p>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {deals.map((deal) => {
                    const isCoSigned = deal.status !== 'deposited';
                    return (
                      <div key={deal.id} className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div className="flex items-start gap-4 min-w-0">
                          <img
                            src={deal.thumbnailUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80'}
                            alt={deal.title}
                            className="w-14 h-14 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                          />
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#0F172A]">{deal.title}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                                100% Escrow Funded
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">
                              Brand: <strong className="text-slate-800">{deal.brandName}</strong> • Platform: {deal.platform} ({deal.deliverableFormat})
                            </p>
                            
                            {/* Gross Budget Breakdown Card */}
                            <div className="flex items-center gap-4 text-xs font-mono pt-1">
                              <span className="text-slate-700">
                                Gross Escrow: <strong className="text-slate-900">₹{deal.grossBudget.toLocaleString('en-IN')}</strong> (${Math.round(deal.grossBudget / 85).toLocaleString()} USDC)
                              </span>
                              <span className="text-emerald-700 font-bold">
                                Creator Take-Home (85%): ₹{deal.creatorPayout.toLocaleString('en-IN')}
                              </span>
                              <span className="text-slate-400">
                                Agency Split (15%): ₹{deal.managerPayout.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Co-Signing & Action Button */}
                        <div className="flex items-center gap-3 shrink-0">
                          {deal.status === 'deposited' ? (
                            <button
                              onClick={() => onOpenCoSign(deal)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-xs"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Co-Sign Agreement On-Chain</span>
                            </button>
                          ) : deal.status === 'signed' ? (
                            <button
                              onClick={() => onOpenSubmitVideo(deal)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs"
                            >
                              <Video className="w-4 h-4" />
                              <span>Submit Content for Payout</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => onSelectDeal(deal)}
                              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
                            >
                              <span>View Settlement</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE DEALS & VIRALITY TRACKER */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              {/* Dynamic 48-Hour Virality Bonus Tracker */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#0F172A]">
                          Dynamic 48-Hour Virality Bonus Tracker
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          Live Contract Oracle
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Tracks post performance against the advertiser’s milestone thresholds. Unlocks automatic secondary escrow disbursement upon hitting view targets.
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">Active Bonus Pool</span>
                    <span className="text-xl font-black font-mono text-emerald-700">+$1,500 USDC</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">Campaign: {viralityDeal.title}</span>
                    <span className="font-mono text-slate-900">76,420 / 100,000 Views (76%)</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: '76.4%' }} />
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      18 hours 42 minutes remaining in bonus window
                    </span>
                    <span className="font-bold text-emerald-700">
                      Target: 100,000 views in 48 hrs
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Deliverables Pipeline */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#0F172A] pb-3 border-b border-[#E2E8F0]">
                  Active Deliverable Pipeline & Submission Status
                </h3>

                <div className="space-y-3">
                  {deals.map((deal) => (
                    <div key={deal.id} className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={deal.thumbnailUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80'}
                          alt={deal.title}
                          className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-900 block truncate">{deal.title}</span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Deadline: {deal.submissionDeadline} • Format: {deal.deliverableFormat}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          ₹{deal.creatorPayout.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => onSelectDeal(deal)}
                          className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Audit Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REGIONAL & COUNTRY NICHE TREND ANALYTICS */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              {/* Country Selector & Regional Genre Analytics */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Country-Level Genre & Surging Trend Tracker
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Real-time algorithm analysis on high-growth regional formats, trending hooks, and viral structures.
                    </p>
                  </div>

                  {/* Country Selector Pills */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    {[
                      { id: 'US' as const, label: 'United States' },
                      { id: 'IN' as const, label: 'India' },
                      { id: 'GB' as const, label: 'United Kingdom' },
                      { id: 'BR' as const, label: 'Brazil' },
                    ].map((country) => (
                      <button
                        key={country.id}
                        onClick={() => setSelectedCountry(country.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          selectedCountry === country.id
                            ? 'bg-white text-slate-950 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {country.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regional Trends Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(REGIONAL_TRENDS[selectedCountry] || REGIONAL_TRENDS['US']).map((trend, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-slate-900">{trend.genre}</span>
                        <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          +{trend.growthPercent}% 30d Surge
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Optimal Format:</span>
                          <span className="font-semibold text-slate-900">{trend.hotFormat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Regional Avg CPM:</span>
                          <span className="font-mono font-bold text-slate-900">${trend.avgCpm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Key Metric:</span>
                          <span className="font-semibold text-indigo-700">{trend.sampleEngagement}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                        <span className="text-[10px] text-slate-400 block font-mono font-semibold uppercase">
                          Viral Audio & Hook Formula
                        </span>
                        <span className="font-semibold text-slate-800 italic mt-0.5 block">
                          {trend.topAudioHook}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform CPM Benchmarks Table */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h3 className="text-base font-bold text-[#0F172A]">
                    Live Platform CPM Benchmarks by Niche & Tier
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Cross-referenced pay rates across YouTube, Instagram Reels, and TikTok to ensure you never undercharge.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] text-slate-400 uppercase font-mono text-[10px]">
                        <th className="py-2.5 pr-4">Platform & Niche</th>
                        <th className="py-2.5 px-4">Micro Tier (10k-50k)</th>
                        <th className="py-2.5 px-4">Mid Tier (50k-500k)</th>
                        <th className="py-2.5 px-4">Macro Tier (500k+)</th>
                        <th className="py-2.5 pl-4 text-right">Quarter Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {PLATFORM_CPM_BENCHMARKS.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="py-3 pr-4 font-bold text-slate-900">
                            {item.platform} • {item.niche}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                            ${item.microCpm} CPM
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            ${item.midCpm} CPM
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                            ${item.macroCpm} CPM
                          </td>
                          <td className="py-3 pl-4 text-right font-mono font-bold text-emerald-700">
                            {item.quarterTrend}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CREATOR MONETIZATION & PRE-POSTING AI BRIEF PRE-CHECKER */}
          {activeTab === 'checker' && (
            <div className="space-y-6">
              {/* Interactive "What Brands Want From Me" Checklist */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h3 className="text-base font-bold text-[#0F172A]">
                    "What Brands Want From Me" Interactive Deliverable Guide
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Clear deliverables checklist to guarantee zero revision cycles and instant escrow release upon posting.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Video Length</span>
                    <span className="font-bold text-slate-900 block">45s - 60s Minimum</span>
                    <span className="text-slate-500 block">Must maintain audience retention above 65%.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Mandatory Tags</span>
                    <span className="font-bold text-slate-900 block">#ad, #Veyro, #Escrow</span>
                    <span className="text-slate-500 block">First 3 lines of description & video overlay.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Visual Logo Rule</span>
                    <span className="font-bold text-slate-900 block">10+ Seconds Exposure</span>
                    <span className="text-slate-500 block">Clear product or logo shown on camera.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Usage Rights</span>
                    <span className="font-bold text-slate-900 block">90-Day Digital Paid Whitelist</span>
                    <span className="text-slate-500 block">Organic perpetuity on creator profile.</span>
                  </div>
                </div>
              </div>

              {/* Pre-Posting AI Brief Pre-Checker */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-5">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#0F172A]">
                      Pre-Posting AI Brief Pre-Checker
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Auto-Audit Engine
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Test your unlisted preview URL or script before publishing. The AI checks visual logo duration and audio voice tags so you pass escrow verification on the very first try.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Unlisted Draft Video URL / Cloud Preview Link
                      </label>
                      <input
                        type="text"
                        value={checkerUrl}
                        onChange={(e) => setCheckerUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-slate-50 focus:bg-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Draft Script / Transcript Content
                      </label>
                      <textarea
                        rows={4}
                        value={checkerScript}
                        onChange={(e) => setCheckerScript(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-slate-50 focus:bg-white focus:outline-none font-sans"
                      />
                    </div>

                    <button
                      onClick={handleRunAiAudit}
                      disabled={isAuditing}
                      className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white font-bold hover:bg-slate-800 transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{isAuditing ? 'Running AI Frame & Audio Audit...' : 'Run Pre-Audit Compliance Scan'}</span>
                    </button>
                  </div>

                  {/* Audit Results Panel */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-[#E2E8F0] flex flex-col justify-between space-y-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                      Audit Diagnostic Report
                    </span>

                    {auditResult ? (
                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                          <span className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Ready for Zero-Revision Approval
                          </span>
                          <span className="font-mono font-bold">100% PASS</span>
                        </div>

                        <div className="space-y-2 pt-1 text-slate-700">
                          <div className="flex justify-between">
                            <span>Visual Logo Exposure Duration:</span>
                            <span className="font-bold text-emerald-700">{auditResult.logoSeconds}s detected (Min. {auditResult.requiredLogoSeconds}s) ✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>FTC Mandatory Sponsor Tags:</span>
                            <span className="font-bold text-emerald-700">#ad tag present ✓</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Brand Voice Sentiment:</span>
                            <span className="font-bold text-slate-900">{auditResult.sentimentScore}% Positive Affinity</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Required Audio Mentions:</span>
                            <span className="font-mono text-slate-900">{auditResult.audioKeywordsFound.join(', ')}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-[11px] text-slate-600">
                          ✓ All escrow compliance criteria satisfied. Upon public publishing, smart contract oracle will release payout in under 60 seconds.
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400 text-xs space-y-2">
                        <Sparkles className="w-8 h-8 mx-auto text-slate-300" />
                        <p>Click "Run Pre-Audit Compliance Scan" to test your video link against advertiser parameters.</p>
                      </div>
                    )}

                    <div className="text-[10px] text-slate-400 text-center font-mono">
                      Automated Oracle Audit Engine v2.4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INSTANT EARNINGS & SETTLEMENT HUB */}
          {activeTab === 'settlement' && (
            <div className="space-y-6">
              {/* zk-SNARK Private Earnings Toggle Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                      {zkPrivacyEnabled ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#0F172A]">
                          zk-SNARK Private Earnings Mode
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-[#E2E8F0]">
                          Zero-Knowledge Proof
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-xl">
                        Masks your public wallet balances and historical sponsorship income on block explorers while providing mathematical cryptographic proof of solvency to prospective sponsors.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-slate-600">
                      {zkPrivacyEnabled ? 'zk-Shield Active' : 'Public Ledger'}
                    </span>
                    <button
                      onClick={() => setZkPrivacyEnabled(!zkPrivacyEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        zkPrivacyEnabled ? 'bg-slate-900' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          zkPrivacyEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Solvency Proof Hash</span>
                    <span className="font-mono text-slate-700 block truncate mt-0.5">0x7f2a...99b1c4 (Valid)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Stealth Destination</span>
                    <span className="font-mono text-slate-700 block truncate mt-0.5">EIP-5564 Ephemeral Vault</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Net Payout Latency</span>
                    <span className="font-bold text-emerald-700 block mt-0.5">Net-0 Instant Disbursement</span>
                  </div>
                </div>
              </div>

              {/* Multi-Currency Payout Engine */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h3 className="text-base font-bold text-[#0F172A]">
                    Multi-Currency Payout & Offramp Rails
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Withdraw settled funds instantly to your connected Web3 wallet (USDC) or local INR bank account via UPI.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Instant UPI / Bank Transfer</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">Active</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Disburses INR directly into your verified bank account within seconds of deliverable approval.
                    </p>
                    <div className="pt-2">
                      <span className="text-xs text-slate-400 block font-mono">Linked UPI ID: sarah@oksbi</span>
                      <span className="text-xs font-bold text-emerald-700">Zero withdrawal fee on all verified escrows</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Web3 Wallet USDC Withdrawal</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-[#E2E8F0]">Connected</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Direct withdrawal to Arbitrum, Base, or Ethereum mainnet with gas subsidized by Aave yield.
                    </p>
                    <div className="pt-2">
                      <span className="text-xs text-slate-400 block font-mono">Address: 0x32A8...88f1</span>
                      <span className="text-xs font-bold text-slate-900">Gas fee: $0.00 (Protocol Subsidized)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
