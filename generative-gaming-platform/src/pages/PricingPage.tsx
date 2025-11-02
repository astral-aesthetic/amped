import React from 'react';
import { Coins, Sparkles, Play, Download, Trophy, Gift, Crown, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FadeInSection from '../components/ui/FadeInSection';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const pricingActions = [
    {
      icon: Sparkles,
      action: 'Generate a Game',
      cost: 500,
      description: 'Use our AI to generate a unique, fully playable 3D world.',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400'
    },
    {
      icon: Download,
      action: 'Download a Game',
      cost: 100,
      description: 'Get the source files for any game to modify or host yourself.',
      color: 'from-cyan-500 to-blue-500',
      iconColor: 'text-cyan-400'
    },
    {
      icon: Play,
      action: 'Play a Game',
      cost: 10,
      description: 'Access and play any game hosted on the Amped platform.',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400'
    }
  ];

  const creditPackages = [
    {
      name: 'Starter Pack',
      credits: 2000,
      price: '$10.00',
      bonus: null,
      popular: false,
      description: 'Perfect for trying out the platform',
      color: 'from-slate-600 to-slate-700'
    },
    {
      name: 'Creator Pack',
      credits: 5500,
      price: '$25.00',
      bonus: '10% bonus!',
      popular: true,
      description: 'Best value for active creators',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Pro Pack',
      credits: 12000,
      price: '$50.00',
      bonus: '20% bonus!',
      popular: false,
      description: 'For power users and teams',
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const earningMethods = [
    {
      icon: Trophy,
      title: 'Game Creations',
      description: 'Earn credits when other users play or download the games you\'ve created.',
      credits: '50-200 per play/download'
    },
    {
      icon: Gift,
      title: 'Community Challenges',
      description: 'Participate in weekly challenges and beta testing programs for bonus credits.',
      credits: '100-500 per challenge'
    },
    {
      icon: Crown,
      title: 'Welcome Bonus',
      description: 'Receive a starting bonus of 1,000 credits when you sign up.',
      credits: '1,000 one-time'
    },
    {
      icon: Zap,
      title: 'Creator Rewards',
      description: 'Earn monthly bonuses based on your game\'s popularity and user ratings.',
      credits: '500-2,000 monthly'
    },
    {
      icon: Play,
      title: 'Community Participation',
      description: 'Get credits for reviewing games, helping other creators, and forum activity.',
      credits: '25-100 per activity'
    },
    {
      icon: Sparkles,
      title: 'Achievement Unlocks',
      description: 'Complete platform milestones and unlock special achievement rewards.',
      credits: '200-1,000 per milestone'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Back to Help Button */}
      <button
        onClick={() => navigate('/help')}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </button>

      {/* Purchase Credits */}
      <FadeInSection>
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            Purchase Credits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPackages.map((pack) => {
              return (
                <div key={pack.name} className={`relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border ${pack.popular ? 'border-purple-400 shadow-lg shadow-purple-400/20' : 'border-white/10'} p-6 hover:scale-105 transition-all duration-300`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {pack.credits.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-sm">Credits</span>
                    </div>
                    
                    {pack.bonus && (
                      <div className="inline-block bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-medium mb-3">
                        {pack.bonus}
                      </div>
                    )}
                    
                    <div className="text-3xl font-bold text-white mb-2">{pack.price}</div>
                    <p className="text-slate-400 text-sm mb-4">{pack.description}</p>
                    
                    <button className={`w-full bg-gradient-to-r ${pack.popular ? 'from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400' : 'from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600'} text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 justify-center group`}>
                      <Coins className="w-4 h-4" />
                      Purchase Now
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Credit Value Examples */}
      <FadeInSection delay={100}>
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-400" />
            Credit Value Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">With 1,000 Credits You Can:</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-green-400" />
                  <span>Play <strong className="text-white">100 games</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download <strong className="text-white">10 games</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Generate <strong className="text-white">2 games</strong></span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-400">With 5,000 Credits You Can:</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-green-400" />
                  <span>Play <strong className="text-white">500 games</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download <strong className="text-white">50 games</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Generate <strong className="text-white">10 games</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* What Can You Do With Credits */}
      <FadeInSection delay={200}>
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            What Can You Do With Credits?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingActions.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.action} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{item.action}</h3>
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-xl font-bold text-yellow-400">{item.cost.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* How to Earn Credits */}
      <FadeInSection delay={300}>
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-green-400" />
            How to Earn Credits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earningMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
                  <Icon className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-slate-300 text-sm mb-3">{method.description}</p>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium text-sm">{method.credits}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Call to Action */}
      <FadeInSection delay={400}>
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Creating?</h2>
            <p className="text-slate-300 mb-6">Join thousands of creators building amazing games with Amped.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Link
                to="/generate"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 justify-center group"
              >
                <Sparkles className="w-4 h-4" />
                Start Creating
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/community"
                className="w-full sm:w-auto bg-transparent border-2 border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 hover:text-cyan-300 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 justify-center group hover:border-cyan-300"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default PricingPage;