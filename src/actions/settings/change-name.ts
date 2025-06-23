"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/data/db/prisma";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from "@/lib/constants";

export async function changeName(name: string): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		if (name.length < NAME_MIN_LENGTH) {
			return {
				errorMessage: `Name must be at least ${NAME_MIN_LENGTH} characters long.`,
			};
		}

		if (name.length > NAME_MAX_LENGTH) {
			return {
				errorMessage: `Name exceeds the maximum allowed length of ${NAME_MAX_LENGTH} characters.`,
			};
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name,
			},
		});

		await prisma.notification.create({
			data: {
				user_id: currentUser.id,
				type: "ALERT",
				message: `User name updated to "${name}".`,
			},
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "User updated successfully.",
			values: {
				name: updatedUser.name,
			},
		};
	});
}
