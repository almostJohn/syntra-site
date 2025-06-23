import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AvatarSettingProps = {
	name: string;
};

export function AvatarSetting({ name }: AvatarSettingProps) {
	return (
		<div className="flex flex-col rounded-xl bg-background border border-border shadow">
			<div className="flex justify-between w-full p-6">
				<div className="flex flex-col space-y-4">
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-bold">Avatar</h3>
						<div className="flex items-center justify-center px-2 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium">
							Beta
						</div>
					</div>
					<div className="flex flex-col space-y-1">
						<p className="text-sm">This is your avatar.</p>
						<p className="text-sm">
							We&apos;re working hard to bring you custom avatar uploads! This
							feature is currently in beta and will be available soon.{" "}
						</p>
					</div>
				</div>
				<div className="flex">
					<Avatar className="size-20 border border-blue-600">
						<AvatarFallback className="text-2xl bg-blue-50 text-blue-600">
							{name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="px-6 py-4 mt-auto border-t border-border">
				<p className="text-sm text-muted-foreground">
					An avatar is optional but strongly recommended.
				</p>
			</div>
		</div>
	);
}
