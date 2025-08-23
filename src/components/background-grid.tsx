export function BackgroundGrid() {
	return (
		<>
			<div
				className="absolute inset-0 opacity-30"
				style={{
					backgroundImage: `
						linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          	linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
					`,
					backgroundSize: "60px 60px",
				}}
			/>
			<div
				className="absolute inset-0 opacity-20 hidden dark:block"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
					backgroundSize: "60px 60px",
				}}
			/>
		</>
	);
}
