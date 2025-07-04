"use client";

import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeProjectName } from "../../../../action";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { Icons } from "@/components/icons";
import type { ActionResponse } from "@/lib/server-action";

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

type ProjectNameSettingProps = {
	project: Project;
};

export function ProjectNameSetting({ project }: ProjectNameSettingProps) {
	const [state, formAction, isPending] = useActionState(
		async (
			_prevState: ActionResponse,
			payload: { projectName: string; projectId: string },
		): Promise<ActionResponse> => {
			return await changeProjectName(payload.projectName, payload.projectId);
		},
		initialState,
	);
	const [projectName, setProjectName] = useState(project.name);
	const { addToast } = useToast();

	useEffect(() => {
		if (state.successMessage) {
			addToast({ description: state.successMessage, type: "success" });
		} else if (state.errorMessage) {
			addToast({ description: state.errorMessage, type: "error" });
		}
	}, [state, addToast]);

	useEffect(() => {
		setProjectName(project.name);
	}, [project]);

	return (
		<form
			action={() => {
				formAction({ projectName, projectId: project.id });
			}}
			className="flex flex-col bg-transparent rounded-sm shadow border border-neutral-200 dark:border-neutral-700"
		>
			<div className="p-6 flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Project Name</h3>
				<div className="flex flex-col space-y-2">
					<span className="text-sm">
						This is your project&apos;s name. You can update it anytime.
					</span>
					<div className="max-w-md w-full">
						<Input
							type="text"
							id="project_name"
							name="project_name"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							minLength={NAME_MIN_LENGTH}
							maxLength={NAME_MAX_LENGTH}
							className="w-full h-10 rounded-sm"
						/>
					</div>
				</div>
			</div>
			<div className="mt-auto px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-between">
					<span className="text-sm text-neutral-500">
						Please use {NAME_MAX_LENGTH} characters at maximum.
					</span>
					<Button type="submit" disabled={isPending} className="cursor-pointer">
						{isPending ? <Icons.loading className="size-4 shrink-0" /> : "Save"}
					</Button>
				</div>
			</div>
		</form>
	);
}
