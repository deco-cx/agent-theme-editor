import React, { useEffect } from "react";
import { Theme } from "../types/Theme";

interface GoogleFontsLoaderProps {
    theme: Theme;
}

export const GoogleFontsLoader: React.FC<GoogleFontsLoaderProps> = (
    { theme },
) => {
    useEffect(() => {
        const fonts = theme.font?.googleFonts || [];

        if (fonts.length === 0) {
            return;
        }

        // Remove any existing Google Fonts link tags
        document.head
            .querySelectorAll('link[href*="fonts.googleapis.com"]')
            .forEach((link) => link.remove());

        // Build the Google Fonts URL
        const fontUrlParts = fonts.map((font) => {
            // Get font weights
            let weights: string[] = [];

            // Check if this font is used as primary
            if (theme.typography?.fonts?.primary?.family === font) {
                weights = theme.typography.fonts.primary.weights || [];
            } // Check if this font is used as secondary
            else if (theme.typography?.fonts?.secondary?.family === font) {
                weights = theme.typography.fonts.secondary.weights || [];
            }

            // If no weights specified, use a default weight
            if (weights.length === 0) {
                weights = ["400"];
            }

            // Format the font name and weights for the URL
            const formattedFont = font.replace(/\s+/g, "+");
            const fontUrl = `family=${formattedFont}:wght@${weights.join(";")}`;
            return fontUrl;
        });

        const finalUrl = `https://fonts.googleapis.com/css2?${
            fontUrlParts.join(
                "&",
            )
        }&display=swap`;

        // Create and append the new link tag
        const linkTag = document.createElement("link");
        linkTag.href = finalUrl;
        linkTag.rel = "stylesheet";
        document.head.appendChild(linkTag);

        // Cleanup function
        return () => {
            linkTag.remove();
        };
    }, [theme]);

    return null;
};
