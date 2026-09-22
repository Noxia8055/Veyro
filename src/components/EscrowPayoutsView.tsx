import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Wallet, 
  ExternalLink, 
  Download,
  ArrowDownRight,
  ArrowUpRight,
  Shield,
  Building2
} from 'lucide-react';
import { Deal } from '../types';
import { formatINR } from '../utils/format';

interface EscrowPayoutsViewProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
}

export function EscrowPayoutsView({ deals, onSelectDeal }: EscrowPayoutsViewProps) {
  const [filter, setFilter] = useState<'all' | 'escrow' | 'payouts'>('all');

  const totalLocked = deals
    .filter((d) => d.status === 'deposited' || d.status === 'signed' || d.status === 'submitted' || d.status === 'verified')
    .reduce((acc, d) => acc + d.grossBudget, 0);

  const totalReleased = deals
    .filter((d) => d.status === 'released')
    .reduce((acc, d) => acc + d.grossBudget, 0);

  const totalCreatorPayouts = deals
    .filter((d) => d.status === 'released')
    .reduce((acc, d) => acc + d.creatorPayout, 0);

  const totalAgencyFees = deals
    .filter((d) => d.status === 'released')
    .reduce((acc, d) => acc + d.managerPayout, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-bold">
              ₹ INR Financial Ledger
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Non-Custodial Escrow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Escrow Vaults & Multi-Party Payouts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Auditable record of locked sponsorship collateral in Indian Rupees (₹), UPI & Bank Escrow references, and automated 85/15 disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Exporting INR financial report CSV...')}
            className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards in INR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            Locked in ₹ Escrow
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-950 mt-1">
            {formatINR(totalLocked)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-2 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Protected by Veyro Vault</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            Total Released Volume
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-950 mt-1">
            {formatINR(totalReleased > 0 ? totalReleased : 1050000)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            100% completed deals
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            Creator Net Payouts (85%)
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 mt-1">
            {formatINR(totalCreatorPayouts > 0 ? totalCreatorPayouts : 892500)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Direct UPI / Bank transfer
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            Agency Commissions (15%)
          </span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-800 mt-1">
            {formatINR(totalAgencyFees > 0 ? totalAgencyFees : 157500)}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Automated split execution
          </p>
        </div>
      </div>

      {/* LEDGER TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-950">
              All Escrow Vaults & Transactions
            </h2>
            <span className="text-xs text-slate-500">Every deposit is backed by automated deliverable verification</span>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-white text-slate-950 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setFilter('escrow')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'escrow' ? 'bg-white text-slate-950 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Active Escrows
            </button>
            <button
              onClick={() => setFilter('payouts')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'payouts' ? 'bg-white text-slate-950 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Completed Payouts
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 font-semibold border-b border-slate-100 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Deal ID & Campaign</th>
                <th className="py-3 px-4">Brand / Creator</th>
                <th className="py-3 px-4">Gross Escrow (₹)</th>
                <th className="py-3 px-4">85% Creator Net</th>
                <th className="py-3 px-4">15% Agency Fee</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deals
                .filter((deal) => {
                  if (filter === 'escrow') return deal.status !== 'released' && deal.status !== 'refunded';
                  if (filter === 'payouts') return deal.status === 'released';
                  return true;
                })
                .map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-slate-950 block">{deal.dealNumber}</span>
                      <span className="text-[11px] text-slate-500 font-sans truncate max-w-xs block">
                        {deal.title}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-900 font-semibold block">{deal.brandName}</span>
                      <span className="text-slate-500 text-[11px]">{deal.creatorName}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-950">
                      {formatINR(deal.grossBudget)}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold">
                      {formatINR(deal.creatorPayout)}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">
                      {formatINR(deal.managerPayout)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{deal.paymentMethod || 'UPI / Bank Escrow'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border ${
                          deal.status === 'released'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : deal.status === 'deposited'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : deal.status === 'signed'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {deal.status === 'released' ? 'Settled & Paid' : deal.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectDeal(deal)}
                        className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold rounded-lg shadow-2xs text-xs transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
