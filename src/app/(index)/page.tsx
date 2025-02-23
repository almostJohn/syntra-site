import * as React from "react";
import Link from "next/link";
import {
	PageHeader,
	PageHeaderBody,
	PageHeaderHeading,
	PageHeaderDescription,
	PageHeaderActions,
} from "~/components/page-header";
import { Button } from "~/components/ui/button";
import { Copy, Download, Eraser, Trash2, X } from "lucide-react";
import { geistMono } from "~/util/fonts";
import { getWordCount } from "~/util/getWordCount";
import GlowingDiv from "~/components/glowing-div";

const value = `
	SimplyNote is a fast, stand-alone, and free browser-based text editor
	for quick note-taking and editing. No installs or sign-ups—just a
	simple, distraction-free experience with autosave and privacy.
`;

export default function IndexPage() {
	return (
		<PageHeader>
			<PageHeaderBody>
				<PageHeaderHeading>Browser-Based Text Editor</PageHeaderHeading>
				<PageHeaderDescription>
					SimplyNote is a fast, stand-alone, and free browser-based text editor
					for quick note-taking and editing. No installs or sign-ups—just a
					simple, distraction-free experience with autosave and privacy.
				</PageHeaderDescription>
				<PageHeaderActions>
					<Link
						href="/notepad"
						className="px-6 py-2 flex items-center gap-2 text-lg font-bold rounded-lg transition-all border border-input bg-background hover:bg-accent hover:text-accent-foreground"
					>
						Get Started
					</Link>
				</PageHeaderActions>
			</PageHeaderBody>
			<div className="w-full md:max-w-3xl">
				<div className="block border border-border/40 bg-background rounded-lg h-[calc(100%-2rem)] cursor-pointer transition duration-300 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500">
					<div className="flex flex-col">
						<div className="flex items-center justify-between w-full h-14 border-b border-border/40 px-4 py-2">
							<h1 className="text-lg font-semibold">Untitled</h1>
							<GlowingDiv />
						</div>
						<div className="flex items-center gap-2 p-2 border-b border-border/40">
							<Button variant="ghost" disabled className="px-2 py-1 rounded-lg">
								<Copy />
							</Button>
							<Button variant="ghost" disabled className="px-2 py-1 rounded-lg">
								<Download />
							</Button>
							<Button variant="ghost" disabled className="px-2 py-1 rounded-lg">
								<Eraser />
							</Button>
							<Button variant="ghost" disabled className="px-2 py-1 rounded-lg">
								<X />
							</Button>
							<Button variant="ghost" disabled className="px-2 py-1 rounded-lg">
								<Trash2 />
							</Button>
						</div>
						<div className="flex flex-col flex-1">
							<div
								className={`${geistMono.className} bg-transparent w-full p-4 border-none outline-none rounded-none`}
							>
								{value}
							</div>
							<div className="flex items-center justify-end p-2 text-sm text-muted-foreground">
								Words: {getWordCount(value)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageHeader>
	);
}
