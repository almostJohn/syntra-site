import { NextLink } from "@/components/ui/next-link";

type TeamItemProps = {
	id: string;
	name: string;
	description: string;
};

export function TeamItem({ id, name, description }: TeamItemProps) {
	return (
		<NextLink
			href={`/dashboard/teams/${id}`}
			className="p-6 rounded-xl border border-border bg-background flex items-center"
		>
			<div className="flex flex-col space-y-0.5">
				<h3 className="font-medium">{name}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</NextLink>
	);
}
