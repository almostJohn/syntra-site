export const metadata = {
	title: "Syntra — Terms of Service",
};

export default function TermsPage() {
	return (
		<div className="mx-auto max-w-2xl px-6 md:px-0 py-10 flex flex-col gap-6">
			<div className="flex flex-col space-y-2">
				<h1 className="text-3xl font-extrabold leading-none md:text-4xl">
					Terms of Service
				</h1>
				<p className="text-muted-foreground text-sm">
					Last Updated: July 5, 2025
				</p>
				<p>By using Syntra, you agree to the following terms:</p>
			</div>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What You Can Do</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Create an account using a unique username and secure password.
						</li>
						<li className="list-item list-disc list-inside">
							Access and use the app to create, update, and delete your personal
							tasks.
						</li>
						<li className="list-item list-disc list-inside">
							Use Syntra for lawful, personal productivity purposes only.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">
						What You <span className="line-through">{"Can't"}</span> Do
					</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Don’t attempt to hack, disrupt, or harm Syntra in any way.
						</li>
						<li className="list-item list-disc list-inside">
							Don’t try to access or interfere with data that doesn’t belong to
							you.
						</li>
						<li className="list-item list-disc list-inside">
							Don’t use Syntra for illegal, malicious, or abusive activities.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Your Account</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							You are responsible for keeping your login credentials secure.
						</li>
						<li className="list-item list-disc list-inside">
							All activity under your account is your responsibility.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Deleting Your Account</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							You can delete your account at any time through the settings.
						</li>
						<li className="list-item list-disc list-inside">
							We may remove accounts that violate these terms or compromise the
							security or integrity of Syntra.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Changes to These Terms</h3>
					<p>
						We may update these terms occasionally. If significant changes are
						made, we’ll notify you in the app.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Questions?</h3>
					<p>
						Contact us at{" "}
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
