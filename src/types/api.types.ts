export enum APIStatus {
	Success = "success",
	Error = "error",
	NotFound = "not_found",
	Unauthorized = "unauthorized",
	Forbidden = "forbidden",
	ValidationError = "validation_error",
	Conflict = "conflict",
}

export type APIResponse<T> = {
	status: APIStatus;
	data?: T;
	error?: string;
};
