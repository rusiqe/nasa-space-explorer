import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Import routes
import nasaRoutes from './routes/nasa';

// Load environment variables
dotenv.config();

class Server {
  private app: Application;
  private port: number;
  private rateLimiter: RateLimiterMemory;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3001');
    
    // Initialize rate limiter
    this.rateLimiter = new RateLimiterMemory({
      points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000, // Convert to seconds
    });

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
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

    // Compression middleware
    this.app.use(compression());

    // CORS middleware
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Rate limiting middleware
    this.app.use(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        await this.rateLimiter.consume(clientIp);
        next();
      } catch (rejRes: any) {
        const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
        res.set('Retry-After', String(secs));
        res.status(429).json({
          success: false,
          error: {
            message: 'Too many requests, please try again later.',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: secs,
          },
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Request logging middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp} - ${req.method} ${req.path} - ${req.ip}`);
      next();
    });
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
        },
      });
    });

    // API routes
    this.app.use('/api/nasa', nasaRoutes);

    // API documentation endpoint
    this.app.get('/api', (req: Request, res: Response) => {
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
                'GET /api/nasa/health - NASA API health check',
                'GET /api/nasa/apod - Astronomy Picture of the Day',
                'GET /api/nasa/mars-rovers/:rover/photos - Mars Rover Photos',
                'GET /api/nasa/mars-rovers/:rover/manifest - Mars Rover Manifest',
                'GET /api/nasa/neo - Near Earth Objects',
                'GET /api/nasa/neo/:id - Near Earth Object by ID',
                'GET /api/nasa/epic - EPIC Earth Images',
                'GET /api/nasa/search - NASA Image Library Search',
                'GET /api/nasa/earth - Earth Imagery',
              ],
            },
          },
          documentation: 'See README.md for detailed API documentation',
        },
        timestamp: new Date().toISOString(),
      });
    });

    // 404 handler for undefined routes
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: {
          message: `Route ${req.originalUrl} not found`,
          code: 'ROUTE_NOT_FOUND',
        },
        timestamp: new Date().toISOString(),
      });
    });
  }

  private initializeErrorHandling(): void {
    // Global error handler
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Global Error Handler:', error);
      
      res.status(500).json({
        success: false,
        error: {
          message: process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'Internal server error',
          code: 'INTERNAL_SERVER_ERROR',
          ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        },
        timestamp: new Date().toISOString(),
      });
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      process.exit(0);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('🚀 NASA Space Explorer Backend Server Started');
      console.log(`📡 Server running on port ${this.port}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Documentation: http://localhost:${this.port}/api`);
      console.log(`❤️  Health Check: http://localhost:${this.port}/health`);
      console.log('🛰️  NASA API endpoints ready for exploration!');
      
      // Validate environment variables
      if (!process.env.NASA_API_KEY || process.env.NASA_API_KEY === 'DEMO_KEY') {
        console.warn('⚠️  Warning: Using DEMO_KEY for NASA API. Please set NASA_API_KEY environment variable for production use.');
      }
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

// Create and start server
const server = new Server();
server.start();

export default server;
