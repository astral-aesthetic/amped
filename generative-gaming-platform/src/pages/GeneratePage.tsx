import React, { useState } from 'react';
import { 
  Download,
  ThumbsUp,
  Upload,
  Wand2,
  Sparkles,
  Copy,
  Palette,
  Zap,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import FadeInSection from '../components/ui/FadeInSection';

const GeneratePage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('v5');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState('high');
  const [style, setStyle] = useState('photorealistic');
  const [numImages, setNumImages] = useState(4);
  const [gameStyle, setGameStyle] = useState('action');
  const [motion, setMotion] = useState('none');
  const [promptEnhance, setPromptEnhance] = useState('auto');
  const [theme, setTheme] = useState('none');
  const [lighting, setLighting] = useState('none');
  const [selectedDevices, setSelectedDevices] = useState(new Set(['desktop', 'mobile', 'tablet']));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [prompt, setPrompt] = useState('Futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, holographic advertisements, flying cars, detailed architecture, cinematic lighting, 8k, highly detailed');

  // 10 Premade Game Descriptions
  const premadeDescriptions = [
    'A mystical forest filled with ancient ruins and magical creatures, waiting to be discovered.',
    'An underwater kingdom with bioluminescent creatures and coral palaces, rich with secrets.',
    'A steampunk metropolis with airships, gears, and clockwork contraptions everywhere.',
    'A post-apocalyptic wasteland with verdant nature reclaiming abandoned structures.',
    'A vibrant neon-soaked cyberpunk city with flying vehicles and holographic interfaces.',
    'A fantastical dragon\'s realm with floating mountains and crystalline caverns.',
    'A retro pixel art world with colorful dungeons and treasure-filled chambers.',
    'A gothic Victorian mansion with shadowy corridors and mysterious puzzles.',
    'An alien desert planet with exotic flora and towering monolithic structures.',
    'A enchanted castle floating among the clouds with magical portals and spires.'
  ];

  // Description fragments for each preset
  const descriptionFragments = {
    action: ', with intense combat sequences and explosive action',
    puzzle: ', filled with intricate puzzles and logical challenges',
    rpg: ', featuring deep character development and immersive storytelling',
    strategy: ', requiring tactical planning and resource management',
    arcade: ', with classic arcade-style gameplay and retro charm',
    casual: ', offering relaxing and accessible gameplay for all players',
    fps: ', featuring first-person perspective and dynamic combat'
  };

  const motionFragments = {
    '90s-retro': ' rendered in 90s retro style',
    'cgi': ' with cutting-edge CGI graphics',
    'comic': ' illustrated like comic book panels',
    'claymation': ' with charming claymation aesthetics',
    'dark-fantasy': ' with dark and moody fantasy elements',
    'digital-painting': ' styled as digital paintings',
    'dreamcore': ' with dreamlike and surreal visuals',
    'felted': ' with felt texture aesthetics',
    'line-art': ' rendered as intricate line art',
    'moody': ' with moody atmospheric lighting',
    'pixel': ' in gorgeous pixel art style',
    'paper': ' with paper cutout art style',
    'puppeteer': ' with stop-motion puppetry effects',
    'realistic': ' with photorealistic visual fidelity'
  };

  const randomPrompt = () => {
    const randomDesc = premadeDescriptions[Math.floor(Math.random() * premadeDescriptions.length)];
    const styleFragment = descriptionFragments[gameStyle as keyof typeof descriptionFragments] || '';
    const motionFragment = motion !== 'none' ? (motionFragments[motion as keyof typeof motionFragments] || '') : '';
    const themeFragment = theme !== 'none' ? `, ${theme} themed` : '';
    const lightingFragment = lighting !== 'none' ? `, ${lighting} lighting` : '';
    
    const combinedPrompt = `${randomDesc}${styleFragment}${motionFragment}${themeFragment}${lightingFragment}, 8k, highly detailed`;
    setPrompt(combinedPrompt);
  };

  const gameStylePresets = [
    { id: 'action', name: 'Action', description: 'Fast-paced combat & adventure' },
    { id: 'puzzle', name: 'Puzzle', description: 'Brain-teasing challenges' },
    { id: 'rpg', name: 'RPG', description: 'Story & character progression' },
    { id: 'strategy', name: 'Strategy', description: 'Tactical gameplay' },
    { id: 'arcade', name: 'Arcade', description: 'Classic arcade fun' },
    { id: 'casual', name: 'Casual', description: 'Relaxing & fun' },
    { id: 'fps', name: 'FPS', description: 'First-person action' }
  ];

  const motionPresets = ['None', '90s Retro', 'CGI', 'Comic', 'Claymation', 'Dark Fantasy', 'Digital Painting', 'Dreamcore', 'Felted', 'Line Art', 'Moody', 'Pixel', 'Paper', 'Puppeteer', 'Realistic'];

  const themePresets = ['None', 'Clay', 'Sketch', 'Papercraft', 'Sci-Fi'];

  const lightingPresets = ['None', 'Bioluminescent', 'Candle Lit', 'Fog', 'Golden Hour', 'Noir', 'Psychedelic', 'Mystical', 'Hard Light', 'Silhouette'];

  const deviceOptions = ['Desktop', 'Mobile', 'Tablet'];

  const generatedImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&h=800&auto=format&fit=crop' },
    { id: 2, src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&h=800&auto=format&fit=crop' },
    { id: 3, src: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=800&h=800&auto=format&fit=crop' },
    { id: 4, src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=800&auto=format&fit=crop' }
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden flex-col lg:flex-row">
      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden min-w-0">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Generated Images Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            {generatedImages.map((image, idx) => (
              <div key={image.id} className="group relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                <img 
                  src={image.src} 
                  alt={`Generated ${idx + 1}`}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-xs rounded-full px-2 py-0.5 text-white/60">{idx + 1}/4</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Used */}
          <div className="rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="text-sm font-medium text-white/80">Prompt</div>
              <button className="p-1 rounded hover:bg-slate-700/50">
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {prompt}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs rounded-full px-2 py-1 text-slate-400">Aspect: 1:1</span>
              <span className="text-xs rounded-full px-2 py-1 text-slate-400">Quality: High</span>
              <span className="text-xs rounded-full px-2 py-1 text-slate-400">Style: Photorealistic</span>
            </div>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="p-4 md:p-4 border-t border-slate-800">
          <div className="rounded-lg bg-slate-900/30 focus-within:ring-2 focus-within:ring-purple-500/40 transition-all">
            <div className="px-3 md:px-4 py-2 md:py-3">
              <textarea 
                className="w-full bg-transparent text-sm placeholder-slate-500 focus:outline-none resize-none"
                rows={3}
                placeholder="Describe the game you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 md:px-4 py-2 md:py-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-700/50 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Upload Image</span>
                </button>
                <button onClick={randomPrompt} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-700/50 transition-colors">
                  <Wand2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Random Prompt</span>
                </button>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-purple-600 hover:bg-purple-500 transition-colors">
                <Sparkles className="w-4 h-4" />
                Generate (500 credits)
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Game Generation Panel - Collapsible & Responsive */}
      <aside className={`${sidebarCollapsed ? 'w-0' : 'w-72'} bg-slate-900/50 border-l border-slate-800 overflow-y-auto transition-all duration-300 hidden lg:flex flex-col`}>
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold">Game Style</h2>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
              title={sidebarCollapsed ? "Expand" : "Collapse"}
            >
              {sidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Game Style Presets */}
          <div className="space-y-2">
            {gameStylePresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setGameStyle(preset.id);
                  // Add style fragment to prompt if prompt contains the base descriptions
                  const styleFragment = descriptionFragments[preset.id as keyof typeof descriptionFragments] || '';
                  if (styleFragment && !prompt.includes(styleFragment)) {
                    setPrompt(prompt + styleFragment);
                  }
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  gameStyle === preset.id
                    ? 'bg-purple-600/40 border border-purple-500 text-white'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{preset.name}</div>
                  <div className="text-xs text-slate-400">{preset.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Settings Section */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="space-y-4">
              
              {/* Motion Elements */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-2">Motion Elements</label>
                <select 
                  value={motion} 
                  onChange={(e) => {
                    setMotion(e.target.value);
                    // Add motion fragment to prompt
                    const motionFragment = motionFragments[e.target.value as keyof typeof motionFragments] || '';
                    if (motionFragment && !prompt.includes(motionFragment)) {
                      setPrompt(prompt + motionFragment);
                    }
                  }}
                  className="w-full px-2 py-1.5 rounded text-xs bg-slate-800 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500"
                >
                  {motionPresets.map((m) => (
                    <option key={m} value={m.toLowerCase().replace(/\s+/g, '-')}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prompt Enhance */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-2">Prompt Enhance</label>
                <select 
                  value={promptEnhance} 
                  onChange={(e) => setPromptEnhance(e.target.value)}
                  className="w-full px-2 py-1.5 rounded text-xs bg-slate-800 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500"
                >
                  <option value="auto">Auto</option>
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-2">Theme</label>
                <select 
                  value={theme} 
                  onChange={(e) => {
                    setTheme(e.target.value);
                    // Add theme fragment to prompt
                    if (e.target.value !== 'none' && !prompt.includes(`${e.target.value} themed`)) {
                      setPrompt(prompt + `, ${e.target.value} themed`);
                    }
                  }}
                  className="w-full px-2 py-1.5 rounded text-xs bg-slate-800 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500"
                >
                  {themePresets.map((t) => (
                    <option key={t} value={t.toLowerCase()}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lighting */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-2">Lighting</label>
                <select 
                  value={lighting} 
                  onChange={(e) => {
                    setLighting(e.target.value);
                    // Add lighting fragment to prompt
                    if (e.target.value !== 'none' && !prompt.includes(`${e.target.value} lighting`)) {
                      setPrompt(prompt + `, ${e.target.value} lighting`);
                    }
                  }}
                  className="w-full px-2 py-1.5 rounded text-xs bg-slate-800 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500"
                >
                  {lightingPresets.map((l) => (
                    <option key={l} value={l.toLowerCase().replace(/\s+/g, '-')}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Devices */}
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wide block mb-2">Target Devices</label>
                <div className="space-y-1.5">
                  {deviceOptions.map((device) => (
                    <label key={device} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedDevices.has(device.toLowerCase())}
                        onChange={(e) => {
                          const updated = new Set(selectedDevices);
                          if (e.target.checked) {
                            updated.add(device.toLowerCase());
                          } else {
                            updated.delete(device.toLowerCase());
                          }
                          setSelectedDevices(updated);
                        }}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-purple-500 cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">{device}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default GeneratePage;
