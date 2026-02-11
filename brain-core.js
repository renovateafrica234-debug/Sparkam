/**
 * SPARKAM AI BRAIN-CORE v2.4.0
 * Artist-Aware Routing & Persistence Layer
 */

const AI_CONFIG = {
    baseUrl: "https://sparkam.vercel.app",
    version: "2.4.0",
    status: "AI Dashboard Sync Active"
};

const DEFAULT_TRACKS = {
    "Freedom": {
        artist: "Zeeter Oliver",
        isrc: "US-ABC-26-00001", 
        spotify: "https://open.spotify.com/track/YOUR_ID", 
        apple: "https://music.apple.com/album/YOUR_ID",
        audiomack: "https://audiomack.com/song/zeeter-oliver/freedom"
    },
    "Sugar Daddy": {
        artist: "Zeeter Oliver",
        isrc: "PENDING_TEST",
        localFile: null,
        spotify: null
    }
};

function getStoredData() {
    const stored = localStorage.getItem('sparkam_brain_db');
    return stored ? JSON.parse(stored) : DEFAULT_TRACKS;
}

function saveToBrain(trackName, data) {
    const currentDb = getStoredData();
    currentDb[trackName] = data;
    localStorage.setItem('sparkam_brain_db', JSON.stringify(currentDb));
}

function generateFanLink(trackName) {
    return `${AI_CONFIG.baseUrl}/fan-link.html?track=${encodeURIComponent(trackName)}`;
}

// Global Export
window.sparkamBrain = {
    config: AI_CONFIG,
    db: getStoredData(),
    getTrackData: (name) => getStoredData()[name] || null,
    saveTrack: saveToBrain,
    registerLead: (name, email) => {
        const leads = JSON.parse(localStorage.getItem('sparkam_leads') || "[]");
        leads.push({ name, email, date: new Date() });
        localStorage.setItem('sparkam_leads', JSON.stringify(leads));
    }
};
