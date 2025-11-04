import React, { useState } from 'react';
import { Sparkles, Search, Sliders, ArrowLeft, Wand2, Star, TrendingUp, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameData, type Game } from '../contexts/GameDataContext';
import GameCard from '../components/games/GameCard';
import FadeInSection from '../components/ui/FadeInSection';

const GamesGeneratedPage: React.FC = () => {
  const navigate = useNavigate();
  const { getTrendingGames } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'rating' | 'plays'>('trending');
  const [filterGenre, setFilterGenre] = useState<string>('all');

  // Use trending games as generated games
  const allGeneratedGames = getTrendingGames() || [];

  // Filter games based on search and genre
  const filteredGames = allGeneratedGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (game.category?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = filterGenre === 'all' || game.category?.toLowerCase() === filterGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  // Sort games
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.stats.rating || 0) - (a.stats.rating || 0);
      case 'plays':
        return (b.stats.plays || 0) - (a.stats.plays || 0);
      case 'newest':
        return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
      case 'trending':
      default:
        return (b.stats.downloads || 0) - (a.stats.downloads || 0);
    }
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <FadeInSection>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-slate-400 hover:text-white transition-colors" />
          </button>
        </div>
      </FadeInSection>

      {/* Search and Filter Section */}
      <FadeInSection delay={100}>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-75" />
            <div className="relative flex items-center gap-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search games, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
              
              {/* Filter Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
                  title="Filter and sort options"
                >
                  <Sliders className="w-5 h-5 text-slate-400 hover:text-slate-300 transition-colors" />
                </button>
                
                  {/* Filter Menu Dropdown */}
                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-xl border border-white/10 p-4 z-[9999] shadow-2xl">
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
                            onClick={() => {
                              setSortBy(option.value as any);
                              setShowFilterMenu(false);
                            }}
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
                            onClick={() => {
                              setFilterGenre(genre.value);
                              setShowFilterMenu(false);
                            }}
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Active Filters Display */}
      {(sortBy !== 'trending' || filterGenre !== 'all' || searchQuery) && (
        <FadeInSection delay={125}>
          <div className="flex gap-2 flex-wrap justify-center">
            {searchQuery && (
              <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded-full text-sm text-cyan-300 flex items-center gap-2">
                <span>Search: {searchQuery}</span>
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-cyan-200"
                >
                  ✕
                </button>
              </div>
            )}
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
        </FadeInSection>
      )}

      {/* Stats Row */}
      <FadeInSection delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Generated</p>
                <p className="text-white font-bold text-xl">{allGeneratedGames.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Trending This Week</p>
                <p className="text-white font-bold text-xl">{Math.floor(allGeneratedGames.length * 0.3)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Avg Rating</p>
                <p className="text-white font-bold text-xl">
                  {(allGeneratedGames.reduce((sum, g) => sum + (g.stats.rating || 0), 0) / allGeneratedGames.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Featured Games</p>
                <p className="text-white font-bold text-xl">{Math.floor(allGeneratedGames.length * 0.2)}</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Games Grid - Masonic Layout */}
      <FadeInSection delay={150}>
        <div className="space-y-4">
          {sortedGames.length > 0 ? (
            <>
              <p className="text-slate-400 text-sm">
                Showing {sortedGames.length} of {allGeneratedGames.length} games
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
                {sortedGames.map((game, index) => (
                  <div key={game.game_id} className={`${
                    index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' :
                    index === 1 ? 'sm:col-span-1 lg:col-span-1' :
                    index === 2 ? 'sm:col-span-1 lg:col-span-1' :
                    index === 3 ? 'sm:col-span-1 lg:col-span-2' :
                    index === 4 ? 'sm:col-span-1 lg:col-span-1' :
                    index === 5 ? 'sm:col-span-1 lg:col-span-1' :
                    index === 6 ? 'sm:col-span-2 lg:col-span-2' :
                    'sm:col-span-1 lg:col-span-1'
                  }`}>
                    <GameCard game={game as any} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No games found</h3>
              <p className="text-slate-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </FadeInSection>
    </div>
  );
};

export default GamesGeneratedPage;
