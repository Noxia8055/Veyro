import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Inbox, 
  FileText, 
  Wallet, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  Percent, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  DollarSign, 
  Send, 
  Eye, 
  Share2, 
  Download, 
  Lock, 
  ShieldCheck, 
  Briefcase,
  Play,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { 
  Deal, 
  ManagedCreatorProfile, 
  RosterPitchPackage, 
  InboundInvitation, 
  ManagerNavTab 
} from '../../types';
import { 
  INITIAL_MANAGED_ROSTER, 
  INITIAL_ROSTER_PITCHES, 
  INITIAL_INBOUND_INVITATIONS 
} from '../../data/sponsorShieldData';
import { PanelSkeleton } from '../PanelSkeleton';

interface ManagerPanelProps {
  activeTab: ManagerNavTab;
  onSelectTab: (tab: ManagerNavTab) => void;
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onOpenCreateDeal: () => void;
}

export function ManagerPanel({
  activeTab,
  onSelectTab,
  deals,
  onSelectDeal,
  onOpenCreateDeal,
}: ManagerPanelProps) {
  const [loading, setLoading] = useState(false);

  // Roster state
  const [roster, setRoster] = useState<ManagedCreatorProfile[]>(INITIAL_MANAGED_ROSTER);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | 'all'>('all');
  const [searchRoster, setSearchRoster] = useState('');
  
  // Inbound Pipeline state
  const [inbounds, setInbounds] = useState<InboundInvitation[]>(INITIAL_INBOUND_INVITATIONS);
  const [selectedInbound, setSelectedInbound] = useState<InboundInvitation | null>(null);

  // Pitch Builder state
  const [pitches, setPitches] = useState<RosterPitchPackage[]>(INITIAL_ROSTER_PITCHES);
  const [isCreatingPitch, setIsCreatingPitch] = useState(false);
  const [newPitchBrand, setNewPitchBrand] = useState('Stripe Ecosystem Fund');
  const [newPitchTitle, setNewPitchTitle] = useState('Developer & Fintech Q4 Blitz');
  const [selectedPitchCreatorIds, setSelectedPitchCreatorIds] = useState<string[]>(['roster-cr-1', 'roster-cr-2']);
  const [newPitchDiscount, setNewPitchDiscount] = useState(15);
  const [pitchSentSuccess, setPitchSentSuccess] = useState(false);

  // Split Ratio Adjustment Modal state
  const [editingSplitCreator, setEditingSplitCreator] = useState<ManagedCreatorProfile | null>(null);
  const [newSplitRatio, setNewSplitRatio] = useState(15);

  // Handlers
  const handleTabChange = (tab: ManagerNavTab) => {
    setLoading(true);
    onSelectTab(tab);
    setTimeout(() => setLoading(false), 200);
  };

  const handleInboundAction = (id: string, action: 'accepted' | 'rejected') => {
    setInbounds((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const handleSaveSplitRatio = () => {
    if (!editingSplitCreator) return;
    setRoster((prev) =>
      prev.map((c) =>
        c.id === editingSplitCreator.id
          ? {
              ...c,
              managerCommissionPercent: newSplitRatio,
              creatorSharePercent: 100 - newSplitRatio,
            }
          : c
      )
    );
    setEditingSplitCreator(null);
  };

  const handleCreatePackagePitch = () => {
    const selectedCreators = roster.filter((c) => selectedPitchCreatorIds.includes(c.id));
    const totalStandard = selectedCreators.reduce((sum, c) => sum + c.rateCards.dedicated, 0);
    const discounted = Math.round(totalStandard * (1 - newPitchDiscount / 100));
    const managerTake = Math.round(discounted * 0.15);

    const newPitch: RosterPitchPackage = {
      id: `pitch-${Date.now()}`,
      pitchTitle: newPitchTitle,
      targetBrand: newPitchBrand,
      creatorIds: selectedPitchCreatorIds,
      creators: selectedCreators.map((c) => ({
        id: c.id,
        name: c.name,
        handle: c.handle,
        avatar: c.avatar,
        deliverable: '1x Dedicated Video Campaign',
        rate: c.rateCards.dedicated,
      })),
      combinedReach: `${(selectedCreators.length * 1.1).toFixed(1)}M Combined Followers`,
      totalStandardPrice: totalStandard,
      bundleDiscountPercent: newPitchDiscount,
      bundledPackagePrice: discounted,
      managerTakeAmount: managerTake,
      status: 'sent',
      sentAt: new Date().toISOString(),
      expiresAt: '2026-10-30',
      keyHighlights: [
        'Curated synergy across high-commercial-intent demographics',
        'Smart escrow guarantee with automated 85/15 split routing',
        'Guaranteed turnaround within 10 days of escrow funding',
      ],
    };

    setPitches([newPitch, ...pitches]);
    setIsCreatingPitch(false);
    setPitchSentSuccess(true);
    setTimeout(() => setPitchSentSuccess(false), 3000);
  };

  // Financial aggregates
  const totalRosterRevenue = roster.reduce((sum, c) => sum + c.monthlyGrossRevenue, 0);
  const totalManagerCommissions = roster.reduce(
    (sum, c) => sum + (c.monthlyGrossRevenue * c.managerCommissionPercent) / 100,
    0
  );
  const totalPendingDeliverables = roster.reduce((sum, c) => sum + c.pendingDeliverablesCount, 0);

  // Filtered roster
  const filteredRoster = roster.filter(
    (c) =>
      c.name.toLowerCase().includes(searchRoster.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchRoster.toLowerCase()) ||
      c.category.toLowerCase().includes(searchRoster.toLowerCase())
  );

  return (
    <div className="space-y-6 text-[#0F172A]">
      {/* Agency Header Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-800 text-white">
              Talent Agency & Manager Portal
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Apex Talent Group</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A]">
            Agency Roster & Commission Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Programmatic multi-creator split enforcement, inbound brand pitch pipelines, and automated Net-0 smart contract distributions.
          </p>
        </div>

        {/* Financial Badges */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="p-2.5 px-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50 text-right">
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">
              Roster Gross Run-Rate
            </span>
            <span className="text-base font-black font-mono text-slate-900">
              ${totalRosterRevenue.toLocaleString()} / mo
            </span>
          </div>

          <div className="p-2.5 px-3.5 rounded-xl border border-indigo-200 bg-indigo-50 text-right">
            <span className="text-[10px] font-mono text-indigo-700 block font-bold uppercase">
              15% Agency Commission
            </span>
            <span className="text-base font-black font-mono text-indigo-900">
              ${Math.round(totalManagerCommissions).toLocaleString()} / mo
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <PanelSkeleton type="dashboard" />
      ) : (
        <>
          {/* TAB 1: AGENCY OVERVIEW */}
          {activeTab === 'manager_overview' && (
            <div className="space-y-6">
              {/* Key Metrics Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold text-slate-500">Active Roster Size</span>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900">{roster.length} Managed Creators</div>
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+2 signed this quarter</span>
                  </div>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold text-slate-500">Live Brand Campaigns</span>
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900">{deals.length} Active Deals</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    100% smart escrow locked
                  </div>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold text-slate-500">Inbound Brand Requests</span>
                    <Inbox className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black font-mono text-amber-600">{inbounds.length} Pending Briefs</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    ${inbounds.reduce((s, i) => s + i.proposedBudget, 0).toLocaleString()} pipeline value
                  </div>
                </div>

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold text-slate-500">Avg. Brand Release Speed</span>
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-700">4.2 Hours</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    Net-0 automated smart contracts
                  </div>
                </div>
              </div>

              {/* Roster Quick-Action Cards & Split Status */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">Managed Talent Performance & Split Lock</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      On-chain enforceable 85/15 commission locks. Splits are executed atomically at escrow settlement.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTab('manager_roster')}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                  >
                    <span>View All Talent</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roster.slice(0, 3).map((creator) => (
                    <div key={creator.id} className="p-4 rounded-xl border border-[#E2E8F0] bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#E2E8F0]"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">{creator.name}</span>
                            <span className="text-[11px] text-slate-500 font-medium block truncate">{creator.handle} • {creator.platform}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                          {creator.managerCommissionPercent}% Agency
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                          <span className="text-[10px] text-slate-400 block font-mono">Monthly Revenue</span>
                          <span className="font-bold font-mono text-slate-900">${creator.monthlyGrossRevenue.toLocaleString()}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E2E8F0]">
                          <span className="text-[10px] text-slate-400 block font-mono">Deliverables Due</span>
                          <span className="font-bold font-mono text-indigo-700">{creator.pendingDeliverablesCount} pending</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[11px]">
                        <span className="text-slate-500 font-mono">P50: {creator.p50Views}</span>
                        <button
                          onClick={() => setEditingSplitCreator(creator)}
                          className="text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit Split</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inbound Deals Ready for Review */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">Recent Brand Inbound Pipeline</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Direct sponsorship proposals from verified advertisers waiting for talent assignment.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTab('manager_pipeline')}
                    className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                  >
                    <span>Pipeline ({inbounds.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {inbounds.map((inbound) => (
                    <div key={inbound.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <img
                          src={inbound.brandLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80'}
                          alt={inbound.brandName}
                          className="w-10 h-10 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                        />
                        <div className="min-w-0 space-y-0.5">
                          <span className="text-xs font-bold text-slate-900 block">{inbound.campaignTitle}</span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Brand: <strong>{inbound.brandName}</strong> • {inbound.format} ({inbound.platform})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          ${inbound.proposedBudget.toLocaleString()} Gross
                        </span>
                        <div className="flex items-center gap-1.5">
                          {inbound.status === 'accepted' ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                              ✓ Accepted
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleInboundAction(inbound.id, 'accepted')}
                                className="px-3 py-1.5 rounded-lg bg-indigo-950 text-white text-xs font-bold hover:bg-indigo-900"
                              >
                                Accept & Lock
                              </button>
                              <button
                                onClick={() => handleInboundAction(inbound.id, 'rejected')}
                                className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] text-slate-600 text-xs font-semibold hover:bg-slate-50"
                              >
                                Decline
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROSTER MANAGEMENT */}
          {activeTab === 'manager_roster' && (
            <div className="space-y-6">
              {/* Roster Controls */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">Managed Creator Roster Directory</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Configure public rate cards, enforce immutable 85/15 split agreements, and track monthly talent GMV.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by name, handle, niche..."
                        value={searchRoster}
                        onChange={(e) => setSearchRoster(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E2E8F0] bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Talent Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] text-slate-400 uppercase font-mono text-[10px]">
                        <th className="py-2.5 pr-4">Creator / Channel</th>
                        <th className="py-2.5 px-4">Followers & P50</th>
                        <th className="py-2.5 px-4">Rate Card (Dedicated)</th>
                        <th className="py-2.5 px-4">Split (Creator/Agency)</th>
                        <th className="py-2.5 px-4">Run-Rate (Gross)</th>
                        <th className="py-2.5 pl-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {filteredRoster.map((creator) => (
                        <tr key={creator.id} className="hover:bg-slate-50/80">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={creator.avatar}
                                alt={creator.name}
                                className="w-9 h-9 rounded-xl object-cover border border-[#E2E8F0]"
                              />
                              <div>
                                <span className="font-bold text-slate-900 block">{creator.name}</span>
                                <span className="text-[11px] text-slate-500 font-mono">{creator.handle} • {creator.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{creator.followers}</span>
                            <span className="text-[11px] text-slate-500 font-mono">P50: {creator.p50Views}</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            ${creator.rateCards.dedicated.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-emerald-700">{creator.creatorSharePercent}% Talent</span>
                              <span className="text-slate-400">/</span>
                              <span className="font-bold text-indigo-700">{creator.managerCommissionPercent}% Agency</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            ${creator.monthlyGrossRevenue.toLocaleString()}
                          </td>
                          <td className="py-3 pl-4 text-right">
                            <button
                              onClick={() => setEditingSplitCreator(creator)}
                              className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-slate-100 font-semibold text-slate-700 text-xs inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3 text-slate-500" />
                              <span>Adjust Split</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEAL INBOUND & PIPELINE */}
          {activeTab === 'manager_pipeline' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h3 className="text-base font-bold text-[#0F172A]">Incoming Brand Deal Pipeline</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Review sponsorship opportunities, match them to creators on your roster, and route escrow smart contracts.
                  </p>
                </div>

                <div className="space-y-4">
                  {inbounds.map((inbound) => (
                    <div
                      key={inbound.id}
                      className="p-5 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all bg-white space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={inbound.brandLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80'}
                            alt={inbound.brandName}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]"
                          />
                          <div>
                            <span className="text-sm font-bold text-slate-900 block">{inbound.campaignTitle}</span>
                            <span className="text-xs text-slate-500">
                              Advertiser: <strong>{inbound.brandName}</strong> • Deliverable: {inbound.format} ({inbound.platform})
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs text-slate-400 block font-mono">Gross Offer</span>
                          <span className="text-lg font-black font-mono text-slate-900">
                            ${inbound.proposedBudget.toLocaleString()} USDC
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 text-xs text-slate-700">
                        <span className="font-bold block text-slate-900 mb-0.5">Creative Brief Requirements:</span>
                        {inbound.briefNotes}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-[#E2E8F0] text-xs">
                        <div className="flex items-center gap-4 text-slate-500 font-mono">
                          <span>Target Deadline: {inbound.deadline}</span>
                          <span className="text-indigo-700 font-bold">15% Agency Split: ${Math.round(inbound.proposedBudget * 0.15).toLocaleString()}</span>
                          <span className="text-emerald-700 font-bold">85% Talent Payout: ${Math.round(inbound.proposedBudget * 0.85).toLocaleString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {inbound.status === 'accepted' ? (
                            <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                              ✓ Brief Accepted & Locked into Escrow
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleInboundAction(inbound.id, 'accepted')}
                                className="px-4 py-2 rounded-xl bg-indigo-950 text-white font-bold hover:bg-indigo-900 transition-all text-xs"
                              >
                                Accept & Generate Contract
                              </button>
                              <button
                                onClick={() => handleInboundAction(inbound.id, 'rejected')}
                                className="px-3 py-2 rounded-xl border border-[#E2E8F0] text-slate-600 font-semibold hover:bg-slate-50 text-xs"
                              >
                                Decline Brief
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEDIA KIT & PITCH BUILDER */}
          {activeTab === 'manager_pitch' && (
            <div className="space-y-6">
              {/* Pitch Creator Header */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A]">Roster Package Pitch Generator</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Bundle 3-10 creators into single branded omnichannel pitches with collective reach metrics and custom package discounts.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingPitch(!isCreatingPitch)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-950 text-white text-xs font-bold hover:bg-indigo-900 transition-all shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isCreatingPitch ? 'Cancel Pitch Builder' : 'Create Package Pitch'}</span>
                  </button>
                </div>

                {pitchSentSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pitch Package successfully compiled and dispatched to advertiser!</span>
                  </div>
                )}

                {/* Interactive Builder Form */}
                {isCreatingPitch && (
                  <div className="p-5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Campaign Pitch Title</label>
                        <input
                          type="text"
                          value={newPitchTitle}
                          onChange={(e) => setNewPitchTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Target Brand / Advertiser</label>
                        <input
                          type="text"
                          value={newPitchBrand}
                          onChange={(e) => setNewPitchBrand(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-2">Select Roster Creators to Bundle</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {roster.map((creator) => {
                          const isSelected = selectedPitchCreatorIds.includes(creator.id);
                          return (
                            <div
                              key={creator.id}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedPitchCreatorIds(selectedPitchCreatorIds.filter((id) => id !== creator.id));
                                } else {
                                  setSelectedPitchCreatorIds([...selectedPitchCreatorIds, creator.id]);
                                }
                              }}
                              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-indigo-50 border-indigo-300'
                                  : 'bg-white border-[#E2E8F0] hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={creator.avatar}
                                  alt={creator.name}
                                  className="w-8 h-8 rounded-lg object-cover"
                                />
                                <div className="min-w-0">
                                  <span className="font-bold text-slate-900 block truncate">{creator.name}</span>
                                  <span className="text-[10px] text-slate-500 font-mono">${creator.rateCards.dedicated}</span>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'bg-indigo-700 border-indigo-700 text-white' : 'border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-medium">Package Discount:</span>
                        <input
                          type="number"
                          value={newPitchDiscount}
                          onChange={(e) => setNewPitchDiscount(Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded-lg border border-[#E2E8F0] bg-white font-mono text-center"
                        />
                        <span className="font-mono text-slate-500">%</span>
                      </div>

                      <button
                        onClick={handleCreatePackagePitch}
                        className="px-5 py-2.5 rounded-xl bg-indigo-950 text-white font-bold hover:bg-indigo-900 transition-all flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Bundle to Brand</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Sent Pitches List */}
                <div className="space-y-4 pt-2">
                  {pitches.map((pitch) => (
                    <div key={pitch.id} className="p-5 rounded-xl border border-[#E2E8F0] bg-slate-50/50 space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{pitch.pitchTitle}</span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                              {pitch.creators.length} Creators Bundled
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">
                            Target: <strong className="text-slate-800">{pitch.targetBrand}</strong> • {pitch.combinedReach}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-slate-400 line-through font-mono">
                            ${pitch.totalStandardPrice.toLocaleString()}
                          </span>
                          <span className="text-base font-black font-mono text-indigo-900 block">
                            ${pitch.bundledPackagePrice.toLocaleString()} ({pitch.bundleDiscountPercent}% OFF)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        {pitch.creators.map((c) => (
                          <div key={c.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] text-xs">
                            <img src={c.avatar} alt={c.name} className="w-4 h-4 rounded-full" />
                            <span className="font-semibold text-slate-800">{c.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-[#E2E8F0] text-xs text-slate-500">
                        <span className="font-mono">Agency Cut (15%): ${pitch.managerTakeAmount.toLocaleString()}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-indigo-700 font-semibold">Status: {pitch.status.toUpperCase()}</span>
                          <button className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share Media Kit Link</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMMISSION & FINANCIALS */}
          {activeTab === 'manager_financials' && (
            <div className="space-y-6">
              {/* Financial Architecture Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#0F172A]">Programmatic Commission Settlement Ledger</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Smart Contract Enforced
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Zero manual invoicing. Every escrow release splits gross funds: 85% directly to creator wallet, 15% directly to agency wallet.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Settled Agency Commissions</span>
                    <span className="text-xl font-black font-mono text-slate-900 block">$48,250 USDC</span>
                    <span className="text-slate-500">All-time lifetime agency fee volume.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Pending in Active Escrows</span>
                    <span className="text-xl font-black font-mono text-indigo-700 block">$6,450 USDC</span>
                    <span className="text-slate-500">Releasing immediately upon video verification.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                    <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">Default Split Configuration</span>
                    <span className="text-xl font-black font-mono text-emerald-700 block">85% / 15%</span>
                    <span className="text-slate-500">Atomic dual routing with zero chargeback risk.</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-mono">Agency Payout Address: 0x99B5...12C4 (Arbitrum)</span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-slate-700 font-semibold hover:bg-slate-50">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Tax & Split Reports (CSV)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ROSTER DELIVERABLES CALENDAR */}
          {activeTab === 'manager_calendar' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-[#E2E8F0]">
                  <h3 className="text-base font-bold text-[#0F172A]">Roster Deliverables Schedule & Deadlines</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Monitor posting milestones to prevent escrow expiration and ensure guaranteed Net-0 payouts.
                  </p>
                </div>

                <div className="space-y-3">
                  {deals.map((deal) => (
                    <div key={deal.id} className="p-4 rounded-xl border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={deal.creatorAvatar}
                          alt={deal.creatorName}
                          className="w-10 h-10 rounded-xl object-cover border border-[#E2E8F0]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{deal.creatorName}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {deal.deliverableFormat}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Campaign: {deal.title} ({deal.brandName})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="text-right">
                          <span className="text-slate-400 block text-[10px]">Due Date</span>
                          <span className="font-bold text-slate-900">{deal.submissionDeadline}</span>
                        </div>
                        <button
                          onClick={() => onSelectDeal(deal)}
                          className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-slate-700 font-semibold hover:bg-slate-50"
                        >
                          View Brief
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AGENCY SETTINGS */}
          {activeTab === 'manager_settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#0F172A] pb-3 border-b border-[#E2E8F0]">Agency Settings & Payout Rails</h3>
                <div className="max-w-xl space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Agency Legal Entity Name</label>
                    <input
                      type="text"
                      defaultValue="Apex Talent Agency LLC"
                      className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Smart Contract Commission Vault Address</label>
                    <input
                      type="text"
                      defaultValue="0x99B54e3dC55D285bAbf571b0bF4cEb2D879412C4"
                      className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-slate-50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Default Split Ratio (% Agency)</label>
                    <input
                      type="number"
                      defaultValue={15}
                      className="w-24 px-3 py-2 rounded-xl border border-[#E2E8F0] bg-slate-50 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Adjust Split Modal */}
      {editingSplitCreator && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xl max-w-md w-full space-y-4 text-[#0F172A]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
              <h3 className="text-sm font-bold text-slate-900">Adjust Split Ratio for {editingSplitCreator.name}</h3>
              <button
                onClick={() => setEditingSplitCreator(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-500">
                Update the contract split lock for {editingSplitCreator.name}. This is verified on-chain and visible in the Creator's Gross Budget Audit.
              </p>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Agency Commission Cut (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={newSplitRatio}
                    onChange={(e) => setNewSplitRatio(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="font-mono font-bold text-base w-12 text-center text-indigo-700">
                    {newSplitRatio}%
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Creator Share:</span>
                  <span className="font-bold text-emerald-700">{100 - newSplitRatio}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Agency Cut:</span>
                  <span className="font-bold text-indigo-700">{newSplitRatio}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingSplitCreator(null)}
                className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSplitRatio}
                className="px-4 py-1.5 rounded-xl bg-indigo-950 text-white text-xs font-bold hover:bg-indigo-900"
              >
                Save & Lock On-Chain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
