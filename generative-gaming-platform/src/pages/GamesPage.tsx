import React, { useState } from 'react';
import { Search, Grid, List, TrendingUp, Sliders } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import GameCard from '../components/games/GameCard';
import FadeInSection from '../components/ui/FadeInSection';

const GamesPage: React.FC = () => {
  const { userGames, searchGames, filterGamesByCategory } = useGameData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'newest' | 'plays' | 'favorites'>('downloads');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  const categories = ['All', 'Action', 'Adventure', 'Puzzle', 'Strategy', 'RPG', 'Arcade', 'Platformer', 'Horror', 'Racing', 'Simulation'];
  const sortOptions = [
    { value: 'downloads', label: 'Most Downloaded' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'plays', label: 'Most Played' },
    { value: 'favorites', label: 'Most Favorited' }
  ];

  // Filter and sort games
  const getFilteredGames = () => {
    let games = searchQuery ? searchGames(searchQuery) : filterGamesByCategory(selectedCategory);
    
    // Sort games
    games = [...games].sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.stats.downloads - a.stats.downloads;
        case 'rating':
          return b.stats.rating - a.stats.rating;
        case 'newest':
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
        case 'plays':
          return b.stats.plays - a.stats.plays;
        case 'favorites':
          return b.stats.favorites - a.stats.favorites;
        default:
          return 0;
      }
    });
    
    return games;
  };

  const filteredGames = getFilteredGames();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Search Games Bar with Filter and Sort */}
      <FadeInSection>
        <form onSubmit={(e) => {
          e.preventDefault();
        }} className="relative space-y-3">
          {/* Main Search Bar */}
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
                    <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-xl border border-white/10 p-4 z-[9999] shadow-2xl">
                    {/* Sort Options */}
                    <div className="mb-4">
                      <p className="text-slate-300 text-sm font-semibold mb-2">Sort By</p>
                      <div className="space-y-2">
                        {[
                          { value: 'downloads', label: 'Most Downloaded' },
                          { value: 'rating', label: 'Top Rated' },
                          { value: 'newest', label: 'Newest First' },
                          { value: 'plays', label: 'Most Played' },
                          { value: 'favorites', label: 'Most Favorited' }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setSortBy(option.value as 'downloads' | 'rating' | 'newest' | 'plays' | 'favorites')}
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
                    
                    {/* Category Filter */}
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-slate-300 text-sm font-semibold mb-2">Category</p>
                      <div className="space-y-2">
                        {['All', 'Action', 'Adventure', 'Puzzle', 'Strategy', 'RPG', 'Arcade', 'Platformer', 'Horror', 'Racing', 'Simulation'].map(category => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                              selectedCategory === category
                                ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white border border-purple-400/50'
                                : 'bg-black/30 text-slate-300 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {category}
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
              
              {/* View Mode Toggles */}
              <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </FadeInSection>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-300">
            {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>
        
        {filteredGames.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {filteredGames.map(game => (
              <GameCard key={game.game_id} game={game} compact={viewMode === 'list'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery 
                ? `Try adjusting your search terms or filters` 
                : `No games in the ${selectedCategory} category`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;