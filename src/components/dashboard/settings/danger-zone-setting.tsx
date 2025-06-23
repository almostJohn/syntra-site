import { DeleteAccountForm } from "./delete-account-form";

export function DangerZoneSetting() {
	return (
		<div className="flex flex-col rounded-xl border border-red-200 bg-background shadow">
			<div className="flex flex-col space-y-4 p-6">
				<h3 className="text-lg text-red-600 font-bold">Danger Zone</h3>
				<p className="text-sm">
					Permanently remove your Personal Account and all of it&apos;s contents
					from the Syntra platform. This action is <strong>irreversible</strong>
					, so please continue with caution.
				</p>
			</div>
			<div className="px-6 py-4 border-t border-red-200 bg-red-100 mt-auto rounded-b-xl">
				<div className="flex items-center justify-end">
					<DeleteAccountForm />
				</div>
			</div>
		</div>
	);
}
