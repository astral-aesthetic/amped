import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, Code, Download, Play, Loader2, Palette, Zap, Plus, BookOpen, Lightbulb, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCredits } from '../contexts/CreditContext';
import { PRICING, formatCredits } from '../lib/pricing';
import FadeInSection from '../components/ui/FadeInSection';

interface GeneratedGame {
  title: string;
  description: string;
  category: string;
  code: string;
  features: string[];
}

const AIGameGeneratorPage: React.FC = () => {
  const { user } = useAuth();
  const { balance, spendCredits } = useCredits();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGame, setGeneratedGame] = useState<GeneratedGame | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showExamples, setShowExamples] = useState(false);
  
  // Button state management
  const [activeStylePreset, setActiveStylePreset] = useState<string | null>(null);
  const [activeGenreTemplate, setActiveGenreTemplate] = useState<string | null>(null);
  const [activeEnhancement, setActiveEnhancement] = useState<string | null>(null);
  const [activeSuggestions, setActiveSuggestions] = useState<Set<string>>(new Set());
  
  // Cost for generating a game - From centralized pricing
  const GENERATION_COST = PRICING.GENERATE_GAME;

  // Style Presets
  const stylePresets = [
    { name: "Pixel Art Retro", description: "Classic 8-bit/16-bit style with pixelated graphics and nostalgic feel" },
    { name: "3D Modern", description: "Contemporary 3D graphics with realistic lighting and textures" },
    { name: "Cartoon/Stylized", description: "Colorful, fun art style with exaggerated proportions" },
    { name: "Realistic Graphics", description: "Photorealistic visuals with detailed environments" },
    { name: "Minimalist/Abstract", description: "Clean, simple geometric designs with focus on gameplay" }
  ];

  // Quality Enhancement Options
  const qualityEnhancements = [
    { name: "Add More Detail", description: "Expand basic ideas with specific mechanics and features" },
    { name: "Simplify Description", description: "Make complex ideas more concise and focused" },
    { name: "Add Mechanics", description: "Suggest innovative gameplay mechanics" },
    { name: "Enhance Story", description: "Add narrative elements and character development" },
    { name: "Technical Details", description: "Include Unity-specific implementation notes" }
  ];

  // Genre Templates
  const genreTemplates = [
    {
      name: "2D Platformer Template",
      template: "Create a 2D side-scrolling platformer where the player character can run, jump, and collect items. Include multiple levels with increasing difficulty, moving platforms, enemies, and power-ups that grant temporary abilities."
    },
    {
      name: "Top-Down RPG Template", 
      template: "Design a top-down role-playing game with character progression, inventory management, and turn-based combat. Include a world map, NPCs with quests, different weapon types, and magic spells."
    },
    {
      name: "Puzzle Game Template",
      template: "Build a puzzle game with grid-based mechanics where players must match patterns, solve logic challenges, or manipulate objects. Include a hint system, progressive difficulty, and unlockable bonus levels."
    },
    {
      name: "Action Adventure Template",
      template: "Create an action-adventure game combining real-time combat, exploration, and puzzle-solving. Include character upgrades, boss battles, secret areas, and environmental storytelling."
    }
  ];

  // Smart Suggestions
  const smartSuggestions = [
    "Add multiplayer cooperative gameplay",
    "Include procedural generation for endless replayability",
    "Implement a crafting system for weapons and items",
    "Add environmental physics and destructible objects",
    "Include a day/night cycle affecting gameplay",
    "Add character customization and skill trees",
    "Implement weather effects that impact gameplay",
    "Include achievements and leaderboards"
  ];

  // Example Descriptions
  const exampleDescriptions = [
    {
      title: "Simple Concept",
      description: "A runner game where you avoid obstacles",
      complexity: "Beginner"
    },
    {
      title: "Detailed Concept",
      description: "A cyberpunk endless runner through neon-lit cityscapes where players control a parkour expert navigating rooftops, avoiding drone patrols, collecting data chips, and using wall-running mechanics to access secret routes.",
      complexity: "Intermediate"
    },
    {
      title: "Complex Concept", 
      description: "An open-world survival game set on an alien planet where players must manage oxygen, radiation exposure, and food while building bases, researching alien technology, taming creatures, establishing trade routes between settlements, and uncovering the mystery of the planet's previous inhabitants through environmental storytelling and artifact discovery.",
      complexity: "Advanced"
    }
  ];

  // Unity C# Expert Developer Prompt Template
  const unityExpertPrompt = `# Unity C# Expert Developer
You are an expert Unity C# developer with deep knowledge of game development best practices, performance optimization, and cross-platform considerations. When generating code or providing solutions:
1. Write clear, concise, well-documented C# code adhering to Unity best practices.
2. Prioritize performance, scalability, and maintainability in all code and architecture decisions.
3. Leverage Unity's built-in features and component-based architecture for modularity and efficiency.
4. Implement robust error handling, logging, and debugging practices.
5. Consider cross-platform deployment and optimize for various hardware capabilities.

## Code Style and Conventions
- Use PascalCase for public members, camelCase for private members.
- Utilize #regions to organize code sections.
- Wrap editor-only code with #if UNITY_EDITOR.
- Use [SerializeField] to expose private fields in the inspector.
- Implement Range attributes for float fields when appropriate.

## Best Practices
- Use TryGetComponent to avoid null reference exceptions.
- Prefer direct references or GetComponent() over GameObject.Find() or Transform.Find().
- Always use TextMeshPro for text rendering.
- Implement object pooling for frequently instantiated objects.
- Use ScriptableObjects for data-driven design and shared resources.
- Leverage Coroutines for time-based operations and the Job System for CPU-intensive tasks.
- Optimize draw calls through batching and atlasing.
- Implement LOD (Level of Detail) systems for complex 3D models.

## Nomenclature
- Variables: m_VariableName
- Constants: c_ConstantName
- Statics: s_StaticName
- Classes/Structs: ClassName
- Properties: PropertyName
- Methods: MethodName()
- Arguments: _argumentName
- Temporary variables: temporaryVariable

Create a game based on: `;

  const gameTemplates = [
    {
      title: "Neon Cyber Runner",
      description: "A fast-paced endless runner through a cyberpunk cityscape with neon lights and dynamic obstacles.",
      category: "Action",
      features: ["Endless running gameplay", "Dynamic obstacle generation", "Power-up system", "Neon visual effects", "Leaderboard integration"]
    },
    {
      title: "Quantum Puzzle Lab",
      description: "Mind-bending puzzle game where you manipulate quantum states to solve increasingly complex challenges.",
      category: "Puzzle",
      features: ["Quantum mechanics simulation", "50+ unique levels", "Particle physics effects", "Progressive difficulty", "Achievement system"]
    },
    {
      title: "Space Colony Builder",
      description: "Strategic simulation game where you build and manage colonies across different planets.",
      category: "Strategy",
      features: ["Resource management", "Multi-planet gameplay", "Technology research tree", "Environmental hazards", "Trade system"]
    }
  ];

  // Helper Functions
  const addStylePreset = (style: string) => {
    const styleText = `Style: ${style}. `;
    setPrompt(prev => styleText + prev);
    setActiveStylePreset(style);
    // Clear after 2 seconds
    setTimeout(() => setActiveStylePreset(null), 2000);
  };

  const addGenreTemplate = (template: string, name: string) => {
    setPrompt(template);
    setActiveGenreTemplate(name);
    // Clear after 2 seconds
    setTimeout(() => setActiveGenreTemplate(null), 2000);
  };

  const enhancePrompt = (enhancement: string) => {
    const currentPrompt = prompt.trim();
    if (!currentPrompt) return;
    
    let enhancedPrompt = currentPrompt;
    
    switch (enhancement) {
      case "Add More Detail":
        enhancedPrompt += " Include specific mechanics, level progression, user interface elements, and unique gameplay features that set it apart from similar games.";
        break;
      case "Simplify Description":
        enhancedPrompt = currentPrompt.split('.')[0] + ". Focus on core gameplay mechanics.";
        break;
      case "Add Mechanics":
        enhancedPrompt += " Include innovative gameplay mechanics like combo systems, environmental interactions, and player progression systems.";
        break;
      case "Enhance Story":
        enhancedPrompt += " Add a compelling narrative with character development, plot twists, and meaningful player choices that affect the story outcome.";
        break;
      case "Technical Details":
        enhancedPrompt += " Include Unity-specific implementation details like component architecture, performance optimization, and cross-platform considerations.";
        break;
    }
    
    setPrompt(enhancedPrompt);
    setActiveEnhancement(enhancement);
    // Clear after 2 seconds
    setTimeout(() => setActiveEnhancement(null), 2000);
  };

  const addSuggestion = (suggestion: string) => {
    setPrompt(prev => prev + (prev ? " " : "") + suggestion + ".");
    const newActiveSuggestions = new Set(activeSuggestions);
    newActiveSuggestions.add(suggestion);
    setActiveSuggestions(newActiveSuggestions);
    // Remove from active after 2 seconds
    setTimeout(() => {
      setActiveSuggestions(prev => {
        const updated = new Set(prev);
        updated.delete(suggestion);
        return updated;
      });
    }, 2000);
  };

  // Smart suggestions based on current prompt
  useEffect(() => {
    if (prompt.length > 20) {
      const relevantSuggestions = smartSuggestions.filter(suggestion => 
        !prompt.toLowerCase().includes(suggestion.toLowerCase().split(' ')[0])
      ).slice(0, 3);
      setSuggestions(relevantSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [prompt]);

  const generateGame = async () => {
    if (!user) {
      alert('Please log in to generate games');
      return;
    }

    if (balance < GENERATION_COST) {
      alert(`Insufficient credits. You need ${GENERATION_COST} credits to generate a game.`);
      return;
    }

    if (!prompt.trim()) {
      alert('Please enter a game idea to generate');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated game based on prompt
    const template = gameTemplates[Math.floor(Math.random() * gameTemplates.length)];
    const generated: GeneratedGame = {
      title: template.title + " " + (Math.floor(Math.random() * 1000) + 1),
      description: `${template.description} Generated from prompt: "${prompt}"`,
      category: template.category,
      features: template.features,
      code: generateUnityCode(prompt, template)
    };
    
    // Spend credits and set generated game
    if (spendCredits(GENERATION_COST, 'GENERATE_GAME', `Generated game: ${generated.title}`)) {
      setGeneratedGame(generated);
    }
    
    setIsGenerating(false);
  };

  const generateUnityCode = (userPrompt: string, template: any): string => {
    return `${unityExpertPrompt}"${userPrompt}"

// Generated Unity C# Game Controller
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using TMPro;

public class ${template.title.replace(/\s+/g, '')}Controller : MonoBehaviour
{
    #region Private Fields
    [SerializeField] private float m_GameSpeed = 5.0f;
    [SerializeField] private GameObject m_PlayerPrefab;
    [SerializeField] private Transform m_SpawnPoint;
    [SerializeField] private TextMeshProUGUI m_ScoreText;
    
    private int m_CurrentScore = 0;
    private bool m_IsGameActive = true;
    private PlayerController m_PlayerController;
    #endregion
    
    #region Unity Lifecycle
    private void Start()
    {
        InitializeGame();
    }
    
    private void Update()
    {
        if (m_IsGameActive)
        {
            UpdateGameLogic();
        }
    }
    #endregion
    
    #region Game Logic
    private void InitializeGame()
    {
        if (m_PlayerPrefab != null && m_SpawnPoint != null)
        {
            GameObject playerObject = Instantiate(m_PlayerPrefab, m_SpawnPoint.position, Quaternion.identity);
            if (playerObject.TryGetComponent<PlayerController>(out m_PlayerController))
            {
                m_PlayerController.OnScoreChanged += UpdateScore;
                m_PlayerController.OnGameOver += HandleGameOver;
            }
        }
        
        UpdateScoreDisplay();
    }
    
    private void UpdateGameLogic()
    {
        // Game-specific logic based on template
        m_GameSpeed += Time.deltaTime * 0.1f;
    }
    
    private void UpdateScore(int _points)
    {
        m_CurrentScore += _points;
        UpdateScoreDisplay();
    }
    
    private void UpdateScoreDisplay()
    {
        if (m_ScoreText != null)
        {
            m_ScoreText.text = $"Score: {m_CurrentScore:N0}";
        }
    }
    
    private void HandleGameOver()
    {
        m_IsGameActive = false;
        // Handle game over logic
        SaveHighScore();
    }
    
    private void SaveHighScore()
    {
        int highScore = PlayerPrefs.GetInt("HighScore", 0);
        if (m_CurrentScore > highScore)
        {
            PlayerPrefs.SetInt("HighScore", m_CurrentScore);
            PlayerPrefs.Save();
        }
    }
    #endregion
    
    #region Public Methods
    public void RestartGame()
    {
        m_IsGameActive = true;
        m_CurrentScore = 0;
        m_GameSpeed = 5.0f;
        UpdateScoreDisplay();
        
        if (m_PlayerController != null)
        {
            m_PlayerController.ResetPlayer();
        }
    }
    #endregion
}

// Additional Player Controller
public class PlayerController : MonoBehaviour
{
    #region Events
    public System.Action<int> OnScoreChanged;
    public System.Action OnGameOver;
    #endregion
    
    #region Private Fields
    [SerializeField] private float m_MoveSpeed = 10.0f;
    [SerializeField] private float m_JumpForce = 15.0f;
    
    private Rigidbody2D m_Rigidbody;
    private bool m_IsGrounded = true;
    private bool m_IsAlive = true;
    #endregion
    
    private void Awake()
    {
        if (!TryGetComponent<Rigidbody2D>(out m_Rigidbody))
        {
            Debug.LogError("PlayerController requires a Rigidbody2D component!");
        }
    }
    
    private void Update()
    {
        if (!m_IsAlive) return;
        
        HandleInput();
        UpdateMovement();
    }
    
    private void HandleInput()
    {
        if (Input.GetKeyDown(KeyCode.Space) && m_IsGrounded)
        {
            Jump();
        }
    }
    
    private void UpdateMovement()
    {
        // Continuous forward movement
        transform.Translate(Vector2.right * m_MoveSpeed * Time.deltaTime);
    }
    
    private void Jump()
    {
        if (m_Rigidbody != null && m_IsGrounded)
        {
            m_Rigidbody.velocity = new Vector2(m_Rigidbody.velocity.x, m_JumpForce);
            m_IsGrounded = false;
        }
    }
    
    public void ResetPlayer()
    {
        transform.position = Vector3.zero;
        m_IsAlive = true;
        m_IsGrounded = true;
        
        if (m_Rigidbody != null)
        {
            m_Rigidbody.velocity = Vector2.zero;
        }
    }
    
    private void OnTriggerEnter2D(Collider2D _other)
    {
        if (_other.CompareTag("Obstacle"))
        {
            m_IsAlive = false;
            OnGameOver?.Invoke();
        }
        else if (_other.CompareTag("Collectible"))
        {
            OnScoreChanged?.Invoke(100);
            Destroy(_other.gameObject);
        }
    }
    
    private void OnCollisionEnter2D(Collision2D _collision)
    {
        if (_collision.gameObject.CompareTag("Ground"))
        {
            m_IsGrounded = true;
        }
    }
}`;
  };

  const downloadCode = () => {
    if (!generatedGame) return;
    
    const blob = new Blob([generatedGame.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedGame.title.replace(/\s+/g, '_')}.cs`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const playGame = () => {
    if (!generatedGame) return;
    // Mock game play - in reality would compile and run the Unity game
    window.open(`/play/generated/${generatedGame.title.replace(/\s+/g, '_')}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header Section - Full Width */}
      <div className="w-full bg-gradient-to-r from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-xl border-b border-white/10 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
        
        {/* Pharaoh Character - Right Aligned */}
        <div className="absolute top-0 right-0 lg:right-12 hidden lg:block opacity-60 pointer-events-none">
          <img 
            src="/imgs/pharoh_character.png" 
            alt="Pharaoh Character - AI Generator" 
            className="w-40 h-40 xl:w-48 xl:h-48 object-contain filter drop-shadow-2xl"
          />
        </div>

        {/* Header Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            AI Game Generator
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl">
            Create fully playable games from simple text descriptions using our advanced AI technology
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Style Presets */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-slate-400" />
              <h3 className="text-white text-lg font-semibold">Style Presets</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {stylePresets.map((style, index) => {
                const isActive = activeStylePreset === style.name;
                return (
                  <button
                    key={index}
                    onClick={() => addStylePreset(style.name)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400 text-purple-200 shadow-lg shadow-purple-500/25'
                        : 'bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/50 hover:border-slate-500/70 text-slate-300 hover:text-slate-200'
                    }`}
                    title={style.description}
                  >
                    {style.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genre Templates */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <h3 className="text-white text-lg font-semibold">Genre Templates</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {genreTemplates.map((genre, index) => {
                const isActive = activeGenreTemplate === genre.name;
                return (
                  <button
                    key={index}
                    onClick={() => addGenreTemplate(genre.template, genre.name)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 text-left ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/50 hover:border-slate-500/70 text-slate-300 hover:text-slate-200'
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="prompt" className="block text-white text-lg font-semibold">
                Describe your game idea
              </label>
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium flex items-center gap-1"
              >
                <Lightbulb className="w-4 h-4" />
                {showExamples ? 'Hide Examples' : 'Browse Examples'}
              </button>
            </div>
            
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Example: Create a 2D platformer where the player controls a robot that can transform into different vehicles to overcome obstacles. Include power-ups, multiple levels, and boss battles."
                    className="w-full h-32 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                  />
                  
                  {/* Smart Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300 font-medium">Smart Suggestions:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => {
                          const isActive = activeSuggestions.has(suggestion);
                          return (
                            <button
                              key={index}
                              onClick={() => addSuggestion(suggestion)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                                isActive
                                  ? 'bg-yellow-500/30 border border-yellow-400 text-yellow-200 shadow-lg shadow-yellow-500/25'
                                  : 'bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/50 hover:border-slate-500/70 text-slate-300 hover:text-slate-200'
                              }`}
                            >
                              + {suggestion}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quality Enhancement Buttons */}
                <div className="flex flex-col gap-2 lg:min-w-[200px] w-full lg:w-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300 font-medium">Enhance:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                    {qualityEnhancements.map((enhancement, index) => {
                      const isActive = activeEnhancement === enhancement.name;
                      return (
                        <button
                          key={index}
                          onClick={() => enhancePrompt(enhancement.name)}
                          disabled={!prompt.trim()}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                            isActive
                              ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400 text-green-200 shadow-lg shadow-green-500/25'
                              : 'bg-slate-700/50 hover:bg-slate-600/60 border border-slate-600/50 hover:border-slate-500/70 text-slate-300 hover:text-slate-200 disabled:bg-slate-800/50 disabled:border-slate-700/50 disabled:text-slate-500'
                          }`}
                          title={enhancement.description}
                        >
                          <Zap className="w-3 h-3 inline mr-1" />
                          {enhancement.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Examples Gallery */}
          {showExamples && (
            <div className="mb-6 p-4 bg-black/20 rounded-xl border border-white/5">
              <h4 className="text-white font-semibold mb-3">Example Descriptions by Complexity</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {exampleDescriptions.map((example, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-medium">{example.title}</h5>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        example.complexity === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                        example.complexity === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {example.complexity}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">{example.description}</p>
                    <button
                      onClick={() => setPrompt(example.description)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                    >
                      Use This Example
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="text-slate-300">
              <p className="text-sm">Generation cost: <span className="text-purple-400 font-semibold">{GENERATION_COST} credits</span></p>
              {user && (
                <p className="text-sm">Your balance: <span className="text-cyan-400 font-semibold">{balance} credits</span></p>
              )}
            </div>
            
            <button
              onClick={generateGame}
              disabled={isGenerating || !user || balance < GENERATION_COST || !prompt.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 sm:px-8 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 w-full sm:w-auto justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Game
                </>
              )}
            </button>
          </div>
          
          {!user && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-300 text-sm">
                Please <a href="/login" className="text-yellow-200 underline hover:text-white transition-colors">log in</a> to generate games
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Generated Game Display */}
      {generatedGame && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{generatedGame.title}</h2>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {generatedGame.category}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={playGame}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 flex-1 sm:flex-none justify-center"
                >
                  <Play className="w-4 h-4" />
                  Play Game
                </button>
                <button
                  onClick={downloadCode}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 flex-1 sm:flex-none justify-center"
                >
                  <Download className="w-4 h-4" />
                  Download Code
                </button>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6">{generatedGame.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {generatedGame.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Generated Unity C# Code
                </h3>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                >
                  {showCode ? 'Hide Code' : 'Show Code'}
                </button>
              </div>
              
              {showCode && (
                <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                  <pre className="text-slate-300 text-sm overflow-x-auto whitespace-pre-wrap">
                    <code>{generatedGame.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Examples Section - Full Width */}
      <div className="w-full bg-gradient-to-b from-slate-900/50 to-slate-800/50 p-6 sm:p-8 lg:p-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            Example Game Ideas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameTemplates.map((template, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all group">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">{template.title}</h3>
                <span className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs mb-3 inline-block">
                  {template.category}
                </span>
                <p className="text-slate-300 text-sm mb-4">{template.description}</p>
                <button
                  onClick={() => setPrompt(template.description)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                >
                  Use This Idea
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGameGeneratorPage;