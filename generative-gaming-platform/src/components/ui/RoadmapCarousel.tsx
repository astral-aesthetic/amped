import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Zap, CheckCircle, Route } from 'lucide-react';

interface RoadmapItem {
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  quarter?: string;
  description?: string;
}

interface RoadmapCarouselProps {
  items: RoadmapItem[];
}

const RoadmapCarousel: React.FC<RoadmapCarouselProps> = ({ items }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort items: upcoming first, then in-progress, then completed at the end
  const sortedItems = items.sort((a, b) => {
    const statusOrder: Record<string, number> = { 'upcoming': 0, 'in-progress': 1, 'completed': 2 };
    return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-orange-400" />;
      case 'upcoming':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500/20 to-green-600/20 border-green-500/50';
      case 'in-progress':
        return 'from-orange-500/20 to-orange-600/20 border-orange-500/50';
      case 'upcoming':
        return 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50';
      default:
        return 'from-slate-700 to-slate-800 border-white/10';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Planned';
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl mb-4">
          <Route className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
          Platform Roadmap
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Our journey to revolutionize game creation through AI
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-orange-500/30 pointer-events-none" />

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-hidden pb-8 px-16 scroll-smooth"
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {sortedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-72 relative"
            >
              {/* Connector Dot */}
              <div className="absolute top-1/3 -left-8 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-slate-900 z-10" />

              {/* Card */}
              <div
                className={`bg-gradient-to-br ${getStatusColor(item.status)} backdrop-blur-xl rounded-xl border p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group cursor-pointer`}
              >
                {/* Status Icon and Label */}
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(item.status)}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500/30 text-green-300' :
                    item.status === 'in-progress' ? 'bg-orange-500/30 text-orange-300' :
                    'bg-cyan-500/30 text-cyan-300'
                  }`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                {/* Quarter */}
                {item.quarter && (
                  <p className="text-sm text-slate-400 mb-3">{item.quarter}</p>
                )}

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-12 flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-slate-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-400" />
          <span className="text-slate-400">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span className="text-slate-400">Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCarousel;
