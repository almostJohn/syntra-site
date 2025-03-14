import * as React from "react";
import { ArrowRight } from "lucide-react";
import { SiMarkdown as MarkdownIcon } from "@icons-pack/react-simple-icons";

export function Announcement() {
	return (
		<a
			href="https://www.markdownguide.org"
			rel="noreferrer"
			target="_blank"
			className="group flex items-center gap-2 mb-4"
		>
			<span className="sr-only">announcement-only</span>
			<MarkdownIcon className="size-5" />
			<h3 className="text-sm font-semibold underline-offset-4 group-hover:underline">
				Markdown Support
			</h3>
			<ArrowRight className="size-5" />
		</a>
	);
}
