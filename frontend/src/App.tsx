import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import ApodViewer from './components/ApodViewer';
import MarsRoversViewer from './components/MarsRoversViewer';
import NearEarthObjectsViewer from './components/NearEarthObjectsViewer';
import EarthImagesViewer from './components/EarthImagesViewer';
import { NavItem } from './types/nasa';
import './App.css';

// Navigation items
const navigationItems: NavItem[] = [
  {
    name: 'APOD',
    path: '/apod',
    icon: () => null, // We'll add icons later
    description: 'Astronomy Picture of the Day'
  },
  {
    name: 'Mars Rovers',
    path: '/mars-rovers',
    icon: () => null,
    description: 'Mars Rover Photos'
  },
  {
    name: 'Near Earth Objects',
    path: '/neo',
    icon: () => null,
    description: 'Asteroid Tracking'
  },
  {
    name: 'Earth Images',
    path: '/epic',
    icon: () => null,
    description: 'Earth from Space'
  }
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 bg-stars">
        <Navigation items={navigationItems} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Default route redirects to APOD */}
            <Route path="/" element={<Navigate to="/apod" replace />} />
            
            {/* APOD Route */}
            <Route path="/apod" element={<ApodViewer />} />
            
            {/* Feature routes */}
            <Route path="/mars-rovers" element={<MarsRoversViewer />} />
            <Route path="/neo" element={<NearEarthObjectsViewer />} />
            <Route path="/epic" element={<EarthImagesViewer />} />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="card text-center">
                <h2 className="text-2xl font-bold text-red-400 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-400 mb-4">The page you're looking for doesn't exist.</p>
                <button 
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  Go Back
                </button>
              </div>
            } />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-400 text-sm">
              <p>© 2025 NASA Space Explorer | Built with NASA's Open APIs</p>
              <p className="mt-2">
                Data provided by{' '}
                <a 
                  href="https://api.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-space-blue-400 hover:text-space-blue-300 transition-colors"
                >
                  NASA Open Data
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
