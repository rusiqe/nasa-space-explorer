const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const axios = require('axios');

const app = express();

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
    },
  },
}));

app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://nasa-space-explorer.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// NASA API configuration
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_BASE_URL = process.env.NASA_API_BASE_URL || 'https://api.nasa.gov';

const nasaClient = axios.create({
  baseURL: NASA_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'NASA-Space-Explorer/1.0.0',
  },
});

// Add API key to requests
nasaClient.interceptors.request.use((config) => {
  if (config.params) {
    config.params.api_key = NASA_API_KEY;
  } else {
    config.params = { api_key: NASA_API_KEY };
  }
  return config;
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
    },
  });
});

// APOD endpoint
app.get('/api/nasa/apod', async (req, res) => {
  try {
    const response = await nasaClient.get('/planetary/apod', { params: req.query });
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('APOD Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch Astronomy Picture of the Day',
        code: 'APOD_FETCH_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Mars Rover Photos endpoint
app.get('/api/nasa/mars-rovers/:rover/photos', async (req, res) => {
  try {
    const { rover } = req.params;
    const response = await nasaClient.get(`/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: req.query
    });
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Mars Rover Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch Mars rover photos',
        code: 'MARS_ROVER_FETCH_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// Near Earth Objects endpoint
app.get('/api/nasa/neo', async (req, res) => {
  try {
    const response = await nasaClient.get('/neo/rest/v1/feed', { params: req.query });
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('NEO Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch Near Earth Objects',
        code: 'NEO_FETCH_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// EPIC endpoint
app.get('/api/nasa/epic', async (req, res) => {
  try {
    const endpoint = req.query.date 
      ? `/EPIC/api/natural/date/${req.query.date}`
      : '/EPIC/api/natural/images';
    
    const response = await nasaClient.get(endpoint);
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('EPIC Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch EPIC Earth images',
        code: 'EPIC_FETCH_ERROR',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'NASA Space Explorer API',
      version: '1.0.0',
      description: 'Backend API for NASA Space Explorer application',
      endpoints: {
        health: '/health',
        nasa: {
          base: '/api/nasa',
          endpoints: [
            'GET /api/nasa/apod - Astronomy Picture of the Day',
            'GET /api/nasa/mars-rovers/:rover/photos - Mars Rover Photos',
            'GET /api/nasa/neo - Near Earth Objects',
            'GET /api/nasa/epic - EPIC Earth Images',
          ],
        },
      },
      documentation: 'See README.md for detailed API documentation',
    },
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      code: 'ROUTE_NOT_FOUND',
    },
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
