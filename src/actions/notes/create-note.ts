"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/data/db/client";
import { notes, notifications } from "@/data/db/schema";
import { getCurrentUser } from "@/lib/auth/sessions";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getFormValue } from "@/lib/get-form-value";
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from "@/lib/constants";

export async function createNote(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user) {
			return {
				error: {
					statusCode: 401,
					message: "Unauthorized access.",
				},
			};
		}

		const title = getFormValue(formData, "title") || "Untitled";
		const description = getFormValue(formData, "description");

		if (!description) {
			return {
				error: {
					statusCode: 400,
					message: "Description is a required field.",
				},
				errors: {
					description: "Description is a required field.",
				},
				values: {
					title,
				},
			};
		}

		if (title.length > TITLE_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
				errors: {
					title: `Title exceeds the maximum allowed length of ${TITLE_MAX_LENGTH} characters.`,
				},
				values: {
					description,
				},
			};
		}

		if (description.length > DESCRIPTION_MAX_LENGTH) {
			return {
				error: {
					statusCode: 400,
					message: `Description exceeds the maximum allowed length of ${DESCRIPTION_MAX_LENGTH} characters.`,
				},
				errors: {
					description: `Description exceeds the maximum allowed length of ${DESCRIPTION_MAX_LENGTH} characters.`,
				},
				values: {
					title,
				},
			};
		}

		const [newNote] = await db
			.insert(notes)
			.values({
				id: crypto.randomUUID(),
				title,
				description,
				userId: user.id,
			})
			.returning();

		await db.insert(notifications).values({
			id: crypto.randomUUID(),
			userId: user.id,
			noteId: newNote.id,
			type: "CREATE_NOTE",
			description: `New note "${newNote.title || "Untitled"}" created.`,
		});

		revalidatePath("/dashboard");
		revalidatePath("/dashboard/notes");

		return {
			success: {
				statusCode: 201,
				message: "Note created successfully.",
			},
		};
	});
}
