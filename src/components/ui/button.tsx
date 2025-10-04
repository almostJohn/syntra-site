import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
				destructive:
					"bg-red-500/10 text-red-500 hover:bg-red-500/80 hover:text-white",
				secondary:
					"border border-neutral-700 bg-neutral-800 text-neutral-100 hover:bg-neutral-800/80",
				outline:
					"border border-neutral-700 bg-transparent text-neutral-100 hover:bg-neutral-800",
				ghost: "hover:bg-neutral-800 hover:text-neutral-100",
				link: "text-neutral-100 hover:underline",
				none: "text-neutral-500 hover:text-neutral-100",
			},
			size: {
				default: "h-9 px-6 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-sm px-8 has-[>svg]:px-4",
				icon: "size-10",
				none: "p-0 size-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
