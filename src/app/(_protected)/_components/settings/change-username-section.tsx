import { AtSign } from "lucide-react";
import { UpdateUsernameModal } from "../client/update-username-modal";

type User = {
	id: string;
	username: string;
};

type ChangeUsernameSectionProps = {
	user: User;
};

export function ChangeUsernameSection({ user }: ChangeUsernameSectionProps) {
	return (
		<div className="grid gap-2">
			<h2 className="border-b border-neutral-800 text-base/7 font-semibold sm:text-sm/6">
				Username
			</h2>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					<AtSign className="size-4 shrink-0 text-neutral-500" />
					<p className="text-sm font-medium text-neutral-500">
						{user.username}
					</p>
				</div>
				<div className="flex items-center justify-end">
					<UpdateUsernameModal user={user} />
				</div>
			</div>
		</div>
	);
}
