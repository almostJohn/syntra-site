import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type BreadcrumbsProps = {
	username: string;
	displayName: string;
};

export function Breadcrumbs({ username, displayName }: BreadcrumbsProps) {
	return (
		<div className="hidden items-center gap-4 md:flex">
			<span className="text-6xl font-thin text-muted-foreground">/</span>
			<div className="flex items-center space-x-3">
				<Avatar className="rounded-md">
					<AvatarFallback className="rounded-md bg-blue-600/10 text-blue-600">
						{displayName && displayName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col space-y-0.5">
					<span className="font-semibold">{displayName && displayName}</span>
					<span className="text-sm text-muted-foreground">
						@{username && username}
					</span>
				</div>
			</div>
		</div>
	);
}
