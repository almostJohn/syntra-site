export const metadata = {
	title: "Syntra — Cookie Policy",
};

export default function CookiesPage() {
	return (
		<div className="mx-auto max-w-2xl px-6 md:px-0 py-10 flex flex-col gap-6">
			<div className="flex flex-col space-y-2">
				<h1 className="text-3xl font-extrabold leading-none md:text-4xl">
					Cookie Policy
				</h1>
				<p className="text-muted-foreground text-sm">
					Last Updated: May 15, 2025
				</p>
				<p>By using this website, you agree to our use of cookies.</p>
			</div>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What Are Cookies</h3>
					<p>
						Cookies are small files saved on your device that help the site work
						better.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">What We Use Cookies For</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							To remember your login so you don’t have to log in every time.
						</li>
						<li className="list-item list-disc list-inside">
							To keep track of your settings.
						</li>
						<li className="list-item list-disc list-inside">
							To understand how people use the site and improve it.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">
						What We <span className="line-through">{"Don't"}</span> Do
					</h3>
					<ul className="space-y-1">
						<li className="list-item list-disc list-inside">
							We don’t sell your data.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t use cookies to track you across other websites.
						</li>
						<li className="list-item list-disc list-inside">
							We don’t use cookies to show ads.
						</li>
					</ul>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Your Choices</h3>
					<p>
						Most browsers let you block or delete cookies. If you turn off
						cookies, some parts of the site might not work right.
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<h3 className="font-bold leading-snug">Changes</h3>
					<p>We may update this policy. If we do, we’ll let you know.</p>
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
