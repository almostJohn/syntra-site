"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function GlowingDiv() {
	return (
		<motion.div
			className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-teal-500 text-white text-xs font-bold transition relative overflow-hidden"
			initial={{ boxShadow: "0 0 0 0 rgba(20, 184, 166, 0.7)" }}
			animate={{
				boxShadow: [
					"0 0 0 0 rgba(20, 184, 166, 0.7)",
					"0 0 0 10px rgba(20, 184, 166, 0)",
					"0 0 0 0 rgba(20, 184, 166, 0)",
				],
			}}
			transition={{
				repeat: Number.POSITIVE_INFINITY,
				duration: 2,
				ease: "easeInOut",
			}}
		>
			Preview
		</motion.div>
	);
}
