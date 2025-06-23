type EmailSettingProps = {
	email: string;
	isEmailVerified: boolean;
};

export function EmailSetting({ email, isEmailVerified }: EmailSettingProps) {
	return (
		<div className="flex flex-col rounded-xl border border-border bg-background shadow">
			<div className="p-6 flex flex-col space-y-4">
				<h3 className="text-lg font-bold">Email</h3>
				<p className="text-sm">
					This is your email address. Your primary email will be the one you
					need to use to log in with Syntra.
				</p>
				<div className="flex items-center p-3 gap-2 rounded-sm bg-muted border border-border text-sm">
					<p>{email}</p>
					<div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-medium">
						Primary
					</div>
					{isEmailVerified && (
						<div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-medium">
							Verified
						</div>
					)}
				</div>
			</div>
			<div className="px-6 py-4 mt-auto border-t border-border">
				<p className="text-sm text-muted-foreground">
					Your email must be verified to be able to login and be used as primary
					email.
				</p>
			</div>
		</div>
	);
}
