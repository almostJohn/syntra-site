import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<SVGElement>;

export const Icons = {
	syntra: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M7 3v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3h1a2 2 0 0 1 2 2v11a6 6 0 0 1-6 6H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
					className="duoicon-secondary-layer"
					opacity=".3"
				/>
				<path
					fill="currentColor"
					d="M14 2a1 1 0 0 1 .117 1.993L14 4h-4a1 1 0 0 1-.117-1.993L10 2zm1 8H9a1 1 0 0 0-.117 1.993L9 12h6a1 1 0 1 0 0-2m-3 4H9a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2"
					className="duoicon-primary-layer"
				/>
			</svg>
		);
	},
	philippines: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
				<path
					fill="#ed4c5c"
					d="M33 32L11.3 53.7C16.7 58.8 24 62 32 62c16.6 0 30-13.4 30-30z"
				/>
				<path
					fill="#428bc1"
					d="M62 32C62 15.4 48.6 2 32 2c-8 0-15.3 3.2-20.7 8.3L33 32z"
				/>
				<path
					fill="#f9f9f9"
					d="M11.3 10.3C5.6 15.8 2 23.5 2 32s3.6 16.2 9.3 21.7L33 32z"
				/>
				<g fill="#ffce31">
					<path d="m13 13.6l-.8 1.4l1.1 1.1l-1.5-.2l-.8 1.4l-.2-1.5l-1.5-.2l1.4-.8l-.2-1.5l1.1 1.1zm.2 34.4l-1.1 1.2l.8 1.3l-1.4-.6l-1.1 1.2l.2-1.6l-1.5-.6l1.6-.3l.2-1.6l.8 1.4zm17.3-16l-1.5.5V34l-1-1.2l-1.5.4l1-1.2l-1-1.2l1.5.4l1-1.2v1.5zm-6.8-1.5l-.6-.5l-6.5 1.4h.1l6.1-1.6l-.8-.5l-5.2 2l4.3-3.6l-.1-.9l-4.5 4.6h-.1l4.5-5l-.1-.7l-.7.1l-4 5.2v-.1l3.7-5.3l-.9.1l-2.7 4.9l1-5.6l-.6-.6l-.6 6.5v.1l.2-6.8l-.5-.5l-.5.5l.2 6.8v-.1l-.5-6.4l-.6.6l1 5.6l-2.7-4.9l-.9-.1l3.7 5.3v.1l-4.1-5.4l-.7-.1l-.1.7l4.5 5h-.1l-4.5-4.6l-.1.9l4.3 3.6l-5.2-2l-.7.5l6.1 1.6h.1L8.3 30l-.6.4l.4.6l6.6.9h-.1l-6.3-.6l.5.7l5.6-.1L9.2 34l-.2.9l5.7-2.8h.1l-5.9 3.2l-.2.7l.7.2l5.7-3.6v.1l-5.2 3.7l.8.2l4.2-3.7l-2.9 4.9l.4.8l2.6-5.8l.1-.1l-2.5 6.3l.3.7l.7-.3l2.1-6.5v.1L14 39.2l.8-.4l.9-5.6l.9 5.6l.8.4l-1.7-6.2v-.1l2.1 6.5l.7.3l.3-.7l-2.5-6.3l.1.1l2.6 5.8l.4-.8l-2.8-4.9l4.2 3.7l.8-.2l-5.2-3.7v-.1l5.7 3.6l.7-.2l-.2-.7l-5.9-3.2h.1l5.7 2.8l-.3-.9l-5.3-1.9l5.6.1l.5-.7l-6.3.6h-.1l6.6-.9zm-7.2 1.6" />
					<circle cx="15.7" cy="32" r="4.5" />
				</g>
			</svg>
		);
	},
	menu: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z" />
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
					strokeLinejoin="round"
					strokeWidth="2"
					d="M18 6L6 18M6 6l12 12"
				/>
			</svg>
		);
	},
	dotsVertical: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 7a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 7a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"
						fill="currentColor"
					/>
				</g>
			</svg>
		);
	},
	dotsHorizontal: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M5 10a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4z"
						fill="currentColor"
					/>
				</g>
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
					strokeLinejoin="round"
					strokeWidth="2"
					d="M20 6L9 17l-5-5"
				/>
			</svg>
		);
	},
	moon: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9m8 0v4m2-2h-4"
				/>
			</svg>
		);
	},
	sun: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
				</g>
			</svg>
		);
	},
	sparkles: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2m0-12a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2M9 18a6 6 0 0 1 6-6a6 6 0 0 1-6-6a6 6 0 0 1-6 6a6 6 0 0 1 6 6"
				/>
			</svg>
		);
	},
	history: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9t-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4t.713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7t.713.288T13 8z"
				/>
			</svg>
		);
	},
	gridPlus: (props: IconProps) => {
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
	auditLogs: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M2 20v-4h4v4zm6 0v-4h14v4zm-6-6v-4h4v4zm6 0v-4h14v4zM2 8V4h4v4zm6 0V4h14v4z"
				/>
			</svg>
		);
	},
	user: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				>
					<circle cx="12" cy="8" r="5" fill="currentColor" />
					<path d="M20 21a8 8 0 1 0-16 0" />
					<path fill="currentColor" d="M12 13a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8" />
				</g>
			</svg>
		);
	},
	settings: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					fillRule="evenodd"
					d="M9.024 2.783A1 1 0 0 1 10 2h4a1 1 0 0 1 .976.783l.44 1.981q.6.285 1.14.66l1.938-.61a1 1 0 0 1 1.166.454l2 3.464a1 1 0 0 1-.19 1.237l-1.497 1.373a8 8 0 0 1 0 1.316l1.497 1.373a1 1 0 0 1 .19 1.237l-2 3.464a1 1 0 0 1-1.166.454l-1.937-.61q-.54.375-1.14.66l-.44 1.98A1 1 0 0 1 14 22h-4a1 1 0 0 1-.976-.783l-.44-1.981q-.6-.285-1.14-.66l-1.938.61a1 1 0 0 1-1.166-.454l-2-3.464a1 1 0 0 1 .19-1.237l1.497-1.373a8 8 0 0 1 0-1.316L2.53 9.97a1 1 0 0 1-.19-1.237l2-3.464a1 1 0 0 1 1.166-.454l1.937.61q.54-.375 1.14-.66l.44-1.98zM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
					clipRule="evenodd"
				/>
			</svg>
		);
	},
	circleAlert: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12zm10-5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1zm0 8a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12z" />
				</g>
			</svg>
		);
	},
	triangleAlert: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M11.126 5.633a1 1 0 0 1 1.748 0l6.601 11.881A1 1 0 0 1 18.601 19H5.399a1 1 0 0 1-.874-1.486l6.6-11.881zm3.497-.972c-1.143-2.057-4.102-2.057-5.245 0L2.777 16.543C1.666 18.543 3.112 21 5.399 21h13.202c2.287 0 3.733-2.457 2.622-4.457l-6.6-11.882zM12 8a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm-1 8a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1z" />
				</g>
			</svg>
		);
	},
	circleSuccess: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12z" />
					<path d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0z" />
				</g>
			</svg>
		);
	},
	circleInfo: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12zm10 5a1 1 0 0 0 1-1v-4a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1zm0-10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12z" />
				</g>
			</svg>
		);
	},
	circleX: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="m15 9l-6 6m0-6l6 6" />
				</g>
			</svg>
		);
	},
	eyeOpen: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				>
					<path d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.44.44 0 0 0 0 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.44.44 0 0 0 0-.384C21.368 10.683 18.308 5 12 5" />
					<circle cx="12" cy="12" r="3" />
				</g>
			</svg>
		);
	},
	eyeClose: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M7 6.362A9.7 9.7 0 0 1 12 5c6.307 0 9.367 5.683 9.91 6.808c.06.123.06.261 0 .385c-.352.728-1.756 3.362-4.41 5.131M14 18.8a10 10 0 0 1-2 .2c-6.307 0-9.367-5.683-9.91-6.808a.44.44 0 0 1 0-.386c.219-.452.84-1.632 1.91-2.885m6 .843A3 3 0 0 1 14.236 14M3 3l18 18"
				/>
			</svg>
		);
	},
	bell: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M15.019 17h-6.04m6.04 0h3.614c1.876 0 1.559-1.86.61-2.804C15.825 10.801 20.68 3 11.999 3s-3.825 7.8-7.243 11.196c-.913.908-1.302 2.804.61 2.804H8.98m6.039 0c0 1.925-.648 4-3.02 4s-3.02-2.075-3.02-4"
				/>
			</svg>
		);
	},
	logout: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9l-4-4m4 4l-4 4m4-4H9"
				/>
			</svg>
		);
	},
	folder: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
				/>
			</svg>
		);
	},
	viewGrid: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				>
					<rect width="18" height="18" x="3" y="3" rx="2" />
					<path d="M3 9h18M3 15h18M9 3v18m6-18v18" />
				</g>
			</svg>
		);
	},
	viewList: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"
				/>
			</svg>
		);
	},
	search: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m20 20l-4.05-4.05m0 0a7 7 0 1 0-9.9-9.9a7 7 0 0 0 9.9 9.9"
				/>
			</svg>
		);
	},
	lightning: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M13.493 3.659a1.25 1.25 0 0 0-.711-1.296a1.195 1.195 0 0 0-1.46.36L3.518 12.736a1.28 1.28 0 0 0-.16 1.302c.172.393.57.741 1.116.741h6.682l-.65 5.562a1.25 1.25 0 0 0 .711 1.296a1.195 1.195 0 0 0 1.46-.36l7.803-10.013a1.28 1.28 0 0 0 .16-1.302a1.22 1.22 0 0 0-1.116-.741h-6.682z"
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
					strokeLinejoin="round"
					strokeWidth="2"
					d="M5 12h7m7 0h-7m0 0V5m0 7v7"
				/>
			</svg>
		);
	},
	arrowLeft: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m5 12l6-6m-6 6l6 6m-6-6h14"
				/>
			</svg>
		);
	},
	arrowRight: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m19 12l-6-6m6 6l-6 6m6-6H5"
				/>
			</svg>
		);
	},
	trash: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a1 1 0 0 1-1-1zm3 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8H7z" />
					<path d="M11 5a1 1 0 0 0-1 1v1a1 1 0 0 1-2 0V6a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1h-2zm-1 5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1z" />
				</g>
			</svg>
		);
	},
	hashtag: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g fill="currentColor">
					<path d="M11.242 3.03a1 1 0 0 1 .728 1.213l-4 16a1 1 0 1 1-1.94-.485l4-16a1 1 0 0 1 1.213-.728zm6 0a1 1 0 0 1 .728 1.213l-4 16a1 1 0 1 1-1.94-.485l4-16a1 1 0 0 1 1.212-.728z" />
					<path d="M4 9a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm-2 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z" />
				</g>
			</svg>
		);
	},
	atSymbol: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<g
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
				</g>
			</svg>
		);
	},
	calendar: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M4 9V7a2 2 0 0 1 2-2h2M4 9h16m0 0V7a2 2 0 0 0-2-2h-2m0 0V3m0 2H8m0-2v2"
				/>
			</svg>
		);
	},
	loading: (props: IconProps) => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
					opacity=".25"
				/>
				<path
					fill="currentColor"
					d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
				>
					<animateTransform
						attributeName="transform"
						dur="0.75s"
						repeatCount="indefinite"
						type="rotate"
						values="0 12 12;360 12 12"
					/>
				</path>
			</svg>
		);
	},
};
