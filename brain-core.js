/**
 * SPARKAM AI BRAIN-CORE v2.1.0
 * The Central Command for DSP Sync, Branding, and Analytics
 */

const AI_CONFIG = {
    baseUrl: "https://sparkam.vercel.app",
    version: "2.1.0",
    status: "AI Dashboard Sync Active"
};

// 🟢 TRACK DATABASE: Paste your Tunecore/DistroKid links here
const TRACK_DATABASE = {
    "SUGAR DADDY": {
        isrc: "US-ABC-26-00001", 
        spotify: "https://open.spotify.com/track/YOUR_ID", 
        apple: "https://music.apple.com/album/YOUR_ID",
        audiomack: "https://audiomack.com/song/sparkam/sugar-daddy",
        youtube: "https://youtube.com/watch?v=YOUR_ID"
    }
};

// 🟢 LOGIC: Link Generation
function generateFanLink(trackName) {
    const cleanTrack = encodeURIComponent(trackName);
    return `${AI_CONFIG.baseUrl}/fan-link.html?track=${cleanTrack}`;
}

// 🟢 ANALYTICS: Click Tracking
function trackDSPClick(platform, track) {
    console.log(`[AI BRAIN] Fan clicked ${platform} for ${track}`);
    // This logs locally; future updates can push this to a database
}

// 🟢 UI: Live Terminal Log for Brand Positioning
const logMessages = [
    "Analyzing DSP metadata for 'SUGAR DADDY'...",
    "Syncing global fan-link nodes...",
    "Optimizing routing for West African region...",
    "Latency check: 24ms. Stable.",
    "Autonomous click-tracking enabled.",
    "Bypassing regional link leakage...",
    "AI Strategy: Deployment ready for Sunday release."
];

function runTerminalLog() {
    const body = document.getElementById('terminal-body');
    if (!body) return;

    const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
    const entry = document.createElement('div');
    entry.style.marginBottom = "4px";
    entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    body.appendChild(entry);
    
    body.scrollTop = body.scrollHeight;
    if (body.childElementCount > 10) body.removeChild(body.firstChild);
}

// 🟢 INITIALIZATION
window.onload = () => {
    // Update Dashboard URLs if on Admin page
    const campaignText = document.querySelector('.campaign-url-text');
    if (campaignText) {
        campaignText.innerText = generateFanLink("SUGAR DADDY");
    }

    // Start Terminal if element exists
    if (document.getElementById('terminal-body')) {
        setInterval(runTerminalLog, 3000);
    }

    console.log(`[AI BRAIN] ${AI_CONFIG.status} - Version ${AI_CONFIG.version}`);
};

// Global Export
window.sparkamBrain = {
    config: AI_CONFIG,
    db: TRACK_DATABASE,
    getTrackData: (name) => TRACK_DATABASE[name] || null,
    logClick: trackDSPClick
};
