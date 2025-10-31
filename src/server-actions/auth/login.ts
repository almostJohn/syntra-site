"use server";

import { getFormString } from "@/lib/utils";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { getUserByUsername } from "@/data/get-user.data";
import { auth } from "@/lib/auth";
import { compareString } from "@/lib/crypto";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";

type LoginErrors = {
	username?: string;
	password?: string;
};

type LoginValues = {
	username?: string;
};

export async function login(
	_prevState: ActionResponse<LoginErrors, LoginValues>,
	formData: FormData,
): Promise<ActionResponse<LoginErrors, LoginValues>> {
	return serverActionCallback(
		async (): Promise<ActionResponse<LoginErrors, LoginValues>> => {
			const username = getFormString(formData, "username");

			const password = getFormString(formData, "password");

			if (!username || !password) {
				return {
					errorMessage: "Username and password are required.",
					errors: {
						username: "Username is a required field.",
						password: "Password is a required field.",
					},
				};
			}

			if (
				username.length > USERNAME_MAX_LENGTH ||
				username.length < USERNAME_MIN_LENGTH ||
				password.length > PASSWORD_MAX_LENGTH ||
				password.length < PASSWORD_MIN_LENGTH ||
				typeof username !== "string" ||
				typeof password !== "string"
			) {
				return {
					errorMessage: "Incorrect username or password.",
					errors: {
						username: "Incorrect username.",
						password: "Incorrect password.",
					},
				};
			}

			const existingUser = await getUserByUsername(username);

			if (!existingUser || !existingUser.password) {
				return {
					errorMessage: "Incorrect username or password.",
					errors: {
						username: "Incorrect username.",
						password: "Incorrect password.",
					},
					values: {
						username,
					},
				};
			}

			const isMatch = await compareString(password, existingUser.password);
			if (!isMatch) {
				return {
					errorMessage: "Incorrect username or password.",
					errors: {
						username: "Incorrect username.",
						password: "Incorrect password.",
					},
					values: {
						username,
					},
				};
			}

			const { success, message } = await auth.signIn({
				userId: existingUser.id,
				username: existingUser.username,
			});

			if (!success) {
				return {
					errorMessage: message,
				};
			}

			return {
				successMessage: message,
			};
		},
	);
}
