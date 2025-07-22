import bcrypt from "bcryptjs";

export async function hashString(text: string, salt: number) {
	return await bcrypt.hash(text, salt);
}
