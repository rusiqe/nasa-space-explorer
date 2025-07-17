export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      error: {
        message: 'Method not allowed',
        code: 'METHOD_NOT_ALLOWED'
      },
      timestamp: new Date().toISOString()
    });
  }

  try {
    const { date, start_date, end_date, count, thumbs } = req.query;
    const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    
    if (date) {
      url += `&date=${date}`;
    }
    if (start_date) {
      url += `&start_date=${start_date}`;
    }
    if (end_date) {
      url += `&end_date=${end_date}`;
    }
    if (count) {
      url += `&count=${count}`;
    }
    if (thumbs) {
      url += `&thumbs=${thumbs}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: {
          message: data.error?.message || 'Failed to fetch APOD data',
          code: data.error?.code || 'APOD_FETCH_ERROR'
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Return in the same format as backend
    res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ 
      success: false,
      error: {
        message: error.message || 'Internal server error',
        code: 'APOD_FETCH_ERROR'
      },
      timestamp: new Date().toISOString()
    });
  }
}
