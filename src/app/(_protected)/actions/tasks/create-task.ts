"use server";

import { revalidatePath } from "next/cache";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { db } from "@/db/sql";
import { tasks, notifications } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
	createNotificationMessage,
	getFormString,
	sanitizeString,
} from "@/lib/utils";
import { generateUUID } from "@/lib/crypto";
import {
	TITLE_MAX_LENGTH,
	TITLE_MIN_LENGTH,
	SUBTITLE_MAX_LENGTH,
	SUBTITLE_MIN_LENGTH,
	CONTENT_MAX_LENGTH,
	CONTENT_MIN_LENGTH,
} from "@/lib/constants";
import { DataQuery } from "@/lib/data";

type CreateTaskErrors = {
	title?: string;
	subtitle?: string;
	content?: string;
	priority?: string;
	category?: string;
};

type CreateTaskValues = {
	title?: string;
};

type Status = "backlog" | "todo" | "in_progress" | "complete";
type Priority = "critical" | "high" | "medium" | "low";
type Category = "feature" | "bug" | "docs" | "refactor";

export async function createTask(
	_prevState: ActionResponse<CreateTaskErrors, CreateTaskValues>,
	formData: FormData,
	projectId: string,
	status: Status,
): Promise<ActionResponse<CreateTaskErrors, CreateTaskValues>> {
	return serverActionCallback(
		async (): Promise<ActionResponse<CreateTaskErrors, CreateTaskValues>> => {
			const user = await auth.getCurrentUser();

			if (!user) {
				return {
					errorMessage: "You must be logged in to perform this action.",
				};
			}

			const title = getFormString(formData, "title");
			const subtitle = getFormString(formData, "subtitle");
			const content = getFormString(formData, "content");
			const priority = getFormString(formData, "priority") as Priority;
			const category = getFormString(formData, "category") as Category;

			if (!title || !priority || !category) {
				return {
					errorMessage: "Title, priority, and category is required.",
					errors: {
						title: "Title is a required field.",
						priority: "Priority is a required field.",
						category: "Category is a required field.",
					},
				};
			}

			if (title.length < TITLE_MIN_LENGTH) {
				return {
					errorMessage: `Title must be at least ${TITLE_MIN_LENGTH} characters.`,
					errors: {
						title: `Title must be at least ${TITLE_MIN_LENGTH} characters.`,
					},
				};
			}

			if (title.length > TITLE_MAX_LENGTH) {
				return {
					errorMessage: `Title must not exceed ${TITLE_MAX_LENGTH} characters.`,
					errors: {
						title: `Title must not exceed ${TITLE_MAX_LENGTH} characters.`,
					},
				};
			}

			if (subtitle && subtitle.length < SUBTITLE_MIN_LENGTH) {
				return {
					errorMessage: `Subtitle must be at least ${SUBTITLE_MIN_LENGTH} characters.`,
					errors: {
						subtitle: `Subtitle must be at least ${SUBTITLE_MIN_LENGTH} characters.`,
					},
				};
			}

			if (subtitle && subtitle.length > SUBTITLE_MAX_LENGTH) {
				return {
					errorMessage: `Subtitle must not exceed ${SUBTITLE_MAX_LENGTH} characters.`,
					errors: {
						subtitle: `Subtitle must not exceed ${SUBTITLE_MAX_LENGTH} characters.`,
					},
				};
			}

			if (content && content.length < CONTENT_MIN_LENGTH) {
				return {
					errorMessage: `Content must be at least ${CONTENT_MIN_LENGTH} characters.`,
					errors: {
						content: `Content must be at least ${CONTENT_MIN_LENGTH} characters.`,
					},
				};
			}

			if (content && content.length > CONTENT_MAX_LENGTH) {
				return {
					errorMessage: `Content must not exceed ${CONTENT_MAX_LENGTH} characters.`,
					errors: {
						content: `Content must not exceed ${CONTENT_MAX_LENGTH} characters.`,
					},
				};
			}

			const project = await DataQuery.getProjectById(projectId, user.id);

			if (!project) {
				return {
					errorMessage: "Project not found.",
				};
			}

			const [newTask] = await db
				.insert(tasks)
				.values({
					id: generateUUID(),
					title: sanitizeString(title),
					subtitle: sanitizeString(subtitle || ""),
					content,
					status,
					priority,
					category,
					projectId,
					userId: user.id,
				})
				.returning();

			if (newTask) {
				await db.insert(notifications).values({
					id: generateUUID(),
					userId: user.id,
					content: createNotificationMessage("created", "task"),
				});
			}

			revalidatePath("/app");
			revalidatePath("/app/projects");
			revalidatePath(`/app/projects/${projectId}`);

			return {
				successMessage: "Task successfully created.",
			};
		},
	);
}
