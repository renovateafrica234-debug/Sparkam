    processNewTrack: function(name, genre, mood) {
        const now = new Date();
        let bestDay = new Date();
        let peakHour = "8:00 PM";

        // AI Autonomous Decision: Friday for Energy, Sunday for Chill
        if (mood === "Energetic") {
            bestDay.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            peakHour = "7:30 PM";
        } else {
            bestDay.setDate(now.getDate() + (7 - now.getDay()) % 7);
            peakHour = "10:00 AM";
        }

        const track = {
            id: Date.now(),
            name: name,
            recommendation: mood === "Energetic" ? "HIGH_PULSE_SOCIAL_BLITZ" : "LOFI_PLAYLIST_SEEDING",
            scheduledDate: bestDay.toDateString(),
            scheduledTime: peakHour
        };

        this.memory.tracks.push(track);
        this.saveMemory();
        return track;
    }
