import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface CampaignDataPoint {
  period: string;
  campaign: string;
  projectedReach: number; // in thousands/millions
  actualReach: number;
  projectedEngagement: number;
  actualEngagement: number;
  status: 'completed' | 'in_progress';
}

const CAMPAIGN_METRICS_DATA: CampaignDataPoint[] = [
  {
    period: "Oct '25",
    campaign: "Festive Tech Launch",
    projectedReach: 420000,
    actualReach: 468000,
    projectedEngagement: 33600,
    actualEngagement: 39500,
    status: 'completed',
  },
  {
    period: "Nov '25",
    campaign: "Black Friday Push",
    projectedReach: 650000,
    actualReach: 712000,
    projectedEngagement: 52000,
    actualEngagement: 59800,
    status: 'completed',
  },
  {
    period: "Dec '25",
    campaign: "Year-End FinTech Blitz",
    projectedReach: 880000,
    actualReach: 945000,
    projectedEngagement: 70400,
    actualEngagement: 78900,
    status: 'completed',
  },
  {
    period: "Jan '26",
    campaign: "Q1 Brand Activation",
    projectedReach: 1150000,
    actualReach: 1280000,
    projectedEngagement: 92000,
    actualEngagement: 108400,
    status: 'completed',
  },
  {
    period: "Feb '26",
    campaign: "Creator Collab Sprint",
    projectedReach: 1480000,
    actualReach: 1625000,
    projectedEngagement: 118400,
    actualEngagement: 135200,
    status: 'completed',
  },
  {
    period: "Mar '26",
    campaign: "Spring Escrow Series (Current)",
    projectedReach: 1850000,
    actualReach: 2040000,
    projectedEngagement: 1480000 * 0.08,
    actualEngagement: 168500,
    status: 'in_progress',
  },
];

// Helper to format numbers cleanly (e.g. 1.2M, 450K)
function formatMetricNumber(val: number): string {
  if (val >= 1000000) {
    return `${(val / 1000000).toFixed(1)}M`;
  }
  if (val >= 1000) {
    return `${(val / 1000).toFixed(0)}K`;
  }
  return val.toString();
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  metricType: 'reach' | 'engagement' | 'both';
}

