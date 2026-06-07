# OmniGen Studio

A modern, elegant web interface for AI-powered text and image generation. Create stunning content instantly with unlimited access to cutting-edge AI models.

## 🚀 Features

- **Text Generation**: Generate creative text, stories, and answers instantly
- **Image Generation**: Create beautiful images from natural language descriptions
- **Modern UI**: Sleek dark theme with smooth animations and responsive design
- **Zero Setup**: Works out of the box with fallback simulations
- **Real API Integration**: Connect to free Hugging Face models for production use

## 🌐 Live Demo

**Access the app here:** https://rvmajhail-ops.github.io/omnigen-studio/

## 📋 Quick Start

### 1. Basic Usage (Simulation Mode)
The app works immediately without any setup! Click the "Generate" button and it will show demo responses. Perfect for testing the UI and functionality.

### 2. Live API Setup (Optional)

To enable real AI generation, you'll need a free Hugging Face API key:

#### Step 1: Get Your API Key
1. Visit https://huggingface.co/settings/tokens
2. Create a new token (name it "OmniGen Studio")
3. Copy your token

#### Step 2: Add Your Key to the App

**Option A: Local Modification**
1. Clone this repository:
   ```bash
   git clone https://github.com/rvmajhail-ops/omnigen-studio.git
   cd omnigen-studio
   ```
2. Open `index.html` in your editor
3. Find line 250 and replace `hf_YOUR_FREE_API_KEY_HERE` with your actual token:
   ```javascript
   headers: { Authorization: "Bearer hf_YOUR_FREE_API_KEY_HERE" }
   ```
4. Also replace it on line 264
5. Save and commit:
   ```bash
   git add index.html
   git commit -m "Add Hugging Face API key"
   git push
   ```

**Option B: Browser Console (Temporary)**
1. Open the app in your browser
2. Press `F12` to open Developer Tools
3. Go to the Console tab
4. Paste your key when prompted

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Hugging Face Inference API
- **Models**:
  - Text: Mistral-7B-Instruct-v0.2
  - Image: Stable Diffusion XL Base 1.0

## 📝 Available Models

### Text Generation
- **Model**: `mistralai/Mistral-7B-Instruct-v0.2`
- **Type**: Large Language Model
- **Capabilities**: Story writing, Q&A, content creation, coding

### Image Generation
- **Model**: `stabilityai/stable-diffusion-xl-base-1.0`
- **Type**: Text-to-Image
- **Capabilities**: Photo-realistic and artistic image generation

## 🔒 Security & Privacy

- **Client-Side Processing**: All requests processed in your browser
- **No Data Storage**: We don't store any of your prompts or generated content
- **API Keys**: Keep your Hugging Face token secure and never share it
- **Open Source**: Code is transparent and auditable

## 💡 Pro Tips

1. **Batch Requests**: Generate multiple items in succession - the chat history persists
2. **Detailed Prompts**: More specific prompts yield better results
3. **Tab Switching**: Seamlessly switch between Text and Image generation
4. **Responsive**: Works great on desktop, tablet, and mobile devices

## 📚 Additional Resources

- [Hugging Face Models](https://huggingface.co/models)
- [Hugging Face API Documentation](https://huggingface.co/docs/api-inference/index)
- [Mistral Model Card](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2)
- [Stable Diffusion XL](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)

## 🐛 Troubleshooting

### "AI Response generated successfully (simulated without Key)"
- This is the fallback mode - you haven't added your API key yet
- Solution: Add your Hugging Face API key following the instructions above

### Rate Limiting
- Free tier has limits on concurrent requests
- Wait a few seconds between requests if you hit limits
- Upgrade to Hugging Face Pro for higher limits

### CORS Issues
- Some models may have CORS restrictions
- Try switching to a different model or upgrading your API plan

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Found a bug? Have a feature idea? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⭐ Show Your Support

If you find OmniGen Studio useful, please consider:
- ⭐ Starring this repository
- 🔄 Sharing it with others
- 💬 Providing feedback and suggestions

---

**Built with ❤️ using modern web technologies**

Questions? Open an issue or visit the [Hugging Face Community](https://huggingface.co/community) for support.
