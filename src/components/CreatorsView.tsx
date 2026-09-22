import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  Plus, 
  ArrowUpRight,
  TrendingUp,
  Youtube,
  Instagram,
  ShieldCheck
} from 'lucide-react';
import { Deal } from '../types';

interface CreatorsViewProps {
  deals: Deal[];
  onOpenCreateDealWithCreator?: (creatorName: string, handle: string, platform: 'YouTube' | 'Instagram') => void;
}

export function CreatorsView({ deals, onOpenCreateDealWithCreator }: CreatorsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'YouTube' | 'Instagram'>('all');

  const creators = [
    {
      id: 'cr-1',
      name: 'Sarah Jenkins',
      handle: '@sarahcreates',
      followers: '1.2M',
      platform: 'YouTube' as const,
      category: 'Health & Lifestyle',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      rating: '4.95',
      completedCampaigns: 14,
      onTimeDeliveryRate: '100%',
      avgEngagementRate: '4.8%',
      baseRate: '₹6,50,000',
      verified: true,
      bio: 'High-energy lifestyle content, outdoor wellness routines, and mindful product explorations.',
    },
    {
      id: 'cr-2',
      name: 'Alex Chen',
      handle: '@alextech',
      followers: '856K',
      platform: 'Instagram' as const,
      category: 'Tech & Software',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: '4.92',
      completedCampaigns: 9,
      onTimeDeliveryRate: '98%',
      avgEngagementRate: '5.4%',
      baseRate: '₹4,50,000',
      verified: true,
      bio: 'Minimalist desktop setups, software developer workflows, and hardware benchmarks.',
    },
    {
      id: 'cr-3',
      name: 'Jessica Miller',
      handle: '@fitwithjess',
      followers: '1.4M',
      platform: 'YouTube' as const,
      category: 'Health & Lifestyle',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      rating: '4.98',
      completedCampaigns: 22,
      onTimeDeliveryRate: '100%',
      avgEngagementRate: '6.1%',
      baseRate: '₹9,80,000',
      verified: true,
      bio: 'High-intensity athletic training, functional nutrition, and athlete mindset breakdowns.',
    },
    {
      id: 'cr-4',
      name: 'Creative Studio Hub',
      handle: '@creativehub',
      followers: '620K',
      platform: 'Instagram' as const,
      category: 'Design & Audio',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
      rating: '4.89',
      completedCampaigns: 8,
      onTimeDeliveryRate: '96%',
      avgEngagementRate: '4.2%',
      baseRate: '₹5,00,000',
      verified: true,
      bio: 'Industrial product design showcases, acoustic fidelity reviews, and cinematic reels.',
    },
    {
      id: 'cr-5',
      name: 'David Zhang',
      handle: '@daviddev',
      followers: '490K',
      platform: 'YouTube' as const,
      category: 'Tech & Software',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      rating: '4.94',
      completedCampaigns: 11,
      onTimeDeliveryRate: '100%',
      avgEngagementRate: '7.2%',
      baseRate: '₹3,20,000',
      verified: true,
      bio: 'Full-stack software engineering, containerization benchmarks, and modern dev tools.',
    },
    {
      id: 'cr-6',
      name: 'Emma Watson',
      handle: '@emmastyle',
      followers: '780K',
      platform: 'Instagram' as const,
      category: 'Apparel & Lifestyle',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      rating: '4.91',
      completedCampaigns: 16,
      onTimeDeliveryRate: '100%',
      avgEngagementRate: '5.0%',
      baseRate: '₹6,00,000',
      verified: true,
      bio: 'Sustainable capsule wardrobes, seasonal lookbooks, and conscious fashion ethics.',
    },
  ];

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || c.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-[11px] font-semibold tracking-wide uppercase mb-2">
            <span>TALENT DIRECTORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Directory & Roster
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified creator partners with verified delivery track records, transparent 85/15 splits, and on-time performance.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search creator name, handle, or niche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'YouTube', 'Instagram'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                platformFilter === p
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p === 'all' ? 'All Platforms' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Creator Top Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] shadow-xs">
                        ✓
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>{creator.name}</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium block">
                      {creator.handle}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 mt-0.5">
                      {creator.platform === 'YouTube' ? (
                        <Youtube className="w-3.5 h-3.5 text-red-600" />
                      ) : (
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      )}
                      <span>{creator.followers}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{creator.category}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-semibold shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>{creator.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                {creator.bio}
              </p>

              {/* Stats Box */}
              <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Completed</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {creator.completedCampaigns}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">On-Time</span>
                  <span className="text-xs font-bold text-emerald-600 font-mono">
                    {creator.onTimeDeliveryRate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Engagement</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {creator.avgEngagementRate}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                  Standard Rate
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {creator.baseRate}
                </span>
              </div>

              <button
                onClick={() => onOpenCreateDealWithCreator?.(creator.name, creator.handle, creator.platform)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 hover:shadow"
              >
                <span>Invite to Deal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
