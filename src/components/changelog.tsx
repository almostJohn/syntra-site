import * as React from "react";
import { PartyPopper } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function Changelog() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold cursor-pointer border bg-muted">
					v0.1.6
				</span>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex flex-col space-y-4">
					<div className="block p-4 border border-border bg-muted rounded-md">
						<div className="flex flex-col space-y-2">
							<div className="flex items-center space-x-2">
								<PartyPopper className="size-5 shrink-0" />
								<h2 className="text-sm font-medium tracking-tight">
									Update: new features such as date-picker, etc
								</h2>
							</div>
							<ul className="space-y-2">
								<li className="text-sm">
									- Users can now simply pick a date from the calendar selection
									to save time on writing dates.
								</li>
								<li className="text-sm">
									- Users can now create and add notes, as well as copy and
									paste them to save time when writing new ones.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
