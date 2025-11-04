import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCredits } from '../contexts/CreditContext';
import { useGameData } from '../contexts/GameDataContext';
import { Settings as SettingsIcon, User, Mail, Bell, Lock, Eye, Shield, Zap, LogOut, Check, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeInSection from '../components/ui/FadeInSection';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { balance } = useCredits();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'security'>('account');
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  if (!user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <SettingsIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Please Log In</h2>
          <p className="text-slate-400 mb-6">You need to be logged in to access settings</p>
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

  const handleSave = () => {
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 3000);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-8 space-y-8">
      {/* Settings Content */}
      <FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 space-y-2">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'account'
                    ? 'bg-gradient-to-r from-cyan-500/40 to-purple-500/40 text-white border border-cyan-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-4 h-4" />
                Account
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'notifications'
                    ? 'bg-gradient-to-r from-cyan-500/40 to-purple-500/40 text-white border border-cyan-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bell className="w-4 h-4" />
                Notifications
              </button>

              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'privacy'
                    ? 'bg-gradient-to-r from-cyan-500/40 to-purple-500/40 text-white border border-cyan-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Eye className="w-4 h-4" />
                Privacy
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'security'
                    ? 'bg-gradient-to-r from-cyan-500/40 to-purple-500/40 text-white border border-cyan-400/50'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Lock className="w-4 h-4" />
                Security
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Profile Info */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                      <input
                        type="text"
                        defaultValue={user.display_name}
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-slate-400 cursor-not-allowed opacity-60"
                      />
                      <p className="text-sm text-slate-400 mt-2">Contact support to change your email</p>
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                      <input
                        type="text"
                        defaultValue={user.username}
                        disabled
                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-slate-400 cursor-not-allowed opacity-60"
                      />
                      <p className="text-sm text-slate-400 mt-2">Usernames cannot be changed</p>
                    </div>

                    {/* Account Tier */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Account Tier</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-black/30 border border-white/10 rounded-lg">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          user.tier === 'creator_elite' 
                            ? 'bg-purple-500/20 text-purple-300'
                            : user.tier === 'creator_pro'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'bg-slate-500/20 text-slate-300'
                        }`}>
                          {user.tier.replace('creator_', '').replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-slate-400 text-sm">Member since {new Date(user.registration_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Credits Balance */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Credits Balance</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-2xl font-bold text-white">{balance.toLocaleString()}</span>
                        <span className="text-slate-400 text-sm">Credits</span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      {showSaveConfirm && (
                        <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30">
                          <Check className="w-4 h-4" />
                          Changes saved successfully!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Game Downloads', description: 'Notify me when someone downloads my game' },
                      { label: 'Game Plays', description: 'Notify me when someone plays my game' },
                      { label: 'Comments & Ratings', description: 'Notify me of new comments and ratings' },
                      { label: 'Follower Updates', description: 'Notify me when someone follows me' },
                      { label: 'Gamer Hub Activity', description: 'Notify me of updates in Gamer Hub' },
                      { label: 'Challenges & Events', description: 'Notify me about new challenges and events' },
                      { label: 'Marketing Emails', description: 'Send me promotional content and updates' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-black/30 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Public Profile', description: 'Allow others to view your profile' },
                      { label: 'Show Activity', description: 'Display your games and plays on your profile' },
                      { label: 'Show Statistics', description: 'Display your stats and achievements publicly' },
                      { label: 'Allow Direct Messages', description: 'Let other creators send you messages' },
                      { label: 'Show in Creator Directory', description: 'Appear in the creators list' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-black/30 border border-white/10 rounded-lg hover:border-white/20 transition-all">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-cyan-400" />
                        Change Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                          <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                          <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Two-Factor Authentication */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        Two-Factor Authentication
                      </h3>
                      <p className="text-slate-400 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-200">
                        Enable 2FA
                      </button>
                    </div>

                    <hr className="border-white/10" />

                    {/* Active Sessions */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
                      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Current Session</p>
                            <p className="text-sm text-slate-400">Last active: Just now</p>
                          </div>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded text-sm font-medium">Active</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    {/* Logout Button */}
                    <div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all duration-200 w-full justify-center"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout from All Devices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default SettingsPage;
