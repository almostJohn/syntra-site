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
			className={cn("mx-auto max-w-7xl px-6 py-20 sm:px-4 lg:py-32", className)}
			{...props}
		>
			<div className="mb-16 text-center">
				<h1 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
					{title}
				</h1>
				<p className="text-muted-foreground mx-auto max-w-2xl text-center text-xl text-pretty">
					{description}
				</p>
			</div>
			{children}
		</section>
	);
}
