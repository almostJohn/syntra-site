import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
	PageHeader,
	PageHeaderBody,
	PageHeaderHeading,
	PageHeaderDescription,
	PageHeaderActions,
} from "~/components/page-header";

export default function IndexPage() {
	return (
		<PageHeader>
			<PageHeaderBody>
				<PageHeaderHeading>Free Browser-Based Text Editor</PageHeaderHeading>
				<PageHeaderDescription>
					SimplyNote is a fast, stand-alone, and free browser-based text editor
					for quick note-taking and editing. No installs or sign-ups—just a
					simple, distraction-free experience with autosave and privacy.
				</PageHeaderDescription>
				<PageHeaderActions>
					<Button
						size="lg"
						className="rounded-none bg-blue-600 text-white transition hover:bg-blue-700"
						asChild
					>
						<Link href="/notepad">Start Using Notepad</Link>
					</Button>
				</PageHeaderActions>
			</PageHeaderBody>
			<div className="w-full max-w-3xl">
				<Image
					src="/hero-image.png"
					width={800}
					height={400}
					alt=""
					priority
					className="rounded-lg shadow-2xl"
				/>
			</div>
		</PageHeader>
	);
}
