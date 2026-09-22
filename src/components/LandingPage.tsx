import { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Sparkles, 
  Layers, 
  Video, 
  Briefcase,
  DollarSign,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PLATFORM_METRICS } from '../data/mockData';
import { formatINR } from '../utils/format';

interface LandingPageProps {
  onEnterBrand: () => void;
  onEnterCreator: () => void;
  onOpenCreateDeal: () => void;
}

export function LandingPage({
  onEnterBrand,
  onEnterCreator,
  onOpenCreateDeal,
}: LandingPageProps) {
  const [calcBudget, setCalcBudget] = useState(10000);
  const [calcManagerCut, setCalcManagerCut] = useState(15);

  const creatorNet = Math.round(calcBudget * ((100 - calcManagerCut) / 100));
  const managerNet = Math.round(calcBudget * (calcManagerCut / 100));

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-2xs text-xs font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Trust infrastructure for the creator economy</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Transparent escrow. Verifiable deliverables. Automated payouts.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Brands lock budgets in secure escrow. Creators review 100% transparent gross rates. Deliverables are verified by link and hashtag. Funds release simultaneously in seconds.
          </p>
        </div>

        {/* Dual Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onEnterBrand}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>Launch Brand Workspace</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={onEnterCreator}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 text-sm font-semibold rounded-lg border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-slate-600" />
            <span>Open Creator Portal</span>
          </button>
        </div>

        {/* Metrics ticker */}
        <div className="pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-2xs">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">Total Escrowed (₹)</span>
            <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {formatINR(PLATFORM_METRICS.totalEscrowedInr)}
            </p>
          </div>
          <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-2xs">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">Settled Deals</span>
            <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {PLATFORM_METRICS.completedPayoutsCount} Completed
            </p>
          </div>
          <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-2xs">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">Average Payout</span>
            <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {PLATFORM_METRICS.averageReleaseHours} Hours
            </p>
          </div>
          <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-2xs">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">Dispute Rate</span>
            <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">
              {PLATFORM_METRICS.disputeRatePercent}%
            </p>
          </div>
        </div>
      </section>

      {/* HOW ESCROW WORKS (Interactive 4-Step Diagram) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Predictable Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How VEYRO Escrow Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A zero-ambiguity workflow from deal creation to instant multi-party bank or USDC payout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center text-xs font-mono font-bold">
              1
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Brand Creates & Funds Escrow</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Brand deposits gross budget via Stripe or Web3. Funds lock in verifiable escrow. Agency cut and creator net are locked upfront.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center text-xs font-mono font-bold">
              2
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Creator Co-Signs Agreement</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Creator inspects total gross rate, verified 85% payout, required hashtags, and deliverable deadline. Signs in 1 click.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center text-xs font-mono font-bold">
              3
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Content Posted & Checked</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Creator submits YouTube or Instagram URL. Automated link verification confirms live status and mandatory <span className="font-mono text-slate-700">#ad</span> disclosure tags.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-mono font-bold">
              4
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Simultaneous Payout</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upon deliverable approval, escrow simultaneously releases 85% directly to Creator and 15% to Manager. Net-0 delay.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TRANSPARENCY CALCULATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Transparent Fee & Split Calculator
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculate the exact split between creator net payout and agency commission before locking funds.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold">
              No Hidden Platform Deductions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gross Sponsorship Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">$</span>
                  <input
                    type="number"
                    value={calcBudget}
                    onChange={(e) => setCalcBudget(Math.max(100, Number(e.target.value)))}
                    step={500}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md pl-7 pr-3 py-2 text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Manager / Agency Cut ({calcManagerCut}%)
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    Creator: {100 - calcManagerCut}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={calcManagerCut}
                  onChange={(e) => setCalcManagerCut(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>0% (Direct)</span>
                  <span>15% (Industry Standard)</span>
                  <span>30% (Protocol Cap)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                Instant Payout Allocation
              </span>

              <div className="space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Total Brand Escrow:</span>
                  <span className="font-bold text-slate-900 text-sm">${calcBudget.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Creator Net ({100 - calcManagerCut}%):
                  </span>
                  <span className="font-bold text-emerald-700 text-base">
                    ${creatorNet.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    Manager Agency ({calcManagerCut}%):
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    ${managerNet.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Release Condition:</span>
                <span className="font-medium text-slate-700">Live Video + #ad disclosure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Creators & Brands Switch to VEYRO
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Replacing arbitrary Net-60 payment terms, opaque markups, and unverified deliverable friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">100% Funded Escrow</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No creative work begins until sponsorship funds are fully locked in secure escrow. Creators produce with confidence knowing payment is guaranteed.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
              <Shield className="w-4 h-4 text-slate-900" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Anti-Agency Skimming</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every participant sees the gross agreement. Agency commission is explicitly defined and capped at a maximum of 30%, preventing hidden middleman margin.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900">
              <Clock className="w-4 h-4 text-slate-900" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">30-Day Timelock Refunds</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Brands are protected by automated 30-day timelocks. If a creator goes dark or fails to submit deliverables, funds are refunded back to the brand.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-xl p-8 sm:p-12 text-center space-y-6">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to execute your next sponsorship with zero payment friction?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Join leading tech brands, creator talent agencies, and YouTube creators using VEYRO.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenCreateDeal}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
            >
              + Create Sponsorship Deal Now
            </button>
            <button
              onClick={onEnterCreator}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Explore Creator Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
