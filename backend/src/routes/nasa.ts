import { Router } from 'express';
import nasaController from '../controllers/nasaController';

const router = Router();

/**
 * @route GET /api/nasa/health
 * @desc Check NASA API health status
 * @access Public
 */
router.get('/health', nasaController.healthCheck);

/**
 * @route GET /api/nasa/apod
 * @desc Get Astronomy Picture of the Day
 * @access Public
 * @query {string} date - Specific date (YYYY-MM-DD)
 * @query {string} start_date - Start date for range
 * @query {string} end_date - End date for range
 * @query {number} count - Number of random images
 * @query {boolean} thumbs - Include thumbnail URLs
 */
router.get('/apod', nasaController.getApod);

/**
 * @route GET /api/nasa/mars-rovers/:rover/photos
 * @desc Get Mars Rover Photos
 * @access Public
 * @param {string} rover - Rover name (curiosity, opportunity, spirit)
 * @query {number} sol - Sol (Martian day)
 * @query {string} earth_date - Earth date (YYYY-MM-DD)
 * @query {string} camera - Camera abbreviation
 * @query {number} page - Page number for pagination
 */
router.get('/mars-rovers/:rover/photos', nasaController.getMarsRoverPhotos);

/**
 * @route GET /api/nasa/mars-rovers/:rover/manifest
 * @desc Get Mars Rover Manifest
 * @access Public
 * @param {string} rover - Rover name (curiosity, opportunity, spirit)
 */
router.get('/mars-rovers/:rover/manifest', nasaController.getMarsRoverManifest);

/**
 * @route GET /api/nasa/neo
 * @desc Get Near Earth Objects
 * @access Public
 * @query {string} start_date - Start date for feed (YYYY-MM-DD)
 * @query {string} end_date - End date for feed (YYYY-MM-DD)
 * @query {boolean} detailed - Include detailed data
 */
router.get('/neo', nasaController.getNearEarthObjects);

/**
 * @route GET /api/nasa/neo/:id
 * @desc Get Near Earth Object by ID
 * @access Public
 * @param {string} id - NEO ID
 */
router.get('/neo/:id', nasaController.getNearEarthObjectById);

/**
 * @route GET /api/nasa/epic
 * @desc Get EPIC Earth Images
 * @access Public
 * @query {string} date - Specific date (YYYY-MM-DD)
 */
router.get('/epic', nasaController.getEpicImages);

/**
 * @route GET /api/nasa/search
 * @desc Search NASA Image and Video Library
 * @access Public
 * @query {string} q - Search query (required)
 * @query {string} media_type - Media type filter (image, video, audio)
 */
router.get('/search', nasaController.searchImageLibrary);

/**
 * @route GET /api/nasa/earth
 * @desc Get Earth Imagery
 * @access Public
 * @query {number} lat - Latitude (required)
 * @query {number} lon - Longitude (required)
 * @query {string} date - Date (YYYY-MM-DD)
 * @query {number} dim - Image dimensions
 */
router.get('/earth', nasaController.getEarthImagery);

export default router;
