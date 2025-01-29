import * as React from "react";
import { Notepad } from "~/components/notepad";
import { DateCalculator } from "~/components/date-calculator";
import { LiveClock } from "~/components/live-clock";
import { Todolist } from "~/components/todolist";

export default function IndexPage() {
	return (
		<div className="min-h-screen px-5 py-8 md:pb-16">
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-center">
					<LiveClock />
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="w-full">
						<Notepad />
					</div>
					<div className="flex flex-col gap-4 w-full">
						<DateCalculator />
						<Todolist />
					</div>
				</div>
			</div>
		</div>
	);
}
