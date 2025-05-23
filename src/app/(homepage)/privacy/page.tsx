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
					Last Updated: May 9, 2025
				</p>
				<p>
					We care about your privacy. Here’s what we do — and{" "}
					<span className="line-through">don’t</span> do — with your info:
				</p>
			</div>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What We Collect</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							Your username and password (stored securely).
						</li>
						<li className="list-item list-disc list-inside">
							The notes you create.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">
						What We <span className="line-through">{"Don't"}</span> Do
					</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							We don’t use third-party logins.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t show ads or sell your data.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t track you across the web.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">How We Protect Your Info</h3>
					<ul className="space-y-1">
						<li className="list-item list-inside list-disc">
							Your password is encrypted.
						</li>
						<li className="list-item list-inside list-disc">
							Your notes are private and only visible to you.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Deleting Your Info</h3>
					<p>
						When you delete your account, your notes and data are permanently
						removed.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Changes</h3>
					<p>We might update this policy. If so, we’ll let you know.</p>
					<p>
						Still have questions? Email us at{" "}
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
