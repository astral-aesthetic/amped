import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Star, Users, Trophy, Zap, Gamepad2, ArrowRight, Play, Coins, Search, Clock, Flame, Heart } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import GameCard from '../components/games/GameCard';
import FadeInSection from '../components/ui/FadeInSection';

interface PlatformStats {
  totalGames: number;
  totalDownloads: number;
  activeCreators: string;
  lastUpdated: string;
}

interface GameItem {
  game_id: string;
  title: string;
  image?: string;
  thumbnail?: string;
  genre?: string;
  rating?: number;
  plays?: number;
}

interface RecentActivity {
  id: string;
  type: 'played' | 'created' | 'favorited';
  gameName: string;
  timestamp: string;
}

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { getFeaturedGames, getTrendingGames } = useGameData();
  const navigate = useNavigate();
  
  const featuredGames = getFeaturedGames();
  const trendingGames = getTrendingGames();
  
  // States
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [xpProgress, setXpProgress] = useState(65); // Example: 65% progress
  const [favoriteGames] = useState<GameItem[]>(trendingGames.slice(0, 8) || []);
  const [continuePlayingGames] = useState<GameItem[]>(featuredGames.slice(0, 6) || []);
  const [recentActivity] = useState<RecentActivity[]>([
    { id: '1', type: 'played', gameName: 'Space Quest', timestamp: '2 hours ago' },
    { id: '2', type: 'created', gameName: 'My First Game', timestamp: '1 day ago' },
    { id: '3', type: 'favorited', gameName: 'Adventure Zone', timestamp: '3 days ago' }
  ]);

  // Fetch platform statistics
  useEffect(() => {
    const fetchPlatformStats = async () => {
      try {
        setStatsLoading(true);
        const response = await fetch('/api/platform/stats.json');
        if (!response.ok) {
          throw new Error('Failed to fetch platform statistics');
        }
        const data: PlatformStats = await response.json();
        setPlatformStats(data);
      } catch (error) {
        console.error('Error fetching platform stats:', error);
        setPlatformStats({
          totalGames: 6,
          totalDownloads: 59480,
          activeCreators: '50+',
          lastUpdated: new Date().toISOString()
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchPlatformStats();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickActions = [
    { icon: Sparkles, label: 'Generate Game', path: '/generate', color: 'from-purple-500 to-pink-500' },
    { icon: Coins, label: 'Pricing Guide', path: '/pricing', color: 'from-yellow-500 to-orange-500' },
    { icon: TrendingUp, label: 'Trending', path: '/trending', color: 'from-orange-500 to-red-500' },
    { icon: Star, label: 'Featured', path: '/featured', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, label: 'Community', path: '/community', color: 'from-green-500 to-blue-500' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'played': return <Play className="w-4 h-4 text-blue-400" />;
      case 'created': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'favorited': return <Heart className="w-4 h-4 text-pink-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Search Games Bar */}
      <FadeInSection>
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-focus-within:blur-xl opacity-75 group-focus-within:opacity-100 transition-all" />
            <div className="relative flex items-center gap-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 group-focus-within:border-pink-400/50 p-4 transition-all">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-pink-400 transition-colors" />
              <input
                type="text"
                placeholder="Search games, creators, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-lg font-medium transition-all hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </FadeInSection>

      {/* Featured Game Section */}
      <FadeInSection delay={50}>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Featured Game Info - Left */}
            <div className="lg:col-span-1 flex flex-col justify-center space-y-4">
              <div>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 rounded-full text-xs font-medium text-purple-300 mb-2">
                  Featured This Week
                </span>
                <h2 className="text-4xl font-bold text-white mb-2">{featuredGames[0]?.title || 'Featured Game'}</h2>
                <p className="text-slate-400 mb-4">{(featuredGames[0] as any)?.description || 'Check out this amazing game crafted by our community.'}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{(featuredGames[0] as any)?.rating || 4.8}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">{((featuredGames[0] as any)?.plays?.toLocaleString?.()) || '15.2K'}</span>
                </div>
              </div>
              <Link
                to={`/games/${featuredGames[0]?.game_id || '#'}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-lg font-medium transition-all hover:scale-105 w-full"
              >
                <Play className="w-4 h-4" />
                Play Now
              </Link>
            </div>
            
            {/* Featured Game Image - Right */}
            <div className="lg:col-span-2">
              <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                {(featuredGames[0] as any)?.image || (featuredGames[0] as any)?.thumbnail ? (
                  <img
                    src={(featuredGames[0] as any)?.image || (featuredGames[0] as any)?.thumbnail}
                    alt={featuredGames[0]?.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                    <Gamepad2 className="w-12 h-12" />
                    <span>Game Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Dashboard Stats Row */}
      <FadeInSection delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{activity.gameName}</p>
                    <p className="text-slate-400 text-xs">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Dev XP Progress */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Game Dev XP Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">Level 12</span>
                  <span className="text-slate-400 text-sm">{xpProgress}%</span>
                </div>
                <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
              <div className="text-slate-400 text-sm">
                <p>XP Until Next Level: <span className="text-white font-semibold">350 / 500</span></p>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-black/30 rounded-lg p-2 text-center">
                  <p className="text-slate-400 text-xs">Games Created</p>
                  <p className="text-white font-bold text-lg">5</p>
                </div>
                <div className="bg-black/30 rounded-lg p-2 text-center">
                  <p className="text-slate-400 text-xs">Total Plays</p>
                  <p className="text-white font-bold text-lg">342</p>
                </div>
                <div className="bg-black/30 rounded-lg p-2 text-center">
                  <p className="text-slate-400 text-xs">Favorites</p>
                  <p className="text-white font-bold text-lg">28</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Quick Actions */}
      <FadeInSection delay={150}>
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group relative p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                  <div className="relative">
                    <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200 mb-2" />
                    <p className="text-sm text-white font-medium">{action.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Continue Playing Section */}
      <FadeInSection delay={200}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-400" />
            Continue Playing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {continuePlayingGames.slice(0, 3).map(game => (
              <GameCard key={game.game_id} game={game as any} />
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Favorite Games Carousel */}
      <FadeInSection delay={250}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            Favorite Games
          </h2>
          <div className="relative">
            {/* Scrolling carousel container */}
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-6 min-w-min">
                {favoriteGames.map(game => (
                  <div key={game.game_id} className="flex-shrink-0 w-64">
                    <GameCard game={game as any} compact />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradient overlays for scroll effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </FadeInSection>

      {/* Platform Stats */}
      <FadeInSection delay={300}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Games</p>
                {statsLoading ? (
                  <div className="w-12 h-10 bg-slate-700 animate-pulse rounded" />
                ) : (
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {platformStats?.totalGames?.toLocaleString() || '0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Downloads</p>
                {statsLoading ? (
                  <div className="w-20 h-10 bg-slate-700 animate-pulse rounded" />
                ) : (
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {platformStats?.totalDownloads?.toLocaleString() || '0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Creators</p>
                {statsLoading ? (
                  <div className="w-14 h-10 bg-slate-700 animate-pulse rounded" />
                ) : (
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {platformStats?.activeCreators || '0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Featured & Trending Games Sections */}
      <FadeInSection delay={350}>
        <section id="games-section">
          {featuredGames.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  All Featured Games
                </h2>
                <Link 
                  to="/featured" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.slice(0, 6).map(game => (
                  <GameCard key={game.game_id} game={game} />
                ))}
              </div>
            </div>
          )}

          {trendingGames.length > 0 && (
            <FadeInSection delay={400}>
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                    Trending Games
                  </h2>
                  <Link 
                    to="/trending" 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingGames.slice(0, 8).map(game => (
                    <GameCard key={game.game_id} game={game} compact />
                  ))}
                </div>
              </div>
            </FadeInSection>
          )}
        </section>
      </FadeInSection>
    </div>
  );
};


export default HomePage;
