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

export function getAvatarURL(base64String: string): string {
	return `data:image/png;base64,${base64String}`;
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
