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
			className={cn("mx-auto max-w-5xl px-6 md:px-0 py-12 md:py-24", className)}
			{...props}
		>
			<div className="flex flex-col">
				<div className="mx-auto flex flex-col justify-center text-center mb-8">
					<h1 className="text-4xl font-bold tracking-tight mb-6 md:text-5xl">
						{title}
					</h1>
					<p className="text-neutral-500 text-base text-pretty mx-auto max-w-2xl sm:text-xl/8">
						{description}
					</p>
				</div>
				{children}
			</div>
		</section>
	);
}
