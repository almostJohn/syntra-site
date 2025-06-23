export const metadata = {
	title: "Syntra — Terms of Service",
};

export default function TermsPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 md:px-0 py-10 flex flex-col gap-6">
			<div className="flex flex-col space-y-2">
				<h1 className="text-3xl font-extrabold leading-none md:text-4xl">
					Terms of Service
				</h1>
				<p className="text-muted-foreground text-sm">
					Last Updated: June 23, 2025
				</p>
				<p>By using Syntra, you agree to the following terms:</p>
			</div>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What You Can Do</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Create an account using your email and a secure password.
						</li>
						<li className="list-item list-disc list-inside">
							Access the app after verifying your email address.
						</li>
						<li className="list-item list-disc list-inside">
							Write, edit, and delete your personal notes and tasks.
						</li>
						<li className="list-item list-disc list-inside">
							Use Syntra for lawful and personal productivity purposes.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">
						What You <span className="line-through">{"Can't"}</span> Do
					</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Don’t attempt to hack, disrupt, or damage Syntra.
						</li>
						<li className="list-item list-disc list-inside">
							Don’t try to access or interfere with other users’ data.
						</li>
						<li className="list-item list-disc list-inside">
							Don’t use Syntra for illegal or harmful activities.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Your Account</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							You must verify your email to use Syntra.
						</li>
						<li className="list-item list-disc list-inside">
							Keep your login credentials secure—you’re responsible for all
							activity under your account.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Deleting Your Account</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							You can delete your account anytime in your settings.
						</li>
						<li className="list-item list-disc list-inside">
							We may remove accounts that violate these terms or compromise the
							security of the service.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Changes to These Terms</h3>
					<p>
						We may update these terms over time. If we make significant changes,
						we’ll notify you through the app.
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
							className="underline text-blue-600"
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
