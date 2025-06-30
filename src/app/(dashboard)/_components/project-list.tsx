"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./project-card";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Project = {
	id: string;
	name: string;
	createdAt: Date;
};

type ProjectListProps = {
	projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("newest");
	const [viewMode, setViewMode] = useState("grid");

	const filteredAndSortedProjects = useMemo(() => {
		const filtered = projects.filter((project) =>
			project.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);

		filtered.sort((a, b) => {
			switch (sortBy) {
				case "newest":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				case "oldest":
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
				case "name":
					return a.name.localeCompare(b.name);
				default:
					return 0;
			}
		});

		return filtered;
	}, [searchQuery, sortBy, projects]);

	return (
		<div className="flex flex-col space-y-6">
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full">
				<div className="relative">
					<Search className="size-4 shrink-0 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
					<Input
						type="text"
						placeholder="Search projects..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10 h-10 w-full sm:w-72 rounded-sm"
					/>
				</div>
				<div className="flex items-center justify-between md:justify-end gap-4">
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-[140px] rounded-sm h-10">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest First</SelectItem>
							<SelectItem value="oldest">Oldest First</SelectItem>
							<SelectItem value="name">Name (A-Z)</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-sm p-1">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="icon"
							className="p-0 cursor-pointer size-8 rounded-l-sm rounded-r-none"
							onClick={() => setViewMode("grid")}
						>
							<Grid3X3 className="size-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="icon"
							className="p-0 cursor-pointer size-8 rounded-r-sm rounded-l-none"
							onClick={() => setViewMode("list")}
						>
							<List className="size-4" />
						</Button>
					</div>
				</div>
			</div>
			<div
				className={
					viewMode === "grid"
						? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6"
						: "flex flex-col space-y-2"
				}
			>
				{filteredAndSortedProjects.map((project) =>
					viewMode === "grid" ? (
						<ProjectCard key={project.id} project={project} isGrid />
					) : (
						<ProjectCard key={project.id} project={project} />
					),
				)}
			</div>
		</div>
	);
}
