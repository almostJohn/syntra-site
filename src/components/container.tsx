import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mx-auto max-w-5xl px-6 sm:px-4 lg:px-8", className)}
			{...props}
		>
			{children}
		</div>
	);
}
