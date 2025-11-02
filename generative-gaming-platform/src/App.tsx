import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameDataProvider } from './contexts/GameDataContext';
import { CreditProvider } from './contexts/CreditContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ArcadePage from './pages/ArcadePage';
import GeneratePage from './pages/GeneratePage';
import TrendingPage from './pages/TrendingPage';
import FeaturedPage from './pages/FeaturedPage';
import CreatorHubPage from './pages/CreatorHubPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import PricingPage from './pages/PricingPage';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameDataProvider>
        <CreditProvider>
          <Router basename="/good-games">
            <Routes>
              {/* Login page without layout */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Main app with layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="games" element={<ArcadePage />} />
                <Route path="generate" element={<GeneratePage />} />
                <Route path="trending" element={<TrendingPage />} />
                <Route path="featured" element={<FeaturedPage />} />
                <Route path="community" element={<CreatorHubPage />} />
                <Route path="leaderboards" element={<LeaderboardsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="help" element={<HelpSupportPage />} />
                <Route path="pricing" element={<PricingPage />} />
                
                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Router>
        </CreditProvider>
      </GameDataProvider>
    </AuthProvider>
  );
};

export default App;