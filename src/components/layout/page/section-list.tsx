import * as React from "react";
import { cn } from "@/lib";

type SectionListProps = React.HTMLAttributes<HTMLDivElement> & {
	title: string;
	description: string;
};

export function SectionList({
	title,
	description,
	id,
	className,
	children,
	...props
}: SectionListProps) {
	return (
		<section
			id={id}
			className={cn(
				"container mx-auto max-w-7xl px-6 py-16 md:px-4 lg:py-24",
				className,
			)}
			{...props}
		>
			<div className="space-y-8">
				{/* Section Header */}
				<div className="mx-auto max-w-4xl space-y-4 text-center">
					<h1 className="from-scheme-primary to-scheme-foreground/80 bg-gradient-to-r bg-clip-text text-center text-4xl font-bold text-balance text-transparent lg:text-6xl">
						{title}
					</h1>
					<p className="text-scheme-foreground/50 mx-auto max-w-2xl text-center text-xl leading-relaxed text-pretty">
						{description}
					</p>
				</div>
				{children}
			</div>
		</section>
	);
}
