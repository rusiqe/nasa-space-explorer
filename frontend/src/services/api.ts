import axios, { AxiosResponse } from 'axios';
import {
  ApiResponse,
  ApodResponse,
  MarsRoverResponse,
  NeoResponse,
  EpicResponse,
  SearchResult,
  RoverName,
} from '../types/nasa';

class ApiService {
  private baseURL: string;
  private client;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        
        // Handle different error types
        if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        } else if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else if (error.response?.status === 404) {
          throw new Error('Data not found.');
        } else if (!error.response) {
          throw new Error('Network error. Please check your connection.');
        }
        
        throw new Error(error.response?.data?.error?.message || 'An unexpected error occurred.');
      }
    );
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.data.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Get Astronomy Picture of the Day
   */
  async getApod(params?: {
    date?: string;
    start_date?: string;
    end_date?: string;
    count?: number;
    thumbs?: boolean;
  }): Promise<ApodResponse | ApodResponse[]> {
    const response: AxiosResponse<ApiResponse<ApodResponse | ApodResponse[]>> = 
      await this.client.get('/api/apod', { params });
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch APOD data');
    }
    
    return response.data.data;
  }

  /**
   * Get Mars Rover Photos
   */
  async getMarsRoverPhotos(params: {
    rover: RoverName;
    sol?: number;
    earth_date?: string;
    camera?: string;
    page?: number;
  }): Promise<MarsRoverResponse> {
    const response: AxiosResponse<ApiResponse<MarsRoverResponse>> = 
      await this.client.get(`/api/mars-rovers`, { params });
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch Mars rover photos');
    }
    
    return response.data.data;
  }

  /**
   * Get Mars Rover Manifest
   */
  async getMarsRoverManifest(rover: RoverName): Promise<any> {
    const response: AxiosResponse<ApiResponse<any>> = 
      await this.client.get(`/api/nasa/mars-rovers/${rover}/manifest`);
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch Mars rover manifest');
    }
    
    return response.data.data;
  }

  /**
   * Get Near Earth Objects
   */
  async getNearEarthObjects(params?: {
    start_date?: string;
    end_date?: string;
    detailed?: boolean;
  }): Promise<NeoResponse> {
    const response: AxiosResponse<ApiResponse<NeoResponse>> = 
      await this.client.get('/api/neo', { params });
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch Near Earth Objects');
    }
    
    return response.data.data;
  }

  /**
   * Get Near Earth Object by ID
   */
  async getNearEarthObjectById(id: string): Promise<any> {
    const response: AxiosResponse<ApiResponse<any>> = 
      await this.client.get(`/api/nasa/neo/${id}`);
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch Near Earth Object details');
    }
    
    return response.data.data;
  }

  /**
   * Get EPIC Earth Images
   */
  async getEpicImages(params?: {
    date?: string;
  }): Promise<EpicResponse> {
    const response: AxiosResponse<ApiResponse<EpicResponse>> = 
      await this.client.get('/api/epic', { params });
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch EPIC Earth images');
    }
    
    return response.data.data;
  }

  /**
   * Search NASA Image Library
   */
  async searchImageLibrary(params: {
    q: string;
    media_type?: string;
  }): Promise<SearchResult> {
    const response: AxiosResponse<ApiResponse<SearchResult>> = 
      await this.client.get('/api/nasa/search', { params });
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to search NASA image library');
    }
    
    return response.data.data;
  }

  /**
   * Get Earth Imagery
   */
  async getEarthImagery(params: {
    lat: number;
    lon: number;
    date?: string;
    dim?: number;
  }): Promise<any> {
    const response: AxiosResponse<ApiResponse<any>> = 
      await this.client.get('/api/nasa/earth', { params });
    
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to fetch Earth imagery');
    }
    
    return response.data.data;
  }

  /**
   * NASA API Health Check
   */
  async checkNasaApiHealth(): Promise<boolean> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = 
        await this.client.get('/api/nasa/health');
      
      return response.data.success && response.data.data.nasa_api;
    } catch (error) {
      console.error('NASA API health check failed:', error);
      return false;
    }
  }
}

const apiService = new ApiService();
export default apiService;
