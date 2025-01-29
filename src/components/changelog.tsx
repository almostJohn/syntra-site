import * as React from "react";
import { PartyPopper } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function Changelog() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold cursor-pointer border border-neutral-300 bg-neutral-200">
					v0.1.2
				</span>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex flex-col space-y-4">
					<div className="block p-4 border border-neutral-300 bg-neutral-200 rounded-md">
						<div className="flex flex-col space-y-2">
							<div className="flex items-center space-x-2">
								<PartyPopper className="size-5 shrink-0" />
								<h2 className="text-sm font-medium tracking-tight">
									Add to-do-list (new feature)
								</h2>
							</div>
							<p className="text-xs font-light">
								Add a to-do-list for creating tasks.
							</p>
						</div>
					</div>
					<div className="block p-4 border border-neutral-300 bg-neutral-200 rounded-md">
						<div className="flex flex-col space-y-2">
							<div className="flex items-center space-x-2">
								<PartyPopper className="size-5 shrink-0" />
								<h2 className="text-sm font-medium tracking-tight">
									Add Copy Button (new feature)
								</h2>
							</div>
							<p className="text-xs font-light">
								Add a copy button to directly copy your notes to the clipboard.
							</p>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
