import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFormString<T extends string = string>(
	data: FormData,
	key: string,
): T | null {
	const value = data.get(key);
	return typeof value === "string" ? (value.trim() as T) : null;
}

export function getFormFile<T extends File = File>(
	data: FormData,
	key: string,
): T | null {
	const value = data.get(key);
	return value instanceof File ? (value as T) : null;
}

export function createNotificationMessage(
	action: "created" | "updated" | "deleted",
	resource?: string,
): string {
	return `Your ${resource} has been ${action} successfully. Everything is now updated and you can continue using the app without any issues.`;
}

export function sanitizeString(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

export function getAvatarURL(base64String: string): string {
	return `data:image/png;base64,${base64String}`;
}
