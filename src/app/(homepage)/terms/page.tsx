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
					Last Updated: May 9, 2025
				</p>
				<p>By using this website, you agree to the following:</p>
			</div>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What You Can Do</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Create an account using just a username and password.
						</li>
						<li className="list-item list-disc list-inside">
							Write, edit, and delete your own notes.
						</li>
						<li className="list-item list-disc list-inside">
							Use the site for personal and legal purposes only.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">
						What You <span className="line-through">{"Can't"}</span> Do
					</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Don’t try to hack or break the site.
						</li>
						<li className="list-item list-disc list-inside">
							Don’t access or mess with other people’s notes.
						</li>
						<li className="list-item list-disc list-inside">
							Don’t use the site to do anything illegal.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Your Account</h3>
					<p>
						Keep your password safe. You’re responsible for anything done with
						your account.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Ending Your Account</h3>
					<p>
						You can delete your account anytime. We may remove accounts if they
						break these rules or harm the site.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Changes</h3>
					<p>We may update these terms. If we do, we’ll let you know.</p>
					<p>
						Questions? Contact us at{" "}
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
