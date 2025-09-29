import * as React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
	todo: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M16.768 5.714a2 2 0 0 1 3.064 2.572L10.833 19.01a2 2 0 1 1-3.064-2.57zM3 12.74a2 2 0 1 1 4 0a2 2 0 0 1-4 0"
				/>
			</svg>
		);
	},
};
