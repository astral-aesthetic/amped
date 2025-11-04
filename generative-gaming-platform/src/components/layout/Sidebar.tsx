import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gamepad2, 
  User, 
  Users, 
  Search, 
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Coins,
  Wand2,
  Settings,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCredits } from '../../contexts/CreditContext';

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { balance } = useCredits();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'My Dashboard', path: '/', color: 'text-cyan-400' },
    { icon: Gamepad2, label: 'Arcade', path: '/games', color: 'text-indigo-400' },
    { icon: Wand2, label: 'AI Game Generator', path: '/generate', color: 'text-purple-400' },
    { icon: Users, label: 'Gamer Hub', path: '/community', color: 'text-green-400' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'text-blue-400' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help', color: 'text-gray-400' }
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
            <div className="flex-1 flex justify-center">
              <div className="text-3xl font-bold">
                <span className="inline-block transform -scale-x-100 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent -mr-1">G</span><span className="inline-block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">G</span>
              </div>
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

      {/* Bottom User Info or Sign In Button */}
      <div className="absolute bottom-4 left-4 right-4 space-y-3">
        {user ? (
          <>
            {!isCollapsed ? (
              <>
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-3 border border-white/10">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <button
                      onClick={() => navigate('/settings')}
                      className="w-12 h-12 rounded-full border-2 border-cyan-400/50 hover:border-cyan-400 transition-all cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-cyan-500/20"
                      title="Click to go to Settings"
                    >
                      <img 
                        src={user.avatar_url || '/api/placeholder/48/48'} 
                        alt={user.display_name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{user.display_name}</p>
                      <p className="text-gray-400 text-xs truncate">@{user.username}</p>
                      <div className="mt-2 flex items-center justify-center gap-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">{balance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-medium transition-all duration-200 group"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => navigate('/settings')}
                  className="w-10 h-10 rounded-full border-2 border-cyan-400/50 hover:border-cyan-400 transition-all cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-cyan-500/20"
                  title="Click to go to Settings"
                >
                  <img 
                    src={user.avatar_url || '/api/placeholder/40/40'} 
                    alt={user.display_name}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="flex flex-col items-center gap-1" title={`${balance.toLocaleString()} Credits`}>
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400">{(balance / 1000).toFixed(0)}K</span>
                </div>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {!isCollapsed ? (
              <button
                onClick={() => navigate('/login')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/50 hover:border-green-500/70 text-green-400 hover:text-green-300 font-semibold transition-all duration-200"
                title="Sign In"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-green-400 hover:text-green-300 transition-colors p-2 hover:bg-green-500/10 rounded-lg mx-auto"
                title="Sign In"
              >
                <LogIn className="w-6 h-6" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
