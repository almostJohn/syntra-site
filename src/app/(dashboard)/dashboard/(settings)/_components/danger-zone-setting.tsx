import { DeleteAccountForm } from "./delete-account-form";

export function DangerZoneSetting() {
	return (
		<div className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700 shadow">
			<div className="flex flex-col space-y-4 p-6">
				<h3 className="text-lg font-bold text-red-500">Danger Zone</h3>
				<span className="text-sm">
					Permanently remove your Personal Account and all of it&apos;s contents
					from the Syntra platform. This action is <strong>irreversible</strong>
					, so please continue with caution.
				</span>
			</div>
			<div className="mt-auto px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-end">
					<DeleteAccountForm />
				</div>
			</div>
		</div>
	);
}
