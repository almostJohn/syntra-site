import { hash, compare } from "bcryptjs";

export async function hashString(text: string, salt: number) {
	return await hash(text, salt);
}

export async function compareString(text: string, hashed: string) {
	return await compare(text, hashed);
}
