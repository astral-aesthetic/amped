import React, { useState, useMemo } from 'react';
import { ImageIcon, Gamepad2 } from 'lucide-react';

interface GameImageProps {
  src?: string;
  alt: string;
  title?: string;
  category?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

const GameImage: React.FC<GameImageProps> = ({ 
  src, 
  alt, 
  title = '', 
  category = '', 
  className = '',
  aspectRatio = 'video'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const fallbackImages = [
    '/imgs/3d_neon_gaming_controller_futuristic_ui.jpg',
    '/imgs/futuristic-neon-cyberpunk-gaming-logo-black-background.jpg',
    '/imgs/neon_gaming_controller_dark_theme_icon.jpg',
    '/imgs/3D_Neon_Glow_Gaming_Controller_Lamp.jpg',
    '/imgs/cyberpunk-2077-red-neon-gaming-logo-transparent.png',
    '/imgs/futuristic_cyberpunk_neon_gaming_logo_transparent.png'
  ];

  // Select fallback based on title hash to ensure consistency
  const fallbackIndex = title ? Math.abs(title.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % fallbackImages.length : 0;
  const fallbackSrc = fallbackImages[fallbackIndex];

  // Ensure image src is properly formatted and handles both /imgs/ and /images/ paths
  const normalizedSrc = useMemo(() => {
    if (!src) return null;
    // Convert /images/ to /imgs/ for consistency
    let normalized = src.replace('/images/', '/imgs/');
    // Ensure it starts with /
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }
    return normalized;
  }, [src]);

  return (
    <div className={`${aspectClasses[aspectRatio]} overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}>
      {!imageError && normalizedSrc ? (
        <>
          <img 
            src={normalizedSrc} 
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full" />
            </div>
          )}
        </>
      ) : (
        <>
          <img 
            src={fallbackSrc} 
            alt={alt}
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              // If fallback also fails, hide the image element
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
            <div className="text-center">
              <div className="relative mb-3">
                <Gamepad2 className="w-12 h-12 text-cyan-400 mx-auto" />
                <div className="absolute -inset-1 bg-cyan-400/20 rounded-lg blur-sm" />
              </div>
              <p className="text-slate-300 text-sm font-medium">{title || alt}</p>
              {category && (
                <p className="text-slate-500 text-xs mt-1">{category}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameImage;