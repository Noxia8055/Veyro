import React from 'react';

interface PanelSkeletonProps {
  type?: 'cards' | 'table' | 'details' | 'dashboard';
}

export function PanelSkeleton({ type = 'dashboard' }: PanelSkeletonProps) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100" />
              <div className="w-20 h-5 rounded-full bg-slate-100" />
            </div>
            <div className="space-y-2">
              <div className="w-3/4 h-5 rounded bg-slate-100" />
              <div className="w-1/2 h-4 rounded bg-slate-100" />
            </div>
            <div className="pt-3 border-t border-[#E2E8F0] flex justify-between">
              <div className="w-24 h-4 rounded bg-slate-100" />
              <div className="w-16 h-4 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-4 animate-pulse">
        <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0]">
          <div className="w-48 h-6 rounded bg-slate-100" />
          <div className="w-28 h-8 rounded-xl bg-slate-100" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100" />
                <div className="space-y-1.5">
                  <div className="w-36 h-4 rounded bg-slate-100" />
                  <div className="w-24 h-3 rounded bg-slate-100" />
                </div>
              </div>
              <div className="w-24 h-4 rounded bg-slate-100" />
              <div className="w-20 h-6 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="w-32 h-5 rounded-full bg-slate-100" />
          <div className="w-64 h-8 rounded-lg bg-slate-100" />
          <div className="w-80 h-4 rounded bg-slate-100" />
        </div>
        <div className="flex gap-2">
          <div className="w-28 h-9 rounded-xl bg-slate-100" />
          <div className="w-32 h-9 rounded-xl bg-slate-100" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-3">
            <div className="w-24 h-3.5 rounded bg-slate-100" />
            <div className="w-32 h-8 rounded bg-slate-100" />
            <div className="w-20 h-3 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4">
          <div className="w-48 h-6 rounded bg-slate-100" />
          <div className="w-full h-44 rounded-xl bg-slate-100" />
          <div className="space-y-2 pt-2">
            <div className="w-full h-4 rounded bg-slate-100" />
            <div className="w-5/6 h-4 rounded bg-slate-100" />
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4">
          <div className="w-36 h-6 rounded bg-slate-100" />
          <div className="w-full h-32 rounded-xl bg-slate-100" />
          <div className="w-full h-20 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
