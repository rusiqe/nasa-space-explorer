// NASA API Response Types - Frontend

export interface ApodResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

export interface MarsRoverPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: Array<{
      name: string;
      full_name: string;
    }>;
  };
}

export interface MarsRoverResponse {
  photos: MarsRoverPhoto[];
}

export interface NearEarthObject {
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    miles: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    feet: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
      miles: string;
    };
    orbiting_body: string;
  }>;
  is_sentry_object: boolean;
}

export interface NeoResponse {
  links: {
    next?: string;
    previous?: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
}

export interface EpicImage {
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

export type EpicResponse = EpicImage[];

// API Response wrapper type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  error?: {
    message: string;
    code: string;
  };
}

// Frontend-specific types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ApodState extends LoadingState {
  data: ApodResponse | null;
  selectedDate: string;
}

export interface MarsRoverState extends LoadingState {
  data: MarsRoverPhoto[];
  selectedRover: 'curiosity' | 'opportunity' | 'spirit';
  selectedCamera: string;
  selectedDate: string;
  currentPage: number;
  totalPhotos: number;
}

export interface NeoState extends LoadingState {
  data: NearEarthObject[];
  startDate: string;
  endDate: string;
  selectedNeo: NearEarthObject | null;
}

export interface EpicState extends LoadingState {
  data: EpicImage[];
  selectedDate: string;
  selectedImage: EpicImage | null;
}

// Navigation types
export interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  description: string;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// Filter types
export interface RoverFilters {
  rover: 'curiosity' | 'opportunity' | 'spirit' | '';
  camera: string;
  sol?: number;
  earth_date?: string;
}

export interface NeoFilters {
  start_date: string;
  end_date: string;
  is_potentially_hazardous?: boolean;
  diameter_min?: number;
  diameter_max?: number;
}

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
}

// Search types
export interface SearchResult {
  collection: {
    version: string;
    href: string;
    items: SearchItem[];
  };
}

export interface SearchItem {
  href: string;
  data: Array<{
    center: string;
    title: string;
    nasa_id: string;
    date_created: string;
    keywords?: string[];
    media_type: string;
    description: string;
  }>;
  links?: Array<{
    href: string;
    rel: string;
    render?: string;
  }>;
}

// Utility types
export type RoverName = 'curiosity' | 'opportunity' | 'spirit';
export type CameraName = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES';
export type MediaType = 'image' | 'video' | 'audio';

// Error types
export interface ApiError {
  message: string;
  code: string;
  status?: number;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingComponentProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface ErrorComponentProps extends BaseComponentProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}
