const debounce = (fn: () => void, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: unknown, ...args: []) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export default debounce;
