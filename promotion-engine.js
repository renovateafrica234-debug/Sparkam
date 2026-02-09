

const PromotionEngine = {
    generateCampaign: function(trackData) {
        const strategy = trackData.recommendation;
        const trackNameEncoded = encodeURIComponent(trackData.name);
        // This generates a dynamic link to your new fan-link page
        const fanLink = `https://your-vercel-url.vercel.app/fan-link.html?track=${trackNameEncoded}`;
        
        let content = "";
        if (strategy === "HIGH_PULSE_SOCIAL_BLITZ") {
            content = `🔥 NEW HEAT: "${trackData.name}" is out now! Tap in here: ${fanLink} #SparkamAI`;
        } else if (strategy === "LOFI_PLAYLIST_SEEDING") {
            content = `🌙 Chill vibes only with "${trackData.name}". Listen here: ${fanLink} #LofiVibes`;
        } else {
            content = `Check out "${trackData.name}" on Sparkam: ${fanLink}`;
        }

        return {
            platform: "Global",
            postContent: content,
            link: fanLink
        };
    }
};
