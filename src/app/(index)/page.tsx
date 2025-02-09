import * as React from "react";
import Link from "next/link";
import {
	Copy,
	FileDown,
	NotebookPen,
	Save,
	Trash,
	Lightbulb,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { geistMono } from "~/util/fonts";

export default function IndexPage() {
	return (
		<div className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center space-y-6 text-center">
					<div className="space-y-3">
						<Link
							href="https://www.markdownguide.org/"
							className="group inline-flex items-center justify-center rounded-full px-6 py-1 border bg-background text-lg font-bold transition hover:bg-muted"
						>
							<span className="group-hover:underline">
								Markdown Syntax Support
							</span>
						</Link>
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Free Browser-Based Text Editor
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
							simplynote is a fast, stand-alone, and free browser-based text
							editor for quick note-taking and editing. No installs or
							sign-ups—just a simple, distraction-free experience with autosave
							and privacy.
						</p>
					</div>
					<div className="flex items-center justify-center">
						<Button
							className="bg-blue-500 text-white hover:bg-blue-700 transition rounded-lg"
							size="lg"
							asChild
						>
							<Link href="/notepad">Start Using Notepad</Link>
						</Button>
					</div>
					<div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
						<div className="flex flex-col h-[400px] bg-background border rounded-md shadow-lg">
							<div className="flex items-center w-full bg-muted border-b px-3 py-1">
								<div className="flex items-center space-x-2">
									<NotebookPen className="size-4 text-blue-500" />
									<span className="text-sm">Untitled</span>
								</div>
							</div>
							<div className="flex items-center gap-2 w-full bg-muted/20 border-b p-2">
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Save"
									aria-label="Save"
									disabled
								>
									<Save className="size-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Export"
									aria-label="Export"
									disabled
								>
									<FileDown className="size-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Copy to Clipboard"
									aria-label="Copy to Clipboard"
									disabled
								>
									<Copy className="size-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Clear Text"
									aria-label="Clear Text"
									disabled
								>
									<Trash className="size-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Knowledge Base"
									aria-label="Knowledge Base"
									disabled
								>
									<Lightbulb className="size-4 shrink-0" />
								</Button>
							</div>
							<div
								className={`${geistMono.className} flex-1 resize-none p-3 h-96 w-full rounded-none transition focus:ring-0 focus:outline-none text-left`}
							>
								The document you&apos;re working on will be automatically
								restored when you return, even if you close and reopen your
								browser. SimplyNote uses the Web Storage API to save your notes
								automatically and also supports autocomplete for text
								completion.
							</div>
							<div className="flex items-center justify-between w-full px-3 py-1 bg-muted border shadow rounded-b-lg">
								<div className="flex items-center gap-3">
									<span className="text-sm">col 2</span>
									<span className="text-sm">row 3</span>
								</div>
								<div className="flex items-center justify-end gap-3">
									<span className="text-sm">117 characters</span>
									<span className="text-sm">EN-US</span>
									<span className="text-sm">UTF-8</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
