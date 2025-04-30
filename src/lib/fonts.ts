import { Inter, JetBrains_Mono } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

export const geist = Geist({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-geist",
});

export const geistMono = Geist_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-geist-mono",
});
