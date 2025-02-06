import * as React from "react";
import Link from "next/link";
import { NotepadText, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function IndexPage() {
	return (
		<div className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center space-y-6 text-center">
					<div className="space-y-2">
						<Link
							href="https://www.markdownguide.org/"
							className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium rounded-full border-2 border-blue-500 transition hover:bg-blue-500 text-blue-500 hover:text-white group"
						>
							<span className="group-hover:underline">Markdown Guide</span>
							<ArrowRight className="size-5 ml-2" />
						</Link>
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Free Browser-Based Text Editor
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							simplynote is a fast, stand-alone, and free browser-based text
							editor for quick note-taking and editing. No installs or
							sign-ups—just a simple, distraction-free experience with autosave
							and privacy.
						</p>
					</div>
					<div className="flex items-center justify-center">
						<Button
							className="bg-blue-500 text-white hover:bg-blue-600 rounded-none"
							size="lg"
							asChild
						>
							<Link href="/notepad">Start Using Notepad</Link>
						</Button>
					</div>
					<div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
						<div className="flex flex-col h-[400px] bg-background border rounded-md shadow-lg">
							<div className="flex items-center justify-between w-full bg-muted border-b px-3 py-0.5">
								<div className="flex items-center space-x-2">
									<NotepadText className="size-4" />
									<span className="text-sm">Untitled</span>
								</div>
								<div className="flex items-center justify-end">
									<Button
										variant="ghost"
										disabled
										className="hover:bg-transparent hover:underline p-0"
									>
										Clear text
									</Button>
								</div>
							</div>
							<div className="flex-1 resize-none font-mono p-3 w-full rounded-none transition focus:ring-0 focus:outline-none text-left">
								The document you&apos;re working on will be automatically
								restored when you visit back, even when you close and reopen
								your browser. simplynote uses Web Storage API to automatically
								save your notes.
							</div>
							<div className="flex items-center justify-between w-full px-2 py-1 text-xs bg-muted border-t">
								<div className="flex items-center">
									<span>{`Ln ${3}, Col ${2}`}</span>
								</div>
								<div className="flex items-center justify-end gap-4">
									<span>{`${117} characters`}</span>
									<span>UTF-8</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
