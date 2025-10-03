import {
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type ModalButtonProps = PropsWithChildren & {
	buttonLabel?: string;
	buttonType?: "default" | "success" | "ghost" | "danger";
	buttonSize?: "default" | "icon" | "sm";
	className?: string;
};

export function ModalButton({
	buttonLabel,
	buttonType,
	buttonSize,
	className,
	children,
}: ModalButtonProps) {
	return (
		<AlertDialogTrigger asChild>
			<button
				type="button"
				aria-label="Modal Button"
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
		</AlertDialogTrigger>
	);
}

type ModalProps = PropsWithChildren & {
	className?: string;
};

export function Modal({ className, children }: ModalProps) {
	return (
		<AlertDialogContent
			className={cn(
				"w-full rounded-sm border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-lg sm:max-w-xl",
				className,
			)}
		>
			<VisuallyHidden>
				<AlertDialogTitle>Hidden Title</AlertDialogTitle>
				<AlertDialogDescription>Hidden Description</AlertDialogDescription>
			</VisuallyHidden>
			{children}
		</AlertDialogContent>
	);
}
