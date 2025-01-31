"use client";

import * as React from "react";
import { jetBrainsMono } from "~/util/fonts";

export function LiveClock() {
	const [time, setTime] = React.useState<Date | null>(null);

	React.useEffect(() => {
		const updateClock = () => {
			setTime(new Date());
		};

		updateClock();

		const intervalId = setInterval(updateClock, 100);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	function formatTime(date: Date) {
		let hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");
		const ampm = hours >= 12 ? "PM" : "AM";

		hours = hours % 12;
		hours = hours ? hours : 12;

		const formattedHours = hours.toString().padStart(2, "0");

		return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
	}

	if (time === null) {
		return (
			<div className="block p-6 border border-neutral-300 rounded-md shadow-sm w-full md:w-1/2">
				<div className="flex items-center justify-center">
					<div className="flex flex-col space-y-1">
						<span className="text-sm text-center font-medium">Live Clock</span>
						<p className={`${jetBrainsMono.className} text-4xl text-teal-500`}>
							00:00:00
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="block p-7 border border-neutral-300 rounded-md shadow-sm w-full md:w-1/2">
			<div className="flex items-center justify-center">
				<div className="flex flex-col space-y-1">
					<span className="text-sm text-center font-medium md:text-lg">
						Live Clock
					</span>
					<p
						className={`${jetBrainsMono.className} text-5xl transition text-teal-500`}
					>
						{formatTime(time)}
					</p>
				</div>
			</div>
		</div>
	);
}
