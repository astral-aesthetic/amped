import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Star, Users, Trophy, Zap, Gamepad2, ArrowRight, Play, Coins, Search, Clock, Flame, Heart, Sliders, UserPlus, MessageCircle, Download } from 'lucide-react';
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
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'rating' | 'plays'>('trending');
  const [filterGenre, setFilterGenre] = useState<string>('all');
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
      {/* Search Games Bar with Filter and Sort */}
      <FadeInSection>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Search Bar Form */}
            <form onSubmit={handleSearch} className="relative space-y-3">
              {/* Main Search Bar */}
              <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-focus-within:blur-xl opacity-75 group-focus-within:opacity-100 transition-all" />
            <div className="relative flex items-center gap-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 group-focus-within:border-pink-400/50 p-4 transition-all">
              {/* Action Icons - Inside Search Bar */}
              <Link
                to="/community"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group/icon flex-shrink-0"
                title="My Friends"
              >
                <UserPlus className="w-5 h-5 text-green-400 group-hover/icon:text-green-300 transition-colors" />
              </Link>
              
              <button
                type="button"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group/icon flex-shrink-0"
                title="Messages"
              >
                <MessageCircle className="w-5 h-5 text-blue-400 group-hover/icon:text-blue-300 transition-colors" />
              </button>
              
              <Link
                to="/leaderboards"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors group/icon flex-shrink-0"
                title="Leaderboards & Achievements"
              >
                <Trophy className="w-5 h-5 text-yellow-400 group-hover/icon:text-yellow-300 transition-colors" />
              </Link>
              
              <div className="w-px h-6 bg-white/10" />
              
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-pink-400 transition-colors" />
              <input
                type="text"
                placeholder="Search games, creators, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
              {/* Filter Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group/filter"
                  title="Filter and sort options"
                >
                  <Sliders className="w-5 h-5 text-slate-400 group-hover/filter:text-cyan-400 transition-colors" />
                </button>
                
                {/* Filter Menu Dropdown */}
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-xl border border-white/10 p-4 z-50 shadow-xl">
                    {/* Sort Options */}
                    <div className="mb-4">
                      <p className="text-slate-300 text-sm font-semibold mb-2">Sort By</p>
                      <div className="space-y-2">
                        {[
                          { value: 'trending', label: 'Trending' },
                          { value: 'newest', label: 'Newest' },
                          { value: 'rating', label: 'Top Rated' },
                          { value: 'plays', label: 'Most Played' }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setSortBy(option.value as any)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                              sortBy === option.value
                                ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white border border-purple-400/50'
                                : 'bg-black/30 text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Genre Filter */}
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-slate-300 text-sm font-semibold mb-2">Genre</p>
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: 'All Genres' },
                          { value: 'action', label: 'Action' },
                          { value: 'puzzle', label: 'Puzzle' },
                          { value: 'adventure', label: 'Adventure' },
                          { value: 'strategy', label: 'Strategy' },
                          { value: 'casual', label: 'Casual' }
                        ].map(genre => (
                          <button
                            key={genre.value}
                            type="button"
                            onClick={() => setFilterGenre(genre.value)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                              filterGenre === genre.value
                                ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white border border-purple-400/50'
                                : 'bg-black/30 text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {genre.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Close button hint */}
                    <div className="border-t border-white/10 pt-3 mt-3">
                      <p className="text-slate-500 text-xs text-center">Click filter icon to close</p>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(sortBy !== 'trending' || filterGenre !== 'all') && (
            <div className="flex gap-2 flex-wrap">
              {sortBy !== 'trending' && (
                <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/50 rounded-full text-sm text-purple-300 flex items-center gap-2">
                  <span>Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                  <button 
                    type="button"
                    onClick={() => setSortBy('trending')}
                    className="ml-1 hover:text-purple-200"
                  >
                    ✕
                  </button>
                </div>
              )}
              {filterGenre !== 'all' && (
                <div className="px-3 py-1 bg-pink-500/20 border border-pink-400/50 rounded-full text-sm text-pink-300 flex items-center gap-2">
                  <span>Genre: {filterGenre.charAt(0).toUpperCase() + filterGenre.slice(1)}</span>
                  <button 
                    type="button"
                    onClick={() => setFilterGenre('all')}
                    className="ml-1 hover:text-pink-200"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}
            </form>
          </div>
        </div>
      </FadeInSection>

      {/* Featured Game Section */}
      <FadeInSection delay={50}>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
            {/* Featured Game Info - Left */}
            <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 rounded-full text-sm font-semibold text-purple-300 mb-4">
                  Featured This Week
                </span>
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">{featuredGames[0]?.title || 'Featured Game'}</h2>
                <p className="text-slate-300 text-lg mb-6">{(featuredGames[0] as any)?.description || 'Check out this amazing game crafted by our community.'}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-white font-semibold text-lg">{(featuredGames[0] as any)?.rating || 4.8}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-semibold text-lg">{((featuredGames[0] as any)?.plays?.toLocaleString?.()) || '15.2K'}</span>
                </div>
              </div>
              <Link
                to={`/games/${featuredGames[0]?.game_id || '#'}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 w-full"
              >
                <Play className="w-5 h-5" />
                Play Now
              </Link>
            </div>
            
            {/* Featured Game Image - Right */}
            <div className="lg:col-span-1">
              <div className="w-full h-72 lg:h-96 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                {(featuredGames[0] as any)?.cover_image || (featuredGames[0] as any)?.image || (featuredGames[0] as any)?.thumbnail ? (
                  <img
                    src={(featuredGames[0] as any)?.cover_image || (featuredGames[0] as any)?.image || (featuredGames[0] as any)?.thumbnail}
                    alt={featuredGames[0]?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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

      {/* Quick Actions */}
      <FadeInSection delay={100}>
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

      {/* Dashboard Stats Row */}
      <FadeInSection delay={150}>
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
                  <div key={game.game_id} className="flex-shrink-0 w-72">
                    {/* Custom Favorite Games Card */}
                    <div className="group relative h-96 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-pink-500/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 flex flex-col">
                      {/* Background Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Game Cover Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={game.image || game.thumbnail || '/api/placeholder/300/200'}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/api/placeholder/300/200';
                          }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        
                        {/* Rating Badge - Top Right */}
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                          <Star className="w-4 h-4 fill-current" />
                          {(game.rating || 4.8).toFixed(1)}
                        </div>
                        
                        {/* Play Button - Centered */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-200">
                            <Play className="w-4 h-4 fill-current" />
                            Play
                          </button>
                        </div>
                      </div>
                      
                      {/* Game Info */}
                      <div className="relative p-4 flex-1 flex flex-col justify-between">
                        {/* Title and Creator */}
                        <div className="min-w-0">
                          <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-pink-300 transition-colors mb-1">
                            {game.title}
                          </h3>
                          <p className="text-slate-400 text-xs">
                            {game.genre || 'Game'}
                          </p>
                        </div>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10">
                          <div className="text-center">
                            <div className="flex justify-center mb-1">
                              <Download className="w-4 h-4 text-cyan-400" />
                            </div>
                            <p className="text-xs text-slate-300 font-medium">{(game.plays ? game.plays / 1000 : 15.2).toFixed(1)}K</p>
                            <p className="text-xs text-slate-500">Plays</p>
                          </div>
                          <div className="text-center">
                            <div className="flex justify-center mb-1">
                              <Heart className="w-4 h-4 text-pink-400" />
                            </div>
                            <p className="text-xs text-slate-300 font-medium">{(game.rating ? game.rating * 100 : 480).toLocaleString().substring(0, 3)}</p>
                            <p className="text-xs text-slate-500">Favs</p>
                          </div>
                          <div className="text-center">
                            <div className="flex justify-center mb-1">
                              <Users className="w-4 h-4 text-green-400" />
                            </div>
                            <p className="text-xs text-slate-300 font-medium">9.2K</p>
                            <p className="text-xs text-slate-500">Players</p>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-pink-500/30">
                          Play Now
                        </button>
                      </div>
                    </div>
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

      {/* Featured & Trending Games Sections */}
      <FadeInSection delay={300}>
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
