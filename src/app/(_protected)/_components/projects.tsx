import { DataQuery } from "@/lib/data";
import { Icons } from "@/components/icons";
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyHeaderIconPlaceholder,
} from "@/components/ui/empty";

type User = {
	id: string;
};

type ProjectsProps = {
	user: User;
};

export async function Projects({ user }: ProjectsProps) {
	const projects = await DataQuery.getAllProjects(user.id);

	if (projects.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyHeaderIconPlaceholder>
						<Icons.sparkles className="size-12 shrink-0" />
					</EmptyHeaderIconPlaceholder>
				</EmptyHeader>
				<EmptyContent>
					No projects found. Create one to get started.
				</EmptyContent>
			</Empty>
		);
	}

	return null;
}
