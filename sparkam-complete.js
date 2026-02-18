// SPARKAM COMPLETE AI SERVER
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SPARKAM - Your Mini Record Label</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #1a0533 0%, #2d0a4e 100%); min-height: 100vh; color: white; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .logo { text-align: center; font-size: 48px; font-weight: 900; letter-spacing: -2px; margin-bottom: 10px; }
    .logo .spark { color: white; }
    .logo .am { color: #FF0066; }
    .tagline { text-align: center; font-size: 14px; letter-spacing: 4px; color: rgba(255,255,255,0.6); margin-bottom: 10px; font-weight: 600; }
    .subtext { text-align: center; font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 50px; }
    .form-group { margin-bottom: 25px; }
    label { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 10px; font-weight: 600; }
    input[type="text"] { width: 100%; padding: 15px; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-size: 16px; transition: all 0.3s; }
    input[type="text"]:focus { outline: none; border-color: #FF0066; background: rgba(255,255,255,0.08); }
    input[type="text"]::placeholder { color: rgba(255,255,255,0.3); }
    .budget-display { color: #FF0066; font-size: 24px; font-weight: bold; float: right; }
    input[type="range"] { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; outline: none; -webkit-appearance: none; }
    input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: #FF0066; cursor: pointer; border-radius: 50%; box-shadow: 0 0 20px rgba(255,0,102,0.5); }
    .launch-button { width: 100%; padding: 18px; background: linear-gradient(135deg, #FF0066 0%, #FF3388 100%); border: none; border-radius: 12px; color: white; font-size: 16px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 40px rgba(255,0,102,0.3); margin-top: 30px; }
    .launch-button:hover { transform: translateY(-2px); box-shadow: 0 15px 50px rgba(255,0,102,0.5); }
    .launch-button:disabled { opacity: 0.6; cursor: not-allowed; }
    .loading { text-align: center; padding: 30px; background: rgba(255,0,102,0.1); border-radius: 12px; margin-top: 30px; display: none; }
    .loading.show { display: block; }
    .spinner { border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid #FF0066; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .results { margin-top: 40px; display: none; }
    .results.show { display: block; animation: fadeIn 0.5s; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .result-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 25px; margin-bottom: 20px; }
    .result-card h2 { color: #FF0066; font-size: 18px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
    .result-card h3 { color: white; font-size: 16px; margin: 20px 0 10px 0; }
    .result-card p { color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 15px; }
    .platform-item { background: rgba(255,0,102,0.1); border-left: 3px solid #FF0066; padding: 15px; margin-bottom: 10px; border-radius: 8px; }
    .platform-item strong { color: #FF0066; display: block; margin-bottom: 5px; }
    .caption-item { background: rgba(255,255,255,0.03); padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid rgba(255,0,102,0.5); }
    .hashtags { color: #FF0066; word-wrap: break-word; line-height: 1.8; }
    .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
    .metric { background: rgba(255,0,102,0.1); padding: 15px; border-radius: 8px; text-align: center; }
    .metric-value { font-size: 24px; font-weight: bold; color: #FF0066; display: block; margin-bottom: 5px; }
    .metric-label { font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; }
    .error { background: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.3); color: #ff6666; padding: 20px; border-radius: 12px; margin-top: 20px; display: none; }
    .error.show { display: block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo"><span class="spark">SPARK</span><span class="am">AM.</span></div>
    <div class="tagline">YOUR MINI RECORD LABEL</div>
    <div class="subtext">Autonomous AI promotion for Afrobeats</div>
    <form id="campaignForm">
      <div class="form-group">
        <label>Track Title</label>
        <input type="text" id="trackTitle" placeholder="e.g. Essence" required>
      </div>
      <div class="form-group">
        <label>Artist Name</label>
        <input type="text" id="artistName" placeholder="e.g. Wizkid" required>
      </div>
      <div class="form-group">
        <label>Budget <span class="budget-display">$<span id="budgetDisplay">2500</span></span></label>
        <input type="range" id="budget" min="100" max="10000" value="2500" step="100">
      </div>
      <button type="submit" class="launch-button" id="launchBtn">🚀 Launch Campaign</button>
    </form>
    <div class="loading" id="loading"><div class="spinner"></div><div>Generating your campaign strategy...</div></div>
    <div class="error" id="error"></div>
    <div class="results" id="results"></div>
  </div>
  <script>
    const budgetSlider = document.getElementById('budget');
    const budgetDisplay = document.getElementById('budgetDisplay');
    budgetSlider.addEventListener('input', (e) => { budgetDisplay.textContent = e.target.value; });
    document.getElementById('campaignForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const trackTitle = document.getElementById('trackTitle').value;
      const artistName = document.getElementById('artistName').value;
      const budget = parseInt(document.getElementById('budget').value);
      document.getElementById('loading').classList.add('show');
      document.getElementById('results').classList.remove('show');
      document.getElementById('error').classList.remove('show');
      document.getElementById('launchBtn').disabled = true;
      try {
        const response = await fetch('/api/campaign/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ track: { title: trackTitle, artist: artistName, genre: 'Afrobeats' }, goals: { budget: budget, platforms: ['tiktok', 'instagram', 'spotify'], targetStreams: 10000 } })
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || 'Failed to generate campaign');
        displayResults(data.campaign);
      } catch (error) {
        document.getElementById('error').textContent = '❌ ' + error.message;
        document.getElementById('error').classList.add('show');
      } finally {
        document.getElementById('loading').classList.remove('show');
        document.getElementById('launchBtn').disabled = false;
      }
    });
    function displayResults(campaign) {
      const html = '<div class="result-card"><h2>✅ Campaign Generated!</h2><h3>Strategy</h3><p>' + (campaign.overview || 'AI strategy generated') + '</p>' + (campaign.platforms ? '<h3>Platforms</h3>' + campaign.platforms.map(p => '<div class="platform-item"><strong>' + (p.platform||'').toUpperCase() + '</strong><div>Budget: $' + (p.budgetAllocation||0) + '</div><div>Tactics: ' + (p.tactics||[]).join(', ') + '</div></div>').join('') : '') + (campaign.content && campaign.content.captions ? '<h3>Captions</h3>' + campaign.content.captions.map((c,i) => '<div class="caption-item"><strong>Caption ' + (i+1) + ':</strong> ' + c + '</div>').join('') : '') + (campaign.content && campaign.content.hashtags ? '<h3>Hashtags</h3><div class="hashtags">' + campaign.content.hashtags.join(' ') + '</div>' : '') + (campaign.predictions ? '<h3>Predicted Results</h3><div class="metrics"><div class="metric"><span class="metric-value">' + ((campaign.predictions.estimatedReach||0).toLocaleString()) + '</span><span class="metric-label">Reach</span></div><div class="metric"><span class="metric-value">' + ((campaign.predictions.estimatedStreams||0).toLocaleString()) + '</span><span class="metric-label">Streams</span></div></div>' : '') + '</div>';
      document.getElementById('results').innerHTML = html;
      document.getElementById('results').classList.add('show');
    }
  </script>
</body>
</html>`);
});

app.post('/api/campaign/create', async (req, res) => {
  try {
    const { track, goals } = req.body;
    console.log('🎵 Generating campaign for:', track.title);
    if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY not configured');
    const prompt = `You are an expert music marketer for Afrobeats. Track: "${track.title}" by ${track.artist}. Budget: $${goals.budget}. Platforms: ${goals.platforms.join(', ')}. Create campaign strategy as JSON with: overview (string), platforms (array with platform, tactics array, budgetAllocation number), content (captions array, hashtags array), predictions (estimatedReach, estimatedStreams, estimatedEngagement numbers). Return ONLY valid JSON.`;
    const completion = await groq.chat.completions.create({ model: "mixtral-8x7b-32768", messages: [{ role: "user", content: prompt }], max_tokens: 2048, temperature: 0.7 });
    let campaignData;
    try {
      campaignData = JSON.parse(completion.choices[0].message.content.trim());
    } catch {
      campaignData = { overview: 'AI-generated strategy for maximum reach', platforms: goals.platforms.map(p => ({ platform: p, tactics: ['Optimized engagement', 'Targeted ads'], budgetAllocation: Math.floor(goals.budget / goals.platforms.length) })), content: { captions: [`🔥 ${track.artist} - "${track.title}" is here! Stream now #Afrobeats`, `New music alert! ${track.title} by ${track.artist} 🎵`, `This is the vibe! ${track.artist} drops ${track.title} 🚀`], hashtags: ['#Afrobeats', '#NewMusic', `#${track.artist.replace(/\s+/g,'')}`, '#MusicVibes'] }, predictions: { estimatedReach: goals.budget * 500, estimatedStreams: goals.budget * 50, estimatedEngagement: goals.budget * 25 } };
    }
    campaignData.id = 'campaign_' + Date.now();
    res.json({ success: true, campaign: campaignData });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ai: process.env.GROQ_API_KEY ? 'connected' : 'not configured' });
});

app.listen(port, () => {
  console.log(`🎵 SPARKAM AI running on port ${port}`);
});

module.exports = app;
