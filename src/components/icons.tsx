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
};
