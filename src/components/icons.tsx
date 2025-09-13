import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<SVGElement>;

export const Icons = {
	menu: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z" />
				</g>
			</svg>
		);
	},
};
