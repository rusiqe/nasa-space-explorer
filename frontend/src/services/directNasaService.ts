import axios from 'axios';
import { ApodResponse } from '../types/nasa';

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

  async healthCheck(): Promise<boolean> {
    try {
      await this.getApod();
      return true;
    } catch (error) {
      return false;
    }
  }
}

const directNasaService = new DirectNasaService();
export default directNasaService;
