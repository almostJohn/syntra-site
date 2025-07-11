import { DeleteProject } from "./delete-project";

type DangerZoneProps = {
	projectId: string;
};

export function DangerZone({ projectId }: DangerZoneProps) {
	return (
		<div className="flex flex-col bg-transparent rounded-sm border border-neutral-200 dark:border-neutral-700 shadow">
			<div className="flex flex-col space-y-4 p-6">
				<h3 className="text-lg font-bold text-red-500">Danger Zone</h3>
				<span className="text-sm">
					Permanently remove this Project and all of it&apos;s contents from the
					Syntra platform. This action is <strong>irreversible</strong>, so
					please continue with caution.
				</span>
			</div>
			<div className="mt-auto px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-end">
					<DeleteProject projectId={projectId} />
				</div>
			</div>
		</div>
	);
}
