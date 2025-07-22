"use client";

import { useEffect, useState } from "react";
import { useServerAction, toAction } from "@/hooks/use-server-action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateProjectName } from "@/app/(private)/actions/update-project-name";
import { Icons } from "../icons";
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
			action={() => {
				formAction([project.id, projectName]);
			}}
			className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex flex-col gap-4 p-6">
				<div className="font-medium">Project Name</div>
				<div className="flex flex-col gap-2 text-sm max-w-xl">
					<div>
						This is your project&apos;s name. You can update it anytime.
					</div>
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
			<div className="mt-auto border-t border-neutral-200 dark:border-neutral-700 px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="text-sm max-w-sm text-neutral-500">
						Please use {NAME_MAX_LENGTH} characters at maximum.
					</div>
					<Button
						type="submit"
						disabled={isPending}
						className="cursor-pointer h-10"
					>
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
