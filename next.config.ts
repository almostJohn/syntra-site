import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ["ts", "tsx"],
	devIndicators: false,
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
