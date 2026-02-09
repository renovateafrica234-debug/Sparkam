const MusicAIBrain = {
    // 1. Storage Setup
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    // 2. The Decision Engine
    processNewTrack: function(name, genre, mood) {
        const now = new Date();
        let releaseDate = new Date();
        let releaseTime = "8:00 PM";

        if (mood === "Energetic") {
            releaseDate.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            releaseTime = "7:30 PM";
        } else {
            releaseDate.setDate(now.getDate() + (7 - now.getDay() + 7) % 7);
            releaseTime = "10:00 AM";
        }

        const newTrack = {
            id: Date.now(),
            name: name,
            mood: mood,
            recommendation: mood === "Energetic" ? "HIGH_PULSE_STRATEGY" : "LOFI_SEEDING_STRATEGY",
            scheduledDate: releaseDate.toDateString(),
            scheduledTime: releaseTime
        };

        this.memory.tracks.push(newTrack);
        this.saveMemory();
        return newTrack;
    },

    // 3. The Creative Engine (Bio)
    generateBio: function() {
        const tracks = this.memory.tracks;
        if (tracks.length === 0) return "Verified Sparkam Artist.";
        
        const latest = tracks[tracks.length - 1];
        const count = tracks.length;

        // Brand Voice: Direct, Modern, Professional
        return `A creator within the Sparkam ecosystem with ${count} optimized releases. Currently featuring '${latest.name}'.`;
    },

    saveMemory: function() {
        localStorage.setItem('sparkam_brain_memory', JSON.stringify(this.memory));
    }
};
