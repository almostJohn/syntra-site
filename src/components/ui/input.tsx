import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"px-3 py-1 rounded-sm bg-transparent border border-neutral-300 dark:border-neutral-700 placeholder:text-neutral-500 w-full min-w-0 text-base md:text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-3 focus:ring-neutral-300/60 dark:focus:ring-neutral-700/60 disabled:opacity-50 disabled:cursor-not-allowed",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
