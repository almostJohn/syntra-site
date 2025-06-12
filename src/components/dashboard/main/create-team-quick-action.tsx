"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Users } from "lucide-react";
import { createTeam } from "@/actions/teams/create-team";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
	errors: {
		teamName: "",
		teamDescription: "",
	},
	values: {
		team_name: "",
		team_description: "",
	},
};

export function CreateTeamQuickAction() {
	const [interacted, setInteracted] = useState(false);
	const [state, formAction, isPending] = useActionState(
		createTeam,
		initialState,
	);

	useEffect(() => {
		if (state.successMessage) {
			toast.success(state.successMessage);
		} else if (state.errorMessage) {
			toast.error(state.errorMessage);
		}
	}, [state]);

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<Dialog open={interacted} onOpenChange={setInteracted}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="h-20 flex flex-col items-center justify-center cursor-pointer space-y-2"
				>
					<Users className="size-6 text-purple-600 shrink-0" />
					<span>Create Team</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-5xl">
				<DialogHeader>
					<DialogTitle>Create a new team</DialogTitle>
					<DialogDescription>
						By creating a new team, you agree to our{" "}
						<NextLink
							href="/terms"
							className="font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							Terms of Service
						</NextLink>{" "}
						and{" "}
						<NextLink
							href="/privacy"
							className="font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							Privacy Policy
						</NextLink>
						.
					</DialogDescription>
				</DialogHeader>
				<form
					action={(formData) => {
						formAction(formData);
						handleClose();
					}}
					className="flex flex-col space-y-6"
				>
					<div className="flex flex-col gap-1">
						<Label htmlFor="team_name">
							Team Name <span className="text-red-600">*</span>
						</Label>
						<Input
							type="text"
							id="team_name"
							name="team_name"
							defaultValue={state.values?.team_name}
							className={cn(
								"focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.teamName && "border-red-600",
							)}
							required
						/>
						{state.errors?.teamName && (
							<span className="text-red-600 text-sm font-medium">
								{state.errors.teamName}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<Label htmlFor="team_description">
							Team Description <span className="text-red-600">*</span>
						</Label>
						<Textarea
							id="team_description"
							name="team_description"
							defaultValue={state.values?.team_description}
							className={cn(
								"h-50 focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all",
								state.errors?.teamDescription && "border-red-600",
							)}
							required
						/>
						{state.errors?.teamDescription && (
							<span className="text-red-600 text-sm font-medium">
								{state.errors.teamDescription}
							</span>
						)}
					</div>
					<div className="flex items-center justify-end space-x-3">
						<Button
							type="button"
							variant="outline"
							className="cursor-pointer transition-all active:scale-95"
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="primary"
							disabled={isPending}
							className="cursor-pointer"
						>
							{isPending ? (
								<Loader className="size-4 animate-spin" />
							) : (
								"Create team"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
