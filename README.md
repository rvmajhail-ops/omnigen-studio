# OmniGen Studio

An AI-powered web application for generating text and images using Hugging Face models, with a secure backend architecture.

## Features

- 🎨 **Text Generation** - Generate creative text using Mistral-7B
- 🖼️ **Image Generation** - Create images using Stable Diffusion XL
- 🔒 **Secure Backend** - API keys protected on server-side only
- ⚡ **Rate Limiting** - Built-in request rate limiting
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hugging Face API key (free tier available)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rvmajhail-ops/omnigen-studio.git
   cd omnigen-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Add your Hugging Face API key**
   - Get a free key from [Hugging Face](https://huggingface.co/settings/tokens)
   - Edit `.env` and replace `your_hf_api_key_here` with your actual key
   ```
   PORT=3000
   HUGGINGFACE_API_KEY=hf_YOUR_ACTUAL_KEY_HERE
   NODE_ENV=development
   ```

## Running the Application

### Development
```bash
npm run dev
```
This will start the server with auto-reload using nodemon.

### Production
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Generate Text
```
POST /api/generate-text
Content-Type: application/json

{
  "prompt": "Your text prompt here"
}

Response:
{
  "success": true,
  "text": "Generated text response"
}
```

### Generate Image
```
POST /api/generate-image
Content-Type: application/json

{
  "prompt": "Your image description here"
}

Response:
{
  "success": true,
  "image": "data:image/png;base64,..."
}
```

### Health Check
```
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2026-06-07T..."
}
```

## Security Features

- ✅ API keys stored securely on server (never exposed to client)
- ✅ CORS enabled for cross-origin requests
- ✅ Rate limiting to prevent abuse (10 requests per minute per IP)
- ✅ Input validation on all endpoints
- ✅ Error handling without exposing sensitive information
- ✅ Environment variables for configuration

## Deployment

### Deploy to Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variable: `heroku config:set HUGGINGFACE_API_KEY=your_key`
5. Deploy: `git push heroku main`

### Deploy to Railway
1. Push to GitHub
2. Connect repository at railway.app
3. Add `HUGGINGFACE_API_KEY` environment variable
4. Deploy automatically

### Deploy to Vercel (Serverless)
Create `api/generate-text.js` and `api/generate-image.js` for serverless deployment.

## Rate Limiting

- **Limit**: 10 requests per minute per IP address
- **Response**: 429 (Too Many Requests) when limit exceeded

## Troubleshooting

### "API key not configured on server"
- Verify `.env` file exists with correct `HUGGINGFACE_API_KEY`
- Restart the server after changing `.env`

### "Rate limit exceeded"
- Wait 1 minute before making new requests
- Consider deploying with higher rate limits if needed

### Image generation takes too long
- Stable Diffusion models can take 30+ seconds
- Server timeout is set to 30 seconds; consider using a queue for production

## Future Enhancements

- [ ] User authentication and API keys per user
- [ ] Request queue system for concurrent operations
- [ ] Caching for frequently used prompts
- [ ] Multiple model selection
- [ ] Fine-tuning capabilities
- [ ] WebSocket support for real-time updates

## License

MIT

## Support

For issues and questions, open a GitHub issue at [omnigen-studio/issues](https://github.com/rvmajhail-ops/omnigen-studio/issues)