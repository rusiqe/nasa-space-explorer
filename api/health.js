// Vercel serverless function for health check
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'NASA Space Explorer API'
  });
}
