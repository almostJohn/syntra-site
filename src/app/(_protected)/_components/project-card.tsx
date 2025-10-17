import { NextLink } from "@/components/ui/next-link";
import { Folder } from "lucide-react";
import { formatDate } from "@/lib/formatting";

type Project = {
	id: string;
	name: string;
	createdAt: Date;
};

type ProjectCardProps = {
	project: Project;
	isGrid?: boolean;
};

export function ProjectCard({ project, isGrid }: ProjectCardProps) {
	return (
		<>
			{!isGrid ? (
				<NextLink
					href="/app/projects"
					className="flex w-full items-center justify-between rounded-sm px-3 py-1 transition-colors duration-200 hover:bg-neutral-800"
				>
					<div className="flex items-center gap-2">
						<Folder className="size-4 shrink-0" />
						<p className="text-sm font-medium whitespace-nowrap">
							{project.name}
						</p>
					</div>
					<div className="flex items-center justify-end">
						<p className="text-sm text-neutral-500">
							{formatDate(project.createdAt, "relative")}
						</p>
					</div>
				</NextLink>
			) : (
				<NextLink
					href="/app/projects"
					className="flex flex-col items-center justify-center gap-4 rounded-sm p-4 transition-colors duration-200 hover:bg-neutral-800"
				>
					<div className="mx-auto flex justify-center">
						<Folder className="size-12 shrink-0" />
					</div>
					<p className="text-sm font-medium whitespace-nowrap">
						{project.name}
					</p>
				</NextLink>
			)}
		</>
	);
}
