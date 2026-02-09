const MusicAIBrain = {
    // Initialize Memory from LocalStorage
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    // The Decision Maker (Friday for Energy, Sunday for Chill)
    processNewTrack: function(name, genre, mood) {
        const now = new Date();
        let bestDay = new Date();
        let peakHour = "8:00 PM";

        if (mood === "Energetic") {
            bestDay.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            peakHour = "7:30 PM";
        } else {
            bestDay.setDate(now.getDate() + (7 - now.getDay()) % 7);
            peakHour = "10:00 AM";
        }

        const trackData = {
            id: Date.now(),
            name: name,
            mood: mood,
            recommendation: mood === "Energetic" ? "HIGH_PULSE_SOCIAL_BLITZ" : "LOFI_PLAYLIST_SEEDING",
            scheduledDate: bestDay.toDateString(),
            scheduledTime: peakHour
        };

        this.memory.tracks.push(trackData);
        this.saveMemory();
        return trackData;
    },

    // AI Bio Generator
    generateBio: function() {
        const tracks = this.memory.tracks;
        if (tracks.length === 0) return "New creator in the Sparkam ecosystem.";
        
        const latestTrack = tracks[tracks.length - 1];
        const count = tracks.length;

        if (latestTrack.mood === "Energetic") {
            return `A high-octane creator currently pushing ${count} heavy hitters. Latest pulse: '${latestTrack.name}'.`;
        } else {
            return `A visionary artist focused on atmospheric depth and chill vibes. Curating ${count} AI-optimized releases.`;
        }
    },

    saveMemory: function() {
        localStorage.setItem('sparkam_brain_memory', JSON.stringify(this.memory));
    }
};
