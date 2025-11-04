import React from 'react';
import { Star } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import GameCard from '../components/games/GameCard';

const FeaturedPage: React.FC = () => {
  const { getFeaturedGames } = useGameData();
  const featuredGames = getFeaturedGames();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4">
          <Star className="w-8 h-8 text-white fill-current" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
          Featured Games
        </h1>
        <p className="text-slate-400 text-lg">
          Handpicked games showcasing the best of our creative community
        </p>
      </div>

      {/* Featured Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2 fill-current" />
          <p className="text-2xl font-bold text-white">{featuredGames.length}</p>
          <p className="text-slate-400 text-sm">Featured Games</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-400 text-lg font-bold">✨</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {(featuredGames.reduce((sum, game) => sum + game.stats.rating, 0) / featuredGames.length).toFixed(1)}
          </p>
          <p className="text-slate-400 text-sm">Avg Quality Score</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-cyan-400 text-lg font-bold">🏆</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {featuredGames.reduce((sum, game) => sum + game.stats.downloads, 0).toLocaleString()}
          </p>
          <p className="text-slate-400 text-sm">Total Downloads</p>
        </div>
      </div>

      {/* Featured Showcase */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Editor's Choice</h2>
          <p className="text-slate-400">Curated for exceptional quality and innovation</p>
        </div>
        
        {featuredGames.length > 0 ? (
          <>
            {/* Hero Featured Game */}
            {featuredGames[0] && (
              <div className="mb-12">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-yellow-500/30 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-yellow-300 font-semibold">Game of the Week</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-4">{featuredGames[0].title}</h3>
                        <p className="text-slate-300 mb-6 text-lg leading-relaxed">{featuredGames[0].description}</p>
                        
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="text-white font-semibold">{featuredGames[0].stats.rating.toFixed(1)}</span>
                            <span className="text-slate-400">({featuredGames[0].stats.total_ratings} reviews)</span>
                          </div>
                          <div className="text-slate-400">
                            {featuredGames[0].stats.downloads.toLocaleString()} downloads
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredGames[0].tags.map(tag => (
                            <span key={tag} className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-lg text-sm font-medium border border-yellow-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400">by</span>
                          <span className="text-white font-semibold">{featuredGames[0].creator_username}</span>
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <img 
                          src={(import.meta.env.BASE_URL || '/gg/') + (featuredGames[0].cover_image || '').replace(/^\/+/, '')} 
                          alt={featuredGames[0].title}
                          className="w-full rounded-xl border border-white/20 shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other Featured Games */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.slice(1).map(game => (
                <GameCard key={game.game_id} game={game} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Star className="w-24 h-24 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No featured games yet</h3>
            <p className="text-slate-400">Amazing games will be featured here soon!</p>
          </div>
        )}
      </div>

      {/* Feature Criteria */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-current" />
          </div>
          What Makes a Game Featured?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-black/20 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
            <h3 className="text-white font-semibold mb-2">High Quality</h3>
            <p className="text-slate-400 text-sm">Exceptional gameplay, polished mechanics, and great user experience</p>
          </div>
          
          <div className="text-center p-6 bg-black/20 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-400 text-xl">✨</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Innovation</h3>
            <p className="text-slate-400 text-sm">Creative concepts, unique mechanics, or novel approaches to gameplay</p>
          </div>
          
          <div className="text-center p-6 bg-black/20 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-400 text-xl">❤️</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Community Love</h3>
            <p className="text-slate-400 text-sm">High ratings, positive reviews, and strong community engagement</p>
          </div>
          
          <div className="text-center p-6 bg-black/20 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-cyan-400 text-xl">🚀</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Impact</h3>
            <p className="text-slate-400 text-sm">Games that inspire other creators or push the boundaries of what's possible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;