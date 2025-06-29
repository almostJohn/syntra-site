import { Icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
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
							<h2 className="text-sm font-medium truncate">{project.name}</h2>
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
							<Icons.folder className="size-16 shrink-0" />
						</div>
						<h2 className="font-medium truncate">{project.name}</h2>
					</NextLink>
				</>
			)}
		</>
	);
}
