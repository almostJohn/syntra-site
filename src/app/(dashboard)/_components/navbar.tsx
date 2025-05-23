import { MainNav } from "./main-nav";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-6 md:px-0 flex items-center justify-between max-w-6xl h-16 md:h-22">
				<MainNav />
			</div>
		</header>
	);
}
