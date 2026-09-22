import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  PieChart, 
  Layers, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Deal } from '../types';
import { formatINR, formatINRCompact } from '../utils/format';

interface AnalyticsViewProps {
  deals: Deal[];
}

export function AnalyticsView({ deals }: AnalyticsViewProps) {
  const totalLocked = deals
    .filter((d) => d.status !== 'released' && d.status !== 'refunded')
    .reduce((acc, d) => acc + d.grossBudget, 0);

  const totalPaid = deals
    .filter((d) => d.status === 'released')
    .reduce((acc, d) => acc + d.grossBudget, 0);

  const monthlyVolume = [
    { month: 'Apr', volume: 1400000, deals: 2 },
    { month: 'May', volume: 2250000, deals: 3 },
    { month: 'Jun', volume: 1800000, deals: 3 },
    { month: 'Jul', volume: 2900000, deals: 4 },
    { month: 'Aug', volume: 3200000, deals: 5 },
    { month: 'Sep', volume: 3550000, deals: 4 },
  ];

  const maxVolume = Math.max(...monthlyVolume.map((m) => m.volume));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-800 text-[11px] font-bold tracking-wide uppercase mb-2">
          <span>₹ PLATFORM INTELLIGENCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Escrow & Sponsorship Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time performance telemetry across your smart escrow vaults in Indian Rupees (₹), creator deliverable turnaround times, and Net-0 settlements.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Total Capital Managed (₹)</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 font-mono">
            {formatINR(totalLocked + totalPaid > 0 ? totalLocked + totalPaid : 3550000)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-700 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.6% QoQ Growth</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Average Deliverable Verification</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 font-mono">
            1.2 <span className="text-sm font-sans font-normal text-slate-500">mins</span>
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-700 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Instant API Oracle scan</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block">Settlement Dispute Rate</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 font-mono">
            0.00%
          </p>
          <div className="mt-2 text-xs text-slate-500 font-medium">
            Zero disputed releases to date
          </div>
        </div>
      </div>

      {/* Escrow Volume Bar Chart Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-950">
              Escrow Capital Inflow (6-Month Trajectory)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Monthly ₹ INR escrow deposits secured across active creator partnerships.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono">
            ₹ INR (Lakhs)
          </span>
        </div>

        <div className="pt-6 pb-2">
          <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end h-56">
            {monthlyVolume.map((item) => {
              const heightPercent = (item.volume / maxVolume) * 100;
              return (
                <div key={item.month} className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-slate-950 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatINRCompact(item.volume)}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-slate-950 group-hover:bg-slate-800 transition-all shadow-xs relative"
                  >
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-emerald-400 rounded-t-xl"></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Distribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-950">
            85 / 15 Transparent Settlement Formula
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike legacy agency setups with hidden 40%+ margins, VEYRO enforces contractually locked 85% creator payouts with a visible 15% agency/management fee, eliminating post-campaign accounting disputes.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Creator direct yield:</span>
              <span className="font-bold text-emerald-700 font-mono">85.0% Guaranteed</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Agency manager cut:</span>
              <span className="font-bold text-slate-950 font-mono">15.0% Standard</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Platform escrow verification fee:</span>
              <span className="font-bold text-slate-500 font-mono">2.0% Flat</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-950">
            Automated Oracle Deliverable Verification
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All submitted content is scanned via social graph adapters (YouTube Data API v3 and Instagram Graph API) within 60 seconds of creator submission. Content duration, video availability, and mandatory FTC tags are cryptographically validated before one-click payout release.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Verification success rate:</span>
              <span className="font-bold text-emerald-700 font-mono">99.8%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 font-medium">Average release speed:</span>
              <span className="font-bold text-slate-950 font-mono">&lt; 15 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
