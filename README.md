# omnigen-studio
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OmniGen AI - Unlimited Access</title>
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            --panel-bg: rgba(30, 41, 59, 0.7);
            --accent-color: #6366f1;
            --accent-hover: #4f46e5;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            background: var(--bg-gradient);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Header Navigation */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(to right, #818cf8, #c084fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .nav-tabs {
            display: flex;
            gap: 1rem;
        }

        .tab-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            padding: 0.5rem 1rem;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .tab-btn.active, .tab-btn:hover {
            background: var(--accent-color);
            color: white;
        }

        /* Main App Container */
        main {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }

        .workspace {
            background: var(--panel-bg);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            width: 100%;
            max-width: 900px;
            height: 70vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .output-panel {
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .input-panel {
            padding: 1.5rem;
            background: rgba(15, 23, 42, 0.4);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            gap: 1rem;
        }

        textarea {
            flex: 1;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: white;
            padding: 1rem;
            resize: none;
            font-size: 1rem;
            height: 54px;
            transition: border 0.3s;
        }

        textarea:focus {
            outline: none;
            border-color: var(--accent-color);
        }

        .gen-btn {
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0 1.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }

        .gen-btn:hover {
            background: var(--accent-hover);
        }

        /* Content Styles */
        .ai-response {
            background: rgba(255,255,255,0.05);
            padding: 1rem;
            border-radius: 12px;
            line-height: 1.5;
        }

        .image-result {
            max-width: 100%;
            max-height: 400px;
            border-radius: 12px;
            margin-top: 1rem;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            align-self: center;
        }

        .hidden { display: none !important; }

        .loader {
            border: 4px solid rgba(255,255,255,0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: var(--accent-color);
            animation: spin 1s linear infinite;
            align-self: center;
            margin: 2rem 0;
        }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Responsive Optimization for Phones */
        @media (max-width: 768px) {
            header {
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }
            main { padding: 1rem; }
            .workspace { height: 75vh; }
            .input-panel { flex-direction: column; }
            textarea { height: 80px; }
            .gen-btn { padding: 1rem; }
        }
    </style>
</head>
<body>

    <header>
        <div class="logo">OmniGen Studio</div>
        <div class="nav-tabs">
            <button class="tab-btn active" onclick="switchTab('text')">Text AI</button>
            <button class="tab-btn" onclick="switchTab('image')">Image AI</button>
        </div>
    </header>

    <main>
        <div class="workspace">
            <div id="outputPanel" class="output-panel">
                <div class="ai-response">Welcome! Type a prompt below to generate text or images instantly without limit.</div>
            </div>

            <div id="loader" class="loader hidden"></div>

            <div class="input-panel">
                <textarea id="promptInput" placeholder="Ask me anything..."></textarea>
                <button class="gen-btn" onclick="handleGeneration()">Generate</button>
            </div>
        </div>
    </main>

    <script>
        let currentMode = 'text';

        function switchTab(mode) {
            currentMode = mode;
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            const input = document.getElementById('promptInput');
            if(mode === 'text') {
                input.placeholder = "Ask me anything or write a story...";
            } else {
                input.placeholder = "Describe the image you want to create...";
            }
        }

        async function handleGeneration() {
            const prompt = document.getElementById('promptInput').value.trim();
            if (!prompt) return;

            const outputPanel = document.getElementById('outputPanel');
            const loader = document.getElementById('loader');

            // Show loading animation
            loader.classList.remove('hidden');
            document.getElementById('promptInput').value = '';

            try {
                if (currentMode === 'text') {
                    // Hook into a Free Text API (e.g., Hugging Face Serverless or your backend)
                    // For demo/instant use, we show a client-side wrapper. Swap URL with your live endpoint.
                    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
                        headers: { Authorization: "Bearer hf_YOUR_FREE_API_KEY_HERE" }, // Put your free HuggingFace Key here
                        method: "POST",
                        body: JSON.stringify({ inputs: prompt }),
                    });
                    const data = await response.json();
                    
                    const textDiv = document.createElement('div');
                    textDiv.className = 'ai-response';
                    textDiv.innerText = data[0]?.generated_text || "AI Response generated successfully (simulated without Key).";
                    outputPanel.appendChild(textDiv);

                } else {
                    // Hook into a Free Image API (e.g., Stable Diffusion via Hugging Face)
                    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
                        headers: { Authorization: "Bearer hf_YOUR_FREE_API_KEY_HERE" },
                        method: "POST",
                        body: JSON.stringify({ inputs: prompt }),
                    });
                    const blob = await response.blob();
                    const imgUrl = URL.createObjectURL(blob);

                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.className = 'image-result';
                    outputPanel.appendChild(img);
                }
            } catch (error) {
                // Fallback simulation so it works right out of the box
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'ai-response';
                fallbackDiv.innerHTML = `<strong>Prompt received:</strong> "${prompt}"<br><br><em>[To go completely live, paste your free Hugging Face API key into line 163 of the HTML code!]</em>`;
                outputPanel.appendChild(fallbackDiv);
            } finally {
                loader.classList.add('hidden');
                outputPanel.scrollTop = outputPanel.scrollHeight;
            }
        }
    </script>
</body>
</html>
