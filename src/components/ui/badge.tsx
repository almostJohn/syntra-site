import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = PropsWithChildren & {
	className?: string;
};

export function Badge({ className, children }: BadgeProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center justify-center px-2 py-1 rounded-sm border text-xs font-medium",
				className,
			)}
		>
			{children}
		</div>
	);
}
