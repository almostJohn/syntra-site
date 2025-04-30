import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex items-center justify-center text-sm font-medium rounded-md whitespace-nowrap transition-colors focus-visible:ring-0 focus-visible:outline-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-blue-600 text-white hover:bg-blue-700",
				outline:
					"border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 px-3 py-1",
				xs: "h-8 px-2 py-0.5",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
