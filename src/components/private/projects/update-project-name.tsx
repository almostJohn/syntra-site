"use client";

import { useState, useEffect } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProjectName } from "@/actions/projects/update-project-name";
import { Icons } from "@/components/icons";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";

type Project = {
	id: string;
	name: string;
};

type UpdateProjectNameProps = {
	project: Project;
};

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function UpdateProjectName({ project }: UpdateProjectNameProps) {
	const { formAction, isPending } = useServerAction(
		toAction(updateProjectName),
		initialState,
	);
	const [projectName, setProjectName] = useState(project.name);

	useEffect(() => {
		setProjectName(project.name);
	}, [project]);

	return (
		<form
			action={() => formAction([project.id, projectName])}
			className="flex flex-col border border-neutral-300 dark:border-neutral-700 rounded-sm"
		>
			<div className="flex flex-col p-6 gap-4">
				<div className="font-semibold text-lg">Project Name</div>
				<div className="text-sm">
					This is your project&apos;s name. You can update it anytime.
				</div>
				<div className="max-w-md">
					<Input
						type="text"
						id="projectName"
						name="projectName"
						minLength={NAME_MIN_LENGTH}
						maxLength={NAME_MAX_LENGTH}
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						className="h-10"
						disabled={isPending}
						autoComplete="off"
					/>
				</div>
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
					<div className="text-sm text-center md:text-left max-w-sm text-neutral-500">
						Please use {NAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="h-10 cursor-pointer"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
