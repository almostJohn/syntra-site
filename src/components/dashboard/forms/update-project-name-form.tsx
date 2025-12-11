"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { renameProject } from "@/actions/project-actions";
import type { ActionState, Project } from "@/types";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";

type UpdateProjectNameFormProps = {
	project: Project;
};

export function UpdateProjectNameForm({ project }: UpdateProjectNameFormProps) {
	const [projectName, setProjectName] = useState(project.name);
	const { formAction, isPending } = useServerAction({
		action: async () => {
			return await renameProject(projectName, project.id);
		},
		initialState: {} as ActionState,
	});

	return (
		<Form
			action={() => {
				formAction(undefined);
			}}
			className="gap-0 rounded-md border border-neutral-300 shadow-sm"
		>
			<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-300 bg-white p-6">
				<h2 className="text-lg font-semibold">Project Name</h2>
				<p className="text-sm">This is your project&apos;s name.</p>
				<FormField className="max-w-md">
					<Label htmlFor="name" className="sr-only">
						Name
					</Label>
					<Input
						type="text"
						id="name"
						name="name"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						placeholder="Enter your project name"
						maxLength={64}
						minLength={3}
						className="border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
					/>
				</FormField>
			</div>
			<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-neutral-100/95 p-6 md:flex-row md:justify-between">
				<p className="text-center text-sm text-neutral-500 md:text-left">
					Please use 64 characters at maximum.
				</p>
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<>
							<Loader className="size-5 shrink-0 animate-spin" />
							Saving...
						</>
					) : (
						"Save"
					)}
				</Button>
			</div>
		</Form>
	);
}
