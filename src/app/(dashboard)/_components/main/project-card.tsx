import { NextLink } from "@/components/ui/next-link";
import { Icons } from "@/components/icons";
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
				<>
					<NextLink
						href={`/dashboard/projects/${project.id}`}
						className="flex items-center justify-between px-2 py-1 rounded-sm bg-transparent transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
					>
						<div className="flex items-center gap-2">
							<Icons.folder className="size-4 shrink-0" />
							<div className="font-medium text-sm truncate">{project.name}</div>
						</div>
						<div className="flex items-center justify-end">
							<span className="text-sm text-neutral-500">
								{formatDistanceToNow(new Date(project.createdAt), {
									addSuffix: true,
								})}
							</span>
						</div>
					</NextLink>
				</>
			) : (
				<>
					<NextLink
						href={`/dashboard/projects/${project.id}`}
						className="flex flex-col p-2 space-y-2 items-center justify-center bg-transparent rounded-sm transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
					>
						<div className="mx-auto flex items-center justify-center">
							<Icons.folder className="size-14 shrink-0" />
						</div>
						<div className="font-medium text-sm text-center truncate">
							{project.name}
						</div>
					</NextLink>
				</>
			)}
		</>
	);
}
