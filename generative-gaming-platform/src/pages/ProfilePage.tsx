import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCredits } from '../contexts/CreditContext';
import { useGameData } from '../contexts/GameDataContext';
import { User, MapPin, Globe, Twitter, Youtube, Twitch, Trophy, Zap, Download, Play, Star, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import GameCard from '../components/games/GameCard';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { balance, transactions } = useCredits();
  const { userGames, users } = useGameData();

  if (!user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <User className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Please Log In</h2>
          <p className="text-slate-400 mb-6">You need to be logged in to view your profile</p>
          <Link 
            to="/login" 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-200"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const userCreatedGames = userGames.filter(game => game.creator_id === user.user_id);
  const recentTransactions = transactions.slice(0, 10);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={user.avatar_url || '/api/placeholder/120/120'} 
              alt={user.display_name}
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            )}
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">@{user.username}</h1>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                user.tier === 'creator_elite' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : user.tier === 'creator_pro'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
              }`}>
                {user.tier.replace('creator_', '').replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <p className="text-slate-400 mb-2">@{user.username}</p>
            
            {user.bio && (
              <p className="text-slate-300 mb-4 max-w-2xl">{user.bio}</p>
            )}
            
            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {user.location && (
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
              
              {user.website && (
                <a 
                  href={user.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
              
              {user.social_links?.twitter && (
                <a 
                  href={`https://twitter.com/${user.social_links.twitter.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  {user.social_links.twitter}
                </a>
              )}
              
              {user.social_links?.youtube && (
                <a 
                  href={`https://youtube.com/c/${user.social_links.youtube}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  {user.social_links.youtube}
                </a>
              )}
              
              {user.social_links?.twitch && (
                <a 
                  href={`https://twitch.tv/${user.social_links.twitch}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <Twitch className="w-4 h-4" />
                  {user.social_links.twitch}
                </a>
              )}
              
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-4 h-4" />
                Joined {formatDate(user.registration_date)}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{user.stats.games_created}</p>
          <p className="text-slate-400 text-sm">Games</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
          <Download className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{user.stats.total_downloads.toLocaleString()}</p>
          <p className="text-slate-400 text-sm">Downloads</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
          <Play className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{user.stats.total_plays.toLocaleString()}</p>
          <p className="text-slate-400 text-sm">Plays</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{user.stats.average_rating.toFixed(1)}</p>
          <p className="text-slate-400 text-sm">Rating</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
          <User className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{user.stats.followers.toLocaleString()}</p>
          <p className="text-slate-400 text-sm">Followers</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
          <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{balance.toLocaleString()}</p>
          <p className="text-slate-400 text-sm">Credits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User's Games */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My Games</h2>
            <Link 
              to="/generate" 
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-400 hover:to-pink-500 transition-all duration-200 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Create Game
            </Link>
          </div>
          
          {userCreatedGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userCreatedGames.map(game => (
                <GameCard key={game.game_id} game={game} />
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-8 text-center">
              <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Games Yet</h3>
              <p className="text-slate-400 mb-4">Start creating games and share them with the community</p>
              <Link 
                to="/generate" 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Create Your First Game
              </Link>
            </div>
          )}
        </div>
        
        {/* Recent Transactions */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : '-'}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{transaction.description}</p>
                        <p className="text-slate-400 text-xs">{formatDate(transaction.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </p>
                      <p className="text-slate-400 text-xs">{transaction.balance_after}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Zap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;