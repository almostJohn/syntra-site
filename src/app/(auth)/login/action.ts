"use server";

import { getFormString } from "@/lib/utils";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "@/lib/constants";
import { serverActionCallback, type ActionResponse } from "@/lib/action";
import { DataQuery } from "@/lib/data";
import { compareString } from "@/lib/crypto";
import { auth } from "@/lib/auth";

type LoginErrors = {
	username: string;
	password: string;
};

type LoginValues = {
	username: string;
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
				username.length < USERNAME_MIN_LENGTH ||
				username.length > USERNAME_MAX_LENGTH ||
				password.length < PASSWORD_MIN_LENGTH ||
				password.length > PASSWORD_MAX_LENGTH
			) {
				return {
					errorMessage: "Invalid username or password.",
					errors: {
						username: "Invalid username.",
						password: "Invalid password.",
					},
					values: {
						username,
					},
				};
			}

			const user = await DataQuery.getUserByUsername(username);

			if (!user) {
				return {
					errorMessage: "Invalid username or password.",
					errors: {
						username: "Invalid username.",
						password: "Invalid password.",
					},
					values: {
						username,
					},
				};
			}

			const isPasswordMatch = await compareString(password, user.password);

			if (!isPasswordMatch) {
				return {
					errorMessage: "Invalid username or password.",
					errors: {
						username: "Invalid username.",
						password: "Invalid password.",
					},
					values: {
						username,
					},
				};
			}

			const { success, message } = await auth.signIn({
				userId: user.id,
				username: user.username,
			});

			if (!success) {
				return { errorMessage: message };
			}

			return { successMessage: message };
		},
	);
}
