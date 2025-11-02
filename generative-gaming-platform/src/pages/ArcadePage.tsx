import React, { useState } from 'react';
import { Search, Grid, List, TrendingUp, Sliders, Star, Download, Play } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import { Link } from 'react-router-dom';
import GameCard from '../components/games/GameCard';
import FadeInSection from '../components/ui/FadeInSection';
import { useCredits, CREDIT_COSTS } from '../contexts/CreditContext';
import { useAuth } from '../contexts/AuthContext';

const ArcadePage: React.FC = () => {
  const { userGames, searchGames, filterGamesByCategory } = useGameData();
  const { user } = useAuth();
  const { balance, spendCredits } = useCredits();
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
                      <span className="text-white font-semibold">{filteredGames[0].stats.rating.toFixed(1)} ⭐</span>
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
            <TrendingUp className="w-6 h-6 text-slate-400" />
            <h3 className="text-2xl font-bold text-white">Trending Now</h3>
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGames.slice(1, 5).map((game, index) => {
                const [gameStats, setGameStats] = useState(game.stats);

                const handlePlay = () => {
                  if (!user) return;
                  
                  if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${game.title}`, game.game_id)) {
                    setGameStats(prev => ({ ...prev, plays: prev.plays + 1 }));
                    window.open(`/play/${game.game_id}`, '_blank');
                  }
                };

                const handleDownload = () => {
                  if (!user) return;
                  
                  if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${game.title}`, game.game_id)) {
                    setGameStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
                    const link = document.createElement('a');
                    link.href = `data:text/plain;charset=utf-8,Game: ${game.title}`;
                    link.download = `${game.title.replace(/\s+/g, '_')}.game`;
                    link.click();
                  }
                };

                return (
                  <div
                    key={game.game_id}
                    className="group relative h-72 bg-black rounded-xl overflow-hidden"
                  >
                    {/* Full-width image background */}
                    <div className="absolute inset-0">
                      <img
                        src={game.cover_image}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/api/placeholder/300/200';
                        }}
                      />
                      {/* Dynamic overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Rank Badge */}
                    <div className="absolute top-3 left-3 z-20 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      {index + 2}
                    </div>
                    
                    {/* Content - title and buttons at bottom */}
                    <div className="relative z-20 p-4 h-full flex flex-col justify-between">
                      {/* Stats Panel - hidden by default, revealed on hover */}
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Rating */}
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                          <Star className="w-3 h-3 text-slate-400 fill-current" />
                          <span className="text-white font-semibold">{gameStats.rating.toFixed(1)}</span>
                        </div>
                        
                        {/* Downloads */}
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                          <Download className="w-3 h-3 text-slate-400" />
                          <span className="text-white font-semibold">{(gameStats.downloads / 1000).toFixed(0)}K</span>
                        </div>

                        {/* Plays */}
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs">
                          <Play className="w-3 h-3 text-slate-400" />
                          <span className="text-white font-semibold">{(gameStats.plays / 1000).toFixed(0)}K</span>
                        </div>
                      </div>

                      {/* Title and Buttons */}
                      <div className="flex flex-col gap-2">
                        {/* Title - bottom-left corner */}
                        <Link 
                          to={`/games/${game.game_id}`}
                          className="text-white font-bold text-sm line-clamp-2 drop-shadow-lg hover:text-cyan-300 transition-colors"
                        >
                          {game.title}
                        </Link>

                        {/* Action Buttons - hidden by default, revealed on hover */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {/* Play Button - Purple to Pink Gradient */}
                          <button 
                            onClick={handlePlay}
                            disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-1 rounded text-xs flex items-center justify-center gap-1 transition-all duration-200"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Play</span>
                            <span>({CREDIT_COSTS.PLAY_GAME})</span>
                          </button>

                          {/* Download Button - Blue Gradient */}
                          <button 
                            onClick={handleDownload}
                            disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-1 rounded text-xs flex items-center justify-center gap-1 transition-all duration-200"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                            <span>({CREDIT_COSTS.DOWNLOAD_GAME})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-slate-300 transition-colors" />
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
                  <Sliders className="w-5 h-5 text-slate-400 group-hover/filter:text-slate-300 transition-colors" />
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
          <div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {/* Featured Game (Hero) - Col 1-2 span 8 */}
                {filteredGames[0] && (
                  <section className="relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-8 min-h-[320px] sm:min-h-[360px] md:min-h-[460px]">
                    <img
                      src={filteredGames[0].cover_image}
                      alt={filteredGames[0].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/api/placeholder/300/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="relative p-4 sm:p-5 md:p-7 lg:p-8 flex flex-col h-full">
                      <div className="flex items-center justify-between">
                        <div className="text-xs sm:text-sm text-white/70">
                          <span className="inline-flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-purple-500"></span>
                            Featured Game
                          </span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold text-white drop-shadow-lg">
                          {filteredGames[0].title}
                        </h1>
                        <p className="mt-2 sm:mt-3 md:mt-4 text-sm md:text-base text-white/80 max-w-xl font-normal line-clamp-2">
                          {filteredGames[0].description}
                        </p>
                        <div className="mt-4 sm:mt-6 flex gap-3">
                          <button
                            onClick={() => {
                              if (!user) return;
                              if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${filteredGames[0].title}`, filteredGames[0].game_id)) {
                                window.open(`/play/${filteredGames[0].game_id}`, '_blank');
                              }
                            }}
                            disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
                            className="inline-flex items-center justify-center size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                          >
                            <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                          </button>
                          <button
                            onClick={() => {
                              if (!user) return;
                              if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${filteredGames[0].title}`, filteredGames[0].game_id)) {
                                const link = document.createElement('a');
                                link.href = `data:text/plain;charset=utf-8,Game: ${filteredGames[0].title}`;
                                link.download = `${filteredGames[0].title.replace(/\s+/g, '_')}.game`;
                                link.click();
                              }
                            }}
                            disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
                            className="inline-flex items-center justify-center size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                          >
                            <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Sidebar Info Panel - Col 3 span 4 */}
                {filteredGames[1] && (
                  <aside className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-4 min-h-[320px] sm:min-h-[360px] md:min-h-[460px] bg-gradient-to-br from-blue-600 to-purple-600">
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '10px 10px'
                      }}>
                    </div>
                    <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col">
                      <div className="flex items-center justify-between text-white/90">
                        <span className="text-xs sm:text-sm font-medium">{filteredGames[1].category}</span>
                        <span className="text-xs sm:text-sm font-semibold">{(filteredGames[1].stats?.rating || 4.8).toFixed(1)} ⭐</span>
                      </div>
                      <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold text-white leading-tight line-clamp-3">
                        {filteredGames[1].title}
                      </h2>
                      <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/80 max-w-sm font-normal line-clamp-2">
                        {filteredGames[1].description}
                      </p>
                      <div className="mt-auto pt-4 sm:pt-6 flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur border border-white/40 text-xs sm:text-sm text-white font-medium">
                          <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span>{((filteredGames[1].stats?.downloads || 0) / 1000).toFixed(1)}K Downloads</span>
                        </span>
                      </div>
                    </div>
                  </aside>
                )}

                {/* Tile 1 */}
                {filteredGames[2] && (
                  <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black col-span-1 md:col-span-3 lg:col-span-4 min-h-[200px] sm:min-h-[240px] md:min-h-[260px]">
                    <img
                      src={filteredGames[2].cover_image}
                      alt={filteredGames[2].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/api/placeholder/300/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>
                    <div className="relative p-4 sm:p-5 md:p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg tracking-tight font-semibold text-white line-clamp-1">{filteredGames[2].title}</h3>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button
                          onClick={() => {
                            if (!user) return;
                            if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${filteredGames[2].title}`, filteredGames[2].game_id)) {
                              window.open(`/play/${filteredGames[2].game_id}`, '_blank');
                            }
                          }}
                          disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
                          className="inline-flex items-center justify-center size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                        >
                          <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                        </button>
                        <button
                          onClick={() => {
                            if (!user) return;
                            if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${filteredGames[2].title}`, filteredGames[2].game_id)) {
                              const link = document.createElement('a');
                              link.href = `data:text/plain;charset=utf-8,Game: ${filteredGames[2].title}`;
                              link.download = `${filteredGames[2].title.replace(/\s+/g, '_')}.game`;
                              link.click();
                            }
                          }}
                          disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
                          className="inline-flex items-center justify-center size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                        >
                          <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Tile 2 */}
                {filteredGames[3] && (
                  <section className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 col-span-1 md:col-span-3 lg:col-span-4 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] ${
                    filteredGames[3].title === 'Neon Runner: Cyberpunk Chase' 
                      ? 'bg-gradient-to-br from-red-900 to-black' 
                      : 'bg-black'
                  }`}>
                    <img
                      src={filteredGames[3].cover_image}
                      alt={filteredGames[3].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/api/placeholder/300/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>
                    <div className="relative p-4 sm:p-5 md:p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg tracking-tight font-semibold text-white line-clamp-1">{filteredGames[3].title}</h3>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button
                          onClick={() => {
                            if (!user) return;
                            if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${filteredGames[3].title}`, filteredGames[3].game_id)) {
                              window.open(`/play/${filteredGames[3].game_id}`, '_blank');
                            }
                          }}
                          disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
                          className="inline-flex items-center justify-center size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                        >
                          <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                        </button>
                        <button
                          onClick={() => {
                            if (!user) return;
                            if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${filteredGames[3].title}`, filteredGames[3].game_id)) {
                              const link = document.createElement('a');
                              link.href = `data:text/plain;charset=utf-8,Game: ${filteredGames[3].title}`;
                              link.download = `${filteredGames[3].title.replace(/\s+/g, '_')}.game`;
                              link.click();
                            }
                          }}
                          disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
                          className="inline-flex items-center justify-center size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                        >
                          <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Tile 3 - Wide */}
                {filteredGames[4] && (
                  <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-4 min-h-[200px] sm:min-h-[240px] md:min-h-[260px]">
                    <img
                      src={filteredGames[4].cover_image}
                      alt={filteredGames[4].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/api/placeholder/300/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>
                    <div className="relative p-4 sm:p-5 md:p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg tracking-tight font-semibold text-white line-clamp-1">{filteredGames[4].title}</h3>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/70">
                          <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span className="font-medium">{((filteredGames[4].stats?.rating || 4.8)).toFixed(1)} Rating</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (!user) return;
                              if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${filteredGames[4].title}`, filteredGames[4].game_id)) {
                                window.open(`/play/${filteredGames[4].game_id}`, '_blank');
                              }
                            }}
                            disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
                            className="inline-flex items-center justify-center size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                          >
                            <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                          </button>
                          <button
                            onClick={() => {
                              if (!user) return;
                              if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${filteredGames[4].title}`, filteredGames[4].game_id)) {
                                const link = document.createElement('a');
                                link.href = `data:text/plain;charset=utf-8,Game: ${filteredGames[4].title}`;
                                link.download = `${filteredGames[4].title.replace(/\s+/g, '_')}.game`;
                                link.click();
                              }
                            }}
                            disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
                            className="inline-flex items-center justify-center size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-600 text-white shadow-lg transition-transform hover:scale-110"
                          >
                            <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGames.map(game => (
                  <GameCard key={game.game_id} game={game} compact={true} />
                ))}
              </div>
            )}
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
