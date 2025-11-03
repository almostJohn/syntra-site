"use client";

import { useUncontrolledForm } from "@/hooks/use-uncontrolled-form";
import { createProject } from "@/server-actions/projects/create-project";
import {
	Form,
	FormField,
	FormFieldError,
	FormLabel,
	FormAction,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

type CreateProjectFormProps = {
	handleClose: () => void;
};

export function CreateProjectForm({ handleClose }: CreateProjectFormProps) {
	const { state, formAction, isPending } = useUncontrolledForm({
		action: createProject,
		initialState: {},
	});

	return (
		<Form
			action={(formData) => {
				formAction(formData);
				if (!state.errorMessage) {
					handleClose();
				}
			}}
		>
			<h2 className="text-center text-2xl font-semibold capitalize md:text-left md:normal-case">
				Create your project
			</h2>
			<FormField>
				<FormLabel htmlFor="name">
					Name <span className="text-red-500">*</span>
				</FormLabel>
				<Input
					type="text"
					id="name"
					name="name"
					defaultValue={state.values?.name}
					minLength={NAME_MIN_LENGTH}
					maxLength={NAME_MAX_LENGTH}
					required
					autoComplete="off"
					disabled={isPending}
					className={cn(
						"input-default-class",
						state.errors?.name && "input-default-error-class",
					)}
				/>
				{state.errors?.name && (
					<FormFieldError>{state.errors.name}</FormFieldError>
				)}
			</FormField>
			<FormAction>
				<div className="flex w-full">
					<Button
						type="button"
						variant="outline"
						onClick={handleClose}
						className="w-full"
					>
						Cancel
					</Button>
				</div>
				<div className="flex w-full">
					<Button type="submit" disabled={isPending} className="w-full">
						{isPending ? (
							<>
								<Icons.loading className="size-6 shrink-0" /> Creating...
							</>
						) : (
							<>Create</>
						)}
					</Button>
				</div>
			</FormAction>
		</Form>
	);
}
