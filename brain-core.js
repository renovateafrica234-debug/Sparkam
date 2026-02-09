const MusicAIBrain = {
    // Shared memory across the Sparkam ecosystem
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    processNewTrack: function(name, mood) {
        const now = new Date();
        let releaseDate = new Date();
        let releaseTime = "20:00";

        // Logic: Energetic (Friday) / Chill (Sunday)
        if (mood === "Energetic") {
            releaseDate.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            releaseTime = "19:00";
        } else {
            releaseDate.setDate(now.getDate() + (7 - now.getDay() + 7) % 7);
            releaseTime = "10:30";
        }

        const newTrack = {
            id: "NODE-" + Math.floor(Math.random() * 10000),
            name: name.toUpperCase(),
            mood: mood.toUpperCase(),
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
