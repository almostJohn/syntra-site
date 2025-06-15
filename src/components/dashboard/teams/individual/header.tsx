type HeaderProps = {
	name: string;
};

export function Header({ name }: HeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<h3 className="text-3xl font-bold">{name} Team</h3>
		</div>
	);
}