function CustomChartTooltip({ active, payload, label, metricType }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const currentItem = CAMPAIGN_METRICS_DATA.find((d) => d.period === label);
  const isReach = metricType === 'reach';
  const isEngagement = metricType === 'engagement';

  const projectedVal = isReach 
    ? currentItem?.projectedReach 
    : isEngagement 
    ? currentItem?.projectedEngagement 
    : currentItem?.projectedReach;

  const actualVal = isReach 
    ? currentItem?.actualReach 
    : isEngagement 
    ? currentItem?.actualEngagement 
    : currentItem?.actualReach;

  const deltaPercent = projectedVal && actualVal 
    ? (((actualVal - projectedVal) / projectedVal) * 100).toFixed(1) 
    : '0';
  const isPositive = Number(deltaPercent) >= 0;

  return (
    <div className="bg-[#0F172A] text-white p-3.5 rounded-xl shadow-xl border border-slate-700/60 text-xs min-w-[210px] space-y-2 animate-in fade-in zoom-in-95">
      <div className="border-b border-slate-700/60 pb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono font-bold text-slate-300">{label}</span>
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
            currentItem?.status === 'in_progress' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
          }`}>
            {currentItem?.status === 'in_progress' ? 'Pacing Active' : 'Audited'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
          {currentItem?.campaign}
        </p>
      </div>

      <div className="space-y-1.5 font-mono">
        {payload.map((entry, idx) => (
          <div key={`tooltip-${idx}`} className="flex items-center justify-between gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span 
                className="w-2 h-2 rounded-full inline-block shrink-0" 
                style={{ backgroundColor: entry.color }} 
              />
              {entry.name}:
            </span>
            <span className="font-bold text-white">
              {Number(entry.value).toLocaleString('en-US')}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Projection Delta:</span>
        <span className={`font-mono font-bold flex items-center gap-0.5 ${
          isPositive ? 'text-emerald-400' : 'text-rose-400'
        }`}>
          <ArrowUpRight className="w-3 h-3" />
          {isPositive ? `+${deltaPercent}%` : `${deltaPercent}%`}
        </span>
      </div>
    </div>
  );
}

export function CampaignReachChart() {
  const [metricMode, setMetricMode] = useState<'reach' | 'engagement' | 'both'>('reach');
  const [timeRange, setTimeRange] = useState<'6m' | '3m'>('6m');

  const chartData = timeRange === '3m' ? CAMPAIGN_METRICS_DATA.slice(-3) : CAMPAIGN_METRICS_DATA;

  // Aggregate stats
  const totalProjectedReach = chartData.reduce((sum, d) => sum + d.projectedReach, 0);
  const totalActualReach = chartData.reduce((sum, d) => sum + d.actualReach, 0);
  const reachDelta = (((totalActualReach - totalProjectedReach) / totalProjectedReach) * 100).toFixed(1);

  const totalProjectedEng = chartData.reduce((sum, d) => sum + d.projectedEngagement, 0);
  const totalActualEng = chartData.reduce((sum, d) => sum + d.actualEngagement, 0);
  const engDelta = (((totalActualEng - totalProjectedEng) / totalProjectedEng) * 100).toFixed(1);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header with Title & Interactive Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span>Campaign Growth & Pacing Intelligence</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Recharts Analytics Live
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Projected vs. actual audience reach and engagement growth tracked across escrow-verified campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls: Metric Type & Horizon */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Metric Selector Pills */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/80">
            <button
              onClick={() => setMetricMode('reach')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metricMode === 'reach'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Audience Reach
            </button>
            <button
              onClick={() => setMetricMode('engagement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metricMode === 'engagement'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Engagement Growth
            </button>
            <button
              onClick={() => setMetricMode('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                metricMode === 'both'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Metrics
            </button>
          </div>

          {/* Time Range Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/80">
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                timeRange === '6m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              6M
            </button>
            <button
              onClick={() => setTimeRange('3m')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                timeRange === '3m' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              3M
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
            Aggregated Reach
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-black font-mono text-slate-900">
              {formatMetricNumber(totalActualReach)}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">
              +{reachDelta}% vs proj.
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
            Total Engagements
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-black font-mono text-slate-900">
              {formatMetricNumber(totalActualEng)}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">
              +{engDelta}% vs proj.
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
            Avg. Engagement Rate
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-black font-mono text-slate-900">
              {((totalActualEng / (totalActualReach || 1)) * 100).toFixed(2)}%
            </span>
            <span className="text-xs font-medium text-slate-500">
              Target: 7.5%
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 block">
            Deliverable Compliance
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-lg font-black font-mono text-emerald-800">
              100%
            </span>
            <span className="text-[11px] text-slate-500 font-medium truncate">
              Escrow-verified
            </span>
          </div>
        </div>
      </div>

      {/* Main Recharts Bar Chart Container */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 12, right: 16, left: -10, bottom: 4 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="period"
              stroke="#64748B"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              fontWeight={500}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tickFormatter={(v) => formatMetricNumber(v)}
            />
            <Tooltip
              content={<CustomChartTooltip metricType={metricMode} />}
              cursor={{ fill: '#F1F5F9', opacity: 0.6 }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontWeight: 600 }}
            />

            {/* Reach Metric Bars */}
            {(metricMode === 'reach' || metricMode === 'both') && (
              <>
                <Bar
                  dataKey="projectedReach"
                  name="Projected Reach"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
                <Bar
                  dataKey="actualReach"
                  name="Actual Reach"
                  fill="#0F172A"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              </>
            )}

            {/* Engagement Metric Bars */}
            {(metricMode === 'engagement' || metricMode === 'both') && (
              <>
                <Bar
                  dataKey="projectedEngagement"
                  name="Projected Engagement"
                  fill="#A7F3D0"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
                <Bar
                  dataKey="actualEngagement"
                  name="Actual Engagement"
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Legend & Key Takeaways */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0] text-xs text-slate-500">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#94A3B8] inline-block" />
            <span className="font-medium">Projected Benchmark</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#0F172A] inline-block" />
            <span className="font-bold text-slate-800">Actual Realized Reach</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#059669] inline-block" />
            <span className="font-bold text-emerald-800">Actual Engagement</span>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          Source: Non-custodial escrow analytics oracle
        </span>
      </div>
    </div>
  );
}
