import {
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type DropdownButtonProps = PropsWithChildren & {
	buttonLabel?: string;
	buttonType?: "default" | "success" | "ghost" | "danger";
	buttonSize?: "default" | "icon" | "sm";
	className?: string;
};

export function DropdownButton({
	buttonLabel,
	buttonType,
	buttonSize,
	className,
	children,
}: DropdownButtonProps) {
	return (
		<DropdownMenuTrigger asChild>
			<button
				type="button"
				aria-label="Dropdown Menu Button"
				className={cn(
					"inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm whitespace-nowrap transition-colors",
					buttonType === "default" &&
						"bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
					buttonType === "success" &&
						"bg-green-500 text-white hover:bg-green-500/80",
					buttonType === "ghost" && "bg-transparent hover:bg-neutral-800",
					buttonType === "danger" &&
						"bg-red-500 text-white hover:bg-red-500/80",
					buttonSize === "default" && "h-9 px-6 py-2",
					buttonSize === "icon" && "h-9 w-9 p-2",
					buttonSize === "sm" && "h-8 px-3 py-2",
					className,
				)}
			>
				{children}
				{buttonLabel && <p className="text-sm font-medium">{buttonLabel}</p>}
			</button>
		</DropdownMenuTrigger>
	);
}

type DropdownProps = PropsWithChildren & {
	className?: string;
	align?: "center" | "start" | "end";
};

export function Dropdown({ className, align, children }: DropdownProps) {
	return (
		<DropdownMenuContent
			align={align}
			className={cn(
				"rounded-sm border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-lg",
				className,
			)}
		>
			{children}
		</DropdownMenuContent>
	);
}
