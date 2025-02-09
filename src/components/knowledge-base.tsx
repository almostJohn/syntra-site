import * as React from "react";
import { Lightbulb } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { geistMono } from "~/util/fonts";

export function KnowledgeBase() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-8 rounded-xl"
					title="Knowledge Base"
					aria-label="Knowledge Base"
				>
					<Lightbulb className="size-4 shrink-0" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex flex-col space-y-4">
					<div className="flex space-x-2">
						<Lightbulb className="text-yellow-500 shrink-0" />
						<div className="flex flex-col space-y-0.5">
							<h1 className="font-medium leading-snug">Knowledge Base</h1>
							<p className="text-sm text-muted-foreground font-light">
								SimplyNote uses Markdown syntax for text formatting. Below is
								the information on how to get started.
							</p>
						</div>
					</div>
					<div className="relative block p-3 bg-muted border rounded-lg cursor-pointer">
						<p className="text-sm">Usage: **hello World**</p>
						<p className="text-sm">
							Output: <strong>hello World</strong>
						</p>
					</div>
					<div className="block p-3 bg-muted border rounded-lg cursor-pointer">
						<p className="text-sm">Usage: *hello World*</p>
						<p className="text-sm">
							Output: <em>hello World</em>
						</p>
					</div>
					<div className="block p-3 bg-muted border rounded-lg cursor-pointer">
						<p className="text-sm">Usage: __hello World__</p>
						<p className="text-sm">
							Output: <u>hello World</u>
						</p>
					</div>
					<div className="block p-3 bg-muted border rounded-lg cursor-pointer">
						<p className="text-sm">Usage: `hello World`</p>
						<p className="text-sm">
							Output: <code className={geistMono.className}>hello World</code>
						</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
