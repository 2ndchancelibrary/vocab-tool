// Vercel Serverless Function
// 브라우저 → Vercel(https) → AWS 서버(http) 프록시

const AWS_SERVER = 'http://3.36.26.64:5000';
const ACCESS_TOKEN = 'readingpower2026';

export default async function handler(req, res) {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${AWS_SERVER}/analyze-vocab`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
