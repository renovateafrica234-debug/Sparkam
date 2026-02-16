/**
 * SPARKAM AI BRAIN-CORE v2.5.0
 * Updated: Dynamic Mood & Artist Data flow
 */

const MOODS = {
    "Afrobeats": { primary: "#00ff7f", accent: "#ff0095" },
    "Soul": { primary: "#FFD700", accent: "#8B4513" },
    "Amapiano": { primary: "#7B68EE", accent: "#00FFFF" },
    "Drill": { primary: "#555555", accent: "#FF4500" },
    "Default": { primary: "#00ff7f", accent: "#ff0095" }
};

const DEFAULT_TRACKS = {
    "Freedom": {
        artist: "Zeeter Oliver",
        genre: "Afrobeats",
        isrc: "US-ABC-26-00001", 
        audiomack: "https://audiomack.com/song/zeeter-oliver/freedom"
    },
    "Sugar Daddy": {
        artist: "Zeeter Oliver",
        genre: "Soul",
        isrc: "PENDING_TEST",
        localFile: null
    }
};

function getStoredData() {
    const stored = localStorage.getItem('sparkam_brain_db');
    return stored ? JSON.parse(stored) : DEFAULT_TRACKS;
}

window.sparkamBrain = {
    config: { baseUrl: "https://sparkam.vercel.app", version: "2.5.0" },
    db: getStoredData(),
    getTrackData: (name) => getStoredData()[name] || null,
    saveTrack: (name, data) => {
        const db = getStoredData();
        db[name] = data;
        localStorage.setItem('sparkam_brain_db', JSON.stringify(db));
    },
    applyMood: (genre) => {
        const palette = MOODS[genre] || MOODS["Default"];
        document.documentElement.style.setProperty('--primary', palette.primary);
        document.documentElement.style.setProperty('--accent', palette.accent);
        return palette;
    }
};
