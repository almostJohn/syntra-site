"use client";

import { cn } from "@/lib";
import { useState, useEffect, type PropsWithChildren } from "react";

export function NavbarRoot({ children }: PropsWithChildren) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		function handleScroll() {
			setScrolled(window.scrollY > 10);
		}

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full transition-colors duration-300",
				scrolled
					? "bg-scheme-background/95 supports-[backdrop-filter]:bg-scheme-background/60 backdrop-blur-lg"
					: "bg-transparent",
			)}
		>
			{children}
		</header>
	);
}
