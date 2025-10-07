import { JetBrains_Mono, Geist_Mono, Inter } from "next/font/google";

export const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const geistMono = Geist_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-geist-mono",
});

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});
