"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { users } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth/sessions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { getFormValue } from "@/lib/get-form-value";

export async function updatePassword(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				errorMessage: "Unauthorized access.",
			};
		}

		const oldPassword = getFormValue(formData, "old_password");
		const newPassword = getFormValue(formData, "new_password");

		if (!oldPassword || !newPassword) {
			return {
				errorMessage: "All fields are required.",
			};
		}

		if (
			(oldPassword && oldPassword.length < PASSWORD_MIN_LENGTH) ||
			(newPassword && newPassword.length < PASSWORD_MIN_LENGTH)
		) {
			return {
				errorMessage: `Passwords must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
			};
		}

		const [existingUser] = await db
			.select({ password: users.password })
			.from(users)
			.where(eq(users.id, user.id))
			.limit(1);

		if (!existingUser.password) {
			return {
				errorMessage: "User password not found.",
			};
		}

		const isOldPasswordCorrect = await bcrypt.compare(
			oldPassword,
			existingUser.password,
		);

		if (!isOldPasswordCorrect) {
			return {
				errorMessage: "Old password is incorrect.",
			};
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 12);

		await db
			.update(users)
			.set({ password: hashedNewPassword, updatedAt: new Date() })
			.where(eq(users.id, user.id));

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/settings");

		return {
			successMessage: "User password was successfully updated.",
		};
	});
}
