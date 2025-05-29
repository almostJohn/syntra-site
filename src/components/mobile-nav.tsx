import { UserDrawerMenu } from "./user-drawer-menu";

type MobileNavProps = {
	email: string;
	displayName: string;
};

export function MobileNav({ email, displayName }: MobileNavProps) {
	return (
		<div className="flex items-center justify-end md:hidden">
			<UserDrawerMenu email={email} displayName={displayName} />
		</div>
	);
}
