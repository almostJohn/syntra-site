import * as React from "react";
import { Notepad } from "~/components/notepad";
import { DateCalculator } from "~/components/date-calculator";
import { LiveClock } from "~/components/live-clock";

export default function IndexPage() {
	return (
		<div className="min-h-screen px-5 py-8 md:pb-16">
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-center">
					<LiveClock />
				</div>
				<div className="flex flex-col md:flex-row gap-4">
					<div className="w-full md:w-1/2">
						<Notepad />
					</div>
					<div className="w-full md:w-1/2">
						<DateCalculator />
					</div>
				</div>
			</div>
		</div>
	);
}
