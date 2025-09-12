import * as React from "react";
import { cn } from "@/lib/utils";

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
				"container mx-auto max-w-7xl px-6 py-16 sm:px-4 lg:py-24",
				className,
			)}
			{...props}
		>
			<div className="space-y-8">
				<div className="mx-auto max-w-4xl space-y-4 text-center">
					<h1 className="bg-gradient-to-r from-blue-600 to-blue-400/90 bg-clip-text text-center text-4xl font-bold text-balance text-transparent lg:text-6xl">
						{title}
					</h1>
					<p className="mx-auto max-w-2xl pt-2 text-center text-xl leading-relaxed text-pretty text-neutral-500">
						{description}
					</p>
				</div>
				{children}
			</div>
		</section>
	);
}
