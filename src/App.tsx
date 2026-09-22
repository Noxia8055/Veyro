import { useState } from 'react';
import { 
  Deal, 
  CurrentUser, 
  UserRole, 
  VerificationResult,
  BrandNavTab,
  ManagerNavTab,
  CreatorNavTab
} from './types';
import { INITIAL_DEALS, DEMO_USERS } from './data/mockData';
import { Sidebar, DashboardNavTab } from './components/Sidebar';
import { BrandSidebar } from './components/brand/BrandSidebar';
import { ManagerSidebar } from './components/manager/ManagerSidebar';
import { CreatorSidebar } from './components/creator/CreatorSidebar';
import { TopHeader } from './components/TopHeader';
import { BrandDashboard } from './components/BrandDashboard';
import { BrandPanel } from './components/brand/BrandPanel';
import { ManagerPanel } from './components/manager/ManagerPanel';
import { CreatorPanel } from './components/creator/CreatorPanel';
import { DealsView } from './components/DealsView';
import { CreatorsView } from './components/CreatorsView';
import { AnalyticsView } from './components/AnalyticsView';
import { CreatorDashboard } from './components/CreatorDashboard';
import { CreateDealWizard } from './components/CreateDealWizard';
import { DealDetailModal } from './components/DealDetailModal';
import { VideoSubmissionModal } from './components/VideoSubmissionModal';
import { EscrowPayoutsView } from './components/EscrowPayoutsView';
import { SettingsView } from './components/SettingsView';
import { LegalPages } from './components/LegalPages';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export type ActiveAppView = 
  | 'overview' 
  | 'deals' 
  | 'escrow' 
  | 'payouts' 
  | 'creators' 
  | 'analytics' 
  | 'settings'
  | 'creator_workspace'
  | 'creator_marketplace'
  | 'creator_trends'
  | 'creator_checker'
  | 'creator_settlement'
  | 'landing'
  | 'terms'
  | 'privacy';

