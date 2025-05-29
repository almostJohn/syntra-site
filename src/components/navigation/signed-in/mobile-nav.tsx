import { UserDrawer } from "./user-drawer";

type MobileNavProps = {
	email: string;
	displayName: string;
	isDashboard?: boolean;
};

export function MobileNav({ email, displayName, isDashboard }: MobileNavProps) {
	return (
		<div className="flex items-center justify-end md:hidden">
			<UserDrawer
				email={email}
				displayName={displayName}
				isDashboard={isDashboard}
			/>
		</div>
	);
}
