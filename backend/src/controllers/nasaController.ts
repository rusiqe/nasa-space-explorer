import { Request, Response } from 'express';
import nasaService from '../services/nasaService';
import { ApodParams, MarsRoverParams, NeoParams, EpicParams } from '../types/nasa';

export class NasaController {
  /**
   * Get Astronomy Picture of the Day
   */
  async getApod(req: Request, res: Response): Promise<void> {
    try {
      const params: ApodParams = {
        date: req.query.date as string,
        start_date: req.query.start_date as string,
        end_date: req.query.end_date as string,
        count: req.query.count ? parseInt(req.query.count as string) : undefined,
        thumbs: req.query.thumbs === 'true',
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key as keyof ApodParams] === undefined && delete params[key as keyof ApodParams]
      );

      const data = await nasaService.getApod(params);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('APOD Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch APOD data',
          code: 'APOD_FETCH_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get Mars Rover Photos
   */
  async getMarsRoverPhotos(req: Request, res: Response): Promise<void> {
    try {
      const { rover } = req.params;
      
      if (!['curiosity', 'opportunity', 'spirit'].includes(rover)) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Invalid rover name. Must be curiosity, opportunity, or spirit',
            code: 'INVALID_ROVER',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const params: MarsRoverParams = {
        rover: rover as 'curiosity' | 'opportunity' | 'spirit',
        sol: req.query.sol ? parseInt(req.query.sol as string) : undefined,
        earth_date: req.query.earth_date as string,
        camera: req.query.camera as string,
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key as keyof MarsRoverParams] === undefined && delete params[key as keyof MarsRoverParams]
      );

      const data = await nasaService.getMarsRoverPhotos(params);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Mars Rover Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch Mars rover photos',
          code: 'MARS_ROVER_FETCH_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get Mars Rover Manifest
   */
  async getMarsRoverManifest(req: Request, res: Response): Promise<void> {
    try {
      const { rover } = req.params;
      
      if (!['curiosity', 'opportunity', 'spirit'].includes(rover)) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Invalid rover name. Must be curiosity, opportunity, or spirit',
            code: 'INVALID_ROVER',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const data = await nasaService.getMarsRoverManifest(rover);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Mars Rover Manifest Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch Mars rover manifest',
          code: 'MARS_ROVER_MANIFEST_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get Near Earth Objects
   */
  async getNearEarthObjects(req: Request, res: Response): Promise<void> {
    try {
      const params: NeoParams = {
        start_date: req.query.start_date as string,
        end_date: req.query.end_date as string,
        detailed: req.query.detailed === 'true',
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key as keyof NeoParams] === undefined && delete params[key as keyof NeoParams]
      );

      const data = await nasaService.getNearEarthObjects(params);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('NEO Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch Near Earth Objects',
          code: 'NEO_FETCH_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get Near Earth Object by ID
   */
  async getNearEarthObjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          success: false,
          error: {
            message: 'NEO ID is required',
            code: 'MISSING_NEO_ID',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const data = await nasaService.getNearEarthObjectById(id);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('NEO by ID Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch Near Earth Object details',
          code: 'NEO_BY_ID_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get EPIC Earth Images
   */
  async getEpicImages(req: Request, res: Response): Promise<void> {
    try {
      const params: EpicParams = {
        date: req.query.date as string,
      };

      // Remove undefined values
      Object.keys(params).forEach(key => 
        params[key as keyof EpicParams] === undefined && delete params[key as keyof EpicParams]
      );

      const data = await nasaService.getEpicImages(params);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('EPIC Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch EPIC Earth images',
          code: 'EPIC_FETCH_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Search NASA Image Library
   */
  async searchImageLibrary(req: Request, res: Response): Promise<void> {
    try {
      const { q: query, media_type } = req.query;
      
      if (!query) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Search query is required',
            code: 'MISSING_QUERY',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const data = await nasaService.searchImageLibrary(
        query as string, 
        media_type as string
      );
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Image Library Search Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to search NASA image library',
          code: 'IMAGE_LIBRARY_SEARCH_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get Earth Imagery
   */
  async getEarthImagery(req: Request, res: Response): Promise<void> {
    try {
      const { lat, lon, date, dim } = req.query;
      
      if (!lat || !lon) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Latitude and longitude are required',
            code: 'MISSING_COORDINATES',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const data = await nasaService.getEarthImagery(
        parseFloat(lat as string),
        parseFloat(lon as string),
        date as string,
        dim ? parseFloat(dim as string) : undefined
      );
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Earth Imagery Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch Earth imagery',
          code: 'EARTH_IMAGERY_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * API Health Check
   */
  async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      const isHealthy = await nasaService.healthCheck();
      res.json({
        success: true,
        data: {
          status: isHealthy ? 'healthy' : 'unhealthy',
          nasa_api: isHealthy,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Health Check Controller Error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Health check failed',
          code: 'HEALTH_CHECK_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}

export default new NasaController();
