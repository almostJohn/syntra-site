"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
	ArrowLeft,
	Save,
	Eye,
	Edit,
	Bold,
	Italic,
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Heading3,
	Code,
	Link,
	Loader2,
	Underline,
} from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { LOCAL_STORAGE_KEY } from "~/util/constants";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "./ui/tabs";
import {
	TooltipProvider,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "~/lib/utils";
import { geistMono } from "~/util/fonts";

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	time: string;
};

const components = {
	p: ({ children }: { children: React.ReactNode }) => {
		if (typeof children !== "string") {
			return <p>{children}</p>;
		}

		const parts = children.split(/(__[^_]+__)/g);

		if (parts.length === 1) {
			return <p>{children}</p>;
		}

		return (
			<p>
				{parts.map((part, i) => {
					if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
						const text = part.slice(2, -2);
						return <u key={i}>{text}</u>;
					}

					return part;
				})}
			</p>
		);
	},
	li: ({ children }: { children: React.ReactNode }) => {
		if (typeof children !== "string") {
			return <li>{children}</li>;
		}

		const parts = children.split(/(__[^_]+__)/g);

		if (parts.length === 1) {
			return <li>{children}</li>;
		}

		return (
			<li>
				{parts.map((part, i) => {
					if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
						const text = part.slice(2, -2);
						return <u key={i}>{text}</u>;
					}

					return part;
				})}
			</li>
		);
	},
	h1: processUnderlines,
	h2: processUnderlines,
	h3: processUnderlines,
	h4: processUnderlines,
	h5: processUnderlines,
	h6: processUnderlines,
};

function processUnderlines({
	children,
	...props
}: {
	readonly children: React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}) {
	const Tag = props.node.tagName.toLowerCase();

	if (typeof children !== "string") {
		return React.createElement(Tag, props, children);
	}

	const parts = children.split(/(__[^_]+__)/g);

	if (parts.length === 1) {
		return React.createElement(Tag, props, children);
	}

	const processedChildren = parts.map((part, i) => {
		if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
			const text = part.slice(2, -2);
			return <u key={i}>{text}</u>;
		}

		return part;
	});

	return React.createElement(Tag, props, processedChildren);
}

