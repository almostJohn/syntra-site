import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<SVGElement>;

export const icons = {
	Loading: (props: IconProps) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<path d="M12 2v4" />
				<path d="m16.2 7.8 2.9-2.9" />
				<path d="M18 12h4" />
				<path d="m16.2 16.2 2.9 2.9" />
				<path d="M12 18v4" />
				<path d="m4.9 19.1 2.9-2.9" />
				<path d="M2 12h4" />
				<path d="m4.9 4.9 2.9 2.9" />
			</svg>
		);
	},
	Menu: (props: IconProps) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				{...props}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3.75 9h16.5m-16.5 6.75h16.5"
				></path>
			</svg>
		);
	},
	Brand: (props: IconProps) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
			>
				<path d="M19 17V5a2 2 0 0 0-2-2H4" />
				<path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
			</svg>
		);
	},
};
