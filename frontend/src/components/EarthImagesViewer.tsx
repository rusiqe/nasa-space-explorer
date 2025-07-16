import React, { useState, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import apiService from '../services/apiService';
// import apiService from '../services/mockApiService';
import { EpicResponse } from '../types/nasa';

interface EarthImagesViewerProps {
  className?: string;
}

interface EpicImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  date: string;
  coords: {
    centroid_coordinates: {
      lat: number;
      lon: number;
    };
    dscovr_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    lunar_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    sun_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    attitude_quaternions: {
      q0: number;
      q1: number;
      q2: number;
      q3: number;
    };
  };
}

const EarthImagesViewer: React.FC<EarthImagesViewerProps> = ({ className = '' }) => {
  const [selectedDate, setSelectedDate] = useState<string>(format(subDays(new Date(), 1), 'yyyy-MM-dd'));
  const [images, setImages] = useState<EpicImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<EpicImage | null>(null);

  const fetchEpicImages = async (date?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = date ? { date } : undefined;
      const response = await apiService.getEpicImages(params);
      
      // Handle the response - it should be an array of images
      const imageArray = Array.isArray(response) ? response : [];
      setImages(imageArray);
      
      if (imageArray.length > 0) {
        setSelectedImage(imageArray[0]);
      } else {
        setSelectedImage(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Earth images');
      console.error('Error fetching EPIC images:', err);
      setImages([]);
      setSelectedImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpicImages(selectedDate);
  }, [selectedDate]);

  const getImageUrl = (image: EpicImage): string => {
    // Construct the full NASA EPIC image URL
    const dateFormatted = selectedDate.replace(/-/g, '/');
    return `https://api.nasa.gov/EPIC/archive/natural/${dateFormatted}/png/${image.image}.png?api_key=vBj4SkrWVrDcBmeD6WkDM7HIId39KlJvpuX73gD5`;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };

  const handleQuickDate = (daysOffset: number) => {
    const newDate = addDays(new Date(), daysOffset);
    setSelectedDate(format(newDate, 'yyyy-MM-dd'));
  };

  const formatCoordinate = (coord: number): string => {
    return coord.toFixed(2);
  };

  const formatDistance = (distance: number): string => {
    return (distance / 1000).toFixed(0); // Convert to thousands of km
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Earth images...</p>
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
              Earth Images (EPIC)
            </h2>
            <p className="text-gray-400">
              View real-time Earth imagery from the DSCOVR satellite's EPIC camera
            </p>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Date
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min="2015-06-13" // EPIC first image date
                max={format(subDays(new Date(), 1), 'yyyy-MM-dd')} // Yesterday (images are delayed)
                className="input-field"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleQuickDate(-1)}
                  className="btn-secondary text-sm"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => handleQuickDate(-7)}
                  className="btn-secondary text-sm"
                >
                  1 Week Ago
                </button>
                <button
                  onClick={() => handleQuickDate(-30)}
                  className="btn-secondary text-sm"
                >
                  1 Month Ago
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Images are typically available 12-36 hours after capture. Select a recent date if no images appear.
            </p>
          </div>

          <button
            onClick={() => fetchEpicImages(selectedDate)}
            className="btn-primary"
          >
            Load Images
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
            <h3 className="text-lg font-semibold mb-2">Error Loading Images</h3>
            <p className="text-gray-300">{error}</p>
          </div>
          <button
            onClick={() => fetchEpicImages(selectedDate)}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Image Display */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Image Display */}
          <div className="lg:col-span-2">
            <div className="card">
              {selectedImage && (
                <>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Earth from Space
                    </h3>
                    <p className="text-gray-400">
                      {format(new Date(selectedImage.date), "MMMM d, yyyy 'at' HH:mm UTC")}
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src={getImageUrl(selectedImage)}
                      alt={selectedImage.caption || `Earth image from ${selectedImage.date}`}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  {selectedImage.caption && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-white mb-2">Caption</h4>
                      <p className="text-gray-300">{selectedImage.caption}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar with Image List and Details */}
          <div className="space-y-6">
            {/* Image Thumbnails */}
            <div className="card">
              <h4 className="font-semibold text-white mb-4">
                Available Images ({images.length})
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {images.map((image, index) => (
                  <button
                    key={image.identifier}
                    onClick={() => setSelectedImage(image)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedImage?.identifier === image.identifier
                        ? 'bg-space-blue-900/20 border border-space-blue-400'
                        : 'bg-gray-800 hover:bg-gray-750'
                    }`}
                  >
                    <div className="text-sm font-medium text-white mb-1">
                      Image {index + 1}
                    </div>
                    <div className="text-xs text-gray-400">
                      {format(new Date(image.date), 'HH:mm UTC')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Details */}
            {selectedImage && (
              <div className="card">
                <h4 className="font-semibold text-white mb-4">Image Details</h4>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400 mb-1">Capture Time</dt>
                    <dd className="text-white">
                      {format(new Date(selectedImage.date), "PPP 'at' HH:mm:ss UTC")}
                    </dd>
                  </div>
                  
                  <div>
                    <dt className="text-gray-400 mb-1">Earth Center Coordinates</dt>
                    <dd className="text-white">
                      Lat: {formatCoordinate(selectedImage.centroid_coordinates.lat)}°<br />
                      Lon: {formatCoordinate(selectedImage.centroid_coordinates.lon)}°
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-400 mb-1">DSCOVR Position (km)</dt>
                    <dd className="text-white font-mono text-xs">
                      X: {formatDistance(selectedImage.dscovr_j2000_position.x)}<br />
                      Y: {formatDistance(selectedImage.dscovr_j2000_position.y)}<br />
                      Z: {formatDistance(selectedImage.dscovr_j2000_position.z)}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-400 mb-1">Image Version</dt>
                    <dd className="text-white">{selectedImage.version}</dd>
                  </div>
                </dl>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <a
                    href={getImageUrl(selectedImage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center"
                  >
                    View Full Resolution
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : !isLoading && (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No Images Available</h3>
            <p>No Earth images found for {format(new Date(selectedDate), 'MMMM d, yyyy')}.</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Suggestions:</p>
            <ul className="mt-2 space-y-1">
              <li>• Try selecting a more recent date</li>
              <li>• Images are typically available with a 12-36 hour delay</li>
              <li>• The EPIC camera doesn't capture images every day</li>
            </ul>
          </div>
        </div>
      )}

      {/* About EPIC */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-3">About EPIC</h3>
        <div className="text-gray-300 space-y-2 text-sm">
          <p>
            The Earth Polychromatic Imaging Camera (EPIC) is a 10-channel spectroradiometer (317–780 nm) 
            aboard the NOAA Deep Space Climate Observatory (DSCOVR) spacecraft.
          </p>
          <p>
            DSCOVR maintains the Sun-Earth L1 Lagrange point, about 1.5 million km from Earth, providing 
            a unique perspective of the fully illuminated Earth. Images are typically taken every 65-110 minutes.
          </p>
          <p>
            The natural color images are created by combining three separate monochrome images taken in 
            quick succession, using red (680 nm), green (551 nm), and blue (443 nm) filters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarthImagesViewer;
