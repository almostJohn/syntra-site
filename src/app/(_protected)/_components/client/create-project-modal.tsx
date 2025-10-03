"use client";

import { createProject } from "../../actions/projects/create-project";
import { useServerAction } from "@/hooks/use-server-action";
import { ModalButton, Modal } from "../shared/modal";
import { AlertDialog as ModalWrapper } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Folder, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		name: "",
	},
	values: {
		name: "",
	},
};

export function CreateProjectModal() {
	const [interacted, setInteracted] = useState(false);
	const { state, formAction, isPending } = useServerAction(
		createProject,
		initialState,
	);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<ModalWrapper open={interacted} onOpenChange={setInteracted}>
			<ModalButton
				buttonType="default"
				buttonSize="default"
				buttonLabel="New Project"
			>
				<Folder className="size-4 shrink-0" />
			</ModalButton>
			<Modal className="p-0">
				<form
					action={(formData) => {
						formAction(formData);
						onClose();
					}}
				>
					<div className="flex flex-col">
						<div className="flex flex-col gap-2 p-6">
							<h2 className="text-xl font-semibold uppercase">
								create a project
							</h2>
							<div className="mt-1 grid gap-2">
								<Label htmlFor="name">
									Name <span className="text-red-500">*</span>
								</Label>
								<Input
									type="text"
									id="name"
									name="name"
									defaultValue={state.values?.name}
									minLength={NAME_MIN_LENGTH}
									maxLength={NAME_MAX_LENGTH}
									autoComplete="off"
									required
									className={cn(
										"rounded-sm border border-neutral-100 bg-transparent focus-visible:ring-[3px] focus-visible:ring-neutral-700",
										state.errors?.name &&
											"border-red-600/80 ring-[3px] ring-red-600/30",
									)}
								/>
								{state.errors?.name && (
									<span className="text-sm font-medium text-red-500">
										{state.errors.name}
									</span>
								)}
							</div>
						</div>
						<div className="mt-auto p-6 pt-0">
							<div className="flex items-center justify-end gap-2">
								<Button
									type="button"
									className="cursor-pointer rounded-sm border border-neutral-700 bg-neutral-800 hover:bg-neutral-800/80"
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isPending}
									className="cursor-pointer rounded-sm bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80"
								>
									{isPending ? (
										<>
											<Loader2 className="size-4 shrink-0 animate-spin" />{" "}
											Creating...
										</>
									) : (
										<>Create</>
									)}
								</Button>
							</div>
						</div>
					</div>
				</form>
			</Modal>
		</ModalWrapper>
	);
}
