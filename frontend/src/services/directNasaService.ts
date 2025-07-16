import axios from 'axios';
import { ApodResponse, MarsRoverResponse, NeoResponse, EpicResponse, RoverName } from '../types/nasa';

class DirectNasaService {
  private NASA_API_KEY = 'DEMO_KEY'; // Using demo key for now
  private NASA_BASE_URL = 'https://api.nasa.gov';

  async getApod(params?: {
    date?: string;
    start_date?: string;
    end_date?: string;
    count?: number;
    thumbs?: boolean;
  }): Promise<ApodResponse | ApodResponse[]> {
    try {
      const url = `${this.NASA_BASE_URL}/planetary/apod`;
      const queryParams = {
        api_key: this.NASA_API_KEY,
        ...params
      };

      const response = await axios.get(url, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD:', error);
      throw new Error('Failed to fetch APOD data');
    }
  }

  async getMarsRoverPhotos(params: {
    rover: RoverName;
    sol?: number;
    earth_date?: string;
    camera?: string;
    page?: number;
  }): Promise<MarsRoverResponse> {
    try {
      const { rover, ...queryParams } = params;
      const url = `${this.NASA_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`;
      const requestParams = {
        api_key: this.NASA_API_KEY,
        ...queryParams
      };

      const response = await axios.get(url, { params: requestParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching Mars rover photos:', error);
      throw new Error('Failed to fetch Mars rover photos');
    }
  }

  async getMarsRoverManifest(rover: RoverName): Promise<any> {
    try {
      const url = `${this.NASA_BASE_URL}/mars-photos/api/v1/manifests/${rover}`;
      const response = await axios.get(url, { 
        params: { api_key: this.NASA_API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Mars rover manifest:', error);
      throw new Error('Failed to fetch Mars rover manifest');
    }
  }

  async getNearEarthObjects(params?: {
    start_date?: string;
    end_date?: string;
    detailed?: boolean;
  }): Promise<NeoResponse> {
    try {
      const url = `${this.NASA_BASE_URL}/neo/rest/v1/feed`;
      const queryParams = {
        api_key: this.NASA_API_KEY,
        ...params
      };

      const response = await axios.get(url, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching Near Earth Objects:', error);
      throw new Error('Failed to fetch Near Earth Objects');
    }
  }

  async getNearEarthObjectById(id: string): Promise<any> {
    try {
      const url = `${this.NASA_BASE_URL}/neo/rest/v1/neo/${id}`;
      const response = await axios.get(url, { 
        params: { api_key: this.NASA_API_KEY }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Near Earth Object details:', error);
      throw new Error('Failed to fetch Near Earth Object details');
    }
  }

  async getEpicImages(params?: {
    date?: string;
  }): Promise<EpicResponse> {
    try {
      const url = `${this.NASA_BASE_URL}/EPIC/api/natural/images`;
      const queryParams = {
        api_key: this.NASA_API_KEY,
        ...params
      };

      const response = await axios.get(url, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching EPIC Earth images:', error);
      throw new Error('Failed to fetch EPIC Earth images');
    }
  }

  async getEarthImagery(params: {
    lat: number;
    lon: number;
    date?: string;
    dim?: number;
  }): Promise<any> {
    try {
      const url = `${this.NASA_BASE_URL}/planetary/earth/imagery`;
      const queryParams = {
        api_key: this.NASA_API_KEY,
        ...params
      };

      const response = await axios.get(url, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching Earth imagery:', error);
      throw new Error('Failed to fetch Earth imagery');
    }
  }

  async searchImageLibrary(params: {
    q: string;
    media_type?: string;
  }): Promise<any> {
    try {
      // NASA Image Library uses a different endpoint
      const url = `https://images-api.nasa.gov/search`;
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching NASA image library:', error);
      throw new Error('Failed to search NASA image library');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.getApod();
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkNasaApiHealth(): Promise<boolean> {
    return this.healthCheck();
  }
}

const directNasaService = new DirectNasaService();
export default directNasaService;
