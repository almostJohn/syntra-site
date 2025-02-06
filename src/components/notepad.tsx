"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { transformText } from "~/util/transformText";
import { X } from "lucide-react";

export function Notepad() {
	const [text, setText] = React.useState("");
	const [suggestions, setSuggestions] = React.useState<string[]>([]);
	const [selectedSuggestion, setSelectedSuggestion] = React.useState(-1);
	const [interacted, setInteracted] = React.useState(false);
	const [savedPhrases, setSavedPhrases] = React.useState<string[]>([]);
	const [newPhrase, setNewPhrase] = React.useState("");
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	React.useEffect(() => {
		const storedPhrases = localStorage.getItem("autocompletePhrases");
		if (storedPhrases) {
			setSavedPhrases(JSON.parse(storedPhrases));
		}
	}, []);

	React.useEffect(() => {
		localStorage.setItem("autocompletePhrases", JSON.stringify(savedPhrases));
	}, [savedPhrases]);

	React.useEffect(() => {
		const savedText = localStorage.getItem("notepadText");
		if (savedText) {
			setText(savedText);
		}
	}, []);

	React.useEffect(() => {
		localStorage.setItem("notepadText", text);
	}, [text]);

	React.useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.setSelectionRange(text.length, text.length);
		}
	}, [text]);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newText = e.target.value;

		setText(newText);

		const lastWord = newText.split(" ").pop() || "";
		if (lastWord.length > 1) {
			const newSuggestions = savedPhrases.filter((phrases) =>
				phrases.toLowerCase().startsWith(lastWord.toLowerCase()),
			);
			setSuggestions(newSuggestions);
			setSelectedSuggestion(-1);
		} else {
			setSuggestions([]);
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedSuggestion((prev) =>
				Math.min(prev + 1, suggestions.length - 1),
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedSuggestion((prev) => Math.max(prev - 1, -1));
		} else if (e.key === "Enter" && selectedSuggestion > -1) {
			e.preventDefault();
			applySuggestion(suggestions[selectedSuggestion]);
		}
	}

	function applySuggestion(suggestion: string) {
		const words = text.split(" ");
		words[words.length - 1] = suggestion;
		setText(words.join(" ") + " ");
		setSuggestions([]);
		textareaRef.current?.focus();
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(text).then(() => {
			setInteracted(true);

			setTimeout(() => {
				setInteracted(false);
			}, 2_000);
		});
	}

	function savePhrase() {
		if (newPhrase && !savedPhrases.includes(newPhrase)) {
			setSavedPhrases([...savedPhrases, newPhrase]);
			setNewPhrase("");
		}
	}

	function deletePhrase(phrase: string) {
		setSavedPhrases(savedPhrases.filter((p) => p !== phrase));
	}

	function clearText() {
		setText("");
		localStorage.removeItem("notepadText");
	}

	return (
		<div className="container max-w-screen-2xl">
			<div className="flex flex-col space-y-4 pt-6 pb-12">
				<div className="flex flex-col-reverse space-y-3 md:items-center md:flex-row md:justify-between md:space-y-0 w-full">
					{savedPhrases.length > 0 ? (
						<div className="flex flex-col space-y-2 mt-6 md:mt-0">
							<h1 className="text-lg font-medium leading-snug">
								Saved Phrases
							</h1>
							<div className="flex flex-row flex-wrap gap-4">
								{savedPhrases.map((phrase) => (
									<li
										key={phrase}
										className="inline-flex items-center justify-between text-sm font-medium px-2 py-0.5 bg-muted border"
									>
										<span>{phrase}</span>
										<Button
											variant="ghost"
											size="icon"
											className="hover:bg-transparent transition hover:text-red-600"
											onClick={() => deletePhrase(phrase)}
										>
											<X className="size-4 shrink-0" />
										</Button>
									</li>
								))}
							</div>
						</div>
					) : (
						<div className="flex flex-col space-y-0.5 mt-6 md:mt-0">
							<h1 className="text-lg font-medium leading-snug">
								Saved Phrases
							</h1>
							<p className="text-sm text-muted-foreground">
								No saved phrases yet
							</p>
						</div>
					)}
					<div className="flex items-center justify-end space-x-3">
						<input
							type="text"
							value={newPhrase}
							onChange={(e) => setNewPhrase(e.target.value)}
							placeholder="Enter a new phrase to save..."
							className="inline-flex p-2 items-center text-sm font-medium w-full border border-neutral-300 rounded-none transition hover:border-blue-600 focus:border-blue-600 focus:ring-0 focus:outline-none sm:w-72"
						/>
						<Button
							variant="ghost"
							onClick={savePhrase}
							size="sm"
							className="px-2 py-0.5 text-xs rounded-none font-bold bg-blue-500 text-white transition hover:bg-blue-600 hover:text-white"
						>
							Save Phrase
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4">
					<div className="w-full">
						<div className="flex flex-col space-y-2">
							<div className="flex items-center justify-between w-full">
								<div className="flex flex-col space-y-0.5">
									<h1 className="text-lg font-medium leading-snug">Notepad</h1>
									<p className="text-xs text-muted-foreground italic font-light mr-2 md:mr-0">
										Tip: Use **bold**, *italic* or __underline__ for text
										formatting.
									</p>
								</div>
								<Button
									variant="ghost"
									onClick={clearText}
									size="sm"
									className="rounded-none h-8 px-2 py-0.5 text-xs font-bold border border-red-600 text-red-600 bg-transparent transition hover:bg-red-600 hover:text-white"
								>
									Clear
								</Button>
							</div>
							{suggestions.length > 0 && (
								<ul className="inline-flex items-center text-sm font-medium mt-1 border border-blue-600 text-blue-600 shadow-lg w-full">
									{suggestions.map((suggestion, i) => (
										<li
											key={i}
											className={`w-full px-3 py-2 cursor-pointer ${
												i === selectedSuggestion
													? "bg-blue-600 text-white"
													: "hover:bg-blue-600 hover:text-white"
											}`}
											onClick={() => applySuggestion(suggestion)}
										>
											{suggestion}
										</li>
									))}
								</ul>
							)}
							<textarea
								ref={textareaRef}
								value={text}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								className="resize-none h-96 rounded-none bg-background text-sm p-3 w-full border border-neutral-300 transition focus:outline-none shadow-lg focus:ring-0 hover:border-blue-600 focus:border-blue-600"
								spellCheck={true}
								placeholder="Start typing here..."
							/>
						</div>
					</div>
					<div className="w-full">
						<div className="relative block p-3 w-full h-[435px] rounded-none border border-blue-600 shadow-lg bg-background overflow-y-auto">
							<Button
								variant="ghost"
								onClick={copyToClipboard}
								size="sm"
								className="absolute top-3 right-3 rounded-none h-8 px-3 py-[1px] text-xs font-bold border border-blue-600 text-blue-600 bg-transparent transition hover:bg-blue-600 hover:text-white"
							>
								{interacted ? "Copied" : "Copy"}
							</Button>
							<div
								className="overflow-auto text-sm mr-16"
								dangerouslySetInnerHTML={{ __html: transformText(text) }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
