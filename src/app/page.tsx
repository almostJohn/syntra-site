import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Notes } from "~/components/notes";

export default function Homepage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="flex flex-col gap-4">
				<Header />
				<Notes />
				<Footer />
			</div>
		</div>
	);
}
