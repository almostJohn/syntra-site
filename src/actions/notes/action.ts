"use server";

import { prisma } from "@/data/db/prisma";
import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/server-action";
import { getCurrentUser } from "@/lib/auth";
import { getFormValue } from "@/lib/get-form-value";
import {
	NOTE_CONTENT_MAX_LENGTH,
	SUBTITLE_MAX_LENGTH,
	TITLE_MAX_LENGTH,
} from "@/lib/constants";

export async function createNote(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const user = await getCurrentUser();

		if (!user?.id) {
			return {
				errorMessage: "You must be logged in to create a note.",
			};
		}

		const title = getFormValue(formData, "title");

		const subtitle = getFormValue(formData, "subtitle");

		const content = getFormValue(formData, "content");

		const tags = getFormValue(formData, "tags");

		if (!content || !tags) {
			return {
				errorMessage: "This fields are required.",
				errors: {
					content: "This field is required.",
					tags: "This field is required.",
				},
			};
		}

		if (title && title.length > TITLE_MAX_LENGTH) {
			return {
				errorMessage: `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`,
				errors: {
					title: `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`,
				},
				values: {
					title,
					subtitle: subtitle || "",
					tags,
					content,
				},
			};
		}

		if (subtitle && subtitle.length > SUBTITLE_MAX_LENGTH) {
			return {
				errorMessage: `Subtitle cannot exceed ${SUBTITLE_MAX_LENGTH} characters.`,
				errors: {
					subtitle: `Subtitle cannot exceed ${SUBTITLE_MAX_LENGTH} characters.`,
				},
				values: {
					title: title || "",
					subtitle,
					tags,
					content,
				},
			};
		}

		if (content.length > NOTE_CONTENT_MAX_LENGTH) {
			return {
				errorMessage: `Content cannot exceed ${NOTE_CONTENT_MAX_LENGTH} characters.`,
				errors: {
					content: `Content cannot exceed ${NOTE_CONTENT_MAX_LENGTH} characters.`,
				},
				values: {
					title: title || "",
					subtitle: subtitle || "",
					tags,
				},
			};
		}

		if (tags.trim() === "") {
			return {
				errorMessage: "At least one tag is required.",
				errors: {
					tags: "At least one tag is required.",
				},
				values: {
					title: title || "",
					subtitle: subtitle || "",
					content,
				},
			};
		}

		let tagsToConnect: { name: string }[] = [];

		if (tags) {
			const tagNames = tags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean);

			if (tagNames.length === 0) {
				return {
					errorMessage: "No valid tags provided after processing.",
					errors: {
						tags: "No valid tags provided after processing.",
					},
					values: {
						title: title || "",
						subtitle: subtitle || "",
						content,
					},
				};
			}

			tagsToConnect = tagNames.map((name) => ({ name }));
		}

		await prisma.note.create({
			data: {
				title,
				subtitle,
				content: content!,
				owner_id: user.id,
				tags: {
					connectOrCreate: tagsToConnect.map((tag) => ({
						where: { name: tag.name },
						create: { name: tag.name },
					})),
				},
			},
			select: { id: true },
		});

		await prisma.activity.create({
			data: {
				type: "CREATE_NOTE",
				user_id: user.id,
			},
		});

		revalidatePath("/dashboard/notes");

		return {
			successMessage: "Note created successfully.",
		};
	});
}
