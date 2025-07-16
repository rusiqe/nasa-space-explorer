import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  withErrorBoundary?: boolean;
}

const AllTheProviders: React.FC<{
  children: React.ReactNode;
  route?: string;
  withErrorBoundary?: boolean;
}> = ({ children, route = '/', withErrorBoundary = true }) => {
  // Set initial route if provided
  if (route !== '/') {
    window.history.pushState({}, 'Test page', route);
  }

  const content = (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );

  if (withErrorBoundary) {
    return (
      <ErrorBoundary componentName="Test">
        {content}
      </ErrorBoundary>
    );
  }

  return content;
};

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult => {
  const { route, withErrorBoundary, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders route={route} withErrorBoundary={withErrorBoundary}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Mock data generators for tests
export const mockApodData = {
  title: "Test Astronomy Picture",
  explanation: "This is a test astronomy picture explanation.",
  url: "https://example.com/test-image.jpg",
  hdurl: "https://example.com/test-image-hd.jpg",
  media_type: "image",
  date: "2025-01-07",
  copyright: "Test Photographer",
  service_version: "v1"
};

export const mockMarsRoverPhoto = {
  id: 123456,
  sol: 1000,
  camera: {
    id: 1,
    name: "FHAZ",
    rover_id: 5,
    full_name: "Front Hazard Avoidance Camera"
  },
  img_src: "https://example.com/mars-photo.jpg",
  earth_date: "2025-01-07",
  rover: {
    id: 5,
    name: "curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active"
  }
};

export const mockNearEarthObject = {
  id: "test-neo-123",
  name: "(2025 TEST)",
  nasa_jpl_url: "https://example.com/neo-details",
  absolute_magnitude_h: 18.5,
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: 0.5,
      estimated_diameter_max: 1.2
    }
  },
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [
    {
      close_approach_date: "2025-01-07",
      close_approach_date_full: "2025-Jan-07 12:00",
      epoch_date_close_approach: 1736251200000,
      relative_velocity: {
        kilometers_per_second: "15.5",
        kilometers_per_hour: "55800",
        miles_per_hour: "34672"
      },
      miss_distance: {
        astronomical: "0.1234567",
        lunar: "48.0",
        kilometers: "18470000",
        miles: "11480000"
      },
      orbiting_body: "Earth"
    }
  ],
  is_sentry_object: false
};

export const mockEpicImage = {
  identifier: "test-epic-123",
  caption: "Test Earth image",
  image: "epic_test_image",
  version: "01",
  centroid_coordinates: {
    lat: 0.0,
    lon: 0.0
  },
  dscovr_j2000_position: {
    x: 1500000,
    y: 0,
    z: 0
  },
  lunar_j2000_position: {
    x: 384400,
    y: 0,
    z: 0
  },
  sun_j2000_position: {
    x: 149597870,
    y: 0,
    z: 0
  },
  attitude_quaternions: {
    q0: 1.0,
    q1: 0.0,
    q2: 0.0,
    q3: 0.0
  },
  date: "2025-01-07 12:00:00",
  coords: {
    centroid_coordinates: {
      lat: 0.0,
      lon: 0.0
    },
    dscovr_j2000_position: {
      x: 1500000,
      y: 0,
      z: 0
    },
    lunar_j2000_position: {
      x: 384400,
      y: 0,
      z: 0
    },
    sun_j2000_position: {
      x: 149597870,
      y: 0,
      z: 0
    },
    attitude_quaternions: {
      q0: 1.0,
      q1: 0.0,
      q2: 0.0,
      q3: 0.0
    }
  }
};

// Mock API responses
export const mockApiResponses = {
  apod: mockApodData,
  marsRoverPhotos: {
    photos: [mockMarsRoverPhoto]
  },
  nearEarthObjects: {
    element_count: 1,
    near_earth_objects: {
      "2025-01-07": [mockNearEarthObject]
    }
  },
  epicImages: [mockEpicImage]
};

// Helper function to wait for async operations
export const waitForAsync = (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

// Helper to mock console methods for testing
export const mockConsole = () => {
  const originalConsole = { ...console };
  const mockMethods = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  };

  beforeEach(() => {
    Object.assign(console, mockMethods);
  });

  afterEach(() => {
    Object.assign(console, originalConsole);
  });

  return mockMethods;
};

// Helper to mock localStorage
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  return localStorageMock;
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method
export { customRender as render };
