import React, { useState, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
// import apiService from '../services/apiService';
import directNasaService from '../services/directNasaService';
// import apiService from '../services/mockApiService';
import { NeoResponse } from '../types/nasa';

interface NearEarthObjectsViewerProps {
  className?: string;
}

interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
      miles: string;
    };
    orbiting_body: string;
  }>;
  is_sentry_object: boolean;
}

const NearEarthObjectsViewer: React.FC<NearEarthObjectsViewerProps> = ({ className = '' }) => {
  const [startDate, setStartDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string>(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
  const [neoData, setNeoData] = useState<NeoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<NearEarthObject | null>(null);
  const [showHazardousOnly, setShowHazardousOnly] = useState<boolean>(false);

  const fetchNearEarthObjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = {
        start_date: startDate,
        end_date: endDate,
        detailed: true
      };

      const response = await directNasaService.getNearEarthObjects(params);
      setNeoData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Near Earth Objects');
      console.error('Error fetching NEOs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNearEarthObjects();
  }, [startDate, endDate]);

  const handleQuickDateRange = (days: number) => {
    const today = new Date();
    setStartDate(format(today, 'yyyy-MM-dd'));
    setEndDate(format(addDays(today, days), 'yyyy-MM-dd'));
  };

  const getAllNEOs = (): NearEarthObject[] => {
    if (!neoData?.near_earth_objects) return [];
    
    const allNEOs: NearEarthObject[] = [];
    Object.values(neoData.near_earth_objects).forEach(dateArray => {
      allNEOs.push(...dateArray);
    });
    
    return showHazardousOnly 
      ? allNEOs.filter(neo => neo.is_potentially_hazardous_asteroid)
      : allNEOs;
  };

  const getHazardLevel = (neo: NearEarthObject): 'high' | 'medium' | 'low' => {
    if (neo.is_potentially_hazardous_asteroid) return 'high';
    
    const minDistance = Math.min(
      ...neo.close_approach_data.map(approach => parseFloat(approach.miss_distance.astronomical))
    );
    
    if (minDistance < 0.05) return 'medium'; // Less than 0.05 AU
    return 'low';
  };

  const getHazardColor = (level: 'high' | 'medium' | 'low'): string => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-500';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-500';
    }
  };

  const formatDistance = (kilometers: string): string => {
    const km = parseFloat(kilometers);
    if (km > 1000000) {
      return `${(km / 1000000).toFixed(2)}M km`;
    } else if (km > 1000) {
      return `${(km / 1000).toFixed(0)}K km`;
    }
    return `${km.toFixed(0)} km`;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Near Earth Objects...</p>
        </div>
      </div>
    );
  }

  const allNEOs = getAllNEOs();
  const hazardousCount = allNEOs.filter(neo => neo.is_potentially_hazardous_asteroid).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Controls */}
      <div className="card">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Near Earth Objects
            </h2>
            <p className="text-gray-400">
              Track asteroids and comets approaching Earth
            </p>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Date Range
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={format(subDays(new Date(), 365), 'yyyy-MM-dd')}
                  max={format(addDays(new Date(), 365), 'yyyy-MM-dd')}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  max={format(addDays(new Date(), 365), 'yyyy-MM-dd')}
                  className="input-field"
                />
              </div>
            </div>
            
            {/* Quick Date Range Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickDateRange(1)}
                className="btn-secondary text-sm"
              >
                Today
              </button>
              <button
                onClick={() => handleQuickDateRange(7)}
                className="btn-secondary text-sm"
              >
                Next 7 Days
              </button>
              <button
                onClick={() => handleQuickDateRange(30)}
                className="btn-secondary text-sm"
              >
                Next 30 Days
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showHazardousOnly}
                  onChange={(e) => setShowHazardousOnly(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-space-blue-600 focus:ring-space-blue-500"
                />
                <span className="text-sm text-gray-300">Show only potentially hazardous</span>
              </label>
            </div>
            <button
              onClick={fetchNearEarthObjects}
              className="btn-primary"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
            <p className="text-gray-300">{error}</p>
          </div>
          <button
            onClick={fetchNearEarthObjects}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Summary Stats */}
      {neoData && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-space-blue-400 mb-2">
              {allNEOs.length}
            </div>
            <div className="text-sm text-gray-400">Total Objects</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {hazardousCount}
            </div>
            <div className="text-sm text-gray-400">Potentially Hazardous</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {neoData.element_count || 0}
            </div>
            <div className="text-sm text-gray-400">Total in Database</div>
          </div>
        </div>
      )}

      {/* NEO List */}
      {allNEOs.length > 0 ? (
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">
            Near Earth Objects ({format(new Date(startDate), 'MMM d')} - {format(new Date(endDate), 'MMM d')})
          </h3>
          <div className="space-y-3">
            {allNEOs.map((neo) => {
              const hazardLevel = getHazardLevel(neo);
              const hazardColor = getHazardColor(hazardLevel);
              const approach = neo.close_approach_data[0]; // Closest approach
              
              return (
                <div
                  key={neo.id}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer"
                  onClick={() => setSelectedObject(neo)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-2">
                            {neo.name.replace(/[()]/g, '')}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Closest Approach:</span>
                              <div className="text-white">
                                {format(new Date(approach.close_approach_date), 'MMM d, yyyy')}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400">Miss Distance:</span>
                              <div className="text-white">
                                {formatDistance(approach.miss_distance.kilometers)}
                                <span className="text-gray-500 ml-1">
                                  ({parseFloat(approach.miss_distance.lunar).toFixed(1)} lunar)
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-400">Velocity:</span>
                              <div className="text-white">
                                {parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-400">
                            Diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${hazardColor}`}>
                          {neo.is_potentially_hazardous_asteroid ? 'HAZARDOUS' : hazardLevel.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : neoData && (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No Objects Found</h3>
            <p>No Near Earth Objects found for the selected date range and filters.</p>
          </div>
        </div>
      )}

      {/* Object Detail Modal */}
      {selectedObject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">
                {selectedObject.name.replace(/[()]/g, '')}
              </h3>
              <button
                onClick={() => setSelectedObject(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Physical Properties</h4>
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Absolute Magnitude:</dt>
                      <dd className="text-white">{selectedObject.absolute_magnitude_h}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Diameter (km):</dt>
                      <dd className="text-white">
                        {selectedObject.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - 
                        {selectedObject.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Hazardous:</dt>
                      <dd className={selectedObject.is_potentially_hazardous_asteroid ? "text-red-400" : "text-green-400"}>
                        {selectedObject.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Close Approaches</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedObject.close_approach_data.slice(0, 3).map((approach, index) => (
                      <div key={index} className="text-sm">
                        <div className="text-white font-medium">
                          {format(new Date(approach.close_approach_date), 'MMM d, yyyy')}
                        </div>
                        <div className="text-gray-400">
                          Distance: {formatDistance(approach.miss_distance.kilometers)}
                        </div>
                        <div className="text-gray-400">
                          Speed: {parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <a
                  href={selectedObject.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-space-blue-400 hover:text-space-blue-300 text-sm"
                >
                  View NASA JPL Details →
                </a>
                <button
                  onClick={() => setSelectedObject(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearEarthObjectsViewer;
