import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"px-3 py-2 rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700 placeholder:text-neutral-500 w-full min-h-16 text-base md:text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-3 focus:ring-neutral-200/60 dark:focus:ring-neutral-700/60",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
