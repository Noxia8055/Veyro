import { CheckCircle2, Clock, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { DealStatus } from '../types';

interface StepperProps {
  status: DealStatus;
  txHashes?: {
    depositTx?: string;
    signTx?: string;
    proofTx?: string;
    verifyTx?: string;
    releaseTx?: string;
  };
  compact?: boolean;
}

interface StepItem {
  id: number;
  key: DealStatus;
  label: string;
  sublabel: string;
  description: string;
  txKey?: 'depositTx' | 'signTx' | 'proofTx' | 'verifyTx' | 'releaseTx';
}

const STEPS: StepItem[] = [
  {
    id: 1,
    key: 'deposited',
    label: 'Brand Deposited',
    sublabel: 'Escrow Locked',
    description: '100% campaign budget locked in smart contract vault',
    txKey: 'depositTx',
  },
  {
    id: 2,
    key: 'signed',
    label: 'Creator Signed',
    sublabel: 'Dual Signature Active',
    description: 'Creator verified gross budget and signed on-chain',
    txKey: 'signTx',
  },
  {
    id: 3,
    key: 'submitted',
    label: 'Video Posted & Verified',
    sublabel: 'Automated Audit',
    description: 'API adapter confirmed hashtags and video duration',
    txKey: 'verifyTx',
  },
  {
    id: 4,
    key: 'released',
    label: 'Payout Released',
    sublabel: '85/15 Split Executed',
    description: 'Simultaneous payout to creator and manager completed',
    txKey: 'releaseTx',
  },
];

const STATUS_ORDER: Record<DealStatus, number> = {
  draft: 0,
  deposited: 1,
  signed: 2,
  submitted: 3,
  verified: 3,
  released: 4,
  disputed: 99,
  refunded: 99,
};

export function ContractProgressStepper({ status, txHashes, compact = false }: StepperProps) {
  const currentStep = STATUS_ORDER[status] || 1;
  const isDisputed = status === 'disputed';
  const isRefunded = status === 'refunded';

  if (compact) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-mono">
          <span>Escrow Progress</span>
          <span className="font-medium text-slate-900">
            {currentStep >= 4 ? '4/4 Completed' : `Stage ${currentStep} of 4`}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-1.5">
          {STEPS.map((step) => {
            const isComplete = currentStep > step.id || currentStep === 4;
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                className={`h-full rounded-full transition-colors ${
                  isComplete
                    ? 'bg-emerald-600'
                    : isCurrent
                    ? 'bg-slate-900'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Automated Escrow Protocol Timeline
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono text-slate-500">
          <span>Polygon Amoy</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      <div className="relative">
        {/* Desktop progress bar */}
        <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
          <div
            className="h-full bg-emerald-600 transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, ((currentStep - 1) / 3) * 100))}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {STEPS.map((step) => {
            const isComplete = currentStep > step.id || currentStep === 4;
            const isCurrent = currentStep === step.id;
            const tx = txHashes && step.txKey ? txHashes[step.txKey] : undefined;

            return (
              <div key={step.id} className="flex md:flex-col items-start gap-3 md:gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-colors shrink-0 ${
                    isComplete
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-slate-900 text-white ring-4 ring-slate-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <span>0{step.id}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-sm font-semibold ${isCurrent ? 'text-slate-900' : isComplete ? 'text-slate-800' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{step.sublabel}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed hidden md:block">
                    {step.description}
                  </p>

                  {tx && (
                    <a
                      href={`https://amoy.polygonscan.com/tx/${tx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-900 mt-2 hover:underline"
                    >
                      <span>Tx {tx.slice(0, 6)}...{tx.slice(-4)}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {(isDisputed || isRefunded) && (
        <div className="mt-4 p-3 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <span>
            {isDisputed
              ? 'Status: Deal is currently in dispute mediation mode.'
              : 'Status: Deal expired timelock and brand refund was processed.'}
          </span>
          <span className="font-mono text-amber-700">Contract Locked</span>
        </div>
      )}
    </div>
  );
}
