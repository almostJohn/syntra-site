import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NextLink } from "@/components/ui/next-link";

type TeamItemProps = {
	id: string;
	name: string;
};

export function TeamItem({ id, name }: TeamItemProps) {
	return (
		<NextLink
			href={`/dashboard/teams/${id}`}
			className="block rounded-xl p-6 border border-border bg-background transition-shadow hover:shadow-lg"
		>
			<div className="flex flex-col space-y-3 items-center justify-center mx-auto">
				<Avatar className="size-16 border border-blue-600">
					<AvatarFallback className="text-blue-600 bg-blue-0 text-2xl">
						{name.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<h3 className="text-lg text-center font-semibold">{name}</h3>
			</div>
		</NextLink>
	);
}
