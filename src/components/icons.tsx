import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<SVGElement>;

export const Icons = {
	downdload: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M13 9V5h-2v6H9.83L12 13.17L14.17 11H13z"
					opacity=".3"
				/>
				<path
					fill="currentColor"
					d="M15 9V3H9v6H5l7 7l7-7zm-3 4.17L9.83 11H11V5h2v6h1.17zM5 18h14v2H5z"
				/>
			</svg>
		);
	},
	fileText: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M8 12h8v-2H8zm0-4h8V6H8zm11.95 12.475L15.9 15.2q-.425-.575-1.05-.887T13.5 14H4V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .125-.012.238t-.038.237M6 22q-.825 0-1.412-.587T4 20v-4h9.5q.25 0 .463.113t.362.312l4.2 5.5q-.125.05-.262.063T18 22z"
				/>
			</svg>
		);
	},
	flag: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M7 14v6q0 .425-.288.713T6 21t-.712-.288T5 20V5q0-.425.288-.712T6 4h7.175q.35 0 .625.225t.35.575L14.4 6H19q.425 0 .713.288T20 7v8q0 .425-.288.713T19 16h-5.175q-.35 0-.625-.225t-.35-.575L12.6 14z"
				/>
			</svg>
		);
	},
	tag: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59s1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"
				/>
			</svg>
		);
	},
	barChart: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M5 19V8.712h3V19zm4.385 0v-5.654h3V19zM16 19V5h3v14z"
				/>
			</svg>
		);
	},
	arrowLeft: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M11.884 6.116a1.25 1.25 0 0 0-1.768 0l-5 5a1.25 1.25 0 0 0 0 1.768l5 5a1.25 1.25 0 0 0 1.768-1.768L9.018 13.25H18a1.25 1.25 0 1 0 0-2.5H9.018l2.866-2.866a1.25 1.25 0 0 0 0-1.768"
				/>
			</svg>
		);
	},
	arrowRight: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M13.884 6.116a1.25 1.25 0 0 0-1.768 1.768l2.866 2.866H6a1.25 1.25 0 1 0 0 2.5h8.982l-2.866 2.866a1.25 1.25 0 0 0 1.768 1.768l5-5a1.25 1.25 0 0 0 0-1.768z"
				/>
			</svg>
		);
	},
	plus: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="2"
					d="M12 7v5m0 5v-5m5 0h-5m0 0H7"
				/>
			</svg>
		);
	},
	quotes: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 10.818H9c-.198 0-.391-.053-.556-.153a.93.93 0 0 1-.368-.408a.83.83 0 0 1-.057-.525a.9.9 0 0 1 .274-.466c.14-.127.318-.213.512-.249c.194-.035.395-.017.578.052a1 1 0 0 1 .448.335c.11.15.169.325.169.505v2.273c0 .482-.21.944-.586 1.285A2.1 2.1 0 0 1 8 14m8-3.182h-1c-.198 0-.391-.053-.556-.153a.93.93 0 0 1-.368-.408a.83.83 0 0 1-.057-.525a.9.9 0 0 1 .274-.466c.14-.127.318-.213.512-.249c.194-.035.395-.017.578.052a1 1 0 0 1 .449.335a.85.85 0 0 1 .168.505v2.273c0 .482-.21.944-.586 1.285A2.1 2.1 0 0 1 14 14"
				/>
			</svg>
		);
	},
	menu: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="2"
					d="M19 7H7m12 10H7m12-5h-8"
				/>
			</svg>
		);
	},
	link: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="2"
				>
					<path d="m7.7 12.6l-.021.02a2.795 2.795 0 0 0-.044 4.005v0a2.795 2.795 0 0 0 3.936.006l1.455-1.438a3 3 0 0 0 .34-3.866l-.146-.207" />
					<path d="m16.22 11.12l.136-.14c.933-.953.992-2.46.135-3.483v0a2.597 2.597 0 0 0-3.664-.32L11.39 8.386a3 3 0 0 0-.301 4.3l.031.034" />
				</g>
			</svg>
		);
	},
	bell: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M18.161 8.905A6.19 6.19 0 0 0 13.5 3.434V3a1.5 1.5 0 0 0-3 0v.434a6.19 6.19 0 0 0-4.661 5.47l-.253 2.033l-.001.015a4.34 4.34 0 0 1-1.357 2.807l-.014.012c-.244.23-.544.51-.73 1.058c-.17.496-.234 1.17-.234 2.186c0 .372.067.731.254 1.044c.193.324.472.524.76.646c.271.115.564.167.822.2c.174.022.372.039.562.055l.25.022q.345.033.742.065a.75.75 0 0 0-.3.777a3.7 3.7 0 0 0 .865 1.676A3.74 3.74 0 0 0 10 22.75c1.11 0 2.11-.484 2.795-1.25a.75.75 0 1 0-1.118-1c-.413.461-1.01.75-1.677.75a2.24 2.24 0 0 1-2.07-1.366a2 2 0 0 1-.125-.389a.75.75 0 0 0-.217-.38c1.213.077 2.696.135 4.412.135c2.622 0 4.703-.136 6.101-.268l.25-.022c.191-.016.389-.033.563-.055c.258-.033.55-.085.822-.2c.288-.122.567-.322.76-.646c.187-.313.254-.672.254-1.044c0-1.017-.064-1.69-.233-2.186c-.187-.548-.487-.829-.73-1.058l-.015-.012a4.34 4.34 0 0 1-1.357-2.807l-.001-.015zm-10.83.155l.001-.015a4.684 4.684 0 0 1 9.336 0l.001.015l.253 2.032a5.84 5.84 0 0 0 1.825 3.76c.226.213.288.279.35.46c.083.245.153.705.153 1.703c0 .201-.037.267-.041.274l-.003.004l-.002.002a.2.2 0 0 1-.054.03a1.7 1.7 0 0 1-.424.091c-.145.019-.292.031-.463.046l-.302.027c-1.357.127-3.39.261-5.961.261c-2.57 0-4.604-.134-5.96-.261l-.303-.027c-.171-.015-.318-.027-.463-.046a1.7 1.7 0 0 1-.424-.092a.2.2 0 0 1-.054-.029l-.005-.006c-.004-.007-.041-.073-.041-.274c0-.998.07-1.458.153-1.702c.062-.182.124-.248.35-.46a5.84 5.84 0 0 0 1.825-3.76z"
				/>
			</svg>
		);
	},
	warning: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="none" stroke="currentColor" strokeWidth="2">
					<rect width="14" height="14" x="5" y="5" rx="4" />
					<path strokeLinecap="round" d="M12 9v3m0 3.02v-.01" />
				</g>
			</svg>
		);
	},
	x: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="2"
					d="m8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4"
				/>
			</svg>
		);
	},
	check: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="2"
					d="m7 12l3.488 3.837a.2.2 0 0 0 .296 0L17 9"
				/>
			</svg>
		);
	},
	apps: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
				<defs>
					<mask id="ipTMoreApp0">
						<g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
							<path
								fill="#555"
								d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 24H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2ZM42 4H30a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
							/>
							<path strokeLinecap="round" d="M28 28h16m-8 8h8m-16 8h16" />
						</g>
					</mask>
				</defs>
				<path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTMoreApp0)" />
			</svg>
		);
	},
	settings: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
				<defs>
					<mask id="ipTSettingTwo0">
						<g fill="#555" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
							<path d="M18.284 43.171a20 20 0 0 1-8.696-5.304a6 6 0 0 0-5.182-9.838A20 20 0 0 1 4 24c0-2.09.32-4.106.916-6H5a6 6 0 0 0 5.385-8.65a20 20 0 0 1 8.267-4.627A6 6 0 0 0 24 8a6 6 0 0 0 5.348-3.277a20 20 0 0 1 8.267 4.627A6 6 0 0 0 43.084 18A20 20 0 0 1 44 24c0 1.38-.14 2.728-.406 4.03a6 6 0 0 0-5.182 9.838a20 20 0 0 1-8.696 5.303a6.003 6.003 0 0 0-11.432 0Z" />
							<path d="M24 31a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z" />
						</g>
					</mask>
				</defs>
				<path
					fill="currentColor"
					d="M0 0h48v48H0z"
					mask="url(#ipTSettingTwo0)"
				/>
			</svg>
		);
	},
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
