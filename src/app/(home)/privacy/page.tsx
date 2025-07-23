export const metadata = {
	title: "Syntra — Privacy Policy",
};

export default function PrivacyPage() {
	return (
		<div className="mx-auto max-w-2xl px-6 md:px-0 py-10 flex flex-col gap-6">
			<div className="flex flex-col space-y-2">
				<h1 className="text-3xl font-extrabold leading-none md:text-4xl">
					Privacy Policy
				</h1>
				<p className="text-muted-foreground text-sm">
					Last Updated: July 5, 2025
				</p>
				<p>
					We respect your privacy and are committed to protecting your personal
					information. Here’s what we collect, how we use it, and what we{" "}
					<span className="italic line-through">don’t</span> do:
				</p>
			</div>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What We Collect</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Your username and password (securely stored).
						</li>
						<li className="list-item list-disc list-inside">
							The tasks you create, update, or delete within Syntra.
						</li>
						<li className="list-item list-disc list-inside">
							Basic metadata such as account creation date and task timestamps.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">
						What We <span className="line-through">{"Don't"}</span> Do
					</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							We don’t collect or require your email address.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t use third-party logins or analytics tools.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t show ads or sell your data.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t track your activity outside of Syntra.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">How We Protect Your Info</h3>
					<ul className="space-y-1">
						<li className="list-item list-inside list-disc">
							Passwords are encrypted and never stored in plain text.
						</li>
						<li className="list-item list-inside list-disc">
							Your tasks are private and only accessible by you.
						</li>
						<li className="list-item list-inside list-disc">
							All data is stored securely and only used to provide core app
							functionality.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Deleting Your Information</h3>
					<p>
						When you delete your account, all your tasks and personal data are
						permanently removed from our system.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Changes to This Policy</h3>
					<p>
						We may update this policy from time to time. If significant changes
						are made, we’ll notify you through the app.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Still have questions?</h3>
					<p>
						Email us at{" "}
						<a
							href="mailto:garcia.johngale@gmail.com"
							rel="noreferrer"
							target="_blank"
							className="text-blue-500 font-medium transition-colors hover:text-blue-400"
						>
							garcia.johngale@gmail.com
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
