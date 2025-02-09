import * as React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
	menu: (props: IconProps) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="!size-6"
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
	logo: (props: IconProps) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="lucide lucide-notepad-text-dashed"
				{...props}
			>
				<path d="M8 2v4" />
				<path d="M12 2v4" />
				<path d="M16 2v4" />
				<path d="M16 4h2a2 2 0 0 1 2 2v2" />
				<path d="M20 12v2" />
				<path d="M20 18v2a2 2 0 0 1-2 2h-1" />
				<path d="M13 22h-2" />
				<path d="M7 22H6a2 2 0 0 1-2-2v-2" />
				<path d="M4 14v-2" />
				<path d="M4 8V6a2 2 0 0 1 2-2h2" />
				<path d="M8 10h6" />
				<path d="M8 14h8" />
				<path d="M8 18h5" />
			</svg>
		);
	},
};
