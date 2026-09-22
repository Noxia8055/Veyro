import React from 'react';

interface LegalPagesProps {
  type: 'terms' | 'privacy';
  onBack: () => void;
}

export function LegalPages({ type, onBack }: LegalPagesProps) {
  if (type === 'terms') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
        <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono font-semibold uppercase text-slate-500">Legal Compliance</span>
            <h1 className="text-xl font-semibold text-slate-900 mt-1">
              VEYRO Protocol Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Last revised: September 2026</p>
          </div>
          <button
            onClick={onBack}
            className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Back to Application
          </button>
        </div>

        <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-6 text-slate-600">
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">1. Acceptance of Protocol Terms</h2>
            <p>
              By accessing, connecting an Ethereum/EVM wallet, or deploying smart contract escrows through VEYRO (&quot;the Protocol&quot;), you agree to be bound by these Terms of Service. If you are acting on behalf of a corporate entity, brand, or talent agency, you represent and warrant that you possess the full legal authority to bind that entity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">2. Non-Custodial Smart Contract Escrows</h2>
            <p>
              VEYRO operates exclusively on decentralized smart contracts deployed on EVM-compatible networks (including Polygon Amoy and Base Sepolia). At no point does VEYRO take custody or possession of user funds. Brand deposits are locked in cryptographic escrow contracts, and payouts are automatically dispersed simultaneously to Creator and Manager wallets based on pre-agreed code parameters (such as the standard 85/15 ratio).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">3. Fee Cap Enforcement and Transparency</h2>
            <p>
              To eliminate agency markup opacity, VEYRO enforces a protocol-level hardcap where agency manager cuts cannot exceed 3000 basis points (30.00%). All gross budgets deposited by brands are fully visible to creator co-signers unless explicitly shielded via zero-knowledge commitment schemes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">4. Oracle Verification and Proof of Post</h2>
            <p>
              Payout releases are triggered based on automated Oracle feeds inspecting the YouTube Data API v3 and Instagram Graph API. Creators are strictly obligated to include FTC-mandated disclosures (including but not limited to #ad or #sponsored) and adhere to deliverable minimum durations. Fraudulent proof submissions or synthetic link tampering will result in immediate contract dispute locks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">5. Timelocks, Disputes, and Refunds</h2>
            <p>
              If a creator fails to co-sign or submit proof of post within the predefined contract window (default 30 calendar days), the smart contract permits the brand to initiate an emergency timelocked refund. In the event of a quality dispute, funds remain frozen until mutual multi-sig settlement or third-party arbitrator resolution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">6. Limitation of Liability</h2>
            <p>
              Under no circumstances shall VEYRO or its core developers be liable for blockchain network halts, gas fee fluctuations, smart contract vulnerabilities in third-party lending vaults (e.g., Aave), or platform API deprecations by YouTube or Meta.
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono font-semibold uppercase text-slate-500">Privacy & Data Governance</span>
          <h1 className="text-xl font-semibold text-slate-900 mt-1">
            VEYRO Privacy Policy (GDPR / CCPA Compliant)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Last revised: September 2026</p>
        </div>
        <button
          onClick={onBack}
          className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Back to Application
        </button>
      </div>

      <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-6 text-slate-600">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">1. Data Architecture and Principles</h2>
          <p>
            VEYRO is built upon privacy-preserving architecture principles. We do not sell personal data, maintain tracking cookies, or collect biometric identifiers. Our interactions with creator social media accounts are limited to read-only API calls necessary for verifying deliverable compliance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">2. Blockchain Transparency vs. zk-SNARK Masking</h2>
          <p>
            Public blockchains naturally record transaction hashes, wallet addresses, and gas executions. To protect creator compensation privacy from public competitors, VEYRO provides optional zero-knowledge privacy masking (zk-SNARKs), generating cryptographic solvency proofs on-chain without exposing private gross dollar values to public block explorers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">3. Information Collected</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Public blockchain wallet addresses (0x...)</li>
            <li>Social media channel identifiers and public video metadata via YouTube Data API v3</li>
            <li>Deal contract parameters, required hashtags, and deliverable deadlines</li>
            <li>Ephemeral IP logs strictly for DDoS prevention, discarded every 24 hours</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">4. Third-Party Integrations</h2>
          <p>
            When utilizing the Stripe Fiat-to-USDC bridge, personal billing details (such as credit card numbers or wire routing numbers) are transmitted directly to Stripe under PCI-DSS Level 1 compliance. VEYRO never stores raw payment card credentials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900">5. User Rights Under GDPR and CCPA</h2>
          <p>
            European Economic Area (EEA) and California residents have the right to request access to off-chain data caches, request data deletion from temporary indexing databases, or restrict processing. Due to the immutable nature of decentralized blockchains, data committed directly to smart contracts cannot be altered or deleted.
          </p>
        </section>
      </div>
    </div>
  );
}
