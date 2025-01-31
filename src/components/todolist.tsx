"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

type Todo = {
	id: number;
	text: string;
	isComplete: boolean;
};

export function Todolist() {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const [newTodoText, setNewTodoText] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);

	function addTodo(e: React.FormEvent) {
		e.preventDefault();

		if (!newTodoText.trim() || newTodoText === "") {
			setError("Please provide a text value.");
			return;
		}

		if (newTodoText.trim() !== "") {
			setTodos([
				...todos,
				{ id: Date.now(), text: newTodoText, isComplete: false },
			]);
			setNewTodoText("");
			setError("");
		}
	}

	function toggleTodo(id: number) {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
			),
		);
	}

	function removeTodo(id: number) {
		setTodos(todos.filter((todo) => todo.id !== id));
	}

	return (
		<div className="block p-5 border border-neutral-300 rounded-md shadow-sm">
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-1">
					<h3 className="font-medium tracking-tight">to-do-list</h3>
					<p className="text-xs italic font-light text-orange-500">
						Warning: Refreshing the site will cause your data to be lost.
					</p>
				</div>
				<form onSubmit={addTodo} className="flex flex-col space-y-4">
					<div className="flex flex-col space-y-2">
						<label
							htmlFor="todo-text"
							className="text-sm font-medium leading-snug"
						>
							Task Name{" "}
							<span className="text-lg font-medium text-red-600">*</span>
						</label>
						<Input
							id="todo-text"
							type="text"
							value={newTodoText}
							onChange={(e) => setNewTodoText(e.target.value)}
							placeholder="task-01"
							className="w-full"
						/>
					</div>
					<div className="flex items-center justify-start">
						<Button type="submit">Add Task</Button>
					</div>
				</form>
				{todos.length > 0 && (
					<ul className="space-y-2">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="flex items-center justify-between px-4 py-2 border border-border bg-muted rounded"
							>
								<div className="flex items-center space-x-2">
									<Checkbox
										checked={todo.isComplete}
										onCheckedChange={() => toggleTodo(todo.id)}
										id={`todo-${todo.id}`}
									/>
									<label
										htmlFor={`todo-${todo.id}`}
										className={`${
											todo.isComplete ? "line-through text-neutral-500" : ""
										}`}
									>
										{todo.text}
									</label>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="hover:bg-transparent hover:text-red-600"
									onClick={() => removeTodo(todo.id)}
								>
									<X className="size-4" />
								</Button>
							</li>
						))}
					</ul>
				)}
				{error && <p className="text-sm text-red-600">{error}</p>}
			</div>
		</div>
	);
}
