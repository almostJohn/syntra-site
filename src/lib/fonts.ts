import { Geist, JetBrains_Mono } from "next/font/google";

export const geist = Geist({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-geist",
});

export const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-jet-brains-mono",
});
