import bcrypt from "bcryptjs";

export async function compareString(text: string, hashedText: string) {
	return await bcrypt.compare(text, hashedText);
}
