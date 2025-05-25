import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type BreadcrumbsProps = {
	displayName: string;
};

export function Breadcrumbs({ displayName }: BreadcrumbsProps) {
	return (
		<div className="hidden items-center gap-4 md:flex">
			<span className="text-6xl font-thin text-muted-foreground">/</span>
			<div className="flex items-center space-x-3">
				<Avatar className="rounded-md">
					<AvatarFallback className="rounded-md bg-blue-600/10 text-blue-600">
						{displayName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<h2 className="font-semibold">{displayName}</h2>
			</div>
		</div>
	);
}
