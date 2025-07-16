import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import apiService from '../services/apiService';
// import apiService from '../services/mockApiService';
import { ApodResponse } from '../types/nasa';

interface ApodViewerProps {
  className?: string;
}

const ApodViewer: React.FC<ApodViewerProps> = ({ className = '' }) => {
  const [apodData, setApodData] = useState<ApodResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHdImage, setShowHdImage] = useState<boolean>(false);

  const fetchApod = async (date?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = date ? { date } : undefined;
      const response = await apiService.getApod(params);
      
      // Handle both single APOD and array responses
      const data = Array.isArray(response) ? response[0] : response;
      setApodData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch APOD data');
      console.error('Error fetching APOD:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApod(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };

  const handleRetry = () => {
    fetchApod(selectedDate);
  };

  const toggleHdImage = () => {
    setShowHdImage(!showHdImage);
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Astronomy Picture of the Day...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`card text-center ${className}`}>
        <div className="text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Error Loading APOD</h3>
          <p className="text-gray-300">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!apodData) {
    return (
      <div className={`card text-center ${className}`}>
        <p className="text-gray-400">No APOD data available</p>
      </div>
    );
  }

  const imageUrl = showHdImage && apodData.hdurl ? apodData.hdurl : apodData.url;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Date Picker */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Astronomy Picture of the Day
            </h2>
            <p className="text-gray-400">
              Discover the cosmos with NASA's daily featured image
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={format(new Date(), 'yyyy-MM-dd')}
              min="1995-06-16" // First APOD date
              className="input-field"
            />
            <button
              onClick={() => setSelectedDate(format(new Date(), 'yyyy-MM-dd'))}
              className="btn-secondary whitespace-nowrap"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* APOD Content */}
      <div className="card">
        <div className="space-y-6">
          {/* Title and Date */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{apodData.title}</h1>
            <p className="text-space-blue-400 font-medium">
              {format(new Date(apodData.date), 'MMMM d, yyyy')}
            </p>
            {apodData.copyright && (
              <p className="text-gray-400 text-sm mt-1">
                © {apodData.copyright}
              </p>
            )}
          </div>

          {/* Media Content */}
          <div className="relative">
            {apodData.media_type === 'image' ? (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={apodData.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to regular URL if HD fails
                    if (showHdImage && apodData.hdurl) {
                      setShowHdImage(false);
                    }
                  }}
                />
                
                {/* HD Toggle Button */}
                {apodData.hdurl && (
                  <button
                    onClick={toggleHdImage}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    {showHdImage ? 'Standard' : 'HD'}
                  </button>
                )}
              </div>
            ) : apodData.media_type === 'video' ? (
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Unsupported media type: {apodData.media_type}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Description</h3>
            <p className="text-gray-300 leading-relaxed">
              {apodData.explanation}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {apodData.hdurl && (
              <a
                href={apodData.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Full Resolution
              </a>
            )}
            <a
              href={apodData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Original
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: apodData.title,
                    text: apodData.explanation.slice(0, 100) + '...',
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="btn-secondary"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-3">Image Details</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-gray-400">Date</dt>
            <dd className="text-white">{format(new Date(apodData.date), 'PPP')}</dd>
          </div>
          <div>
            <dt className="text-gray-400">Media Type</dt>
            <dd className="text-white capitalize">{apodData.media_type}</dd>
          </div>
          {apodData.copyright && (
            <div>
              <dt className="text-gray-400">Copyright</dt>
              <dd className="text-white">{apodData.copyright}</dd>
            </div>
          )}
          <div>
            <dt className="text-gray-400">Service Version</dt>
            <dd className="text-white">{apodData.service_version}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ApodViewer;
