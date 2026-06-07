const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting helper (simple in-memory implementation)
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests
const RATE_WINDOW = 60000; // per minute

function checkRateLimit(ip) {
  const now = Date.now();
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }
  
  const requests = requestCounts.get(ip);
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

// Text generation endpoint
app.post('/api/generate-text', async (req, res) => {
  try {
    const clientIp = req.ip;
    
    // Check rate limiting
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }

    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!HF_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured on server' 
      });
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        timeout: 30000,
      }
    );

    const generatedText = response.data[0]?.generated_text || 'No response generated';

    res.json({ success: true, text: generatedText });
  } catch (error) {
    console.error('Text generation error:', error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API credentials' });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate text. Please try again.' 
    });
  }
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const clientIp = req.ip;
    
    // Check rate limiting
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }

    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!HF_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured on server' 
      });
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
        responseType: 'arraybuffer',
        timeout: 30000,
      }
    );

    const imageBuffer = Buffer.from(response.data, 'binary');
    const base64Image = imageBuffer.toString('base64');

    res.json({ 
      success: true, 
      image: `data:image/png;base64,${base64Image}` 
    });
  } catch (error) {
    console.error('Image generation error:', error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API credentials' });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate image. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 OmniGen Studio server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});