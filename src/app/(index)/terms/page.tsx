import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms",
};

export default function Page() {
	return (
		<div className="container max-w-2xl py-12">
			<div className="flex flex-col justify-center space-y-4">
				<div className="space-y-2">
					<h1 className="text-xl font-semibold tracking-tight text-left">
						Terms of Service
					</h1>
					<p className="text-sm text-muted-foreground">
						<strong>Effective Date:</strong> March 14, 2025
					</p>
				</div>
				<p>
					Welcome to SimplyNote! By using our website, you agree to the
					following terms and conditions. If you do not agree with these terms,
					please refrain from using our service.
				</p>
				<ul className="space-y-5">
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							1. Acceptance to Terms
						</span>
						<p className="text-muted-foreground">
							By accessing and using SimplyNote, you acknowledge that you have
							read, understood, and agreed to these Terms of Service. These
							terms may be updated periodically, and continued use of SimplyNote
							signifies your acceptance of any changes.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							2. Description of Service
						</span>
						<p className="text-muted-foreground">
							SimplyNote is a simple notepad website that allows users to create
							and manage notes with auto-save functionality using the Web
							Storage API. No user accounts or authentication are required.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							3. Data and Storage
						</span>
						<p className="text-muted-foreground">
							• Notes created on SimplyNote are stored locally on your device
							using the Web Storage API. This data is not transmitted to or
							stored on our servers.
						</p>
						<p className="text-muted-foreground">
							• We are not responsible for data loss caused by clearing browser
							storage, device issues, or other unforeseen circumstances. We
							recommend regularly backing up important information elsewhere.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							4. User Responsibilities
						</span>
						<p className="text-muted-foreground">
							• You are responsible for the content you create and store on
							SimplyNote.
						</p>
						<p className="text-muted-foreground">
							• You agree not to use SimplyNote for illegal, harmful, or abusive
							activities.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							5. Limitation of Liability
						</span>
						<p className="text-muted-foreground">
							{`SimplyNote is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free operation. We are not responsible for any loss, damage, or issues arising from the use of SimplyNote.`}
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							6. Changes to the Service
						</span>
						<p className="text-muted-foreground">
							We may modify or discontinue SimplyNote at any time without prior
							notice. We are not liable for any changes that may affect your
							stored data.
						</p>
					</li>
					<li className="flex flex-col space-y-1.5">
						<span className="text-lg font-medium leading-snug">
							7. Contact Information
						</span>
						<p className="text-muted-foreground">
							For questions regarding these terms, please contact us by sending
							me an email to{" "}
							<a
								href="mailto:garcia.johngale@gmail.com"
								className="underline text-teal-500"
							>
								@almostJohn
							</a>
							.
						</p>
						<p className="text-muted-foreground">
							By using SimplyNote, you confirm your understanding and agreement
							to these terms.
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
}
