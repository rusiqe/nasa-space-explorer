export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    const { date } = req.query;
    
    let url;
    if (date) {
      url = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${NASA_API_KEY}`;
    } else {
      url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: { message: data.error?.message || 'Failed to fetch EPIC Earth images' },
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('EPIC Error:', error);
    res.status(500).json({ 
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString()
    });
  }
}
