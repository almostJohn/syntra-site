import crypto from "node:crypto";
import bcrypt from "bcryptjs";

export async function hashString(text: string, salt: number): Promise<string> {
	return await bcrypt.hash(text, salt);
}

export async function compareString(
	text: string,
	hashedText: string,
): Promise<boolean> {
	return await bcrypt.compare(text, hashedText);
}

export function generateUUID(): string {
	return crypto.randomUUID();
}
