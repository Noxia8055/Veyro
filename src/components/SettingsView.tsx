import { useState } from 'react';
import { 
  User, 
  Building, 
  CreditCard, 
  Wallet, 
  Bell, 
  Shield, 
  CheckCircle2, 
  ExternalLink,
  Youtube,
  Instagram
} from 'lucide-react';
import { CurrentUser } from '../types';

interface SettingsViewProps {
  currentUser: CurrentUser;
  onUpdateUser: (updated: Partial<CurrentUser>) => void;
}

export function SettingsView({ currentUser, onUpdateUser }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'payouts' | 'integrations' | 'security'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [organization, setOrganization] = useState(currentUser.organization || '');
  const [handle, setHandle] = useState(currentUser.handle || '');
  const [walletAddress, setWalletAddress] = useState(currentUser.walletAddress || '');

  const handleSave = () => {
    onUpdateUser({
      name,
      email,
      organization,
      handle,
      walletAddress,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            Account Management
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Settings & Payout Preferences
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage your verified profile, connected social channels, Stripe payouts, and escrow authentication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="space-y-1">
          {[
            { id: 'profile', label: 'Profile & Identity', icon: User },
            { id: 'payouts', label: 'Payouts & Banking', icon: CreditCard },
            { id: 'integrations', label: 'Connected Channels', icon: Youtube },
            { id: 'security', label: 'Security & 2FA', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-lg p-6 space-y-6 text-xs shadow-2xs">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Public Profile & Verification</h3>

              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <span className="font-semibold text-slate-900 text-sm block">{currentUser.name}</span>
                  <span className="text-slate-500 font-mono text-[11px] capitalize">Role: {currentUser.role}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organization / Brand</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Social Handle</label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@handle"
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Payout Destination & Settlement</h3>
              <p className="text-slate-500">
                Choose where your 85% creator payout or 15% manager cut is automatically deposited upon deliverable verification.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Stripe Connect Bank Account</span>
                      <span className="text-[11px] text-slate-500 font-mono">Chase Bank checking •••• 8841</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                    Default Payout
                  </span>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-slate-700" />
                    <span className="font-semibold text-slate-900">Web3 USDC Payout Address (Polygon Amoy)</span>
                  </div>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Connected Social Channels</h3>
              <p className="text-slate-500">
                Connected channels allow automated verification of hashtags and video duration without manual brand review.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <div>
                      <span className="font-semibold text-slate-900 block">YouTube Channel: TechSphere</span>
                      <span className="text-[11px] text-slate-400">Connected via YouTube Data API v3</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Instagram Creator Account</span>
                      <span className="text-[11px] text-slate-400">Connected via Graph API</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Escrow Security & Authorizations</h3>
              <p className="text-slate-500">
                Manage 2-factor authentication and timelock emergency keys.
              </p>

              <div className="p-3 rounded border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-900 block">Hardware Security Key / 2FA</span>
                  <span className="text-[11px] text-slate-500">Required for escrow releases &gt; $10,000</span>
                </div>
                <span className="text-emerald-700 font-semibold font-mono text-[11px]">Enabled</span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Preferences saved successfully!</span>
              </span>
            ) : (
              <span />
            )}

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md shadow-xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
