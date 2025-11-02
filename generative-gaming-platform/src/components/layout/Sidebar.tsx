import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gamepad2, 
  User, 
  Trophy, 
  Users, 
  Zap, 
  Search, 
  HelpCircle,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Star,
  Coins
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCredits } from '../../contexts/CreditContext';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { balance } = useCredits();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'My Dashboard', path: '/', color: 'text-cyan-400' },
    { icon: Gamepad2, label: 'Discover Games', path: '/games', color: 'text-indigo-400' },
    { icon: Sparkles, label: 'AI Game Generator', path: '/generate', color: 'text-purple-400' },
    { icon: Coins, label: 'Pricing', path: '/pricing', color: 'text-yellow-400' },
    { icon: TrendingUp, label: 'Trending', path: '/trending', color: 'text-orange-400' },
    { icon: Star, label: 'Featured', path: '/featured', color: 'text-yellow-400' },
    { icon: Users, label: 'Community', path: '/community', color: 'text-green-400' },
    { icon: Trophy, label: 'Leaderboards', path: '/leaderboards', color: 'text-red-400' },
    { icon: User, label: 'Profile', path: '/profile', color: 'text-blue-400' },
    { icon: HelpCircle, label: 'FAQ', path: '/faq', color: 'text-gray-400' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  return (
    <div className={`fixed left-0 top-0 h-full bg-black/95 backdrop-blur-xl border-r border-white/10 z-50 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Amped
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`text-gray-400 hover:text-white transition-colors p-1 ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* User Credits (when logged in) */}
      {user && !isCollapsed && (
        <div className="p-4 border-b border-white/10">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-3 border border-cyan-500/30">
            <div className="flex items-center justify-between">
              <span className="text-cyan-300 text-sm font-medium">Credits</span>
              <span className="text-white font-bold">{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Credits Indicator */}
      {user && isCollapsed && (
        <div className="px-2 py-4 border-b border-white/10 flex justify-center">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" title={`${balance.toLocaleString()} Credits`} />
        </div>
      )}

      {/* Navigation */}
      <nav className={`${isCollapsed ? 'p-2' : 'p-4'} space-y-2`}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'} rounded-lg transition-all duration-200 group ${
                active 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/20' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon 
                className={`${isCollapsed ? 'w-7 h-7' : 'w-5 h-5'} transition-all duration-200 ${
                  active 
                    ? item.color + ' drop-shadow-lg' 
                    : 'text-gray-400 group-hover:text-white'
                }`} 
              />
              {!isCollapsed && (
                <span className={`font-medium transition-colors ${
                  active ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              )}
              {active && !isCollapsed && (
                <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Info */}
      {user && (
        <div className="absolute bottom-4 left-4 right-4">
          {!isCollapsed ? (
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar_url || '/api/placeholder/32/32'} 
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user.display_name}</p>
                  <p className="text-gray-400 text-xs truncate">@{user.username}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img 
                src={user.avatar_url || '/api/placeholder/32/32'} 
                alt={user.display_name}
                className="w-8 h-8 rounded-full border-2 border-cyan-400/50 hover:border-cyan-400 transition-all cursor-pointer"
                title={`${user.display_name} (@${user.username})`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
