import { DeleteProject } from "./delete-project";

type DangerZoneProps = {
	projectId: string;
};

export function DangerZone({ projectId }: DangerZoneProps) {
	return (
		<div className="flex flex-col bg-transparent rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex flex-col gap-4 p-5">
				<div className="font-medium text-red-500">Danger Zone</div>
				<div className="text-sm max-w-xl">
					Permanently remove this Project and all of it&apos;s contents from the
					Syntra platform. This action is <strong>irreversible</strong>, so
					please continue with caution.
				</div>
			</div>
			<div className="mt-auto px-5 py-3 border-t border-neutral-200 dark:border-neutral-700">
				<div className="flex items-center justify-end">
					<DeleteProject projectId={projectId} />
				</div>
			</div>
		</div>
	);
}
