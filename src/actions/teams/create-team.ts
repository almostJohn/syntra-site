"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { getFormValue } from "@/lib/get-form-value";
import {
	TEAM_NAME_MIN_LENGTH,
	TEAM_DESCRIPTION_MAX_LENGTH,
} from "@/lib/constants";

export async function createTeam(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const teamName = getFormValue(formData, "team_name");
		const teamDescription = getFormValue(formData, "team_description");

		if (!teamName || !teamDescription) {
			return {
				errorMessage: "Team name and description are both required.",
				errors: {
					teamName: "Team name is a required field.",
					teamDescription: "Team description is a required field.",
				},
			};
		}

		if (teamName.length < TEAM_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Team name must be at least ${TEAM_NAME_MIN_LENGTH} characters long.`,
				errors: {
					teamName: `Team name must be at least ${TEAM_NAME_MIN_LENGTH} characters long.`,
				},
				values: {
					team_description: teamDescription,
				},
			};
		}

		if (teamDescription.length > TEAM_DESCRIPTION_MAX_LENGTH) {
			return {
				errorMessage: `Team description exceeds the maximum allowed length of ${TEAM_DESCRIPTION_MAX_LENGTH} characters.`,
				errors: {
					teamDescription: `Team description exceeds the maximum allowed length of ${TEAM_DESCRIPTION_MAX_LENGTH} characters.`,
				},
				values: {
					team_name: teamName,
				},
			};
		}

		const newTeam = await prisma.team.create({
			data: {
				name: teamName,
				description: teamDescription,
				owner_id: currentUser.id,
				members: {
					create: {
						user_id: currentUser.id,
						role: "OWNER",
					},
				},
			},
		});

		await prisma.notification.create({
			data: {
				team_id: newTeam.id,
				user_id: currentUser.id,
				message: `New team "${newTeam.name}" created.`,
				type: "CREATE_TEAM",
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/teams");

		return {
			successMessage: "Team created successfully.",
		};
	});
}
