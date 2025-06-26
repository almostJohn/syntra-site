export const enum LogType {
	Info = "info",
	Warn = "warn",
	Error = "error",
	Debug = "debug",
}

export const enum Category {
	CreateSessionError = "createSessionError",
	VerifySessionError = "verifySessionError",
	SetCookieError = "setCookieError",
	GetCookieError = "getCookieError",
	DeleteCookieError = "deleteCookieError",
	GetSessionError = "getSessionError",
	GetCurrentUserError = "getCurrentUserError",
	CheckAuthError = "checkAuthError",
	ServerActionError = "serverActionError",
}

type LogDetails = {
	message: string;
	name?: string;
	stack?: string;
	[key: string]: unknown;
};

export function log({
	logType,
	category,
	details,
	additionalData,
}: {
	logType: LogType;
	category: Category;
	details: LogDetails;
	additionalData?: unknown;
}): void {
	let consoleMethod: (...data: unknown[]) => void;
	switch (logType) {
		case LogType.Info: {
			consoleMethod = console.info;
			break;
		}

		case LogType.Warn: {
			consoleMethod = console.warn;
			break;
		}

		case LogType.Error: {
			consoleMethod = console.error;
			break;
		}

		case LogType.Debug: {
			consoleMethod = console.debug;
			break;
		}

		default:
			consoleMethod = console.log;
			break;
	}

	let logMessage = `[${logType}]: ${details.message}`;

	if (details.name && details.name !== category) {
		logMessage = `(Type: ${details.name})`;
	}

	const data = {
		logType,
		category,
		...details,
		...((additionalData && { data: additionalData }) as object),
	};

	consoleMethod(logMessage, data);
}
