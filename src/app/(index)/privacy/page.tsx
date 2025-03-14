import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy",
};

export default function Page() {
	return (
		<div className="container max-w-2xl py-12">
			<div className="flex flex-col justify-center space-y-4">
				<div className="space-y-2">
					<h1 className="text-xl font-semibold tracking-tight text-left">
						Privacy Policy
					</h1>
					<p className="text-sm text-muted-foreground">
						<strong>Effective Date:</strong> March 14, 2025
					</p>
				</div>
				<p>
					Your privacy is important to us. This Privacy Policy outlines how
					SimplyNote handles your information and data.
				</p>
				<ul className="space-y-5">
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							1. Information We Collect
						</span>
						<p className="text-muted-foreground">
							SimplyNote does not collect, store, or transmit any personal data.
							All notes created are saved locally on your device using the Web
							Storage API. This data is not accessible to us or transmitted to
							external servers.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							2. Data Storage and Security
						</span>
						<p className="text-muted-foreground">
							{
								"• Your notes are stored entirely within your browser's local storage. We have no access to your content."
							}
						</p>
						<p className="text-muted-foreground">
							• Since no account or authentication system is implemented, there
							is no user profile data collected or stored.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							3. Cookies and Tracking
						</span>
						<p className="text-muted-foreground">
							SimplyNote does not use cookies, tracking scripts, or analytics
							services.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							4. Third-Party Services
						</span>
						<p className="text-muted-foreground">
							SimplyNote does not integrate with third-party services that may
							collect or track your data.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							5. Data Loss Disclaimer
						</span>
						<p className="text-muted-foreground">
							We are not responsible for any data loss resulting from clearing
							browser storage, device issues, or software updates. Please back
							up important notes externally if needed.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							6. Changes to This Policy
						</span>
						<p className="text-muted-foreground">
							We may update this Privacy Policy at any time. Changes will be
							posted on this page, and continued use of SimplyNote implies your
							acceptance of the updated policy.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							7. Contact Information
						</span>
						<p className="text-muted-foreground">
							If you have questions regarding this Privacy Policy, please
							contact us by sending me an email to{" "}
							<a
								href="mailto:garcia.johngale@gmail.com"
								className="underline text-teal-500"
							>
								@almostJohn
							</a>
							.
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
}
