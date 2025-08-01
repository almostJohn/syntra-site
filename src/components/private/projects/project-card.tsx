import { NextLink } from "@/components/ui/next-link";
import { Icons } from "@/components/icons";
import { toKebabCase } from "@/lib/to-kebab-case";
import { formatDistanceToNow } from "date-fns";

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
					className="flex items-center justify-between px-3 py-1 w-full rounded-sm transition-colors duration-75 hover:bg-neutral-200 dark:hover:bg-neutral-700"
				>
					<div className="flex items-center gap-2">
						<Icons.folder className="size-4 shrink-0" />
						<span className="text-sm font-medium">
							{toKebabCase(project.name)}
						</span>
					</div>
					<div className="flex items-center justify-end">
						<span className="text-sm text-neutral-500">
							{formatDistanceToNow(new Date(project.createdAt), {
								addSuffix: true,
							})}
						</span>
					</div>
				</NextLink>
			) : (
				<NextLink
					href={`/app/projects/${project.id}`}
					className="flex flex-col items-center justify-center gap-4 p-4 rounded-sm transition-colors duration-75 hover:bg-neutral-200 dark:hover:bg-neutral-700"
				>
					<div className="mx-auto flex justify-center">
						<Icons.folder className="size-8 shrink-0" />
					</div>
					<span className="text-sm font-medium">
						{toKebabCase(project.name)}
					</span>
				</NextLink>
			)}
		</>
	);
}
