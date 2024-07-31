export function getReadingTime(text: string) {
	const wordPerMinute = 225;
	const words = text.trim().split(/\s+/).length;
	const time = Math.ceil(words / wordPerMinute);
	return time;
}

export function getWindowDimensions() {
	const { innerWidth: windowWidth } = window;
	const width = document.documentElement.clientWidth || windowWidth;
	const isScreenWide = width > 1024;
	return {
		width,
		isScreenWide,
	};
}

export const debounce = (fn: () => void, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: unknown, ...args: []) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};
