import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { NotepadIllustration } from "~/components/notepad-illustration";

export default function IndexPage() {
	return (
		<main className="flex flex-1 flex-col">
			<div className="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
				<Link
					href="https://www.markdownguide.org/"
					className="group inline-flex items-center px-0.5 mb-2 text-sm font-medium"
				>
					<span className="underline-offset-4 group-hover:underline">
						Markdown Syntax Support
					</span>
					<ArrowRight className="size-4 ml-1" />
				</Link>
				<h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
					Free Browser-Based Text Editor
				</h1>
				<p className="max-w-2xl text-lg font-light text-muted-foreground">
					SimplyNote is a fast, stand-alone, and free browser-based text editor
					for quick note-taking and editing. No installs or sign-ups—just a
					simple, distraction-free experience with autosave and privacy.
				</p>
				<div className="flex items-center justify-start w-full pt-2">
					<Button className="rounded-xl" size="sm" asChild>
						<Link href="/notepad">Get Started</Link>
					</Button>
				</div>
			</div>
			<div className="container pb-6">
				<NotepadIllustration />
			</div>
		</main>
	);
}
