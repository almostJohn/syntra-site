import * as React from "react";
import { Frame } from "lucide-react";
import { Notepad } from "~/components/notepad";
import { DateCalculator } from "~/components/date-calculator";

export default function IndexPage() {
	return (
		<div className="min-h-screen px-5 py-8 md:pb-16">
			<div className="flex flex-col space-y-8">
				<div className="flex items-center justify-center space-x-3">
					<Frame className="size-8 shrink-0" />
					<div className="flex flex-col space-y-0.5">
						<h1 className="text-2xl font-bold">noted</h1>
						<p className="text-sm italic font-light text-neutral-500">
							&quot;Simple tools for everyday tasks.&quot;
						</p>
					</div>
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
