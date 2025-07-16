import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import apiService from '../services/apiService';
// import apiService from '../services/mockApiService';
import { MarsRoverResponse, RoverName } from '../types/nasa';

interface MarsRoversViewerProps {
  className?: string;
}

interface Camera {
  name: string;
  full_name: string;
}

const ROVERS: { name: RoverName; display: string; description: string; status: string }[] = [
  { name: 'curiosity', display: 'Curiosity', description: 'Active since 2012', status: 'Active' },
  { name: 'opportunity', display: 'Opportunity', description: 'Mission completed 2018', status: 'Complete' },
  { name: 'spirit', display: 'Spirit', description: 'Mission completed 2010', status: 'Complete' }
];

const CAMERAS = [
  { name: 'all', full_name: 'All Cameras' },
  { name: 'fhaz', full_name: 'Front Hazard Avoidance Camera' },
  { name: 'rhaz', full_name: 'Rear Hazard Avoidance Camera' },
  { name: 'mast', full_name: 'Mast Camera' },
  { name: 'chemcam', full_name: 'Chemistry and Camera Complex' },
  { name: 'mahli', full_name: 'Mars Hand Lens Imager' },
  { name: 'mardi', full_name: 'Mars Descent Imager' },
  { name: 'navcam', full_name: 'Navigation Camera' },
  { name: 'pancam', full_name: 'Panoramic Camera' },
  { name: 'minites', full_name: 'Miniature Thermal Emission Spectrometer' }
];

const MarsRoversViewer: React.FC<MarsRoversViewerProps> = ({ className = '' }) => {
  const [selectedRover, setSelectedRover] = useState<RoverName>('curiosity');
  const [selectedCamera, setSelectedCamera] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSol, setSelectedSol] = useState<string>('1000');
  const [photos, setPhotos] = useState<MarsRoverResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'sol' | 'date'>('sol');

  const fetchPhotos = async () => {
    if (!selectedRover) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const params: any = {
        rover: selectedRover,
        page: 1
      };

      if (searchType === 'sol' && selectedSol) {
        params.sol = parseInt(selectedSol);
      } else if (searchType === 'date' && selectedDate) {
        params.earth_date = selectedDate;
      } else if (searchType === 'sol') {
        params.sol = 1000; // Default sol
      }

      if (selectedCamera !== 'all') {
        params.camera = selectedCamera;
      }

      const response = await apiService.getMarsRoverPhotos(params);
      setPhotos(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Mars rover photos');
      console.error('Error fetching Mars rover photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [selectedRover, selectedCamera, selectedDate, selectedSol, searchType]);

  const handleSearch = () => {
    fetchPhotos();
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Mars rover photos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Controls */}
      <div className="card">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Mars Rover Photos
            </h2>
            <p className="text-gray-400">
              Explore photos captured by NASA's Mars rovers
            </p>
          </div>

          {/* Rover Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Rover
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROVERS.map((rover) => (
                <button
                  key={rover.name}
                  onClick={() => setSelectedRover(rover.name)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    selectedRover === rover.name
                      ? 'border-space-blue-400 bg-space-blue-900/20'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold text-white">{rover.display}</div>
                  <div className="text-sm text-gray-400">{rover.description}</div>
                  <div className={`text-xs mt-1 ${
                    rover.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {rover.status}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search By
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSearchType('sol')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === 'sol'
                    ? 'bg-space-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Sol (Martian Day)
              </button>
              <button
                onClick={() => setSearchType('date')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === 'date'
                    ? 'bg-space-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Earth Date
              </button>
            </div>
          </div>

          {/* Date/Sol Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {searchType === 'sol' ? (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sol (Martian Day)
                </label>
                <input
                  type="number"
                  value={selectedSol}
                  onChange={(e) => setSelectedSol(e.target.value)}
                  min="0"
                  max="4000"
                  className="input-field"
                  placeholder="e.g., 1000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Sol 0 = Landing day. Higher numbers = more recent.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Earth Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min="2004-01-04"
                  max={format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                />
              </div>
            )}

            {/* Camera Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Camera
              </label>
              <select
                value={selectedCamera}
                onChange={(e) => setSelectedCamera(e.target.value)}
                className="input-field"
              >
                {CAMERAS.map((camera) => (
                  <option key={camera.name} value={camera.name}>
                    {camera.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="btn-primary"
          >
            Search Photos
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error Loading Photos</h3>
            <p className="text-gray-300">{error}</p>
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Photos Grid */}
      {photos && (
        <div className="card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Photos from {ROVERS.find(r => r.name === selectedRover)?.display}
            </h3>
            <p className="text-gray-400">
              Found {photos.photos?.length || 0} photos
              {searchType === 'sol' && selectedSol && ` from Sol ${selectedSol}`}
              {searchType === 'date' && selectedDate && ` from ${format(new Date(selectedDate), 'PPP')}`}
            </p>
          </div>

          {photos.photos && photos.photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {photos.photos.map((photo) => (
                <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                  <img
                    src={photo.img_src}
                    alt={`Mars photo by ${photo.camera.full_name}`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <div className="text-sm font-medium text-white mb-1">
                      {photo.camera.full_name}
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Sol {photo.sol}</div>
                      <div>{format(new Date(photo.earth_date), 'MMM d, yyyy')}</div>
                      <div>Photo #{photo.id}</div>
                    </div>
                    <a
                      href={photo.img_src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-space-blue-400 hover:text-space-blue-300 transition-colors"
                    >
                      View Full Size →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No Photos Found</h3>
                <p>No photos were found for the selected criteria. Try adjusting your search parameters.</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Suggestions:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Try a different Sol or date</li>
                  <li>• Select "All Cameras" for more results</li>
                  <li>• Some rovers have limited data for certain time periods</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarsRoversViewer;
