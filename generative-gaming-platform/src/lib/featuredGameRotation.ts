/**
 * Featured Game Rotation Logic
 * Rotates the featured game every Saturday at 0:00 UTC
 */

import { Game } from '../contexts/GameDataContext';

/**
 * Get the week number since epoch (for consistent rotation)
 * Returns the number of complete weeks since the Unix epoch (Jan 1, 1970)
 */
export const getWeekNumber = (date: Date = new Date()): number => {
  // Get the start of the week (Saturday)
  const d = new Date(date);
  const day = d.getDay();
  
  // Adjust to get Saturday (day 6)
  // If today is Saturday-Sunday (6, 0), keep in same week
  // Otherwise, go back to last Saturday
  const diff = d.getDate() - day + (day === 0 ? -1 : 6);
  const weekStart = new Date(d.setDate(diff));
  
  // Calculate weeks since epoch (Jan 1, 1970)
  const epochDate = new Date('1970-01-01');
  const weeksSinceEpoch = Math.floor((weekStart.getTime() - epochDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  
  return weeksSinceEpoch;
};

/**
 * Get the current featured game based on the week number
 * Rotates through available games deterministically
 */
export const getFeaturedGameForWeek = (games: Game[], date: Date = new Date()): Game | null => {
  if (!games || games.length === 0) {
    return null;
  }
  
  const weekNumber = getWeekNumber(date);
  const index = weekNumber % games.length;
  
  return games[index];
};

/**
 * Check if we're in the week that starts on Saturday
 * This helps determine when to rotate featured games
 */
export const isInCurrentWeek = (date: Date = new Date()): boolean => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  
  // Week starts on Saturday (day 6)
  // If today is Saturday-Sunday (6, 0), it's the current week
  return dayOfWeek === 6 || dayOfWeek === 0;
};

/**
 * Get days until next rotation (Saturday 0:00 UTC)
 */
export const getDaysUntilNextRotation = (date: Date = new Date()): number => {
  const now = new Date(date);
  const today = now.getDay();
  
  // Saturday is day 6
  const daysUntilSaturday = (6 - today + 7) % 7 || 7;
  
  // Get next Saturday at 0:00 UTC
  const nextRotation = new Date(now);
  nextRotation.setUTCDate(nextRotation.getUTCDate() + daysUntilSaturday);
  nextRotation.setUTCHours(0, 0, 0, 0);
  
  return Math.ceil((nextRotation.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Format rotation info for display
 */
export const getRotationInfo = (date: Date = new Date()) => {
  const daysUntilRotation = getDaysUntilNextRotation(date);
  const hoursUntil = Math.ceil(((getDaysUntilNextRotation(date) % 1) * 24));
  
  return {
    daysUntilRotation,
    nextRotationDate: new Date(new Date().getTime() + daysUntilRotation * 24 * 60 * 60 * 1000),
    weekNumber: getWeekNumber(date),
  };
};
