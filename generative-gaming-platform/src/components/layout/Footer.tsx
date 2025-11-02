import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Gamepad2, Users, Trophy, HelpCircle, Mail, Twitter, Youtube, Twitch, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/95 backdrop-blur-xl border-t border-white/10 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm relative">
                <span className="transform -scale-x-100">G</span><span>G</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Good Games
                </h3>
                <p className="text-slate-400 text-sm">AI Gaming Platform</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Create, discover, and share incredible games with the power of AI. 
              Join a community of creators pushing the boundaries of interactive entertainment.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitch className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Home className="w-4 h-4 text-cyan-400" />
              Platform
            </h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                Dashboard
              </Link>
              <Link to="/games" className="block text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                Arcade
              </Link>
              <Link to="/generate" className="block text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                AI Game Generator
              </Link>
              <Link to="/community" className="block text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                Creator Hub
              </Link>
              <Link to="/leaderboards" className="block text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                Leaderboards
              </Link>
              <Link to="/settings" className="block text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                Settings
              </Link>
            </nav>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-green-400" />
              Support
            </h4>
            <nav className="space-y-2">
              <Link to="/help" className="block text-slate-300 hover:text-green-400 transition-colors text-sm">
                Help & Support
              </Link>
              <a href="#" className="block text-slate-300 hover:text-green-400 transition-colors text-sm">
                Help Center
              </a>
              <a href="#" className="block text-slate-300 hover:text-green-400 transition-colors text-sm">
                Contact Support
              </a>
              <a href="#" className="block text-slate-300 hover:text-green-400 transition-colors text-sm">
                Developer API
              </a>
              <a href="#" className="block text-slate-300 hover:text-green-400 transition-colors text-sm">
                Status Page
              </a>
            </nav>
          </div>

          {/* Newsletter & Legal */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                Stay Updated
              </h4>
              <p className="text-slate-400 text-sm">
                Get the latest news, game releases, and community highlights.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Legal Links */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">Legal</h4>
              <nav className="space-y-1">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-xs">
                  Privacy Policy
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-xs">
                  Terms of Service
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-xs">
                  DMCA Policy
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-xs">
                  Cookie Policy
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 Good Games AI Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span>Made with ❤️ for creators</span>
              <div className="flex items-center gap-1">
                <Gamepad2 className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;