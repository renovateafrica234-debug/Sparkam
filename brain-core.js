const MusicAIBrain = {
    memory: JSON.parse(localStorage.getItem('sparkam_brain_memory')) || { tracks: [] },

    processNewTrack: function(name, mood) {
        const now = new Date();
        let releaseDate = new Date();
        let releaseTime = (mood === "Energetic") ? "7:30 PM" : "10:00 AM";

        // Logic: Friday for Energetic, Sunday for Chill
        releaseDate.setDate(now.getDate() + (mood === "Energetic" ? (5 - now.getDay() + 7) % 7 : (7 - now.getDay() + 7) % 7));

        const newTrack = {
            id: Date.now(),
            name: name,
            mood: mood,
            date: releaseDate.toDateString(),
            time: releaseTime,
            status: "Running"
        };

        this.memory.tracks.push(newTrack);
        this.saveMemory();
        return newTrack;
    },

    saveMemory: function() {
        localStorage.setItem('sparkam_brain_memory', JSON.stringify(this.memory));
    }
};
