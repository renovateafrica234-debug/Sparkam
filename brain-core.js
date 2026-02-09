const MusicAIBrain = {
    // 1. Initialize Memory from LocalStorage
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    // 2. The Decision Maker
    processNewTrack: function(name, genre, mood) {
        const now = new Date();
        let bestDay = new Date();
        let peakHour = "8:00 PM";

        // AI Autonomous Logic: Energetic = Friday, Chill = Sunday
        if (mood === "Energetic") {
            // Find the upcoming Friday (Day 5)
            bestDay.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            peakHour = "7:30 PM";
        } else {
            // Find the upcoming Sunday (Day 0)
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

        // 3. Save to Memory
        this.memory.tracks.push(trackData);
        this.saveMemory();
        return trackData;
    },

    saveMemory: function() {
        localStorage.setItem('sparkam_brain_memory', JSON.stringify(this.memory));
    }
};
