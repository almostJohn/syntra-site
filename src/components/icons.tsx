import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<SVGElement>;

export const Icons = {
	// Dashboard Icon
	dashboard: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M3 6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm0 10a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2zM13 6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6zm5 8a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2z"
						fill="currentColor"
					/>
				</g>
			</svg>
		);
	},

	// Loading Icon
	loading: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
					<animate
						id="svgSpinnersBlocksShuffle30"
						fill="freeze"
						attributeName="x"
						begin="0;svgSpinnersBlocksShuffle3b.end"
						dur="0.2s"
						values="1;13"
					/>
					<animate
						id="svgSpinnersBlocksShuffle31"
						fill="freeze"
						attributeName="y"
						begin="svgSpinnersBlocksShuffle38.end"
						dur="0.2s"
						values="1;13"
					/>
					<animate
						id="svgSpinnersBlocksShuffle32"
						fill="freeze"
						attributeName="x"
						begin="svgSpinnersBlocksShuffle39.end"
						dur="0.2s"
						values="13;1"
					/>
					<animate
						id="svgSpinnersBlocksShuffle33"
						fill="freeze"
						attributeName="y"
						begin="svgSpinnersBlocksShuffle3a.end"
						dur="0.2s"
						values="13;1"
					/>
				</rect>
				<rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
					<animate
						id="svgSpinnersBlocksShuffle34"
						fill="freeze"
						attributeName="y"
						begin="svgSpinnersBlocksShuffle30.end"
						dur="0.2s"
						values="13;1"
					/>
					<animate
						id="svgSpinnersBlocksShuffle35"
						fill="freeze"
						attributeName="x"
						begin="svgSpinnersBlocksShuffle31.end"
						dur="0.2s"
						values="1;13"
					/>
					<animate
						id="svgSpinnersBlocksShuffle36"
						fill="freeze"
						attributeName="y"
						begin="svgSpinnersBlocksShuffle32.end"
						dur="0.2s"
						values="1;13"
					/>
					<animate
						id="svgSpinnersBlocksShuffle37"
						fill="freeze"
						attributeName="x"
						begin="svgSpinnersBlocksShuffle33.end"
						dur="0.2s"
						values="13;1"
					/>
				</rect>
				<rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
					<animate
						id="svgSpinnersBlocksShuffle38"
						fill="freeze"
						attributeName="x"
						begin="svgSpinnersBlocksShuffle34.end"
						dur="0.2s"
						values="13;1"
					/>
					<animate
						id="svgSpinnersBlocksShuffle39"
						fill="freeze"
						attributeName="y"
						begin="svgSpinnersBlocksShuffle35.end"
						dur="0.2s"
						values="13;1"
					/>
					<animate
						id="svgSpinnersBlocksShuffle3a"
						fill="freeze"
						attributeName="x"
						begin="svgSpinnersBlocksShuffle36.end"
						dur="0.2s"
						values="1;13"
					/>
					<animate
						id="svgSpinnersBlocksShuffle3b"
						fill="freeze"
						attributeName="y"
						begin="svgSpinnersBlocksShuffle37.end"
						dur="0.2s"
						values="1;13"
					/>
				</rect>
			</svg>
		);
	},
};
