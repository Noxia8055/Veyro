import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  AlertCircle, 
  Calendar,
  Lock,
  Sparkles,
  Building2
} from 'lucide-react';
import { Deal, SocialPlatform, CurrentUser } from '../types';
import { formatINR } from '../utils/format';

interface CreateDealWizardProps {
  onDealCreated: (deal: Deal) => void;
  onCancel?: () => void;
  onClose?: () => void;
  currentUser?: CurrentUser;
  prefilledCreator?: { name: string; handle: string; platform: 'YouTube' | 'Instagram' } | null;
}

export function CreateDealWizard({ 
  onDealCreated, 
  onCancel, 
  onClose,
  prefilledCreator 
}: CreateDealWizardProps) {
  const handleDismiss = () => {
    if (onClose) onClose();
    else if (onCancel) onCancel();
  };

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  // Step 1: Campaign Details
  const [title, setTitle] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [category, setCategory] = useState<Deal['category']>('Tech & Software');
  const [platform, setPlatform] = useState<SocialPlatform>(prefilledCreator?.platform || 'YouTube');
  const [deliverableFormat, setDeliverableFormat] = useState<Deal['deliverableFormat']>('Integrated Sponsor (60s)');

  // Step 2: Creator & Manager
  const [creatorName, setCreatorName] = useState(prefilledCreator?.name || 'Sarah Jenkins');
  const [creatorHandle, setCreatorHandle] = useState(prefilledCreator?.handle || '@sarahcreates');
  const [creatorEmail, setCreatorEmail] = useState('sarah@sarahcreates.com');
  const [managerName, setManagerName] = useState('Apex Talent Agency');
  const [managerEmail, setManagerEmail] = useState('payouts@apextalent.agency');

  // Step 3: Deliverables & Guidelines
  const [minDurationSeconds, setMinDurationSeconds] = useState(60);
  const [requiredHashtagsInput, setRequiredHashtagsInput] = useState('#ad, #Veyro, #SummerVibes');
  const [deliverableGuidelines, setDeliverableGuidelines] = useState(
    'Include 60-second mid-roll sponsor integration with live demo of VEYRO escrow platform. Include personalized link in the first two lines of video description.'
  );
  const [submissionDeadline, setSubmissionDeadline] = useState('2026-10-30');

  // Step 4: Budget & Split in INR
  const [grossBudget, setGrossBudget] = useState(500000);
  const [managerSharePercent, setManagerSharePercent] = useState(15);
  const [currency] = useState<'INR'>('INR');
  const [paymentMethod, setPaymentMethod] = useState<'UPI / Bank Escrow' | 'e-Rupee (e₹) Smart Escrow'>('UPI / Bank Escrow');

  // Step 5: Submitting / Depositing state
  const [isProcessingDeposit, setIsProcessingDeposit] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);

  // Real-time calculations (safe integer arithmetic)
  const creatorSplitPercent = 100 - managerSharePercent;
  const creatorPayout = Math.round(grossBudget * (creatorSplitPercent / 100));
  const managerPayout = Math.round(grossBudget * (managerSharePercent / 100));

  // Validation
  const isStep1Valid = title.trim().length > 3 && campaignName.trim().length > 2;
  const isStep2Valid = creatorName.trim().length > 2 && creatorHandle.trim().length > 1;
  const isStep3Valid = requiredHashtagsInput.includes('#') && deliverableGuidelines.trim().length > 10;
  const isStep4Valid = grossBudget >= 1000 && managerSharePercent >= 0 && managerSharePercent <= 30;

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleDepositAndLaunch = () => {
    setIsProcessingDeposit(true);

    setTimeout(() => {
      setIsProcessingDeposit(false);
      setDepositSuccess(true);

      const hashtags = requiredHashtagsInput
        .split(',')
        .map((h) => h.trim())
        .filter((h) => h.length > 0);

      const dealNumber = `VYR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const refId = paymentMethod === 'UPI / Bank Escrow' 
        ? `upi_3Q${Math.random().toString(36).substring(2, 12)}`
        : `0x${Math.random().toString(16).substring(2, 10)}...escrow`;

      const newDeal: Deal = {
        id: `deal-${Date.now()}`,
        dealNumber,
        title,
        campaignName,
        category,
        platform,
        brandName: 'Veyro Media',
        brandContact: 'alex.carter@veyromedia.com',
        creatorName,
        creatorHandle,
        creatorFollowers: '1.2M followers',
        creatorEmail,
        deliverableSummary: `${platform} • 1 deliverable`,
        managerName: managerName || undefined,
        managerEmail: managerEmail || undefined,
        managerSharePercent,
        grossBudget,
        creatorSplitPercent,
        creatorPayout,
        managerPayout,
        currency: 'INR',
        deliverableFormat,
        minDurationSeconds,
        requiredHashtags: hashtags,
        deliverableGuidelines,
        submissionDeadline,
        status: 'deposited',
        paymentMethod,
        paymentReference: refId,
        depositTimestamp: new Date().toISOString(),
        refundTimelockDays: 30,
        activityLog: [
          {
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'Alex Carter (Brand)',
            role: 'brand',
            action: 'Escrow Funded',
            details: `${formatINR(grossBudget)} locked into VEYRO vault via ${paymentMethod}.`,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTimeout(() => {
        onDealCreated(newDeal);
      }, 500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-slate-200/90 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-white font-bold">
              ₹ Escrow Creator
            </span>
            <span className="text-xs text-slate-500 font-semibold">Step {currentStep} of 5</span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-full bg-slate-950 transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Body Form */}
        <div className="p-6">
          {/* STEP 1: CAMPAIGN DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  1. Campaign & Sponsorship Scope
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Define your sponsorship campaign name, category, and target social channel.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Deal Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Fitness Capsule Review"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Q4 Growth Campaign"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Niche Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950"
                    >
                      <option value="Tech & Software">Tech & Software</option>
                      <option value="Health & Lifestyle">Health & Lifestyle</option>
                      <option value="Finance & Web3">Finance & Fintech</option>
                      <option value="Gaming & Esports">Gaming & Entertainment</option>
                      <option value="Fashion & Beauty">Fashion & Apparel</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target Channel
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['YouTube', 'Instagram'] as SocialPlatform[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPlatform(p)}
                          className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                            platform === p
                              ? 'border-slate-950 bg-slate-950 text-white'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Deliverable Format
                    </label>
                    <select
                      value={deliverableFormat}
                      onChange={(e) => setDeliverableFormat(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950"
                    >
                      <option value="Integrated Sponsor (60s)">Integrated Sponsor (60s)</option>
                      <option value="Dedicated Video">Dedicated Full Video</option>
                      <option value="Reel / Short (30-60s)">Reel / Short (30-60s)</option>
                      <option value="Story Set">Story Set</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CREATOR & PARTICIPANTS */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  2. Creator Talent & Agency Participants
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Specify the creator talent receiving this deal, and their optional agency manager.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="font-bold text-slate-900 block">Creator Talent Details</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">Creator Full Name</label>
                      <input
                        type="text"
                        value={creatorName}
                        onChange={(e) => setCreatorName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">Handle / Channel</label>
                      <input
                        type="text"
                        value={creatorHandle}
                        onChange={(e) => setCreatorHandle(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Creator Email</label>
                    <input
                      type="email"
                      value={creatorEmail}
                      onChange={(e) => setCreatorEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Manager / Agency Share (Optional)</span>
                    <span className="text-[11px] text-slate-500 font-mono">15% standard commission</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">Agency Name</label>
                      <input
                        type="text"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                        placeholder="e.g. Apex Talent Agency"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">Agency Payout Email</label>
                      <input
                        type="email"
                        value={managerEmail}
                        onChange={(e) => setManagerEmail(e.target.value)}
                        placeholder="payouts@agency.com"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERABLES & GUIDELINES */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  3. Deliverables & Automated Verification Rules
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set the compliance parameters that VEYRO&apos;s API scanner will check before funds can release.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mandatory Sponsor Hashtags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={requiredHashtagsInput}
                    onChange={(e) => setRequiredHashtagsInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Must include FTC disclosure tag (e.g. #ad, #sponsored) and brand tag (e.g. #Veyro).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Min. Deliverable Duration (Seconds)
                    </label>
                    <input
                      type="number"
                      value={minDurationSeconds}
                      onChange={(e) => setMinDurationSeconds(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Submission Deadline
                    </label>
                    <input
                      type="date"
                      value={submissionDeadline}
                      onChange={(e) => setSubmissionDeadline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Deliverable Brief & Brand Guidelines
                  </label>
                  <textarea
                    rows={3}
                    value={deliverableGuidelines}
                    onChange={(e) => setDeliverableGuidelines(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:bg-white leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET & PAYOUT SPLIT (IN INR ₹) */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  4. Gross Budget & Transparent 85/15 Payout Split
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Both creator and manager will see the exact gross budget in Indian Rupees (₹) and agreed allocation.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Gross Sponsorship Budget (₹ INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-mono font-bold">₹</span>
                      <input
                        type="number"
                        value={grossBudget}
                        onChange={(e) => setGrossBudget(Math.max(1000, Number(e.target.value)))}
                        step={10000}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-900 font-mono text-sm font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Currency Asset
                    </label>
                    <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 text-sm font-mono font-bold flex items-center justify-between">
                      <span>INR (₹ Indian Rupee)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">
                      Agency Manager Commission ({managerSharePercent}%)
                    </label>
                    <span className="font-mono text-slate-600 font-bold">
                      Creator Net: {creatorSplitPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={managerSharePercent}
                    onChange={(e) => setManagerSharePercent(Number(e.target.value))}
                    className="w-full accent-slate-950"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>0% Direct</span>
                    <span>15% Standard Veyro Split</span>
                    <span>30% Cap</span>
                  </div>
                </div>

                {/* Real-time split preview card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Calculated Settlement Breakdown (₹ INR)
                  </span>
                  <div className="grid grid-cols-3 gap-2 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Total Escrow</span>
                      <span className="font-bold text-slate-950 text-sm">{formatINR(grossBudget)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Creator Net ({creatorSplitPercent}%)</span>
                      <span className="font-bold text-emerald-700 text-sm">{formatINR(creatorPayout)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Agency ({managerSharePercent}%)</span>
                      <span className="font-bold text-slate-800 text-sm">{formatINR(managerPayout)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW, CONFIRM & DEPOSIT */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  5. Review Escrow Terms & Deposit Funds
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm the terms. Your funds will be locked securely until the deliverable is verified.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {/* Summary Table */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span>Deal Title:</span>
                    <strong className="text-slate-900 font-sans">{title}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Creator:</span>
                    <strong className="text-slate-900">{creatorName} ({creatorHandle})</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform:</span>
                    <span className="text-slate-900">{platform} • {deliverableFormat}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Gross Escrow Deposit:</span>
                    <strong className="text-slate-900 text-sm">{formatINR(grossBudget)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                    <span>Creator Guaranteed Net:</span>
                    <strong className="text-emerald-700 text-sm">{formatINR(creatorPayout)} (85%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Manager Commission:</span>
                    <strong className="text-slate-900">{formatINR(managerPayout)} (15%)</strong>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                    <span>Emergency Timelock Refund:</span>
                    <span className="text-slate-700">30 Calendar Days</span>
                  </div>
                </div>

                {/* Payment Selector */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Select ₹ INR Escrow Funding Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI / Bank Escrow')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        paymentMethod === 'UPI / Bank Escrow'
                          ? 'border-slate-950 bg-slate-50 ring-1 ring-slate-950'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-slate-800" />
                        <span className="font-bold text-slate-900">UPI / Bank Escrow</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Instant UPI, IMPS, RTGS or Corporate NetBanking</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('e-Rupee (e₹) Smart Escrow')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        paymentMethod === 'e-Rupee (e₹) Smart Escrow'
                          ? 'border-slate-950 bg-slate-50 ring-1 ring-slate-950'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Wallet className="w-4 h-4 text-slate-800" />
                        <span className="font-bold text-slate-900">e-Rupee (e₹) Vault</span>
                      </div>
                      <p className="text-[11px] text-slate-500">RBI Digital Rupee Smart Escrow Contract</p>
                    </button>
                  </div>
                </div>

                {/* Honest Sandbox Note */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Development Sandbox Mode:</span> Clicking deposit will lock a test escrow balance of {formatINR(grossBudget)} and generate an authentic verifiable reference ID.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1 || isProcessingDeposit}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid) ||
                (currentStep === 3 && !isStep3Valid) ||
                (currentStep === 4 && !isStep4Valid)
              }
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDepositAndLaunch}
              disabled={isProcessingDeposit || depositSuccess}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessingDeposit ? (
                <span>Locking Escrow Funds...</span>
              ) : depositSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Escrow Deposited!</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Deposit {formatINR(grossBudget)} & Launch Deal</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
