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
					href={`/app/projects/${project.id}`}
					className="flex w-full items-center justify-between rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-neutral-200"
					title={project.name}
					aria-label={project.name}
				>
					<div className="flex items-center gap-2">
						<Folder className="size-5 shrink-0 text-blue-500" />
						<h3 className="text-sm font-medium whitespace-nowrap">
							{project.name}
						</h3>
					</div>
					<div className="text-right text-sm text-neutral-500">
						{formatDate(new Date(project.createdAt), "relative")}
					</div>
				</NextLink>
			) : (
				<NextLink
					href={`/app/projects/${project.id}`}
					className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 transition-colors duration-200 hover:bg-neutral-200"
					title={project.name}
					aria-label={project.name}
				>
					<div className="mx-auto flex justify-center">
						<Folder className="size-14 shrink-0 text-blue-500" />
					</div>
					<h3 className="text-sm font-medium whitespace-nowrap">
						{project.name}
					</h3>
				</NextLink>
			)}
		</>
	);
}
