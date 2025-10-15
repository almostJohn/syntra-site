import { cn } from "@/lib/utils";
import * as React from "react";

type HeadingProps = React.ComponentProps<"h1">;
type ParagraphProps = React.ComponentProps<"p">;

export const TypographicalComponents = {
	h1: ({ className, ...props }: HeadingProps) => {
		return (
			<h1
				className={cn("text-2xl/8 font-semibold sm:text-xl/8", className)}
				{...props}
			/>
		);
	},
	p: ({ className, ...props }: ParagraphProps) => {
		return (
			<p
				className={cn(
					"text-muted-foreground text-base/6 sm:text-sm/6",
					className,
				)}
				{...props}
			/>
		);
	},
};
