/**
 * SPARKAM AI BRAIN-CORE v2.7.0
 * Central Intelligence & Data Management
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
        audiomack: "https://audiomack.com/song/zeeter-oliver/freedom",
        stats: { reach: "128K", engagement: "4.8%" }
    }
};

function getStoredData() {
    const stored = localStorage.getItem('sparkam_brain_db');
    return stored ? JSON.parse(stored) : DEFAULT_TRACKS;
}

window.sparkamBrain = {
    config: { baseUrl: "https://sparkam.vercel.app", version: "2.7.0" },
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
    },

    // NEW: Lead Management for the "Pocket Label"
    registerLead: (name, email) => {
        const leads = JSON.parse(localStorage.getItem('sparkam_leads') || "[]");
        leads.push({ name, email, date: new Date().toLocaleDateString() });
        localStorage.setItem('sparkam_leads', JSON.stringify(leads));
    },

    exportLeads: () => {
        const leads = JSON.parse(localStorage.getItem('sparkam_leads') || "[]");
        if (leads.length === 0) return alert("No leads found yet!");

        let csvContent = "data:text/csv;charset=utf-8,Artist Name,Email,Date\n";
        leads.forEach(l => {
            csvContent += `${l.name},${l.email},${l.date}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sparkam_waitlist_export.csv");
        document.body.appendChild(link);
        link.click();
    }
};
                
