"use client";

import * as React from "react";
import { format, addDays, subDays, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";

export function DateCalculator() {
	const [startDate, setStartDate] = React.useState<Date | undefined>();
	const [endDate, setEndDate] = React.useState<Date | undefined>();
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

		if (operation === "difference") {
			if (endDate) {
				const daysDiff = Math.abs(differenceInDays(endDate, startDate));
				setResult(`The difference is ${daysDiff} days`);
				setError("");
			}
		} else {
			const daysNum = Number.parseInt(days);
			if (isNaN(daysNum)) {
				setResult("");
				setError("Please enter a valid number of days.");
				return;
			}

			const resultDate =
				operation === "add"
					? addDays(startDate, daysNum)
					: subDays(startDate, daysNum);

			setResult(`The resulting date is ${format(resultDate, "MM/dd/yyyy")}`);
			setError("");
		}
	}

	function clearForm() {
		setStartDate(undefined);
		setEndDate(undefined);
		setDays("0");
		setResult("");
		setError(null);
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
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-start text-left font-normal md:w-[250px]",
										!startDate && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="size-4 mr-2" />
									{startDate ? (
										format(startDate, "PPP")
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="center">
								<Calendar
									mode="single"
									selected={startDate}
									onSelect={setStartDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
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
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-start text-left font-normal md:w-[250px]",
											!endDate && "text-muted-foreground",
										)}
									>
										<CalendarIcon className="size-4 mr-2" />
										{endDate ? (
											format(endDate, "PPP")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="center">
									<Calendar
										mode="single"
										selected={endDate}
										onSelect={setEndDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					) : (
						<div className="flex flex-col space-y-2">
							<label
								htmlFor="days"
								className="text-sm font-medium leading-snug"
							>
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
					<Button size="sm" onClick={calculateDifference}>
						Calculate
					</Button>
				</div>
				{result && <p className="text-sm">{result}</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
			</div>
		</div>
	);
}
