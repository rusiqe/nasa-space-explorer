export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rover } = req.query;
    const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    if (!rover || !['curiosity', 'opportunity', 'spirit'].includes(rover)) {
      return res.status(400).json({ 
        success: false, 
        error: { message: 'Invalid or missing rover parameter. Use: curiosity, opportunity, or spirit' } 
      });
    }
    
    // Build URL with parameters
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${NASA_API_KEY}`;
    
    // Add query parameters
    const { sol, earth_date, camera, page } = req.query;
    if (sol) url += `&sol=${sol}`;
    if (earth_date) url += `&earth_date=${earth_date}`;
    if (camera && camera !== 'all') url += `&camera=${camera}`;
    if (page) url += `&page=${page}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: { message: data.error?.message || 'Failed to fetch Mars rover photos' },
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mars Rover Error:', error);
    res.status(500).json({ 
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString()
    });
  }
}
