import { NextLink } from "@/components/ui/next-link";

type UsernameSectionProps = {
	username: string;
};

export function UsernameSection({ username }: UsernameSectionProps) {
	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex items-start flex-col gap-1">
				<div className="font-medium">Username</div>
				<div className="text-sm max-w-md text-neutral-500">
					Your username can be edited on{" "}
					<NextLink
						href="/dashboard/settings"
						className="font-medium text-[#5865f2] hover:underline"
					>
						settings
					</NextLink>
					.
				</div>
			</div>
			<div className="flex items-center">
				<div className="inline-flex items-center justify-center rounded h-8 px-2 py-0.5 text-sm text-neutral-500 font-medium bg-neutral-200 border border-neutral-300 dark:bg-neutral-700 dark:border-neutral-700">
					{username}
				</div>
			</div>
		</div>
	);
}
