"use client";

import { useEffect, useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProjectName } from "@/app/(dashboard)/actions/update-project-name";
import {
	PROJECT_NAME_MAX_LENGTH,
	PROJECT_NAME_MIN_LENGTH,
} from "@/lib/constants";
import { Icons } from "@/components/icons";

const initialState = {
	successMessage: "",
	errorMessage: "",
	values: {
		projectName: "",
	},
};

type Project = {
	id: string;
	name: string;
};

type UpdateProjectNameProps = {
	project: Project;
};

export function UpdateProjectName({ project }: UpdateProjectNameProps) {
	const updateProjectNameAction = toAction(updateProjectName);

	const { formAction, isPending } = useServerAction(
		updateProjectNameAction,
		initialState,
	);

	const [projectName, setProjectName] = useState(project.name);

	useEffect(() => {
		setProjectName(project.name);
	}, [project]);

	return (
		<form
			action={() => {
				formAction([project.id, projectName]);
			}}
			className="flex flex-col bg-transparent rounded-sm border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-5">
				<div className="font-medium">Project Name</div>
				<div className="flex flex-col gap-2 text-sm max-w-xl">
					<div>
						This is your project&apos;s name. You can update it anytime.
					</div>
					<Input
						type="text"
						id="project_name"
						name="project_name"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						minLength={PROJECT_NAME_MIN_LENGTH}
						maxLength={PROJECT_NAME_MAX_LENGTH}
						className="w-full h-10 rounded-sm"
					/>
				</div>
			</div>
			<div className="mt-auto px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<div className="text-sm max-w-sm text-neutral-500">
						Please use {PROJECT_NAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button type="submit" disabled={isPending} className="cursor-pointer">
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
