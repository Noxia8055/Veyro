import { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Lock, 
  DollarSign, 
  FileText, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  Briefcase, 
  Video, 
  Layers,
  ArrowRight,
  Download,
  AlertTriangle
} from 'lucide-react';
import { Deal, CurrentUser, UserRole } from '../types';
import { ContractProgressStepper } from './ContractProgressStepper';
import { formatINR } from '../utils/format';

interface DealDetailModalProps {
  deal: Deal;
  currentUser: CurrentUser;
  onClose: () => void;
  onCoSign: (dealId: string) => void;
  onOpenSubmitVideo: (deal: Deal) => void;
  onReleasePayout: (dealId: string) => void;
  onRequestRefund: (dealId: string) => void;
}

export function DealDetailModal({
  deal,
  currentUser,
  onClose,
  onCoSign,
  onOpenSubmitVideo,
  onReleasePayout,
  onRequestRefund,
}: DealDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agreement' | 'deliverable' | 'activity'>('overview');
  const [isSigning, setIsSigning] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);

  const canCoSign = deal.status === 'deposited' && (currentUser.role === 'creator' || currentUser.role === 'admin');
  const canSubmitVideo = deal.status === 'signed' && (currentUser.role === 'creator' || currentUser.role === 'admin');
  const canRelease = (deal.status === 'submitted' || deal.status === 'verified') && (currentUser.role === 'brand' || currentUser.role === 'admin');

  const handleCoSignClick = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setSignedSuccess(true);
      setTimeout(() => {
        onCoSign(deal.id);
      }, 600);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
              {deal.dealNumber}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                  deal.status === 'deposited'
                    ? 'bg-amber-100 text-amber-800'
                    : deal.status === 'signed'
                    ? 'bg-blue-100 text-blue-800'
                    : deal.status === 'submitted' || deal.status === 'verified'
                    ? 'bg-purple-100 text-purple-800'
                    : deal.status === 'released'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {deal.status === 'deposited' ? 'Funded (Awaiting Co-Sign)' : deal.status}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Deal Title & Stepper Banner */}
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{deal.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Campaign: {deal.campaignName} • {deal.platform} ({deal.deliverableFormat})
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                Gross Escrow
              </span>
              <p className="text-xl font-bold font-mono text-slate-900">
                {formatINR(deal.grossBudget)}
              </p>
            </div>
          </div>

          <ContractProgressStepper status={deal.status} />
        </div>

        {/* Sub Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-4 text-xs font-medium bg-slate-50/50">
          {[
            { id: 'overview', label: 'Deal Overview' },
            { id: 'agreement', label: 'Agreement & Terms' },
            { id: 'deliverable', label: 'Deliverable & Verification' },
            { id: 'activity', label: 'Audit Log' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3 border-b-2 transition-all ${
                activeTab === t.id
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Financial Split Breakdown Card */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">
                    Transparent Financial Allocation (85 / 15 Rule)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                    Net-0 Payout Guarantee
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">1. Gross Escrow</span>
                    <p className="text-base font-bold text-slate-900 mt-1">
                      {formatINR(deal.grossBudget)}
                    </p>
                    <span className="text-[10px] text-slate-500">Funded via {deal.paymentMethod}</span>
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">2. Creator Share ({deal.creatorSplitPercent}%)</span>
                    <p className="text-base font-bold text-emerald-700 mt-1">
                      {formatINR(deal.creatorPayout)}
                    </p>
                    <span className="text-[10px] text-emerald-700 font-medium">To {deal.creatorName}</span>
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase block">3. Manager Cut ({deal.managerSharePercent}%)</span>
                    <p className="text-base font-bold text-slate-700 mt-1">
                      {formatINR(deal.managerPayout)}
                    </p>
                    <span className="text-[10px] text-slate-500">To {deal.managerName || 'Agency'}</span>
                  </div>
                </div>
              </div>

              {/* Participants Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <Briefcase className="w-4 h-4 text-slate-500" />
                    <span>Sponsoring Brand</span>
                  </div>
                  <p className="text-slate-800 font-medium">{deal.brandName}</p>
                  <p className="text-slate-500 font-mono text-[11px]">{deal.brandContact}</p>
                  <div className="pt-2 text-[11px] text-slate-400 font-mono">
                    Escrow Ref: {deal.paymentReference || 'vault_locked'}
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <Video className="w-4 h-4 text-slate-500" />
                    <span>Creator Talent</span>
                  </div>
                  <p className="text-slate-800 font-medium">
                    {deal.creatorName} ({deal.creatorHandle})
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">{deal.creatorEmail}</p>
                  <div className="pt-2 text-[11px] text-slate-400 font-mono">
                    Signed: {deal.creatorSignedAt ? new Date(deal.creatorSignedAt).toLocaleDateString() : 'Awaiting Co-Sign'}
                  </div>
                </div>
              </div>

              {/* Requirements & Guidelines */}
              <div className="p-4 rounded-lg border border-slate-200 space-y-3">
                <span className="font-semibold text-slate-900 block">Deliverable Requirements</span>
                <p className="text-slate-600 leading-relaxed">{deal.deliverableGuidelines}</p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px]">
                  <div>
                    <span className="text-slate-400">Required Hashtags:</span>
                    <div className="flex gap-1.5 mt-1 font-mono">
                      {deal.requiredHashtags.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-slate-800 font-semibold">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Min Duration:</span>
                    <p className="font-mono font-semibold text-slate-800 mt-1">{deal.minDurationSeconds} seconds</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Deadline:</span>
                    <p className="font-mono font-semibold text-slate-800 mt-1">{deal.submissionDeadline}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AGREEMENT */}
          {activeTab === 'agreement' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <FileText className="w-4 h-4 text-slate-700" />
                    <span>Digital Co-Sponsorship Agreement</span>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    Binding Escrow Terms
                  </span>
                </div>

                <div className="bg-white p-4 rounded border border-slate-200 text-slate-600 font-mono text-[11px] leading-relaxed space-y-2 max-h-48 overflow-y-auto">
                  <p>
                    <strong>PARTIES:</strong> {deal.brandName} (&quot;Brand&quot;) and {deal.creatorName} (&quot;Creator&quot;) represented by {deal.managerName || 'Direct'} (&quot;Manager&quot;).
                  </p>
                  <p>
                    <strong>1. GROSS DEPOSIT:</strong> The Brand has locked {formatINR(deal.grossBudget)} in non-custodial VEYRO ₹ INR escrow.
                  </p>
                  <p>
                    <strong>2. PAYOUT ALLOCATION:</strong> Upon automated verification of the published link containing required hashtags ({deal.requiredHashtags.join(', ')}), {formatINR(deal.creatorPayout)} (85%) shall release to Creator and {formatINR(deal.managerPayout)} (15%) shall release to Manager simultaneously.
                  </p>
                  <p>
                    <strong>3. TIMELOCK REFUND:</strong> If no compliant deliverable is submitted within 30 days of the deadline ({deal.submissionDeadline}), Brand may initiate a one-click escrow refund.
                  </p>
                </div>

                {/* Signature status */}
                <div className="pt-2 grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="text-slate-400 block">Brand Authorization:</span>
                    <span className="font-semibold text-emerald-700">Verified • Escrow Funded</span>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">Ref: {deal.paymentReference}</p>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-slate-200">
                    <span className="text-slate-400 block">Creator Co-Signature:</span>
                    {deal.creatorSignedAt ? (
                      <div>
                        <span className="font-semibold text-emerald-700">Signed on {new Date(deal.creatorSignedAt).toLocaleDateString()}</span>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">Hash: {deal.creatorSignatureHash || 'sig_ed25519_verified'}</p>
                      </div>
                    ) : (
                      <span className="text-amber-700 font-semibold">Pending Creator Co-Sign</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DELIVERABLE & VERIFICATION */}
          {activeTab === 'deliverable' && (
            <div className="space-y-4">
              {deal.submittedVideoUrl ? (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Submitted Deliverable Proof</span>
                    <a
                      href={deal.submittedVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-mono text-[11px] hover:underline"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200 font-mono text-[11px]">
                    <span className="text-slate-400 block">Video URL:</span>
                    <span className="text-slate-900 break-all font-semibold">{deal.submittedVideoUrl}</span>
                  </div>

                  {deal.verificationResult && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-emerald-950">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Automated Verification Passed</span>
                      </div>
                      <p className="text-emerald-800 leading-relaxed text-[11px]">
                        {deal.verificationResult.notes}
                      </p>
                      <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-2 text-[10px] text-emerald-900 font-mono">
                        <div>Verified Hashtags: {deal.verificationResult.hashtagsFound.join(', ')}</div>
                        <div>Duration: {deal.verificationResult.durationSeconds}s (Min {deal.verificationResult.minDurationSeconds}s)</div>
                        <div className="col-span-2 text-emerald-700">Adapter: {deal.verificationResult.adapterUsed}</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="font-semibold text-slate-900">No deliverable submitted yet</p>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    Creator will publish the video on {deal.platform} with hashtags {deal.requiredHashtags.join(' ')} and submit the live URL.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AUDIT LOG */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              {deal.activityLog.map((act) => (
                <div key={act.id} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-slate-900">{act.action}</span>
                    <span className="text-slate-400 font-mono">{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{act.details}</p>
                  <span className="text-[10px] text-slate-400 font-mono block">By {act.actor}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Contextual Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[11px] text-slate-500 font-mono">
            {deal.status === 'released' ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Payout Completed</span>
              </span>
            ) : (
              <span>Escrow protected by VEYRO Protocol</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Creator Co-Sign Button */}
            {canCoSign && (
              <button
                onClick={handleCoSignClick}
                disabled={isSigning || signedSuccess}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md shadow-xs transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                {isSigning ? (
                  <span>Co-signing Agreement...</span>
                ) : signedSuccess ? (
                  <span>Signed!</span>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Co-Sign Agreement ({formatINR(deal.creatorPayout)} Net)</span>
                  </>
                )}
              </button>
            )}

            {/* Creator Submit Video Button */}
            {canSubmitVideo && (
              <button
                onClick={() => onOpenSubmitVideo(deal)}
                className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md shadow-xs transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Submit Video URL</span>
              </button>
            )}

            {/* Brand / Admin Release Payout Button */}
            {canRelease && (
              <button
                onClick={() => onReleasePayout(deal.id)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-md shadow-xs transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Release 85/15 Payout Now</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-3.5 py-2 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
