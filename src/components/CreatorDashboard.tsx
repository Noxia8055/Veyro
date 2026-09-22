import React, { useState } from 'react';
import { 
  Video, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Lock, 
  FileText, 
  ExternalLink,
  Shield,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Deal } from '../types';
import { ContractProgressStepper } from './ContractProgressStepper';
import { formatINR } from '../utils/format';

interface CreatorDashboardProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onOpenCoSign: (deal: Deal) => void;
  onOpenSubmitVideo: (deal: Deal) => void;
}

export function CreatorDashboard({
  deals,
  onSelectDeal,
  onOpenCoSign,
  onOpenSubmitVideo,
}: CreatorDashboardProps) {
  const [tab, setTab] = useState<'invitations' | 'active' | 'completed'>('invitations');

  // Filter deals for current creator
  const invitations = deals.filter((d) => d.status === 'deposited');
  const activeDeals = deals.filter((d) => d.status === 'signed' || d.status === 'submitted' || d.status === 'verified');
  const completedDeals = deals.filter((d) => d.status === 'released');

  // Financial totals
  const totalEarned = completedDeals.reduce((acc, d) => acc + d.creatorPayout, 0);
  const inActiveEscrow = [...invitations, ...activeDeals].reduce((acc, d) => acc + d.creatorPayout, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-bold">
              Creator Portal
            </span>
            <span className="text-xs text-slate-500 font-semibold">• ₹ INR Settlements</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Creator Sponsorships & Earnings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review gross budgets with guaranteed Net-0 payouts in Indian Rupees (₹). Co-sign agreements and submit verified links for automated escrow release.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold">100% Guaranteed Escrow</span>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            Total Earned Payouts
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 mt-1">
            {formatINR(totalEarned)}
          </p>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Net payout in bank/UPI
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            In Protected Escrow
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-950 mt-1">
            {formatINR(inActiveEscrow)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-2 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Pre-funded by brands</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            New Invitations
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-amber-700 mt-1">
            {invitations.length} Offers
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Awaiting your co-signature
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            In Production
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-950 mt-1">
            {activeDeals.length} Deliverables
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Active sponsorships
          </p>
        </div>
      </div>

      {/* TABS: INVITATIONS / ACTIVE / COMPLETED */}
      <div className="space-y-4">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold w-fit">
          <button
            onClick={() => setTab('invitations')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              tab === 'invitations'
                ? 'bg-white text-slate-950 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>New Invitations</span>
            {invitations.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                {invitations.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setTab('active')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              tab === 'active'
                ? 'bg-white text-slate-950 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>Active Sponsorships</span>
            <span className="text-slate-400 font-mono">({activeDeals.length})</span>
          </button>

          <button
            onClick={() => setTab('completed')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              tab === 'completed'
                ? 'bg-white text-slate-950 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>Paid & Completed</span>
            <span className="text-slate-400 font-mono">({completedDeals.length})</span>
          </button>
        </div>

        {/* TAB 1: INCOMING INVITATIONS */}
        {tab === 'invitations' && (
          <div className="space-y-3">
            {invitations.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center space-y-2 shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-950">All caught up</p>
                <p className="text-xs text-slate-500">No pending deal invitations waiting for co-signature.</p>
              </div>
            ) : (
              invitations.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white border border-amber-200/80 rounded-2xl p-6 hover:border-amber-300 transition-all space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                        {deal.dealNumber}
                      </span>
                      <h3 className="text-sm font-bold text-slate-950">{deal.title}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Escrow Funded • Awaiting Co-Signature
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {deal.deliverableGuidelines}
                  </p>

                  {/* FINANCIAL TRANSPARENCY CARD */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                        Gross Brand Escrow (₹)
                      </span>
                      <p className="text-base font-bold font-mono text-slate-950 mt-0.5">
                        {formatINR(deal.grossBudget)}
                      </p>
                      <span className="text-[10px] text-slate-400">100% pre-funded</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                        Your Net Payout ({deal.creatorSplitPercent}%)
                      </span>
                      <p className="text-base font-bold font-mono text-emerald-700 mt-0.5">
                        {formatINR(deal.creatorPayout)}
                      </p>
                      <span className="text-[10px] text-emerald-700 font-medium">Guaranteed upon deliverable</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                        Agency Manager ({deal.managerSharePercent}%)
                      </span>
                      <p className="text-base font-bold font-mono text-slate-700 mt-0.5">
                        {formatINR(deal.managerPayout)}
                      </p>
                      <span className="text-[10px] text-slate-400">{deal.managerName || 'Standard commission'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                      <span>Brand: <strong className="text-slate-950 font-sans">{deal.brandName}</strong></span>
                      <span>•</span>
                      <span>Format: {deal.deliverableFormat}</span>
                      <span>•</span>
                      <span>Deadline: {deal.submissionDeadline}</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onOpenCoSign(deal)}
                        className="w-full sm:w-auto px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 text-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Review Agreement & Co-Sign ({formatINR(deal.creatorPayout)})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE SPONSORSHIPS */}
        {tab === 'active' && (
          <div className="space-y-3">
            {activeDeals.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center space-y-2 shadow-xs">
                <Video className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-950">No active sponsorships in production</p>
                <p className="text-xs text-slate-500">Co-sign incoming invitations to start production.</p>
              </div>
            ) : (
              activeDeals.map((deal) => {
                const isSubmitted = deal.status === 'submitted' || deal.status === 'verified';
                return (
                  <div
                    key={deal.id}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-slate-300 transition-all space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                          {deal.dealNumber}
                        </span>
                        <h3 className="text-sm font-bold text-slate-950">{deal.title}</h3>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded uppercase ${
                          deal.status === 'signed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {deal.status === 'signed' ? 'In Production' : 'URL Submitted & Verified'}
                      </span>
                    </div>

                    <ContractProgressStepper status={deal.status} compact />

                    {/* Verification result snippet if submitted */}
                    {deal.verificationResult && (
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Deliverable Verified: {deal.verificationResult.notes}</span>
                        </div>
                        <p className="text-[11px] font-mono text-emerald-800 truncate">
                          URL: {deal.submittedVideoUrl}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <span>Expected Payout: <strong className="text-emerald-700 font-mono font-bold">{formatINR(deal.creatorPayout)}</strong></span>
                        <span>•</span>
                        <span>Deadline: <strong className="text-slate-800 font-mono">{deal.submissionDeadline}</strong></span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {!isSubmitted ? (
                          <button
                            onClick={() => onOpenSubmitVideo(deal)}
                            className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 text-xs"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Submit Published Video URL</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onSelectDeal(deal)}
                            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold rounded-xl transition-colors text-xs flex items-center gap-1 shadow-2xs"
                          >
                            <span>Inspect Verification</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: COMPLETED & PAID */}
        {tab === 'completed' && (
          <div className="space-y-3">
            {completedDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-500">{deal.dealNumber}</span>
                    <h3 className="text-sm font-bold text-slate-950">{deal.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Sponsor: {deal.brandName} • Settled {deal.releasedAt ? new Date(deal.releasedAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                    Net Paid to Creator
                  </span>
                  <p className="text-base font-black font-mono text-emerald-700">
                    +{formatINR(deal.creatorPayout)}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Ref: {deal.releaseReference || 'upi_settled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
