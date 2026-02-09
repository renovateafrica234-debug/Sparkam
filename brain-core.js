const MusicAIBrain = {
    // 1. Storage Setup
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    // 2. The Decision Engine (Determines Release Timing)
    processNewTrack: function(name, genre, mood) {
        const now = new Date();
        let releaseDate = new Date();
        let releaseTime = "8:00 PM";

        // Autonomous Logic: Energetic tracks = Friday, Chill tracks = Sunday
        if (mood === "Energetic") {
            // Find next Friday (Day 5)
            releaseDate.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            releaseTime = "7:30 PM";
        } else {
            // Find next Sunday (Day 0)
            releaseDate.setDate(now.getDate() + (7 - now.getDay() + 7) % 7);
            releaseTime = "10:00 AM";
        }

        const newTrack = {
            id: Date.now(),
            name: name,
            mood: mood,
            recommendation: mood === "Energetic" ? "HIGH_PULSE_SOCIAL_BLITZ" : "LOFI_PLAYLIST_SEEDING",
            scheduledDate: releaseDate.toDateString(),
            scheduledTime: releaseTime
        };

        this.memory.tracks.push(newTrack);
        this.saveMemory();
        return newTrack;
    },

    // 3. The Creative Engine (Generates Profile Bio)
    generateBio: function() {
        const tracks = this.memory.tracks;
        if (tracks.length === 0) return "Analyzing sound waves for a new sonic identity.";
        
        const latest = tracks[tracks.length - 1];
        const count = tracks.length;

        if (latest.mood === "Energetic") {
            return `A high-octane creator currently pushing ${count} heavy hitters. Latest pulse: '${latest.name}'.`;
        } else {
            return `Visionary artist exploring ${count} chill-focused AI releases. Current vibe: '${latest.name}'.`;
        }
    },

    saveMemory: function() {
        localStorage.setItem('sparkam_brain_memory', JSON.stringify(this.memory));
    }
};
