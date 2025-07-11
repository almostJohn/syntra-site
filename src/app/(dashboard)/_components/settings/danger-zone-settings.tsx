import { DeleteAccount } from "./delete-account";

export function DangerZoneSettings() {
	return (
		<div className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700 shadow">
			<div className="flex flex-col p-5 gap-4">
				<div className="font-medium text-red-500">Danger Zone</div>
				<div className="max-w-md text-sm">
					Permanently remove your Personal Account and all of it&apos;s contents
					from the Syntra platform. This action is <strong>irreversible</strong>
					, so please continue with caution.
				</div>
			</div>
			<div className="mt-auto px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-end">
					<DeleteAccount />
				</div>
			</div>
		</div>
	);
}
