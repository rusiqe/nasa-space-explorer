import { 
  ApodResponse, 
  MarsRoverResponse, 
  NeoResponse, 
  EpicResponse,
  RoverName 
} from '../types/nasa';

// Mock APOD data
const mockApodData: ApodResponse = {
  date: "2025-01-07",
  explanation: "A magnificent spiral galaxy located approximately 25 million light-years away in the constellation Triangulum. This stunning image showcases the galaxy's intricate spiral arms, filled with star-forming regions that glow brilliantly in hydrogen-alpha light. The galaxy's central bulge contains older, redder stars, while the spiral arms are populated with young, blue stars and pink star-forming nebulae. Dark dust lanes weave throughout the structure, creating beautiful contrast against the bright stellar populations.",
  hdurl: "https://apod.nasa.gov/apod/image/2412/M33_HubbleSpitzer_4000.jpg",
  media_type: "image",
  service_version: "v1",
  title: "M33: The Triangulum Galaxy",
  url: "https://apod.nasa.gov/apod/image/2412/M33_HubbleSpitzer_1024.jpg",
  copyright: "NASA, ESA, Hubble Space Telescope"
};

// Mock Mars Rover data
const mockMarsRoverPhotos: MarsRoverResponse = {
  photos: [
    {
      id: 424905,
      sol: 1000,
      camera: {
        id: 20,
        name: "FHAZ",
        rover_id: 5,
        full_name: "Front Hazard Avoidance Camera"
      },
      img_src: "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MC0044631300305226E01_DXXX.jpg",
      earth_date: "2015-05-30",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-05",
        launch_date: "2011-11-26",
        status: "active",
        max_sol: 4000,
        max_date: "2025-01-07",
        total_photos: 635000,
        cameras: [
          { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
          { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
          { name: "MAST", full_name: "Mast Camera" }
        ]
      }
    },
    {
      id: 424906,
      sol: 1000,
      camera: {
        id: 21,
        name: "RHAZ",
        rover_id: 5,
        full_name: "Rear Hazard Avoidance Camera"
      },
      img_src: "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MC0044631290305225E01_DXXX.jpg",
      earth_date: "2015-05-30",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-05",
        launch_date: "2011-11-26",
        status: "active",
        max_sol: 4000,
        max_date: "2025-01-07",
        total_photos: 635000,
        cameras: [
          { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
          { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
          { name: "MAST", full_name: "Mast Camera" }
        ]
      }
    },
    {
      id: 424907,
      sol: 1000,
      camera: {
        id: 22,
        name: "MAST",
        rover_id: 5,
        full_name: "Mast Camera"
      },
      img_src: "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MC0044631270305224E01_DXXX.jpg",
      earth_date: "2015-05-30",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-05",
        launch_date: "2011-11-26",
        status: "active",
        max_sol: 4000,
        max_date: "2025-01-07",
        total_photos: 635000,
        cameras: [
          { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
          { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
          { name: "MAST", full_name: "Mast Camera" }
        ]
      }
    },
    {
      id: 424908,
      sol: 1000,
      camera: {
        id: 22,
        name: "MAST",
        rover_id: 5,
        full_name: "Mast Camera"
      },
      img_src: "https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MC0044631260305223E01_DXXX.jpg",
      earth_date: "2015-05-30",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-05",
        launch_date: "2011-11-26",
        status: "active",
        max_sol: 4000,
        max_date: "2025-01-07",
        total_photos: 635000,
        cameras: [
          { name: "FHAZ", full_name: "Front Hazard Avoidance Camera" },
          { name: "RHAZ", full_name: "Rear Hazard Avoidance Camera" },
          { name: "MAST", full_name: "Mast Camera" }
        ]
      }
    }
  ]
};

// Mock NEO data
const mockNeoData: NeoResponse = {
  links: {
    next: "http://www.neowsapi.com/rest/v1/feed?start_date=2025-01-08&end_date=2025-01-15&detailed=false&api_key=DEMO_KEY",
    previous: "http://www.neowsapi.com/rest/v1/feed?start_date=2024-12-31&end_date=2025-01-07&detailed=false&api_key=DEMO_KEY",
    self: "http://www.neowsapi.com/rest/v1/feed?start_date=2025-01-07&end_date=2025-01-14&detailed=false&api_key=DEMO_KEY"
  },
  element_count: 127,
  near_earth_objects: {
    "2025-01-07": [
      {
        id: "3542519",
        neo_reference_id: "3542519",
        name: "(2010 PK9)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
        absolute_magnitude_h: 20.84,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.1971942509,
            estimated_diameter_max: 0.4408308491
          },
          meters: {
            estimated_diameter_min: 197.1942509,
            estimated_diameter_max: 440.8308491
          },
          miles: {
            estimated_diameter_min: 0.1225605405,
            estimated_diameter_max: 0.2740023352
          },
          feet: {
            estimated_diameter_min: 646.9625603271,
            estimated_diameter_max: 1446.2956692563
          }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "2025-01-07",
            close_approach_date_full: "2025-Jan-07 18:33",
            epoch_date_close_approach: 1736276020000,
            relative_velocity: {
              kilometers_per_second: "8.0656448305",
              kilometers_per_hour: "29036.3213897776",
              miles_per_hour: "18046.9486427506"
            },
            miss_distance: {
              astronomical: "0.3914748254",
              lunar: "152.2637170806",
              kilometers: "58563896.044238298",
              miles: "36394303.7321039524"
            },
            orbiting_body: "Earth"
          }
        ],
        is_sentry_object: false
      },
      {
        id: "2465633",
        neo_reference_id: "2465633",
        name: "465633 (2009 JR5)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2465633",
        absolute_magnitude_h: 17.9,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.7329648869,
            estimated_diameter_max: 1.6394208707
          },
          meters: {
            estimated_diameter_min: 732.9648869,
            estimated_diameter_max: 1639.4208707
          },
          miles: {
            estimated_diameter_min: 0.4553893206,
            estimated_diameter_max: 1.0186351037
          },
          feet: {
            estimated_diameter_min: 2404.7407038896,
            estimated_diameter_max: 5378.6773278897
          }
        },
        is_potentially_hazardous_asteroid: true,
        close_approach_data: [
          {
            close_approach_date: "2025-01-07",
            close_approach_date_full: "2025-Jan-07 23:59",
            epoch_date_close_approach: 1736295540000,
            relative_velocity: {
              kilometers_per_second: "15.3456789012",
              kilometers_per_hour: "55244.4440443200",
              miles_per_hour: "34321.1234567890"
            },
            miss_distance: {
              astronomical: "0.0456789123",
              lunar: "17.7691009827",
              kilometers: "6836291.123456789",
              miles: "4248562.789012345"
            },
            orbiting_body: "Earth"
          }
        ],
        is_sentry_object: false
      }
    ],
    "2025-01-08": [
      {
        id: "3726710",
        neo_reference_id: "3726710",
        name: "(2015 RG2)",
        nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3726710",
        absolute_magnitude_h: 25.3,
        estimated_diameter: {
          kilometers: {
            estimated_diameter_min: 0.0212995362,
            estimated_diameter_max: 0.0476266797
          },
          meters: {
            estimated_diameter_min: 21.2995362,
            estimated_diameter_max: 47.6266797
          },
          miles: {
            estimated_diameter_min: 0.0132317107,
            estimated_diameter_max: 0.0295986367
          },
          feet: {
            estimated_diameter_min: 69.8802372047,
            estimated_diameter_max: 156.2555776854
          }
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date: "2025-01-08",
            close_approach_date_full: "2025-Jan-08 08:45",
            epoch_date_close_approach: 1736327100000,
            relative_velocity: {
              kilometers_per_second: "12.3456789012",
              kilometers_per_hour: "44444.4440443200",
              miles_per_hour: "27611.1234567890"
            },
            miss_distance: {
              astronomical: "0.1234567890",
              lunar: "48.0028911100",
              kilometers: "18472913.987654321",
              miles: "11478123.456789012"
            },
            orbiting_body: "Earth"
          }
        ],
        is_sentry_object: false
      }
    ]
  }
};

