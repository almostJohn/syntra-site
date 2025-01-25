"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { formatDate } from "~/util/formatDate";

export function DateCalculator() {
	const [startDate, setStartDate] = React.useState("");
	const [endDate, setEndDate] = React.useState("");
	const [result, setResult] = React.useState("");
	const [operation, setOperation] = React.useState("difference");
	const [days, setDays] = React.useState("0");

	function calculateDifference() {
		if (!startDate || (operation === "difference" && !endDate)) {
			setResult("Please fill in all required fields.");
			return;
		}

		const start = new Date(startDate);

		if (operation === "difference") {
			const end = new Date(endDate);
			const difference = Math.abs(end.getTime() - start.getTime());
			const daysDiff = Math.ceil(difference / (1_000 * 3_600 * 24));

			setResult(`The difference is ${daysDiff} days`);
		} else {
			const daysNum = Number.parseInt(days);
			if (isNaN(daysNum)) {
				setResult("Please enter a valid number of days.");
				return;
			}

			const resultDate = new Date(start);

			if (operation === "add") {
				resultDate.setDate(resultDate.getDate() + daysNum);
			} else {
				resultDate.setDate(resultDate.getDate() - daysNum);
			}

			setResult(
				`The resulting date is ${formatDate(
					resultDate.toISOString().split("T")[0],
				)}`,
			);
		}
	}

	return (
		<div className="block p-6 border border-neutral-300 rounded-md shadow-sm">
			<div className="flex flex-col space-y-4">
				<div className="flex flex-col space-y-0.5">
					<h3 className="font-medium tracking-tight">Date Calculator</h3>
					<p className="italic text-sm font-light text-neutral-500">
						Tip: Refreshing the site will clear the form.
					</p>
				</div>
				<div className="flex flex-col space-y-2">
					<label htmlFor="startDate" className="font-medium leading-snug">
						Start Date
					</label>
					<Input
						type="date"
						id="startDate"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</div>
				<RadioGroup
					value={operation}
					onValueChange={setOperation}
					className="flex"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="difference" id="difference" />
						<label htmlFor="difference" className="font-medium leading-snug">
							Calculate Difference
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="add" id="add" />
						<label htmlFor="add" className="font-medium leading-snug">
							Add Days
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="subtract" id="subtract" />
						<label htmlFor="subtract" className="font-medium leading-snug">
							Subtract Days
						</label>
					</div>
				</RadioGroup>
				{operation === "difference" ? (
					<div className="flex flex-col space-y-2">
						<label htmlFor="endDate" className="font-medium leading-snug">
							End Date
						</label>
						<Input
							type="date"
							id="endDate"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
				) : (
					<div className="flex flex-col space-y-2">
						<label htmlFor="days" className="font-medium leading-snug">
							Number of Days
						</label>
						<Input
							type="number"
							id="days"
							value={days}
							onChange={(e) => setDays(e.target.value)}
						/>
					</div>
				)}
				<Button onClick={calculateDifference}>Calculate</Button>
				{operation === "difference"
					? result && <p className="font-medium">{result}</p>
					: result && (
							<p className="font-medium">
								{result}{" "}
								<span className="text-blue-600 italic font-normal">
									(format: mm/dd/yyyy)
								</span>
							</p>
					  )}
			</div>
		</div>
	);
}