export default function App() {
  // Default to 'overview' to immediately show the dashboard from the user's design image
  const [currentView, setCurrentView] = useState<ActiveAppView>('overview');
  const [currentUser, setCurrentUser] = useState<CurrentUser>(DEMO_USERS.brand);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);

  // Role-specific navigation tabs
  const [brandTab, setBrandTab] = useState<BrandNavTab>('brand_dashboard');
  const [managerTab, setManagerTab] = useState<ManagerNavTab>('manager_overview');
  const [creatorTab, setCreatorTab] = useState<CreatorNavTab>('creator_home');

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isCreateDealOpen, setIsCreateDealOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [submissionDeal, setSubmissionDeal] = useState<Deal | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Pre-fill creator for deal creation
  const [prefilledCreator, setPrefilledCreator] = useState<{ name: string; handle: string; platform: 'YouTube' | 'Instagram' } | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Role switching
  const handleSwitchUserRole = (newRole: UserRole) => {
    const targetUser = DEMO_USERS[newRole] || DEMO_USERS.brand;
    setCurrentUser(targetUser);

    if (newRole === 'creator') {
      setCreatorTab('creator_home');
    } else if (newRole === 'manager') {
      setManagerTab('manager_overview');
    } else {
      setBrandTab('brand_dashboard');
    }
    setCurrentView('overview');

    addToast(
      'info',
      `Switched to ${newRole === 'manager' ? 'TALENT AGENCY' : newRole.toUpperCase()} Persona`,
      `Acting as ${targetUser.name} (${targetUser.organization || targetUser.handle})`
    );
  };

  // Action: Deal Created
  const handleDealCreated = (newDeal: Deal) => {
    setDeals((prev) => [newDeal, ...prev]);
    setIsCreateDealOpen(false);
    setPrefilledCreator(null);
    setSelectedDeal(newDeal);
    addToast(
      'success',
      'Escrow Funded & Deal Launched',
      `$${newDeal.grossBudget.toLocaleString()} locked into VEYRO vault. Notification dispatched to ${newDeal.creatorName}.`
    );
  };

  // Action: Creator Co-Signs Deal
  const handleCoSignDeal = (dealId: string) => {
    const now = new Date().toISOString();
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const updated: Deal = {
            ...d,
            status: 'signed',
            creatorSignedAt: now,
            creatorSignatureHash: `sig_ed25519_${Math.random().toString(16).substring(2, 12)}`,
            activityLog: [
              {
                id: `act-${Date.now()}`,
                timestamp: now,
                actor: `${currentUser.name} (Creator)`,
                role: 'creator',
                action: 'Agreement Co-Signed',
                details: `Creator accepted binding agreement for $${d.creatorPayout.toLocaleString()} net payout.`,
              },
              ...d.activityLog,
            ],
            updatedAt: now,
          };
          if (selectedDeal?.id === dealId) setSelectedDeal(updated);
          return updated;
        }
        return d;
      })
    );

    addToast(
      'success',
      'Agreement Co-Signed',
      'You have accepted terms. Deliverable production active.'
    );
  };

  // Action: Video Deliverable Submitted
  const handleVideoSubmitted = (dealId: string, videoUrl: string, verification: VerificationResult) => {
    const now = new Date().toISOString();
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const updated: Deal = {
            ...d,
            status: 'submitted',
            submittedVideoUrl: videoUrl,
            submittedAt: now,
            verificationResult: verification,
            activityLog: [
              {
                id: `act-${Date.now()}`,
                timestamp: now,
                actor: `${currentUser.name} (Creator)`,
                role: 'creator',
                action: 'Deliverable Submitted & Verified',
                details: `Video link verified live via ${verification.adapterUsed}. Mandatory sponsor tags confirmed.`,
              },
              ...d.activityLog,
            ],
            updatedAt: now,
          };
          if (selectedDeal?.id === dealId) setSelectedDeal(updated);
          return updated;
        }
        return d;
      })
    );

    setSubmissionDeal(null);
    addToast(
      'success',
      'Deliverable Verified Live',
      'Automated scan confirmed live post and required tags. Brand notified to authorize release.'
    );
  };

  // Action: Payout Released
  const handleReleasePayout = (dealId: string) => {
    const now = new Date().toISOString();
    const releaseTx = `0x${Math.random().toString(16).substring(2, 14)}`;

    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const updated: Deal = {
            ...d,
            status: 'released',
            releasedAt: now,
            releaseReference: releaseTx,
            activityLog: [
              {
                id: `act-${Date.now()}`,
                timestamp: now,
                actor: `${currentUser.name} (Brand)`,
                role: 'brand',
                action: 'Escrow Payout Released',
                details: `Disbursed $${d.creatorPayout.toLocaleString()} to ${d.creatorName} and $${d.managerPayout.toLocaleString()} to ${d.managerName || 'Manager'}.`,
                txHash: releaseTx,
              },
              ...d.activityLog,
            ],
            updatedAt: now,
          };
          if (selectedDeal?.id === dealId) setSelectedDeal(updated);
          return updated;
        }
        return d;
      })
    );

    addToast(
      'success',
      'Instant 85/15 Payout Disbursed',
      'Smart contract vault completed automated multi-party disbursement.'
    );
  };

  // Action: Refund requested
  const handleRequestRefund = (dealId: string) => {
    const now = new Date().toISOString();
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const updated: Deal = {
            ...d,
            status: 'refunded',
            updatedAt: now,
            activityLog: [
              {
                id: `act-${Date.now()}`,
                timestamp: now,
                actor: `${currentUser.name} (Brand)`,
                role: 'brand',
                action: 'Timelock Escrow Refund Initiated',
                details: `Brand claimed timelock refund of $${d.grossBudget.toLocaleString()} due to expired deadline.`,
              },
              ...d.activityLog,
            ],
          };
          if (selectedDeal?.id === dealId) setSelectedDeal(updated);
          return updated;
        }
        return d;
      })
    );

    addToast(
      'info',
      'Timelock Refund Executed',
      'Escrow capital returned to Brand wallet according to contract rules.'
    );
  };

  // Open Create Deal with creator pre-fill
  const handleOpenCreateDealWithCreator = (creatorName: string, handle: string, platform: 'YouTube' | 'Instagram') => {
    setPrefilledCreator({ name: creatorName, handle, platform });
    setIsCreateDealOpen(true);
  };

  // Render main view based on currentView and role
  const renderMainContent = () => {
    if (currentView === 'landing') {
      return (
        <div className="py-6">
          <div className="mb-4 flex items-center justify-between bg-slate-900 text-white px-4 py-2.5 rounded-2xl">
            <span className="text-xs font-medium">
              Previewing Public Landing Page
            </span>
            <button
              onClick={() => setCurrentView('overview')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              Return to Dashboard →
            </button>
          </div>
          <LandingPage
            onEnterBrand={() => handleSwitchUserRole('brand')}
            onEnterCreator={() => handleSwitchUserRole('creator')}
            onOpenCreateDeal={() => {
              setPrefilledCreator(null);
              setIsCreateDealOpen(true);
            }}
          />
        </div>
      );
    }

    if (currentView === 'terms') {
      return <LegalPages type="terms" onBack={() => setCurrentView('overview')} />;
    }

    if (currentView === 'privacy') {
      return <LegalPages type="privacy" onBack={() => setCurrentView('overview')} />;
    }

    // Role-based Panels
    if (currentUser.role === 'manager') {
      return (
        <ManagerPanel
          activeTab={managerTab}
          onSelectTab={setManagerTab}
          deals={deals}
          onSelectDeal={(deal) => setSelectedDeal(deal)}
          onOpenCreateDeal={() => {
            setPrefilledCreator(null);
            setIsCreateDealOpen(true);
          }}
        />
      );
    }

    if (currentUser.role === 'creator') {
      return (
        <CreatorPanel
          deals={deals}
          onSelectDeal={(deal) => setSelectedDeal(deal)}
          onOpenCoSign={(deal) => handleCoSignDeal(deal.id)}
          onOpenSubmitVideo={(deal) => setSubmissionDeal(deal)}
          activeCreatorTab={creatorTab}
        />
      );
    }

    // Brand Panel (default for brand role)
    return (
      <BrandPanel
        deals={deals}
        onSelectDeal={(deal) => setSelectedDeal(deal)}
        onOpenCreateDeal={() => {
          setPrefilledCreator(null);
          setIsCreateDealOpen(true);
        }}
        onReleasePayout={handleReleasePayout}
        activeBrandTab={brandTab}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      {/* Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main App Layout: Persistent Left Sidebar + Main Content Area */}
      <div className="flex flex-1 min-h-screen">
        {/* Left Sidebar: Independent per role */}
        {currentUser.role === 'brand' && (
          <BrandSidebar
            activeTab={brandTab}
            onSelectTab={(tab) => {
              setBrandTab(tab);
              setCurrentView('overview');
            }}
            currentUser={currentUser}
            onOpenCreateDeal={() => {
              setPrefilledCreator(null);
              setIsCreateDealOpen(true);
            }}
            onSwitchRole={handleSwitchUserRole}
          />
        )}

        {currentUser.role === 'manager' && (
          <ManagerSidebar
            activeTab={managerTab}
            onSelectTab={(tab) => {
              setManagerTab(tab);
              setCurrentView('overview');
            }}
            currentUser={currentUser}
            onSwitchRole={handleSwitchUserRole}
          />
        )}

        {currentUser.role === 'creator' && (
          <CreatorSidebar
            activeTab={creatorTab}
            onSelectTab={(tab) => {
              setCreatorTab(tab);
              setCurrentView('overview');
            }}
            currentUser={currentUser}
            onSwitchRole={handleSwitchUserRole}
          />
        )}

        {/* Right Main Canvas */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <TopHeader
            currentUser={currentUser}
            onSwitchRole={handleSwitchUserRole}
            deals={deals}
            onSelectDeal={(deal) => setSelectedDeal(deal)}
            onLogoClick={() => setCurrentView('overview')}
          />

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            {renderMainContent()}
          </main>

          {/* Clean Minimalist Footer */}
          <footer className="border-t border-slate-200/80 bg-white/70 py-5 px-4 sm:px-8 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="font-black tracking-widest text-slate-900">VEYRO</span>
                <span className="text-slate-300">•</span>
                <span>Transparent Escrow & Automated Payout Protocol</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Public Overview
                </button>
                <button
                  onClick={() => setCurrentView('terms')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Protocol Terms
                </button>
                <button
                  onClick={() => setCurrentView('privacy')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Create Deal Wizard */}
      {isCreateDealOpen && (
        <CreateDealWizard
          currentUser={currentUser}
          onClose={() => {
            setIsCreateDealOpen(false);
            setPrefilledCreator(null);
          }}
          onDealCreated={handleDealCreated}
          prefilledCreator={prefilledCreator}
        />
      )}

      {/* 2. Deal Detail Inspector Modal */}
      {selectedDeal && (
        <DealDetailModal
          deal={selectedDeal}
          currentUser={currentUser}
          onClose={() => setSelectedDeal(null)}
          onReleasePayout={handleReleasePayout}
          onCoSign={handleCoSignDeal}
          onOpenSubmitVideo={(deal) => {
            setSelectedDeal(null);
            setSubmissionDeal(deal);
          }}
          onRequestRefund={handleRequestRefund}
        />
      )}

      {/* 3. Video Submission & Automated Live Scanner Modal */}
      {submissionDeal && (
        <VideoSubmissionModal
          deal={submissionDeal}
          onClose={() => setSubmissionDeal(null)}
          onSuccess={handleVideoSubmitted}
        />
      )}

      {/* 4. Auth & Role Switcher Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSelectRole={(role) => {
            handleSwitchUserRole(role);
            setIsAuthModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