// Mock EPIC data
const mockEpicData: EpicResponse = [
  {
    identifier: "20150613003633",
    caption: "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft",
    image: "epic_1b_20150613003633",
    version: "03",
    centroid_coordinates: {
      lat: 15.296875,
      lon: -158.847656
    },
    dscovr_j2000_position: {
      x: -1293015.297481,
      y: -669893.085468,
      z: -130240.863464
    },
    lunar_j2000_position: {
      x: 46468.466034,
      y: -373058.207373,
      z: -119205.632486
    },
    sun_j2000_position: {
      x: -148186906.693877,
      y: -24378454.354093,
      z: -10570645.641510
    },
    attitude_quaternions: {
      q0: -0.374285,
      q1: 0.071085,
      q2: 0.849888,
      q3: 0.360846
    },
    date: "2025-01-06 00:36:33",
    coords: {
      centroid_coordinates: {
        lat: 15.296875,
        lon: -158.847656
      },
      dscovr_j2000_position: {
        x: -1293015.297481,
        y: -669893.085468,
        z: -130240.863464
      },
      lunar_j2000_position: {
        x: 46468.466034,
        y: -373058.207373,
        z: -119205.632486
      },
      sun_j2000_position: {
        x: -148186906.693877,
        y: -24378454.354093,
        z: -10570645.641510
      },
      attitude_quaternions: {
        q0: -0.374285,
        q1: 0.071085,
        q2: 0.849888,
        q3: 0.360846
      }
    }
  },
  {
    identifier: "20150613021933",
    caption: "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft",
    image: "epic_1b_20150613021933",
    version: "03",
    centroid_coordinates: {
      lat: 16.435547,
      lon: -141.328125
    },
    dscovr_j2000_position: {
      x: -1293019.762481,
      y: -669888.452468,
      z: -130239.426464
    },
    lunar_j2000_position: {
      x: 46502.133034,
      y: -373021.540373,
      z: -119189.905486
    },
    sun_j2000_position: {
      x: -148186840.026877,
      y: -24378720.021093,
      z: -10570760.308510
    },
    attitude_quaternions: {
      q0: -0.375832,
      q1: 0.070444,
      q2: 0.849304,
      q3: 0.361556
    },
    date: "2025-01-06 02:19:33",
    coords: {
      centroid_coordinates: {
        lat: 16.435547,
        lon: -141.328125
      },
      dscovr_j2000_position: {
        x: -1293019.762481,
        y: -669888.452468,
        z: -130239.426464
      },
      lunar_j2000_position: {
        x: 46502.133034,
        y: -373021.540373,
        z: -119189.905486
      },
      sun_j2000_position: {
        x: -148186840.026877,
        y: -24378720.021093,
        z: -10570760.308510
      },
      attitude_quaternions: {
        q0: -0.375832,
        q1: 0.070444,
        q2: 0.849304,
        q3: 0.361556
      }
    }
  }
];

