import { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Deal } from '../types';
import { formatINR } from '../utils/format';

interface DealsViewProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  onOpenCreateDeal: () => void;
}

export function DealsView({ deals, onSelectDeal, onOpenCreateDeal }: DealsViewProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeals = deals.filter((deal) => {
    let matchesStatus = statusFilter === 'all';
    if (statusFilter === 'verification') {
      matchesStatus = deal.status === 'submitted' || deal.status === 'verified';
    } else if (statusFilter === 'funded') {
      matchesStatus = deal.status === 'deposited';
    } else if (statusFilter === 'in_progress') {
      matchesStatus = deal.status === 'signed';
    } else if (statusFilter === 'released') {
      matchesStatus = deal.status === 'released';
    }

    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.dealNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-[11px] font-semibold tracking-wide uppercase mb-2">
            <span>SPONSORSHIP DEALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All Sponsorship Campaigns
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor escrow balances, track deliverable status, and audit transparent 85/15 payouts.
          </p>
        </div>

        <button
          onClick={onOpenCreateDeal}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 hover:shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Deal</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deals, creator, or contract #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Deals' },
            { id: 'verification', label: 'In Verification' },
            { id: 'funded', label: 'Funded' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'released', label: 'Settled & Paid' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 font-medium border-b border-slate-100 pb-2">
              <tr>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Campaign</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Creator</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Gross Budget (₹)</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Creator (85% ₹)</th>
                <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                <th className="pb-3 text-right font-semibold uppercase tracking-wider text-[10px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No deals match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => {
                  let statusLabel = 'Funded';
                  let statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                  let dotColor = 'bg-emerald-500';

                  if (deal.status === 'submitted' || deal.status === 'verified') {
                    statusLabel = 'In Verification';
                    statusColor = 'bg-blue-50 text-blue-700 border-blue-100';
                    dotColor = 'bg-blue-500';
                  } else if (deal.status === 'signed') {
                    statusLabel = 'In Progress';
                    statusColor = 'bg-purple-50 text-purple-700 border-purple-100';
                    dotColor = 'bg-purple-500';
                  } else if (deal.status === 'deposited') {
                    if (deal.id === 'deal-004' || deal.title.includes('Product')) {
                      statusLabel = 'Awaiting Creator';
                      statusColor = 'bg-amber-50 text-amber-700 border-amber-100';
                      dotColor = 'bg-amber-500';
                    } else {
                      statusLabel = 'Funded';
                      statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                      dotColor = 'bg-emerald-500';
                    }
                  } else if (deal.status === 'released') {
                    statusLabel = 'Settled & Paid';
                    statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
                    dotColor = 'bg-slate-500';
                  }

                  return (
                    <tr key={deal.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={deal.thumbnailUrl || 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=100&auto=format&fit=crop&q=80'}
                            alt={deal.title}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 block truncate text-xs sm:text-sm">
                              {deal.title}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate">
                              {deal.dealNumber} • {deal.deliverableSummary || `${deal.platform} • 1 deliverable`}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={deal.creatorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                            alt={deal.creatorName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-medium text-slate-800 block truncate text-xs">
                              {deal.creatorHandle}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {deal.creatorFollowers || '1.2M followers'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-900 font-mono">
                        {formatINR(deal.grossBudget)}
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-emerald-600 font-mono">
                        {formatINR(deal.creatorPayout)}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                          <span>{statusLabel}</span>
                        </span>
                      </td>

                      <td className="py-3.5 pl-3 text-right">
                        <button
                          onClick={() => onSelectDeal(deal)}
                          className="px-3.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors shadow-2xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
