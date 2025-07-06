import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ApodResponse,
  MarsRoverResponse,
  NeoResponse,
  EpicResponse,
  ApodParams,
  MarsRoverParams,
  NeoParams,
  EpicParams,
} from '../types/nasa';

class NasaService {
  private apiClient: AxiosInstance;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    this.baseUrl = process.env.NASA_API_BASE_URL || 'https://api.nasa.gov';
    
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NASA-Space-Explorer/1.0.0',
      },
    });

    // Add request interceptor to include API key
    this.apiClient.interceptors.request.use((config) => {
      if (config.params) {
        config.params.api_key = this.apiKey;
      } else {
        config.params = { api_key: this.apiKey };
      }
      return config;
    });

    // Add response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('NASA API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  /**
   * Get Astronomy Picture of the Day
   * @param params - APOD parameters
   * @returns Promise<ApodResponse | ApodResponse[]>
   */
  async getApod(params: ApodParams = {}): Promise<ApodResponse | ApodResponse[]> {
    try {
      const response: AxiosResponse<ApodResponse | ApodResponse[]> = await this.apiClient.get(
        '/planetary/apod',
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD:', error);
      throw new Error('Failed to fetch Astronomy Picture of the Day');
    }
  }

  /**
   * Get Mars Rover Photos
   * @param params - Mars rover parameters
   * @returns Promise<MarsRoverResponse>
   */
  async getMarsRoverPhotos(params: MarsRoverParams): Promise<MarsRoverResponse> {
    try {
      const { rover, ...queryParams } = params;
      const response: AxiosResponse<MarsRoverResponse> = await this.apiClient.get(
        `/mars-photos/api/v1/rovers/${rover}/photos`,
        { params: queryParams }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Mars rover photos:', error);
      throw new Error('Failed to fetch Mars rover photos');
    }
  }

  /**
   * Get Mars Rover Manifest
   * @param rover - Rover name
   * @returns Promise<any>
   */
  async getMarsRoverManifest(rover: string): Promise<any> {
    try {
      const response = await this.apiClient.get(
        `/mars-photos/api/v1/manifests/${rover}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Mars rover manifest:', error);
      throw new Error('Failed to fetch Mars rover manifest');
    }
  }

  /**
   * Get Near Earth Objects
   * @param params - NEO parameters
   * @returns Promise<NeoResponse>
   */
  async getNearEarthObjects(params: NeoParams = {}): Promise<NeoResponse> {
    try {
      const response: AxiosResponse<NeoResponse> = await this.apiClient.get(
        '/neo/rest/v1/feed',
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Near Earth Objects:', error);
      throw new Error('Failed to fetch Near Earth Objects');
    }
  }

  /**
   * Get specific Near Earth Object by ID
   * @param id - NEO ID
   * @returns Promise<any>
   */
  async getNearEarthObjectById(id: string): Promise<any> {
    try {
      const response = await this.apiClient.get(`/neo/rest/v1/neo/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Near Earth Object by ID:', error);
      throw new Error('Failed to fetch Near Earth Object details');
    }
  }

  /**
   * Get EPIC Earth Images
   * @param params - EPIC parameters
   * @returns Promise<EpicResponse>
   */
  async getEpicImages(params: EpicParams = {}): Promise<EpicResponse> {
    try {
      const endpoint = params.date 
        ? `/EPIC/api/natural/date/${params.date}`
        : '/EPIC/api/natural/images';
      
      const response: AxiosResponse<EpicResponse> = await this.apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching EPIC images:', error);
      throw new Error('Failed to fetch EPIC Earth images');
    }
  }

  /**
   * Get EPIC Earth Image URL
   * @param image - Image identifier
   * @param date - Date string
   * @returns string
   */
  getEpicImageUrl(image: string, date: string): string {
    const dateFormatted = date.split(' ')[0].replace(/-/g, '/');
    return `${this.baseUrl}/EPIC/archive/natural/${dateFormatted}/png/${image}.png?api_key=${this.apiKey}`;
  }

  /**
   * Get NASA Image and Video Library search results
   * @param query - Search query
   * @param mediaType - Media type filter
   * @returns Promise<any>
   */
  async searchImageLibrary(query: string, mediaType: string = 'image'): Promise<any> {
    try {
      const response = await this.apiClient.get(
        'https://images-api.nasa.gov/search',
        {
          params: {
            q: query,
            media_type: mediaType,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching NASA image library:', error);
      throw new Error('Failed to search NASA image library');
    }
  }

  /**
   * Get NASA Insight Weather data
   * @returns Promise<any>
   */
  async getInsightWeather(): Promise<any> {
    try {
      const response = await this.apiClient.get('/insight_weather/');
      return response.data;
    } catch (error) {
      console.error('Error fetching Insight weather:', error);
      throw new Error('Failed to fetch Mars weather data');
    }
  }

  /**
   * Get Earth Imagery
   * @param lat - Latitude
   * @param lon - Longitude
   * @param date - Date string
   * @param dim - Image dimensions
   * @returns Promise<any>
   */
  async getEarthImagery(
    lat: number, 
    lon: number, 
    date?: string, 
    dim: number = 0.1
  ): Promise<any> {
    try {
      const params: any = { lat, lon, dim };
      if (date) params.date = date;
      
      const response = await this.apiClient.get('/planetary/earth/imagery', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Earth imagery:', error);
      throw new Error('Failed to fetch Earth imagery');
    }
  }

  /**
   * Get Exoplanet data
   * @returns Promise<any>
   */
  async getExoplanetData(): Promise<any> {
    try {
      const response = await this.apiClient.get('/exoplanet/');
      return response.data;
    } catch (error) {
      console.error('Error fetching exoplanet data:', error);
      throw new Error('Failed to fetch exoplanet data');
    }
  }

  /**
   * Health check for NASA API
   * @returns Promise<boolean>
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.apiClient.get('/planetary/apod', {
        params: { thumbs: true },
      });
      return true;
    } catch (error) {
      console.error('NASA API health check failed:', error);
      return false;
    }
  }
}

export default new NasaService();
