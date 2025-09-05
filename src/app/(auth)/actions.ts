"use server";

import { serverActionCallback, type ActionResponse } from "@/lib";
import { UserService } from "@/services";
import {
	compareString,
	generateUserTag,
	getFormValue,
	hashString,
} from "@/utils";
import { setAuthCookie, signToken } from "@/auth";
import {
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	DISPLAY_NAME_MIN_LENGTH,
	DISPLAY_NAME_MAX_LENGTH,
} from "./constants";

export async function loginUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");
		const password = getFormValue(formData, "password");

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

		const { data: user } = await UserService.getByUsername(username);

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

		const token = await signToken({
			userId: user.id,
			username: user.username,
			userTag: user.userTag,
			displayName: user.displayName,
		});

		await setAuthCookie(token);

		return {
			successMessage: "Login successful.",
		};
	});
}

export async function registerUser(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const displayName = getFormValue(formData, "displayName");
		const username = getFormValue(formData, "username");
		const password = getFormValue(formData, "password");
		const confirmPassword = getFormValue(formData, "confirmPassword");

		if (!displayName || !username || !password || !confirmPassword) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					displayName: "Display name is a required field.",
					username: "Username is a required field.",
					password: "Password is a required field.",
					confirmPassword: "Confirm password is a required field.",
				},
			};
		}

		if (displayName.length < DISPLAY_NAME_MIN_LENGTH) {
			return {
				errorMessage: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters.`,
				errors: {
					displayName: `Display name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters.`,
				},
				values: {
					displayName,
				},
			};
		}

		if (displayName.length > DISPLAY_NAME_MAX_LENGTH) {
			return {
				errorMessage: `Display name must not exceed ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				errors: {
					displayName: `Display name must not exceed ${DISPLAY_NAME_MAX_LENGTH} characters.`,
				},
				values: {
					displayName,
				},
			};
		}

		if (username.length < USERNAME_MIN_LENGTH) {
			return {
				errorMessage: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
				errors: {
					username: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (username.length > USERNAME_MAX_LENGTH) {
			return {
				errorMessage: `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
				errors: {
					username: `Username must not exceed ${USERNAME_MAX_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (
			password.length < PASSWORD_MIN_LENGTH ||
			confirmPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				errors: {
					password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
					confirmPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (
			password.length > PASSWORD_MAX_LENGTH ||
			confirmPassword.length > PASSWORD_MAX_LENGTH
		) {
			return {
				errorMessage: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				errors: {
					password: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
					confirmPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
		if (!passwordRegex.test(password)) {
			return {
				errorMessage:
					"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				errors: {
					password:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
					confirmPassword:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		if (password !== confirmPassword) {
			return {
				errorMessage: "Passwords do not match.",
				errors: {
					password: "Passwords do not match.",
					confirmPassword: "Passwords do not match",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const { data: existingUser } = await UserService.getByUsername(username);
		if (existingUser) {
			return {
				errorMessage: "Username is already taken.",
				errors: {
					username: "Username is already taken.",
				},
				values: {
					displayName,
					username,
				},
			};
		}

		const hashedPassword = await hashString(password, 12);

		await UserService.create({
			username,
			userTag: generateUserTag(),
			displayName,
			password: hashedPassword,
		});

		return {
			successMessage: "Registration successful.",
		};
	});
}

export async function resetPassword(
	_prevState: ActionResponse,
	formData: FormData,
): Promise<ActionResponse> {
	return serverActionCallback(async (): Promise<ActionResponse> => {
		const username = getFormValue(formData, "username");
		const newPassword = getFormValue(formData, "newPassword");
		const confirmNewPassword = getFormValue(formData, "confirmNewPassword");

		if (!username || !newPassword || !confirmNewPassword) {
			return {
				errorMessage: "All fields are required.",
				errors: {
					username: "Username is a required field.",
					newPassword: "New password is a required field.",
					confirmNewPassword: "Confirm new password is a required field.",
				},
			};
		}

		if (
			username.length < USERNAME_MIN_LENGTH ||
			username.length > USERNAME_MAX_LENGTH
		) {
			return {
				errorMessage: "Invalid username.",
				errors: {
					username: "Invalid username.",
				},
				values: {
					username,
				},
			};
		}

		if (
			newPassword.length < PASSWORD_MIN_LENGTH ||
			confirmNewPassword.length < PASSWORD_MIN_LENGTH
		) {
			return {
				errorMessage: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				errors: {
					newPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
					confirmNewPassword: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		if (
			newPassword.length > PASSWORD_MAX_LENGTH ||
			confirmNewPassword.length > PASSWORD_MAX_LENGTH
		) {
			return {
				errorMessage: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				errors: {
					newPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
					confirmNewPassword: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters.`,
				},
				values: {
					username,
				},
			};
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
		if (!passwordRegex.test(newPassword)) {
			return {
				errorMessage:
					"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				errors: {
					newPassword:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
					confirmNewPassword:
						"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
				},
				values: {
					username,
				},
			};
		}

		if (newPassword !== confirmNewPassword) {
			return {
				errorMessage: "Passwords do not match.",
				errors: {
					newPassword: "Passwords do not match.",
					confirmNewPassword: "Passwords do not match.",
				},
				values: {
					username,
				},
			};
		}

		const { data: user } = await UserService.getByUsername(username);
		if (!user) {
			return {
				errorMessage: `No account associated for "${username}".`,
				errors: {
					username: `No account associated for "${username}".`,
				},
				values: {
					username,
				},
			};
		}

		const hashedNewPassword = await hashString(newPassword, 12);

		await UserService.update(user.id, { password: hashedNewPassword });

		return {
			successMessage: "Password reset successfully.",
		};
	});
}
