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
	Dashboard: (props: IconProps) => {
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
				<rect width="7" height="9" x="3" y="3" rx="1" />
				<rect width="7" height="5" x="14" y="3" rx="1" />
				<rect width="7" height="9" x="14" y="12" rx="1" />
				<rect width="7" height="5" x="3" y="16" rx="1" />
			</svg>
		);
	},
	Scroll: (props: IconProps) => {
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
	Kanban: (props: IconProps) => {
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
				<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
				<path d="M8 10v4" />
				<path d="M12 10v2" />
				<path d="M16 10v6" />
			</svg>
		);
	},
	User: (props: IconProps) => {
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
				<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
				<circle cx="12" cy="7" r="4" />
			</svg>
		);
	},
	Users: (props: IconProps) => {
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
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				<path d="M16 3.128a4 4 0 0 1 0 7.744" />
				<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
				<circle cx="9" cy="7" r="4" />
			</svg>
		);
	},
	Settings: (props: IconProps) => {
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
				<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		);
	},
	PanelLeft: (props: IconProps) => {
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
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M9 3v18" />
			</svg>
		);
	},
	ArrowRight: (props: IconProps) => {
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
				<path d="M5 12h14" />
				<path d="m12 5 7 7-7 7" />
			</svg>
		);
	},
	Logout: (props: IconProps) => {
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
				<path d="m16 17 5-5-5-5" />
				<path d="M21 12H9" />
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			</svg>
		);
	},
	Plus: (props: IconProps) => {
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
				<path d="M5 12h14" />
				<path d="M12 5v14" />
			</svg>
		);
	},
	Bell: (props: IconProps) => {
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
				<path d="M10.268 21a2 2 0 0 0 3.464 0" />
				<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
			</svg>
		);
	},
	Folder: (props: IconProps) => {
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
				<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
			</svg>
		);
	},
	UserPlus: (props: IconProps) => {
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
				<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<line x1="19" x2="19" y1="8" y2="14" />
				<line x1="22" x2="16" y1="11" y2="11" />
			</svg>
		);
	},
};
