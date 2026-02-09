    processNewTrack: function(name, genre, mood) {
        // AI Logic: Determine the best day/time autonomously
        const now = new Date();
        let bestDay = new Date();
        let peakHour = "8:00 PM";

        if (mood === "Energetic") {
            // High energy tracks do best on Friday evenings
            bestDay.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
            peakHour = "7:30 PM";
        } else {
            // Chill tracks do best on Sunday mornings
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
    },
