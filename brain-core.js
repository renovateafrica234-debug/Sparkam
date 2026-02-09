const MusicAIBrain = {
    // Persistent Sparkam Data Storage
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    // The logic that bridges Studio and Dashboard
    processNewTrack: function(name, mood) {
        const now = new Date();
        let releaseDate = new Date();
        let releaseTime = "20:00"; // Military time for industrial feel

        // Logic: Energetic (Friday) / Chill (Sunday)
        if (mood === "Energetic") {
            releaseDate.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            releaseTime = "19:30";
        } else {
            releaseDate.setDate(now.getDate() + (7 - now.getDay() + 7) % 7);
            releaseTime = "10:00";
        }

        const newTrack = {
            id: "SPKM-" + Math.floor(Math.random() * 9000 + 1000),
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
