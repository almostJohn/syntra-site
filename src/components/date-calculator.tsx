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
	const [error, setError] = React.useState<string | null>(null);
	const [operation, setOperation] = React.useState("difference");
	const [days, setDays] = React.useState("0");

	function calculateDifference() {
		if (!startDate || (operation === "difference" && !endDate)) {
			setResult("");
			setError("Please fill in all required fields.");
			return;
		}

		const start = new Date(startDate);

		if (operation === "difference") {
			const end = new Date(endDate);
			const difference = Math.abs(end.getTime() - start.getTime());
			const daysDiff = Math.ceil(difference / (1_000 * 3_600 * 24));

			setResult(`The difference is ${daysDiff} days`);
			setError("");
		} else {
			const daysNum = Number.parseInt(days);
			if (isNaN(daysNum)) {
				setResult("");
				setError("Please enter a valid number of days.");
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
			setError("");
		}
	}

	function clearForm() {
		setStartDate("");
		setEndDate("");
		setDays("");
		setResult("");
	}

	return (
		<div className="block p-4 border border-border rounded-md bg-background shadow-sm">
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-col space-y-1">
						<h3 className="font-medium tracking-tight">Date Calculator</h3>
						<p className="italic text-xs font-light text-muted-foreground">
							Result Date Format: mm/dd/yyyy (eg: 01/01/2025)
						</p>
					</div>
					<div className="flex items-center justify-end">
						<Button
							variant="link"
							className="underline-offset-1"
							onClick={clearForm}
						>
							Clear
						</Button>
					</div>
				</div>
				<div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-4 md:space-y-0">
					<div className="flex flex-col space-y-2">
						<label
							htmlFor="startDate"
							className="text-sm font-medium leading-snug"
						>
							Start Date{" "}
							<span className="text-lg font-medium text-red-600">*</span>
						</label>
						<Input
							type="date"
							id="startDate"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					{operation === "difference" ? (
						<div className="flex flex-col space-y-2">
							<label
								htmlFor="endDate"
								className="text-sm font-medium leading-snug"
							>
								End Date{" "}
								<span className="text-lg font-medium text-red-600">*</span>
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
								Number of Days{" "}
								<span className="text-lg font-medium text-red-600">*</span>
							</label>
							<Input
								type="number"
								id="days"
								value={days}
								onChange={(e) => setDays(e.target.value)}
							/>
						</div>
					)}
				</div>
				<RadioGroup
					value={operation}
					onValueChange={setOperation}
					className="flex-wrap gap-3"
				>
					<div className="flex items-center space-x-1">
						<RadioGroupItem value="difference" id="difference" />
						<label
							htmlFor="difference"
							className="font-medium text-sm leading-snug"
						>
							Calculate Difference
						</label>
					</div>
					<div className="flex items-center space-x-1">
						<RadioGroupItem value="add" id="add" />
						<label htmlFor="add" className="font-medium text-sm leading-snug">
							Add Days
						</label>
					</div>
					<div className="flex items-center space-x-1">
						<RadioGroupItem value="subtract" id="subtract" />
						<label
							htmlFor="subtract"
							className="font-medium text-sm leading-snug"
						>
							Subtract Days
						</label>
					</div>
				</RadioGroup>
				<div className="flex items-center justify-start">
					<Button onClick={calculateDifference}>Calculate</Button>
				</div>
				{result && <p className="text-sm">{result}</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
			</div>
		</div>
	);
}
