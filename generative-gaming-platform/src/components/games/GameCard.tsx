import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Play, Heart, Users, Calendar } from 'lucide-react';
import { useCredits, CREDIT_COSTS } from '../../contexts/CreditContext';
import { useAuth } from '../../contexts/AuthContext';
import GameImage from '../ui/GameImage';

interface Game {
  game_id: string;
  title: string;
  creator_id: string;
  creator_username: string;
  category: string;
  description: string;
  created_date: string;
  tags: string[];
  cover_image: string;
  stats: {
    downloads: number;
    plays: number;
    favorites: number;
    rating: number;
    total_ratings: number;
    featured: boolean;
  };
  technical_info: {
    file_size: string;
    platform_compatibility: string[];
    estimated_playtime: string;
  };
  monetization: {
    is_premium: boolean;
    premium_price?: number;
  };
}

interface GameCardProps {
  game: Game;
  compact?: boolean;
  tall?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, compact = false, tall = false }) => {
  const { user } = useAuth();
  const { balance, spendCredits } = useCredits();
  const [isLiked, setIsLiked] = useState(false);
  const [localStats, setLocalStats] = useState(game.stats);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePlay = () => {
    if (!user) return;
    
    if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${game.title}`, game.game_id)) {
      setLocalStats(prev => ({ ...prev, plays: prev.plays + 1 }));
      // In a real app, this would launch the game
      window.open(`/play/${game.game_id}`, '_blank');
    }
  };

  const handleDownload = () => {
    if (!user) return;
    
    if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${game.title}`, game.game_id)) {
      setLocalStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
      // Simulate download
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,Game: ${game.title}`;
      link.download = `${game.title.replace(/\s+/g, '_')}.game`;
      link.click();
    }
  };

  const handleFavorite = () => {
    if (!user) return;
    
    if (!isLiked && spendCredits(CREDIT_COSTS.FAVORITE_GAME, 'FAVORITE_GAME', `Favorited ${game.title}`, game.game_id)) {
      setIsLiked(true);
      setLocalStats(prev => ({ ...prev, favorites: prev.favorites + 1 }));
    } else if (isLiked) {
      setIsLiked(false);
      setLocalStats(prev => ({ ...prev, favorites: Math.max(0, prev.favorites - 1) }));
    }
  };

  const cardHeight = compact ? "h-72" : tall ? "h-[480px]" : "h-80";

  return (
    <div className={`group relative ${cardHeight} bg-black rounded-xl overflow-hidden`}>
      {/* Full-width image background */}
      <div className="absolute inset-0">
        <GameImage 
          src={game.cover_image}
          alt={game.title}
          title={game.title}
          category={game.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Dynamic overlay - subtle normally, intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Featured Badge */}
      {localStats.featured && (
        <div className="absolute top-3 left-3 z-10 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}
      
      {/* Premium Badge */}
      {game.monetization.is_premium && (
        <div className="absolute top-3 right-3 z-10 text-white px-2 py-1 rounded-lg text-xs font-bold">
          Premium
        </div>
      )}
      
      {/* Content - stats hidden until hover */}
      <div className="relative z-20 p-4 h-full flex flex-col justify-between">
        {/* Stats Panel - hidden by default, revealed on hover */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Rating */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold text-sm">
              {(localStats.rating || 4.8).toFixed(1)}
            </span>
            <span className="text-white/60 text-xs">
              ({(localStats.total_ratings || 0).toLocaleString()} ratings)
            </span>
          </div>
          
          {/* Downloads */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <Download className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-semibold text-sm">
              {(localStats.downloads / 1000).toFixed(1)}K Downloads
            </span>
          </div>
          
          {/* Plays */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <Play className="w-4 h-4 text-green-400" />
            <span className="text-white font-semibold text-sm">
              {(localStats.plays / 1000).toFixed(1)}K Plays
            </span>
          </div>
          
          {/* Favorites */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-white font-semibold text-sm">
              {(localStats.favorites / 1000).toFixed(1)}K Favorites
            </span>
          </div>
        </div>

        {/* Title and Buttons at Bottom */}
        <div className="flex flex-col gap-3">
          {/* Title - bottom-left corner */}
          <Link 
            to={`/games/${game.game_id}`}
            className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg hover:text-cyan-300 transition-colors"
          >
            {game.title}
          </Link>

          {/* Action Buttons - hidden by default, revealed on hover */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play Button with Credit Cost - Purple to Pink Gradient */}
            <button 
              onClick={handlePlay}
              disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play</span>
              <span className="text-xs">({CREDIT_COSTS.PLAY_GAME})</span>
            </button>

            {/* Download Button with Credit Cost - Blue Gradient */}
            <button 
              onClick={handleDownload}
              disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
              <span className="text-xs">({CREDIT_COSTS.DOWNLOAD_GAME})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;