import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, Lightbulb, Zap, Users, Headphones, Clock, CheckCircle, ArrowRight, BookMarked, Compass, Route, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FadeInSection from '../components/ui/FadeInSection';
import RoadmapCarousel from '../components/ui/RoadmapCarousel';

const HelpSupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      color: 'from-slate-700 to-slate-600',
      description: 'Learn the basics and create your first game',
      articles: [
        { title: 'What is Good Games?', excerpt: 'An AI-powered gaming platform that allows users to create games from simple text prompts...' },
        { title: 'How do I create my first game?', excerpt: 'Simply navigate to the AI Game Generator, describe your game idea, and let our AI create it...' },
        { title: 'Do I need programming experience?', excerpt: 'No programming experience is required! Our AI handles all the technical implementation...' }
      ]
    },
    {
      id: 'credits',
      title: 'Credits & Economy',
      icon: Zap,
      color: 'from-slate-700 to-slate-600',
      description: 'Understand how credits work and earn more',
      articles: [
        { title: 'How does the credit system work?', excerpt: 'Credits are the platform currency used for playing, downloading, and generating games...' },
        { title: 'How do I earn credits?', excerpt: 'Earn credits when others download your games, achieve milestones, and participate in challenges...' },
        { title: 'What can I do with credits?', excerpt: 'Use credits to play, download, generate games, promote content, and participate in challenges...' }
      ]
    },
    {
      id: 'game-creation',
      title: 'Game Creation',
      icon: Lightbulb,
      color: 'from-slate-700 to-slate-600',
      description: 'Master game design with AI assistance',
      articles: [
        { title: 'What types of games can I create?', excerpt: 'Create action games, puzzles, strategy games, RPGs, arcade-style games, and more...' },
        { title: 'How detailed should my game prompt be?', excerpt: 'Include genre, mechanics, visual style, player goals, controls, and special features...' },
        { title: 'Can I modify the generated code?', excerpt: 'Yes! All generated code is fully editable and follows Unity best practices...' }
      ]
    },
    {
      id: 'community',
      title: 'Creator Hub & Community',
      icon: Users,
      color: 'from-slate-700 to-slate-600',
      description: 'Connect with other creators and collaborate',
      articles: [
        { title: 'How do I share my games?', excerpt: 'Games are automatically available on the platform and discoverable through search and categories...' },
        { title: 'What are community challenges?', excerpt: 'Time-limited events where creators compete around themes with credit prizes and featured placement...' },
        { title: 'How do I follow other creators?', excerpt: 'Visit profiles and click follow to get notifications about new games and updates...' }
      ]
    },
    {
      id: 'achievements',
      title: 'Achievements & Leaderboards',
      icon: BookMarked,
      color: 'from-slate-700 to-slate-600',
      description: 'Track progress and compete with the community',
      articles: [
        { title: 'How do achievements work?', excerpt: 'Unlock achievements automatically when meeting criteria, from beginner to legendary levels...' },
        { title: 'What are creator tiers?', excerpt: 'Earn Standard, Pro, or Elite tiers based on downloads, ratings, followers, and credits earned...' },
        { title: 'How are leaderboards calculated?', excerpt: 'Track metrics: Most Downloaded Creators, Highest Rated Games, Top Earners, and More...' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Headphones,
      color: 'from-slate-700 to-slate-600',
      description: 'Troubleshoot issues and get technical help',
      articles: [
        { title: 'What platforms are supported?', excerpt: 'Web, Windows, Mac, and Mobile. AI optimizes for cross-platform compatibility...' },
        { title: 'My game generation failed. What do I do?', excerpt: 'Try simplifying your prompt, being more specific, or checking your credit balance...' },
        { title: 'Can I export games to other platforms?', excerpt: 'Yes! Generated Unity C# code can be imported into Unity and built for any platform...' }
      ]
    }
  ];

  const allArticles = categories.flatMap(category =>
    category.articles.map(article => ({
      ...article,
      categoryId: category.id,
      categoryTitle: category.title,
      categoryColor: category.color
    }))
  );

  const filteredArticles = searchQuery
    ? allArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="p-8 space-y-8">
      {/* Search Bar */}
      <FadeInSection>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              placeholder="Search help articles..."
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
            />
          </div>
        </div>
      </FadeInSection>

      {/* Search Results */}
      {searchQuery && (
        <FadeInSection delay={200}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
            </h2>
            {filteredArticles.length > 0 ? (
              <div className="space-y-4">
                {filteredArticles.map((article, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded inline-block mb-2">
                          {article.categoryTitle}
                        </p>
                        <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                        <p className="text-slate-400">{article.excerpt}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Compass className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No results found. Try different keywords.</p>
              </div>
            )}
          </div>
        </FadeInSection>
      )}

      {/* Category View or Directory */}
      {!searchQuery && !selectedCategory && (
        <FadeInSection delay={200}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (category.id === 'credits') {
                        navigate('/pricing');
                      } else {
                        setSelectedCategory(category.id);
                      }
                    }}
                    className="text-left bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group"
                  >
                    <div className={`bg-gradient-to-br ${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                      {category.id === 'credits' ? (
                        <>
                          <BarChart3 className="w-4 h-4" />
                          <span>View Chart</span>
                        </>
                      ) : (
                        <>
                          <span>{category.articles.length} articles</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Category Detail View */}
      {!searchQuery && selectedCategory && selectedCategoryData && (
        <FadeInSection delay={200}>
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 font-medium transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Categories
            </button>

            {/* Category Header */}
            <div className={`bg-gradient-to-r ${selectedCategoryData.color} rounded-2xl p-8 mb-8`}>
              <div className="flex items-center gap-4">
                {(() => {
                  const Icon = selectedCategoryData.icon;
                  return <Icon className="w-10 h-10 text-white" />;
                })()}
                <div>
                  <h1 className="text-3xl font-bold text-white">{selectedCategoryData.title}</h1>
                  <p className="text-white/80 mt-1">{selectedCategoryData.articles.length} articles</p>
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {selectedCategoryData.articles.map((article, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    // Convert article title to URL-friendly ID
                    const articleId = article.title
                      .toLowerCase()
                      .replace(/[?!]/g, '')
                      .replace(/\s+/g, '-');
                    navigate(`/help-article/${articleId}`);
                  }}
                  className="w-full text-left bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* Platform Roadmap */}
      {!searchQuery && !selectedCategory && (
        <FadeInSection delay={300}>
          <div className="max-w-6xl mx-auto">
            <RoadmapCarousel
              items={[
                {
                  title: 'Core AI Game Generator',
                  status: 'completed',
                  description: 'Create full games from text descriptions'
                },
                {
                  title: 'Community Marketplace',
                  status: 'completed',
                  description: 'Discover and share games with creators'
                },
                {
                  title: 'Credit-Based Economy',
                  status: 'completed',
                  description: 'Earn and spend credits for platform actions'
                },
                {
                  title: 'Advanced Analytics',
                  status: 'completed',
                  description: 'Track game performance metrics'
                },
                {
                  title: 'Advanced AI Game Physics',
                  status: 'in-progress',
                  description: 'Realistic physics simulations for games'
                },
                {
                  title: 'Real-time Multiplayer Support',
                  status: 'in-progress',
                  description: 'Connect players in live sessions'
                },
                {
                  title: 'Enhanced 3D Asset Library',
                  status: 'in-progress',
                  description: 'Expanded assets for better visuals'
                },
                {
                  title: 'Voice-Driven Game Design',
                  status: 'upcoming',
                  description: 'Create games using voice commands'
                },
                {
                  title: 'Cross-Platform Publishing',
                  status: 'upcoming',
                  description: 'Deploy games to multiple platforms'
                },
                {
                  title: 'AI-Powered Music Generation',
                  status: 'upcoming',
                  description: 'Generate custom soundtracks for games'
                },
                {
                  title: 'VR/AR Game Support',
                  status: 'upcoming',
                  description: 'Create immersive VR and AR experiences'
                },
                {
                  title: 'Smart Asset Optimization',
                  status: 'completed',
                  description: 'Automatic performance optimization'
                }
              ]}
            />
          </div>
        </FadeInSection>
      )}

      {/* Contact Support CTA */}
      {!searchQuery && !selectedCategory && (
        <FadeInSection delay={400}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
              <p className="text-slate-400 mb-6">
                Our support team is ready to assist you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                  Contact Support
                </button>
                <button onClick={() => navigate('/gamer-hub')} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Search Hub
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}
    </div>
  );
};

export default HelpSupportPage;
