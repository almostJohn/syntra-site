"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectCard } from "./project-card";
import { Input } from "@/components/ui/input";
import { Grid2X2, List, Search } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyIconPlaceholder,
} from "@/components/ui/empty";
import { Icons } from "@/components/icons";

type Project = {
	id: string;
	name: string;
	createdAt: Date;
};

type ProjectListProps = {
	projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
	const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
	const [viewMode, setViewMode] = useState(searchParams.get("view") || "grid");

	function updateParams(params: Record<string, string>) {
		const newParams = new URLSearchParams(searchParams.toString());

		for (const [key, value] of Object.entries(params)) {
			if (value) {
				newParams.set(key, value);
			} else {
				newParams.delete(key);
			}
		}

		router.replace(`?${newParams.toString()}`);
	}

	useEffect(() => {
		updateParams({
			q: searchQuery,
			sort: sortBy,
			view: viewMode,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery, sortBy, viewMode]);

	const filteredAndSortedProjects = useMemo(() => {
		const filtered = projects.filter((p) =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
		<div className="flex flex-col gap-6">
			<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="relative">
					<Search className="absolute top-1/2 left-3 size-4 shrink-0 -translate-y-1/2 transform text-neutral-500" />
					<Input
						type="text"
						placeholder="Search projects..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="input-default-class w-full pl-10"
					/>
				</div>
				<div className="flex items-center justify-between gap-4 md:justify-end">
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="input-default-class h-10 w-[140px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent className="rounded-lg border border-neutral-300 bg-neutral-100/95 text-neutral-900 shadow-xl">
							<SelectItem
								className="focus:bg-blue-500 focus:text-white [&_svg:not([class*='text-'])]:text-white"
								value="newest"
							>
								Newest
							</SelectItem>
							<SelectItem
								className="focus:bg-blue-500 focus:text-white [&_svg:not([class*='text-'])]:text-white"
								value="oldest"
							>
								Oldest
							</SelectItem>
							<SelectItem
								className="focus:bg-blue-500 focus:text-white [&_svg:not([class*='text-'])]:text-white"
								value="name"
							>
								Name (A-Z)
							</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex h-9 items-center rounded-lg border border-neutral-300 p-0.5">
						<Button
							type="button"
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="icon"
							className="size-8 rounded-l-lg rounded-r-none px-2"
							onClick={() => setViewMode("grid")}
						>
							<Grid2X2 className="size-5 shrink-0" />
						</Button>
						<Button
							type="button"
							variant={viewMode === "list" ? "default" : "ghost"}
							size="icon"
							className="size-8 rounded-l-none rounded-r-lg px-2"
							onClick={() => setViewMode("list")}
						>
							<List className="size-5 shrink-0" />
						</Button>
					</div>
				</div>
			</div>
			{filteredAndSortedProjects.length === 0 ? (
				<Empty>
					<EmptyHeader>
						<EmptyIconPlaceholder>
							<Icons.sparkles className="size-8 shrink-0" />
						</EmptyIconPlaceholder>
					</EmptyHeader>
					<EmptyContent>
						No projects found. Adjust your search query for correct matches.
					</EmptyContent>
				</Empty>
			) : (
				<>
					<div
						className={
							viewMode === "grid"
								? "grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-5"
								: "grid gap-4"
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
				</>
			)}
		</div>
	);
}
