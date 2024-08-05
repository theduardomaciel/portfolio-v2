export const getCurrentAge = () => {
	const birthDate = new Date("2005-03-09");
	const currentDate = new Date();
	const age = currentDate.getFullYear() - birthDate.getFullYear();
	const month = currentDate.getMonth() - birthDate.getMonth();
	if (
		month < 0 ||
		(month === 0 && currentDate.getDate() < birthDate.getDate())
	) {
		return age - 1;
	}
	return age;
};