class MockApiService {
  /**
   * Simulate network delay
   */
  private async delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    await this.delay(500);
    return true;
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
    await this.delay(800);
    
    if (params?.count && params.count > 1) {
      // Return array of APOD data
      return Array.from({ length: params.count }, (_, i) => ({
        ...mockApodData,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        title: `${mockApodData.title} - Day ${i + 1}`
      }));
    }
    
    if (params?.date) {
      return { ...mockApodData, date: params.date };
    }
    
    return mockApodData;
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
    await this.delay(1200);
    
    let filteredPhotos = [...mockMarsRoverPhotos.photos];
    
    // Filter by camera if specified
    if (params.camera && params.camera !== 'all') {
      filteredPhotos = filteredPhotos.filter(photo => 
        photo.camera.name.toLowerCase() === params.camera?.toLowerCase()
      );
    }
    
    // Update rover name
    filteredPhotos = filteredPhotos.map(photo => ({
      ...photo,
      rover: {
        ...photo.rover,
        name: params.rover.charAt(0).toUpperCase() + params.rover.slice(1)
      }
    }));
    
    // Update sol if provided
    if (params.sol) {
      filteredPhotos = filteredPhotos.map(photo => ({
        ...photo,
        sol: params.sol!
      }));
    }
    
    // Update earth_date if provided
    if (params.earth_date) {
      filteredPhotos = filteredPhotos.map(photo => ({
        ...photo,
        earth_date: params.earth_date!
      }));
    }
    
    return {
      photos: filteredPhotos
    };
  }

  /**
   * Get Mars Rover Manifest
   */
  async getMarsRoverManifest(rover: RoverName): Promise<any> {
    await this.delay(600);
    return {
      name: rover,
      landing_date: "2012-08-05",
      launch_date: "2011-11-26",
      status: "active",
      max_sol: 4000,
      max_date: "2025-01-07",
      total_photos: 635000
    };
  }

  /**
   * Get Near Earth Objects
   */
  async getNearEarthObjects(params?: {
    start_date?: string;
    end_date?: string;
    detailed?: boolean;
  }): Promise<NeoResponse> {
    await this.delay(1000);
    return mockNeoData;
  }

  /**
   * Get Near Earth Object by ID
   */
  async getNearEarthObjectById(id: string): Promise<any> {
    await this.delay(700);
    return mockNeoData.near_earth_objects["2025-01-07"][0];
  }

  /**
   * Get EPIC Earth Images
   */
  async getEpicImages(params?: {
    date?: string;
  }): Promise<EpicResponse> {
    await this.delay(900);
    return mockEpicData;
  }

  /**
   * Search NASA Image Library
   */
  async searchImageLibrary(params: {
    q: string;
    media_type?: string;
  }): Promise<any> {
    await this.delay(1100);
    return {
      collection: {
        version: "1.0",
        href: "http://images-api.nasa.gov/search?q=" + params.q,
        items: []
      }
    };
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
    await this.delay(800);
    return {
      date: params.date || "2025-01-07",
      url: "https://api.nasa.gov/planetary/earth/imagery"
    };
  }

  /**
   * NASA API Health Check
   */
  async checkNasaApiHealth(): Promise<boolean> {
    await this.delay(300);
    return true;
  }
}

const mockApiService = new MockApiService();
export default mockApiService;
