import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/util/cn";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				primary: "bg-neutral-950 text-neutral-50 hover:bg-neutral-950/90",
				destructive:
					"border border-red-600 text-red-600 hover:bg-red-600 hover:text-neutral-50",
				outline: "border border-neutral-300 hover:bg-neutral-300",
				ghost: "hover:bg-neutral-200",
				link: "hover:underline underline-offset-4",
			},
			size: {
				default: "h-10 px-4 py-2",
				lg: "h-11 px-8 rounded-md",
				md: "h-10 px-6 py-2 rounded-md",
				sm: "h-8 px-3 rounded-md",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";
