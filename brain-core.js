const MusicAIBrain = {
    // Persistent memory for the Sparkam ecosystem
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    // Core logic for scheduling and metadata
    processNewTrack: function(name, mood) {
        const now = new Date();
        let releaseDate = new Date();
        let releaseTime = "8:00 PM";

        // Logic: Energetic = Friday, Chill = Sunday
        if (mood === "Energetic") {
            releaseDate.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            releaseTime = "07:30 PM";
        } else {
            releaseDate.setDate(now.getDate() + (7 - now.getDay() + 7) % 7);
            releaseTime = "10:00 AM";
        }

        const newTrack = {
            id: Date.now(),
            name: name.toUpperCase(), // Sparkam style: Uppercase titles
            mood: mood,
            scheduledDate: releaseDate.toDateString().toUpperCase(),
            scheduledTime: releaseTime
        };

        this.memory.tracks.push(newTrack);
        this.saveMemory();
        return newTrack;
    },

    saveMemory: function() {
        localStorage.setItem('sparkam_brain_memory', JSON.stringify(this.memory));
    }
};
