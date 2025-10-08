import { Lock } from "lucide-react";
import { UpdatePasswordModal } from "../client/update-password-modal";

export function PasswordSection() {
	return (
		<div className="grid gap-2">
			<h2 className="border-b border-neutral-800 text-base/7 font-semibold sm:text-sm/6">
				Password
			</h2>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					<Lock className="size-4 shrink-0 text-neutral-500" />
					<p className="text-sm font-medium text-neutral-500">
						(Password hidden by default)
					</p>
				</div>
				<div className="flex items-center justify-end">
					<UpdatePasswordModal />
				</div>
			</div>
		</div>
	);
}
