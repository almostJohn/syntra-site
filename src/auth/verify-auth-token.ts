import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_SECRET_KEY);

export async function verifyAuthToken<T>(token: string): Promise<T> {
	try {
		const { payload } = await jwtVerify(token, SECRET_KEY);
		return payload as T;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("Token decryption failed.");
	}
}
