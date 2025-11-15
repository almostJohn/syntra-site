import Link from "next/link";
import type { Project } from "@/types";
import { formatDate } from "@/lib/formatting";
import { Folder } from "lucide-react";

type ProjectItemProps = {
	project: Project;
	isGridView?: boolean;
};

export function ProjectItem({ project, isGridView }: ProjectItemProps) {
	return (
		<>
			{!isGridView ? (
				<Link
					href="/dashboard"
					className="inline-flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-200"
				>
					<div className="flex items-center gap-2">
						<Folder className="size-4 shrink-0" />
						<span className="font-semibold">{project.name}</span>
					</div>
					<span className="text-right text-sm text-neutral-500">
						{formatDate(project.createdAt, "relative")}
					</span>
				</Link>
			) : (
				<Link
					href="/dashboard"
					className="inline-flex flex-col items-center justify-center gap-2 rounded-md p-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-neutral-200"
				>
					<div className="mx-auto flex justify-center">
						<Folder className="size-12 shrink-0" />
					</div>
					<span className="text-center font-semibold">{project.name}</span>
				</Link>
			)}
		</>
	);
}
