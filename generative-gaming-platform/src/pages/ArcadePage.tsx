import React, { useState } from 'react';
import { Search, Grid, List, TrendingUp, Sliders } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import { Link } from 'react-router-dom';
import GameCard from '../components/games/GameCard';
import FadeInSection from '../components/ui/FadeInSection';

const ArcadePage: React.FC = () => {
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
      {/* Featured Game of the Week */}
      <FadeInSection>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl" />
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              {/* Featured Game Image */}
              {filteredGames.length > 0 && (
                <div className="w-full lg:w-64 h-48 lg:h-56 flex-shrink-0">
                  <img
                    src={filteredGames[0].cover_image}
                    alt={filteredGames[0].title}
                    className="w-full h-full object-cover rounded-xl border border-white/10"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/api/placeholder/300/200';
                    }}
                  />
                </div>
              )}
              
              {/* Featured Game Info */}
              <div className="flex-1 space-y-4">
                <div className="inline-block">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-sm font-semibold">FEATURED GAME</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  {filteredGames.length > 0 ? filteredGames[0].title : 'Loading...'}
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl">
                  {filteredGames.length > 0 ? filteredGames[0].description : 'Check back soon for new games!'}
                </p>
                
                {filteredGames.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">Rating:</span>
                      <span className="text-yellow-400 font-semibold">{filteredGames[0].stats.rating.toFixed(1)} ⭐</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">Downloads:</span>
                      <span className="text-white font-semibold">{(filteredGames[0].stats.downloads / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">Category:</span>
                      <span className="text-white font-semibold">{filteredGames[0].category}</span>
                    </div>
                  </div>
                )}
                
                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Trending Games Section */}
      <FadeInSection>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            <h3 className="text-2xl font-bold text-white">Trending Now</h3>
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredGames.slice(1, 5).map((game, index) => (
                <div
                  key={game.game_id}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 hover:border-orange-400/50 transition-all duration-300"
                >
                  {/* Rank Badge */}
                  <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {index + 2}
                  </div>
                  
                  {/* Game Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={game.cover_image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/api/placeholder/300/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                  
                  {/* Game Info */}
                  <div className="p-3 space-y-2">
                    <h4 className="font-semibold text-white truncate group-hover:text-orange-300 transition-colors">
                      {game.title}
                    </h4>
                    <p className="text-slate-400 text-sm truncate">{game.creator_username}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        {game.stats.rating.toFixed(1)}
                      </span>
                      <span>{(game.stats.downloads / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400">No trending games available</p>
            </div>
          )}
        </div>
      </FadeInSection>

      {/* Search Games Bar with Filter and Sort */}
      <FadeInSection>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Search Bar Form */}
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
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-xl border border-white/10 p-4 z-50 shadow-xl">
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
          </div>
        </div>
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

export default ArcadePage;
