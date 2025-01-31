import * as React from "react";
import { Notepad } from "~/components/notepad";
import { DateCalculator } from "~/components/date-calculator";
import { LiveClock } from "~/components/live-clock";
import { Todolist } from "~/components/todolist";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function IndexPage() {
	return (
		<div className="min-h-screen px-5 py-8 md:pb-16">
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-center">
					<LiveClock />
				</div>
				<Tabs defaultValue="notepad" className="w-full">
					<TabsList className="inline-flex items-center justify-start bg-transparent border-b-2 rounded-none w-full">
						<TabsTrigger
							className="transition py-2.5 data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=inactive]:border-border border-foreground rounded-none"
							value="notepad"
						>
							notepad
						</TabsTrigger>
						<TabsTrigger
							className="transition py-2.5 data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=inactive]:border-border border-foreground rounded-none"
							value="date-calculator"
						>
							date calculator
						</TabsTrigger>
						<TabsTrigger
							className="transition py-2.5 data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-2 data-[state=inactive]:border-border border-foreground rounded-none"
							value="to-do-list"
						>
							to-do-list
						</TabsTrigger>
					</TabsList>
					<TabsContent value="notepad">
						<div className="mt-4">
							<Notepad />
						</div>
					</TabsContent>
					<TabsContent value="date-calculator">
						<div className="mt-4">
							<DateCalculator />
						</div>
					</TabsContent>
					<TabsContent value="to-do-list">
						<div className="mt-4">
							<Todolist />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
