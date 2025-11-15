"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/types";
import { ProjectItem } from "./project-item";
import { Grid2X2, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Empty, EmptyHeading, EmptyText } from "@/components/ui/empty";

type ProjectListProps = {
	projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isGridView, setIsGridView] = useState(
		searchParams.get("view") === "grid",
	);
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get("search") || "",
	);
	const [sortOrder, setSortOrder] = useState(
		searchParams.get("sort") || "newest",
	);

	function updateURLParams(params: Record<string, string | null>) {
		const newParams = new URLSearchParams(searchParams.toString());

		for (const [key, value] of Object.entries(params)) {
			if (value === null) {
				newParams.delete(key);
			} else {
				newParams.set(key, value);
			}
		}

		router.replace(`/dashboard?${newParams.toString()}`);
	}

	useEffect(() => {
		updateURLParams({
			view: isGridView ? "grid" : "list",
			search: searchQuery || null,
			sort: sortOrder,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery, sortOrder, isGridView]);

	const filteredProjects = useMemo(() => {
		const filtered = projects.filter((project) =>
			project.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);

		filtered.sort((a, b) => {
			switch (sortOrder) {
				case "newest":
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				case "oldest":
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
				case "a-z":
					return a.name.localeCompare(b.name);
				case "z-a":
					return b.name.localeCompare(a.name);
				default:
					return 0;
			}
		});

		return filtered;
	}, [projects, searchQuery, sortOrder]);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="relative">
					<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-neutral-500" />
					<Input
						type="text"
						placeholder="Search projects..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full border-neutral-300 pl-10 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30"
					/>
				</div>
				<div className="flex items-center justify-between gap-4 md:justify-end">
					<Select
						value={sortOrder}
						onValueChange={(value) => setSortOrder(value)}
					>
						<SelectTrigger className="w-[150px] border-neutral-300 focus-visible:border-teal-500/60 focus-visible:ring-teal-500/30">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest</SelectItem>
							<SelectItem value="oldest">Oldest</SelectItem>
							<SelectItem value="a-z">A - Z</SelectItem>
							<SelectItem value="z-a">Z - A</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex h-9 items-center rounded-md border border-neutral-300 p-0.5">
						<Button
							variant={isGridView ? "default" : "ghost"}
							size="icon"
							onClick={() => setIsGridView(true)}
							className="size-8 rounded-l-md rounded-r-none px-2"
						>
							<Grid2X2 className="size-4" />
						</Button>
						<Button
							variant={!isGridView ? "default" : "ghost"}
							size="icon"
							onClick={() => setIsGridView(false)}
							className="size-8 rounded-l-none rounded-r-md px-2"
						>
							<List className="size-4" />
						</Button>
					</div>
				</div>
			</div>
			{filteredProjects.length === 0 ? (
				<Empty>
					<EmptyHeading>No Projects Found</EmptyHeading>
					<EmptyText>
						Try adjusting your search or filter to find what you&apos;re looking
						for.
					</EmptyText>
				</Empty>
			) : (
				<div
					className={
						isGridView
							? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
							: "flex flex-col gap-2"
					}
				>
					{filteredProjects.map((project) => (
						<ProjectItem
							key={project.id}
							project={project}
							isGridView={isGridView}
						/>
					))}
				</div>
			)}
		</div>
	);
}
