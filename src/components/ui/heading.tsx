import { cn } from "@/lib/utils";
import * as React from "react";

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
	return (
		<h1
			className={cn("text-2xl/8 font-semibold sm:text-xl/8", className)}
			{...props}
		/>
	);
}

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn("text-xl/6 font-semibold sm:text-lg/6", className)}
			{...props}
		/>
	);
}
