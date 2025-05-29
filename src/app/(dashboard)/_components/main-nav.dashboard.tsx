import { UserMenu } from "./user-menu.dashboard";

type MainNavProps = {
	email: string;
	displayName: string;
};

export function MainNav({ email, displayName }: MainNavProps) {
	return (
		<div className="hidden items-center justify-end md:flex">
			<UserMenu email={email} displayName={displayName} />
		</div>
	);
}
