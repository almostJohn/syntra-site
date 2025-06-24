"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export async function changeUsername(
	username: string,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`,
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username exceeds the maximum allowed length of ${USERNAME_MAX_LENGTH} characters.`,
			};
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				username,
			},
			select: {
				username: true,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				type: "ALERT",
				message: `Username changed to "${username}"`,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "User updated successfully.",
			values: {
				username: updatedUser.username,
			},
		};
	});
}
