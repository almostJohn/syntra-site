import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.APP_SECRET_KEY);

export async function verifyToken<T>(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload as T;
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		throw new Error("There was an error verifying jwt");
	}
}
