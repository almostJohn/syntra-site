import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function enforceCasing(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

export function getAvatarURL(
	base64String: string,
	type: "image/jpeg" | "image/png" | "image/gif" | "image/webp",
): string {
	switch (type) {
		case "image/jpeg":
			return `data:image/jpeg;base64,${base64String}`;
		case "image/png":
			return `data:image/png;base64,${base64String}`;
		case "image/gif":
			return `data:image/gif;base64,${base64String}`;
		case "image/webp":
			return `data:image/webp;base64,${base64String}`;
		default:
			throw new Error("Unsupported image type");
	}
}

export function randomUUID() {
	return crypto.randomUUID();
}

export async function hashText(text: string, salt: number) {
	return await bcrypt.hash(text, salt);
}

export async function compareHash(text: string, hashedText: string) {
	return await bcrypt.compare(text, hashedText);
}
