import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import type {
	ForwardRefExoticComponent,
	HTMLAttributes,
	RefAttributes,
} from "react";

type StatCardProps = HTMLAttributes<HTMLDivElement> & {
	title: string;
	count: number;
	trend?: string;
	textColor: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">> &
		RefAttributes<SVGSVGElement>;
};

export function StatCard({
	title,
	count,
	trend,
	textColor,
	className,
	icon: Icon,
}: StatCardProps) {
	return (
		<div className="bg-background p-6 rounded-md border border-border shadow">
			<div className="flex items-center justify-between">
				<div className="flex flex-col space-y-1">
					<div className="text-sm font-medium">{title}</div>
					<div className="text-3xl font-bold">{count}</div>
				</div>
				<div
					className={cn(
						"size-12 flex items-center justify-center rounded-sm",
						className,
					)}
				>
					<Icon className="size-6 shrink-0" />
				</div>
			</div>
			{trend && <p className={cn("text-xs mt-2", textColor)}>{trend}</p>}
		</div>
	);
}
