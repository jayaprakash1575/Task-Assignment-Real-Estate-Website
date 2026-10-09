import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ScheduleTourModal from './components/ScheduleTourModal';
import CompareModal from './components/CompareModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import AgentModal from './components/AgentModal';
import Toast from './components/Toast';

import HomeView from './views/HomeView';
import PropertiesView from './views/PropertiesView';
import PropertyDetailsView from './views/PropertyDetailsView';
import AgentsView from './views/AgentsView';
import ContactView from './views/ContactView';

import { propertiesData } from './data/propertiesData';
import { agentsData } from './data/agentsData';

export default function App() {
  // Navigation & Active View state
  const [currentView, setCurrentView] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [propertyFilters, setPropertyFilters] = useState({});

  // Favorites state (persisted to localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('luxehaven_favorites');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  // Comparison state (up to 3 properties)
  const [compared, setCompared] = useState(['prop-1', 'prop-2']);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('luxehaven_user');
      return saved ? JSON.parse(saved) : {
        name: 'Aditya Mittal',
        email: 'aditya.m@privateequity.in',
        phone: '+91 98201 98765',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        role: 'Verified HNI Client'
      };
    } catch {
      return null;
    }
  });

  // Modal Visibilities
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourProperty, setTourProperty] = useState(null);
  const [tourAgent, setTourAgent] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('luxehaven_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('luxehaven_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('luxehaven_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Toast helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Favorite
  const handleToggleFavorite = (property) => {
    setFavorites((prev) => {
      const exists = prev.includes(property.id);
      if (exists) {
        showToast(`Removed "${property.title}" from saved residences.`, 'info');
        return prev.filter((id) => id !== property.id);
      } else {
        showToast(`Saved "${property.title}" to your favorites!`, 'success');
        return [...prev, property.id];
      }
    });
  };

  // Toggle Compare
  const handleToggleCompare = (property) => {
    setCompared((prev) => {
      const exists = prev.includes(property.id);
      if (exists) {
        showToast(`Removed "${property.title}" from comparison.`, 'info');
        return prev.filter((id) => id !== property.id);
      } else {
        if (prev.length >= 3) {
          showToast(`You can compare up to 3 properties at a time. Please remove one first.`, 'warning');
          return prev;
        }
        showToast(`Added "${property.title}" to comparison!`, 'success');
        return [...prev, property.id];
      }
    });
  };

  // View Navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Property for Details Page
  const handleSelectProperty = (property) => {
    setSelectedPropertyId(property.id);
    setCurrentView('property-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Agent for Modal
  const handleSelectAgent = (agent) => {
    setSelectedAgentId(agent.id);
    setIsAgentModalOpen(true);
  };

  // Open Schedule Tour Modal
  const handleOpenScheduleTour = (property, agent) => {
    setTourProperty(property);
    setTourAgent(agent);
    setIsTourModalOpen(true);
  };

  // Handle Apply Filters from Home Hero
  const handleApplyFilters = (filters) => {
    setPropertyFilters(filters);
    setCurrentView('properties');
  };

  // Current selected property object
  const currentProperty = propertiesData.find((p) => p.id === selectedPropertyId) || propertiesData[0];
  const currentAgent = agentsData.find((a) => a.id === currentProperty?.agentId) || agentsData[0];
  const selectedAgentModalData = agentsData.find((a) => a.id === selectedAgentId) || agentsData[0];

  // Favorite and Compare arrays of full objects
  const favoritePropertiesList = propertiesData.filter((p) => favorites.includes(p.id));
  const comparedPropertiesList = propertiesData.filter((p) => compared.includes(p.id));

  // Similar properties for details page
  const similarPropertiesList = propertiesData.filter(
    (p) => p.id !== currentProperty?.id && (p.type === currentProperty?.type || p.city === currentProperty?.city)
  );

  return (
    <div className="app-root">
      {/* 1. Main Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        compareCount={compared.length}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          showToast("You have signed out.", "info");
        }}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* 2. Main Page Views */}
      <main>
        {currentView === 'home' && (
          <HomeView
            properties={propertiesData}
            agents={agentsData}
            favorites={favorites}
            compared={compared}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
            onApplyFilters={handleApplyFilters}
            onSelectAgent={handleSelectAgent}
          />
        )}

        {currentView === 'properties' && (
          <PropertiesView
            properties={propertiesData}
            favorites={favorites}
            compared={compared}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={handleSelectProperty}
            initialFilters={propertyFilters}
          />
        )}

        {currentView === 'property-details' && (
          <PropertyDetailsView
            property={currentProperty}
            agent={currentAgent}
            similarProperties={similarPropertiesList}
            isFavorite={favorites.includes(currentProperty?.id)}
            isCompared={compared.includes(currentProperty?.id)}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
            onOpenScheduleTour={handleOpenScheduleTour}
            onSelectAgent={handleSelectAgent}
            onShowToast={showToast}
          />
        )}

        {currentView === 'agents' && (
          <AgentsView
            agents={agentsData}
            onSelectAgent={handleSelectAgent}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            currentUser={currentUser}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* 4. Interactive Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onShowToast={showToast}
      />

      <ScheduleTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        property={tourProperty}
        agent={tourAgent}
        currentUser={currentUser}
        onShowToast={showToast}
      />

      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedProperties={comparedPropertiesList}
        onRemoveFromCompare={(id) => setCompared((prev) => prev.filter((pId) => pId !== id))}
        onSelectProperty={handleSelectProperty}
        onClearCompare={() => setCompared([])}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favoriteProperties={favoritePropertiesList}
        onRemoveFavorite={(id) => setFavorites((prev) => prev.filter((fId) => fId !== id))}
        onClearAll={() => setFavorites([])}
        onSelectProperty={handleSelectProperty}
        onExploreProperties={() => handleNavigate('properties')}
      />

      <AgentModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
        agent={selectedAgentModalData}
        properties={propertiesData}
        onSelectProperty={handleSelectProperty}
        onShowToast={showToast}
      />

      {/* 5. Reactive Toast Notification System */}
      <Toast
        toasts={toasts}
        onRemoveToast={removeToast}
      />
    </div>
  );
}
