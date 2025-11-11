type ResponseResult<TData> = {
	data: TData | null;
	error: string | null;
	status: number;
};

type RequestParams<
	TBody = undefined,
	TOptions = undefined,
	TResponse = unknown,
> = {
	body?: TBody;
	options?: TOptions;
	action: (args: { body?: TBody; options?: TOptions }) => Promise<TResponse>;
};

export const request = {
	get: async <TResponse, TOptions = undefined>(
		params: RequestParams<undefined, TOptions, TResponse>,
	): Promise<ResponseResult<TResponse>> => {
		try {
			const data = await params.action({
				body: undefined,
				options: params.options as TOptions,
			});

			return {
				data,
				error: null,
				status: 200,
			};
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[GET Request Error]", error);
			return {
				data: null,
				error: message,
				status: 500,
			};
		}
	},

	post: async <TBody = undefined, TResponse = unknown, TOptions = undefined>(
		params: RequestParams<TBody, TOptions, TResponse>,
	): Promise<ResponseResult<TResponse>> => {
		try {
			const data = await params.action({
				body: params.body as TBody,
				options: params.options as TOptions,
			});

			return {
				data,
				error: null,
				status: 200,
			};
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[POST Request Error]", error);
			return {
				data: null,
				error: message,
				status: 500,
			};
		}
	},

	delete: async <TBody = undefined, TResponse = unknown, TOptions = undefined>(
		params: RequestParams<TBody, TOptions, TResponse>,
	): Promise<ResponseResult<TResponse>> => {
		try {
			const data = await params.action({
				body: params.body as TBody,
				options: params.options as TOptions,
			});

			return {
				data,
				error: null,
				status: 200,
			};
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Something went wrong.";
			console.error("[DELETE Request Error]", error);
			return {
				data: null,
				error: message,
				status: 500,
			};
		}
	},
};
