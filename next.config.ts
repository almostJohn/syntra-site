import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	devIndicators: false,
	pageExtensions: ["ts", "tsx"],
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
