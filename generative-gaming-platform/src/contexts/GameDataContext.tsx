import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Game {
  game_id: string;
  title: string;
  creator_id: string;
  creator_username: string;
  category: string;
  subcategory?: string;
  description: string;
  created_date: string;
  version: string;
  tags: string[];
  cover_image: string;
  screenshots: string[];
  gameplay_video?: string;
  stats: {
    downloads: number;
    plays: number;
    favorites: number;
    rating: number;
    total_ratings: number;
    featured: boolean;
  };
  technical_info: {
    file_size: string;
    platform_compatibility: string[];
    controls: string;
    estimated_playtime: string;
  };
  monetization: {
    is_premium: boolean;
    premium_price?: number;
    credits_earned: number;
  };
}

interface OfficialGame {
  id: string;
  title: string;
  genre: string;
  developer: string;
  publisher: string;
  description: string;
  cover_art_urls: string[];
  official_trailers: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  key_features: string[];
}

interface Review {
  id: string;
  game_id: string;
  user_id: string;
  username: string;
  rating: number;
  content: string;
  helpful_votes: number;
  created_date: string;
}

interface GameDataContextType {
  userGames: Game[];
  officialGames: OfficialGame[];
  reviews: Review[];
  users: any[];
  leaderboards: any;
  community: any;
  credits: any[];
  isLoading: boolean;
  searchGames: (query: string) => Game[];
  filterGamesByCategory: (category: string) => Game[];
  getGameById: (gameId: string) => Game | undefined;
  getFeaturedGames: () => Game[];
  getTrendingGames: () => Game[];
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};

interface GameDataProviderProps {
  children: ReactNode;
}

export const GameDataProvider: React.FC<GameDataProviderProps> = ({ children }) => {
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [officialGames, setOfficialGames] = useState<OfficialGame[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [leaderboards, setLeaderboards] = useState<any>(null);
  const [community, setCommunity] = useState<any>(null);
  const [credits, setCredits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userGamesRes, officialGamesRes, reviewsRes, usersRes, leaderboardsRes, communityRes, creditsRes] = await Promise.all([
          fetch('/data/mockup_user_games.json'),
          fetch('/data/official_games_content.json'),
          fetch('/data/mockup_reviews.json'),
          fetch('/data/mockup_users.json'),
          fetch('/data/mockup_leaderboards.json'),
          fetch('/data/mockup_community.json'),
          fetch('/data/mockup_credits.json')
        ]);

        const userGamesData = await userGamesRes.json();
        const officialGamesData = await officialGamesRes.json();
        const reviewsData = await reviewsRes.json();
        const usersData = await usersRes.json();
        const leaderboardsData = await leaderboardsRes.json();
        const communityData = await communityRes.json();
        const creditsData = await creditsRes.json();

        setUserGames(userGamesData.user_games_database.games);
        
        // Flatten official games from all categories
        const allOfficialGames = [
          ...officialGamesData.games_database.action_games,
          ...officialGamesData.games_database.adventure_games,
          ...officialGamesData.games_database.strategy_games,
          ...officialGamesData.games_database.rpg_games,
          ...officialGamesData.games_database.puzzle_games
        ];
        setOfficialGames(allOfficialGames);
        
        setReviews(reviewsData.reviews_database.reviews);
        setUsers(usersData.users_database.users);
        setLeaderboards(leaderboardsData.leaderboards_achievements_database);
        setCommunity(communityData.community_database);
        setCredits(creditsData.credits_database.transactions);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const searchGames = (query: string): Game[] => {
    const lowercaseQuery = query.toLowerCase();
    return userGames.filter(game => 
      game.title.toLowerCase().includes(lowercaseQuery) ||
      game.description.toLowerCase().includes(lowercaseQuery) ||
      game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  const filterGamesByCategory = (category: string): Game[] => {
    if (category === 'All') return userGames;
    return userGames.filter(game => game.category === category);
  };

  const getGameById = (gameId: string): Game | undefined => {
    return userGames.find(game => game.game_id === gameId);
  };

  const getFeaturedGames = (): Game[] => {
    return userGames.filter(game => game.stats.featured).slice(0, 6);
  };

  const getTrendingGames = (): Game[] => {
    return userGames
      .filter(game => !game.stats.featured) // Exclude featured games
      .sort((a, b) => b.stats.downloads - a.stats.downloads)
      .slice(0, 8);
  };

  const value = {
    userGames,
    officialGames,
    reviews,
    users,
    leaderboards,
    community,
    credits,
    isLoading,
    searchGames,
    filterGamesByCategory,
    getGameById,
    getFeaturedGames,
    getTrendingGames
  };

  return <GameDataContext.Provider value={value}>{children}</GameDataContext.Provider>;
};
