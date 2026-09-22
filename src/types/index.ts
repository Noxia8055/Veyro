export type UserRole = 'brand' | 'creator' | 'manager' | 'admin';

export type DealStatus = 
  | 'draft'
  | 'deposited'
  | 'signed'
  | 'submitted'
  | 'verified'
  | 'released'
  | 'disputed'
  | 'refunded';

export type SocialPlatform = 'YouTube' | 'Instagram' | 'TikTok';

export interface VerificationResult {
  isVerified: boolean;
  checkedAt: string;
  sourceUrl: string;
  platform: SocialPlatform;
  urlFormatValid: boolean;
  contentIsLive: boolean;
  hashtagsFound: string[];
  missingHashtags: string[];
  durationSeconds?: number;
  minDurationSeconds: number;
  notes: string;
  adapterUsed: 'YouTube Data API v3 (Sandbox Adapter)' | 'Instagram Graph API (Sandbox Adapter)' | 'Direct Link Inspector';
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  details: string;
  txHash?: string;
}

export interface Deal {
  id: string;
  dealNumber: string;
  title: string;
  campaignName: string;
  category: 'Tech & Software' | 'Fintech & Finance' | 'Health & Lifestyle' | 'Gaming & Entertainment' | 'B2B & SaaS';
  platform: SocialPlatform;
  
  // Parties
  brandName: string;
  brandContact: string;
  brandAvatar?: string;
  
  creatorName: string;
  creatorHandle: string;
  creatorEmail: string;
  creatorAvatar?: string;
  creatorFollowers?: string;
  thumbnailUrl?: string;
  deliverableSummary?: string;
  
  managerName?: string;
  managerEmail?: string;
  managerSharePercent: number; // e.g. 15%
  
  // Financial Transparency
  grossBudget: number; // in INR (₹)
  creatorSplitPercent: number; // e.g. 85%
  creatorPayout: number; // grossBudget * (creatorSplitPercent / 100)
  managerPayout: number; // grossBudget * (managerSharePercent / 100)
  currency: 'INR' | 'INR-Escrow';
  
  // Deliverable specifications
  deliverableFormat: 'Dedicated Video' | 'Integrated Sponsor (60s)' | 'Reel / Short (30-60s)' | 'Story Set';
  minDurationSeconds: number;
  requiredHashtags: string[];
  deliverableGuidelines: string;
  submissionDeadline: string;
  
  // Status and Timeline
  status: DealStatus;
  
  // Escrow & Payment Details
  paymentMethod: 'UPI / Bank Escrow' | 'e-Rupee (e₹) Smart Escrow' | 'Razorpay Escrow';
  paymentReference?: string;
  depositTimestamp?: string;
  refundTimelockDays: number; // e.g. 30 days
  
  // Creator Co-signature
  creatorSignedAt?: string;
  creatorSignatureHash?: string;
  
  // Deliverable Submission & Verification
  submittedVideoUrl?: string;
  submittedAt?: string;
  verificationResult?: VerificationResult;
  
  // Payout Release
  releasedAt?: string;
  releaseReference?: string;
  
  // Dispute/Refund
  disputeReason?: string;
  refundedAt?: string;
  
  // Virality Bonus & Dynamic Milestones
  viralityBonus?: {
    enabled: boolean;
    milestoneViews: number; // e.g. 100000
    windowHours: number; // e.g. 48
    bonusAmount: number; // e.g. 1500
    currentViews?: number;
    unlocked?: boolean;
    hoursLeft?: number;
  };
  
  // AI Compliance Rules
  aiCompliance?: {
    minLogoExposureSeconds: number; // e.g. 10
    brandVoiceMentionRequired: boolean;
    requiredAudioKeywords: string[];
    logoVerifiedDuration?: number;
    transcriptScore?: number;
  };

  // Audit Trail
  activityLog: ActivityLogEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ViralityBonusPool {
  milestoneViews: number;
  windowHours: number;
  bonusAmount: number;
  currentViews: number;
  unlocked: boolean;
  hoursLeft: number;
}

export interface AgencyProfile {
  id: string;
  name: string;
  handle: string;
  logo: string;
  verified: boolean;
  reliabilityScore: number; // 0 - 100
  managedCreatorsCount: number;
  totalHistoricalReach: string;
  avgApprovalHours: number;
  activeDeals: number;
  specialization: string;
}

export interface CreatorProfileExtended {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  category: string;
  platform: SocialPlatform;
  verified: boolean;
  rating: string;
  completedCampaigns: number;
  onTimeDeliveryRate: string;
  avgEngagementRate: string;
  p50Views: string;
  p90Views: string;
  rates: {
    shorts: number;
    reels: number;
    dedicated: number;
  };
  audienceGeo: { country: string; percent: number }[];
  audienceAge: { bracket: string; percent: number }[];
  audienceOverlapScore: number; // 0 - 100%
  eqiScore: number; // Engagement Quality Index 0 - 100
  botAuthenticityScore: number; // 0 - 100%
  brandSafetyRating: 'A+' | 'A' | 'B+';
  projectedRoas: number; // e.g. 3.8x
  bio: string;
}

export interface BrandLeaderboardItem {
  id: string;
  brandName: string;
  logo: string;
  category: string;
  totalPaid: number;
  avgApprovalHours: number;
  viralityBonusFrequency: string;
  reliabilityScore: number;
  openCampaignsCount: number;
  promptPayBadge: boolean;
}

export interface CountryTrendGenre {
  genre: string;
  growthPercent: number;
  avgCpm: number;
  hotFormat: string;
  topAudioHook: string;
  sampleEngagement: string;
}

export interface PlatformCpmBenchmark {
  platform: SocialPlatform;
  niche: string;
  microCpm: number;
  midCpm: number;
  macroCpm: number;
  quarterTrend: '+14%' | '+8%' | '+22%' | '-3%';
}

export interface YieldVaultState {
  isYieldEnabled: boolean;
  apyPercent: number; // e.g. 4.82%
  yieldAccumulatedUsdc: number;
  vaultProvider: 'Aave V3' | 'Compound V3';
  totalSuppliedUsdc: number;
}

export interface ZkPrivacySettings {
  zkSnarkPrivateEarnings: boolean;
  stealthPayoutAddress?: string;
  proofOfSolvencyGenerated: boolean;
  solvencyCommitmentHash?: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  organization?: string;
  handle?: string;
  verified: boolean;
  walletAddress?: string;
  stripeConnected: boolean;
  zkPrivacy?: ZkPrivacySettings;
}

export interface PlatformMetrics {
  totalEscrowedInr: number;
  totalEscrowedUsd?: number;
  activeDealsCount: number;
  completedPayoutsCount: number;
  averageReleaseHours: number;
  disputeRatePercent: number;
}

export interface ManagedCreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category: string;
  platform: SocialPlatform;
  followers: string;
  monthlyGrossRevenue: number;
  managerCommissionPercent: number; // e.g. 15%
  creatorSharePercent: number; // e.g. 85%
  activeDealsCount: number;
  pendingDeliverablesCount: number;
  rateCards: {
    dedicated: number;
    integrated: number;
    shortReel: number;
  };
  p50Views: string;
  p90Views: string;
  onTimeScore: number;
  isVerified: boolean;
  notes?: string;
}

export interface RosterPitchPackage {
  id: string;
  pitchTitle: string;
  targetBrand: string;
  brandContact?: string;
  creatorIds: string[];
  creators: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    deliverable: string;
    rate: number;
  }[];
  combinedReach: string;
  totalStandardPrice: number;
  bundleDiscountPercent: number;
  bundledPackagePrice: number;
  managerTakeAmount: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined';
  sentAt?: string;
  expiresAt: string;
  keyHighlights: string[];
}

export interface InboundInvitation {
  id: string;
  brandName: string;
  brandLogo?: string;
  campaignTitle: string;
  proposedBudget: number;
  offeredCreatorId?: string;
  platform: SocialPlatform;
  format: 'Dedicated Video' | 'Integrated Sponsor (60s)' | 'Reel / Short (30-60s)';
  deadline: string;
  receivedAt: string;
  status: 'pending_review' | 'negotiating' | 'accepted' | 'rejected';
  briefNotes: string;
  proposedManagerCutPercent: number;
}

export type BrandNavTab = 
  | 'brand_dashboard'
  | 'brand_create'
  | 'brand_discovery'
  | 'brand_audits'
  | 'brand_roas'
  | 'brand_settings';

export type ManagerNavTab =
  | 'manager_overview'
  | 'manager_roster'
  | 'manager_pipeline'
  | 'manager_pitch'
  | 'manager_financials'
  | 'manager_calendar'
  | 'manager_settings';

export type CreatorNavTab =
  | 'creator_home'
  | 'creator_marketplace'
  | 'creator_audit'
  | 'creator_checker'
  | 'creator_trends'
  | 'creator_wallet'
  | 'creator_settings';

