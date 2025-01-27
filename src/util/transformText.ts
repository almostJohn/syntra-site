import { jetBrainsMono } from "./fonts";

export function transformText(text: string): string {
	text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

	text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

	text = text.replace(/__(.*?)__/g, "<u>$1</u>");

	text = text.replace(
		/`([^`]+)`/g,
		`<code class="${jetBrainsMono.className}">$1</code>`,
	);

	text = text.replace(/\n/g, "<br>");

	return text;
}
