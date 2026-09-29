[README.md](https://github.com/user-attachments/files/32814782/README.md)
# VEYRO ⚡
### Next-Generation Creator Sponsorship Escrow & Automated Payout Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-22C55E)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Overview

**VEYRO** is a modern sponsorship escrow infrastructure engineered to eliminate counterparty risk, payment delays, and non-transparent agency splits in creator economy partnerships. 

By combining **transparent 85/15 revenue splits**, **programmable escrow timelocks**, **automated deliverable verification**, and **instant Net-0 settlement**, VEYRO aligns incentives across Brands, Creators, and Talent Agencies.

---

## 🚀 Key Highlights & Architecture

- **🔒 Guaranteed Escrow Security**: Funds are locked before production begins. Creators work knowing payouts are 100% funded, while brands retain protection against non-delivery via verifiable timelocks.
- **⚡ Net-0 Automated Settlement**: Upon verified deliverable publication, payouts are unlocked immediately via UPI/Bank Escrow rails without traditional 60-to-90 day net delays.
- **📊 85/15 Transparent Split Ledger**: Eliminates hidden agency margins. Every contract codifies transparent 85% creator / 15% agency distributions with real-time auditability.
- **🤖 Autonomous Deliverable Verification Engine**: Sandbox adapters for YouTube, Instagram, and TikTok inspect live URLs, hashtag compliance (`#ad`, `#sponsored`), and duration requirements prior to payout clearance.
- **📈 Interactive Brand Intelligence & ROAS Analytics**: Built-in Recharts data visualization comparing projected vs. actual audience reach, engagement pacing, and return-on-ad-spend across campaigns.
- **👥 Multi-Role Collaborative Workspace**: Seamless context switching between **Brand**, **Creator**, and **Agency / Talent Manager** workspaces.

---

## 🔄 The Deal & Escrow Lifecycle

```
┌────────────────┐     1. Deposit Escrow Funds      ┌──────────────────┐
│  Brand Creates │ ───────────────────────────────> │  Escrow Secured  │
│  Campaign Deal │                                  │  (Funds Locked)  │
└────────────────┘                                  └─────────┬────────┘
                                                              │
                                            2. Co-Sign Deal   │
                                                              ▼
┌────────────────┐     3. Submit Content URL        ┌──────────────────┐
│ Content Live & │ <─────────────────────────────── │ Creator Executes │
│ Verification   │                                  │   Deliverables   │
└───────┬────────┘                                  └──────────────────┘
        │
        │ 4. Verification Engine Confirms
        │    - Live status
        │    - Mandatory hashtags
        │    - Duration threshold
        ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Instant Net-0 Settlement                         │
│                                                                      │
│   ┌──────────────────────────────┐    ┌──────────────────────────┐   │
│   │     Creator Payout (85%)     │    │   Agency / Mgmt (15%)    │   │
│   │   Direct UPI / Bank Rails    │    │      Commission Split    │   │
│   └──────────────────────────────┘    └──────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Roles & Workspaces

### 1. 🏢 Brand Dashboard
- **Campaign Creation Wizard**: Specify deliverable formats (Dedicated Video, 60s Integration, Shorts/Reels), duration constraints, and campaign timelines.
- **Escrow Funding Ledger**: Track deposited funds, active escrows, released sums, and dispute windows.
- **Brand Intelligence & ROAS Engine**: High-fidelity Recharts visualizer measuring **Projected vs. Actual Reach**, **Engagement Growth**, and cost-per-view pacing.

### 2. 🎨 Creator Studio
- **Deal Feed & Co-Signing**: Review deal terms, deliverable requirements, and cryptographic signature verification.
- **Submission Modal & Live Verification**: Submit published content URLs to trigger automated hashtag and duration audits.
- **Settlement Receipts**: Instant payment vouchers with transaction references and downloadable invoices.

### 3. 💼 Agency / Talent Manager Hub
- **Roster Overview**: Monitor deals across all represented creators in real time.
- **Automated Commission Calculations**: Real-time transparency into the 15% management fee breakdown.
- **Pipeline Health**: Track pending brand deposits, upcoming deadlines, and verification queues.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Data Visualization** | [Recharts 3](https://recharts.org/) |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **AI & Automation** | [@google/genai](https://github.com/google/generative-ai-js) (Gemini SDK integration ready) |

---

## 📂 Project Directory Structure

```text
├── public/                 # Static assets & platform logos
├── src/
│   ├── assets/             # Brand graphics and illustrations
│   ├── components/         # Reusable UI elements & view controllers
│   │   ├── brand/          # Brand-specific panels, sidebars & ROAS charts
│   │   ├── creator/        # Creator portal, workspace & submission tools
│   │   ├── manager/        # Agency roster & split management
│   │   ├── AnalyticsView.tsx       # Platform analytics
│   │   ├── CreateDealWizard.tsx    # Multi-step campaign & escrow builder
│   │   ├── DealDetailModal.tsx     # Contract inspector & audit trail
│   │   ├── EscrowPayoutsView.tsx   # Financial ledger & transaction records
│   │   ├── VideoSubmissionModal.tsx # Deliverable submission & verification
│   │   └── TopHeader.tsx           # Global header with role-switch controls
│   ├── data/
│   │   └── mockData.ts     # Realistic deal states, creators, and user rosters
│   ├── types/
│   │   └── index.ts        # Type definitions for deals, escrows, and roles
│   ├── utils/              # Verification sandbox adapters & formatting helpers
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Tailwind CSS imports & global styles
│   └── main.tsx            # React application entry point
├── metadata.json           # AI Studio applet specifications
├── package.json            # Dependencies & build scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build & bundler configuration
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/veyro.git
   cd veyro
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your keys:
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   APP_URL="http://localhost:3000"
   ```

4. **Launch development server**:
   ```bash
   npm run dev
   ```
   The application will boot at `http://localhost:3000`.

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite development server at `http://localhost:3000` |
| `npm run build` | Compiles and builds production bundle into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript compilation checks (`tsc --noEmit`) |
| `npm run clean` | Cleans `dist` and build artifacts |

---

## 🛡️ Trust, Safety & Compliance

- **Verified Deliverables**: Automated checks ensure sponsored videos are unlisted/public and contain required disclosures (`#ad`, sponsor mentions) before release.
- **Dispute Resolution Flow**: Configurable 30-day refund timelock safeguards brand capital if contractual obligations fail without consensus.
- **Clear Disclosures**: Fully accessible legal agreements, Terms of Service, and Privacy Policy compliant with digital advertising and influencer marketing guidelines.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
