"use client";

import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string | undefined }) {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			variant="outline"
			size="icon"
			className={cn("h-9 cursor-pointer", className)}
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? (
				<Icons.sun className="size-4 shrink-0" />
			) : (
				<Icons.moon className="size-4 shrink-0" />
			)}
		</Button>
	);
}
