export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date } = req.query;
    const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
    
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    if (date) {
      url += `&date=${date}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
