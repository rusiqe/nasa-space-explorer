export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    let url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;
    
    // Add query parameters
    const { start_date, end_date, detailed } = req.query;
    if (start_date) url += `&start_date=${start_date}`;
    if (end_date) url += `&end_date=${end_date}`;
    if (detailed) url += `&detailed=${detailed}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: { message: data.error?.message || 'Failed to fetch Near Earth Objects' },
        timestamp: new Date().toISOString()
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('NEO Error:', error);
    res.status(500).json({ 
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString()
    });
  }
}