export function TextEditor({ noteId }: { noteId: string }) {
	const [title, setTitle] = React.useState("");
	const [content, setContent] = React.useState("");
	const [note, setNote] = React.useState<Note | null>(null);
	const [activeTab, setActiveTab] = React.useState("edit");
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);
	const router = useRouter();
	const { toast } = useToast();

	React.useEffect(() => {
		const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);

		if (savedNotes) {
			try {
				const parsedNotes = JSON.parse(savedNotes) as Note[];
				const foundNote = parsedNotes.find((note) => note.id === noteId);

				if (foundNote) {
					setNote(foundNote);
					setTitle(foundNote.title);
					setContent(foundNote.content);
				} else {
					toast({
						description: "Note not found.",
						variant: "destructive",
						className: "text-sm",
					});
					router.push("/notes");
				}
			} catch (error_) {
				const error = error_ as Error;
				console.error(error, error.message);
				toast({
					description: "Failed to load note. Please try again.",
					variant: "destructive",
					className: "text-sm",
				});
				router.push("/notes");
			}
		}
	}, [noteId, router, toast]);

	function handleSaveNote() {
		if (!note) {
			return;
		}

		const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
		let notesArray: Note[] = [];

		if (savedNotes) {
			try {
				notesArray = JSON.parse(savedNotes);
			} catch (error_) {
				const error = error_ as Error;
				console.error("Error parsing notes: ", error.message);
			}
		}

		const updatedNotes = notesArray.map((n) =>
			n.id === noteId
				? {
						...n,
						title,
						content,
						createdAt: new Date().toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						}),
						time: new Date().toLocaleTimeString("en-US", {
							hour: "numeric",
							minute: "2-digit",
						}),
				  }
				: n,
		);

		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));

		toast({
			description: "Note saved successfully.",
			className: "text-sm",
		});
	}

	function handleBackToNotes() {
		router.push("/notes");
	}

	function insertMarkdown(markdownSyntax: string, selectionOffset = 0) {
		const textarea = textareaRef.current;
		if (!textarea) {
			return;
		}

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = content.substring(start, end);

		let newContent;
		let newCursorPos;

		if (selectedText) {
			newContent =
				content.substring(0, start) +
				markdownSyntax.replace("text", selectedText) +
				content.substring(end);

			newCursorPos = end + markdownSyntax.length - 4;
		} else {
			newContent =
				content.substring(0, start) + markdownSyntax + content.substring(end);

			newCursorPos = start + selectionOffset;
		}

		setContent(newContent);

		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(newCursorPos, newCursorPos);
		}, 0);
	}

	if (!note) {
		return (
			<div className="p-4">
				<Loader2 className="size-6 animate-spin mr-2" /> Loading...
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center mb-6 text-sm">
				<span className="text-primary font-medium">Notes</span>
				<span className="mx-2">/</span>
				<span className="text-muted-foreground">{title}</span>
			</div>

			<div className="bg-background border rounded-md">
				<div className="p-4 flex items-center border-b">
					<Button
						variant="ghost"
						size="icon"
						className="size-6 mr-2"
						onClick={handleBackToNotes}
					>
						<ArrowLeft className="size-4" />
					</Button>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full bg-background font-medium border-none focus-visible:ring-0 shadow-none focus-visible:outline-none"
						placeholder="Note Title"
					/>
					<Button
						variant="outline"
						size="sm"
						className="ml-2 px-3 py-0.5"
						onClick={handleSaveNote}
					>
						<Save className="size-4 mr-2" />
						Save
					</Button>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<div className="flex flex-col gap-4 items-start md:flex-row md:items-center md:justify-between px-4 py-3 border-b">
						<TabsList>
							<TabsTrigger value="edit" className="flex items-center gap-1">
								<Edit className="size-4" />
								Edit
							</TabsTrigger>
							<TabsTrigger value="preview" className="flex items-center gap-1">
								<Eye className="size-4" />
								Preview
							</TabsTrigger>
						</TabsList>

						{activeTab === "edit" && (
							<TooltipProvider>
								<div className="flex items-center gap-1 flex-wrap">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("**text**", 2)}
											>
												<Bold className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Bold</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("*text*", 1)}
											>
												<Italic className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Italic</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("__text__", 2)}
											>
												<Underline className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Underline</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("# text", 2)}
											>
												<Heading1 className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Heading 1</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("## text", 3)}
											>
												<Heading2 className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Heading 2</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("### text", 4)}
											>
												<Heading3 className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Heading 3</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("- text", 2)}
											>
												<List className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Bullet List</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("1. text", 3)}
											>
												<ListOrdered className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Numbered List</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("`text`", 1)}
											>
												<Code className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Code</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="size-6"
												onClick={() => insertMarkdown("[text](url)", 1)}
											>
												<Link className="size-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>Link</TooltipContent>
									</Tooltip>
								</div>
							</TooltipProvider>
						)}
					</div>

					<TabsContent value="edit" className="p-0 m-0">
						<div className="p-4 h-[calc(100vh-250px)]">
							<textarea
								name="text-editor"
								id="text-editor"
								ref={textareaRef}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className={cn(
									"w-full bg-background h-full resize-none border-none shadow-none focus-visible:ring-0 focus-visible:outline-none whitespace-pre-wrap",
									geistMono.className,
								)}
								placeholder="Start typing your note here... (Markdown supported)"
							/>
						</div>
					</TabsContent>

					<TabsContent value="preview" className="p-0 m-0">
						<div className="p-4 h-[calc(100vh-250px)] overflow-auto prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
							{content ? (
								<ReactMarkdown
									rehypePlugins={[rehypeRaw]}
									// @ts-expect-error: This is fine.
									components={components}
								>
									{content}
								</ReactMarkdown>
							) : (
								<p className="text-muted-foreground">No content to preview.</p>
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}
