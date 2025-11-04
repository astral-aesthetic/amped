import React from 'react';
import { Trophy, Medal, Crown, Users, Download, Star, Zap, ArrowLeft } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ui/ProgressBar';

const LeaderboardsPage: React.FC = () => {
  const { leaderboards } = useGameData();
  const navigate = useNavigate();
  
  if (!leaderboards) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Leaderboards...</h2>
          <p className="text-slate-400">Please wait while we load the competition data</p>
        </div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-slate-400 font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2:
        return 'from-gray-400/20 to-slate-400/20 border-gray-400/30';
      case 3:
        return 'from-amber-600/20 to-amber-500/20 border-amber-500/30';
      default:
        return 'from-slate-800/50 to-slate-700/50 border-white/10';
    }
  };

  const LeaderboardCard = ({ title, description, entries, icon: Icon, iconColor }: any) => (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 bg-gradient-to-br ${iconColor} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {entries.map((entry: any, index: number) => (
          <div 
            key={entry.user_id || entry.game_id}
            className={`bg-gradient-to-r ${getRankColor(entry.rank)} backdrop-blur-sm rounded-lg p-4 border`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(entry.rank)}
                </div>
                
                <div className="flex items-center gap-3">
                  {entry.avatar_url && (
                    <img 
                      src={entry.avatar_url}
                      alt={entry.display_name || entry.game_title}
                      className="w-10 h-10 rounded-full border border-white/20"
                    />
                  )}
                  {entry.cover_image && (
                    <img 
                      src={entry.cover_image}
                      alt={entry.game_title}
                      className="w-10 h-10 rounded border border-white/20 object-cover"
                    />
                  )}
                  
                  <div>
                    <Link 
                      to={entry.username ? `/creators/${entry.user_id}` : `/games/${entry.game_id}`}
                      className="text-white font-semibold hover:text-cyan-400 transition-colors"
                    >
                      {entry.display_name || entry.game_title}
                    </Link>
                    {entry.username && (
                      <p className="text-slate-400 text-sm">@{entry.username}</p>
                    )}
                    {entry.creator_username && (
                      <p className="text-slate-400 text-sm">by {entry.creator_username}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-bold">
                  {entry.total_downloads?.toLocaleString() || 
                   entry.credits_earned?.toLocaleString() || 
                   entry.followers?.toLocaleString() || 
                   entry.rating?.toFixed(1) || 
                   entry.downloads?.toLocaleString()}
                </div>
                <div className="text-slate-400 text-xs">
                  {entry.total_downloads && 'downloads'}
                  {entry.credits_earned && 'credits'}
                  {entry.followers && 'followers'}
                  {entry.rating && `(${entry.total_ratings} reviews)`}
                  {entry.downloads && 'downloads'}
                </div>
                
                {entry.verified && (
                  <div className="flex items-center justify-end mt-1">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {entry.tier && (
              <div className="mt-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  entry.tier === 'creator_elite' 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : entry.tier === 'creator_pro'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                }`}>
                  {entry.tier.replace('creator_', '').replace('_', ' ').toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">50+</p>
          <p className="text-slate-400 text-sm">Active Creators</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <Download className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">89K+</p>
          <p className="text-slate-400 text-sm">Total Downloads</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">4.2</p>
          <p className="text-slate-400 text-sm">Avg. Rating</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">2.8M</p>
          <p className="text-slate-400 text-sm">Credits Earned</p>
        </div>
      </div>

      {/* Achievement Showcase */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Achievement Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaderboards.achievements.slice(0, 8).map((achievement: any) => {
            const progressValue = achievement.unlocked_by;
            const progressMax = achievement.total_users || 50;
            const progressPercentage = Math.round((progressValue / progressMax) * 100);
            
            // Determine rarity-based progress bar variant
            const getProgressVariant = (rarity: string) => {
              switch (rarity) {
                case 'legendary': return 'legendary';
                case 'epic': return 'epic';
                case 'rare': return 'rare';
                case 'uncommon': return 'uncommon';
                default: return 'common';
              }
            };
            
            return (
              <div key={achievement.id} className="bg-black/30 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-200">
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className="text-white font-semibold mb-1">{achievement.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{achievement.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <ProgressBar 
                    value={progressValue}
                    max={progressMax}
                    variant={getProgressVariant(achievement.rarity)}
                    size="sm"
                    animated={true}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {progressValue}/{progressMax} unlocked ({progressPercentage}%)
                    </span>
                    <span className="text-slate-500">
                      Global completion
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    achievement.rarity === 'legendary' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    achievement.rarity === 'epic' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                    achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    achievement.rarity === 'uncommon' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Downloads */}
        <LeaderboardCard
          title="Most Downloaded Creators"
          description="Creators ranked by total game downloads"
          entries={leaderboards.leaderboards.top_creators_by_downloads.entries}
          icon={Download}
          iconColor="from-cyan-500 to-blue-600"
        />
        
        {/* Top Rated Games */}
        <LeaderboardCard
          title="Highest Rated Games"
          description="Games with the highest user ratings"
          entries={leaderboards.leaderboards.top_rated_games.entries}
          icon={Star}
          iconColor="from-yellow-500 to-orange-600"
        />
        
        {/* Top Earners */}
        <LeaderboardCard
          title="Top Credit Earners"
          description="Creators ranked by total credits earned"
          entries={leaderboards.leaderboards.top_earners.entries}
          icon={Zap}
          iconColor="from-green-500 to-emerald-600"
        />
        
        {/* Most Followed */}
        <LeaderboardCard
          title="Most Followed Creators"
          description="Creators with the most followers"
          entries={leaderboards.leaderboards.most_followed_creators.entries}
          icon={Users}
          iconColor="from-purple-500 to-pink-600"
        />
      </div>
    </div>
  );
};

export default LeaderboardsPage;