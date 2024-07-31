function generateRandomFloatInRange(min: number, max: number) {
	return Math.random() * (max - min + 1) + min;
}

export function generateBorderRadiusForBlob() {
	const percentage1 = generateRandomFloatInRange(25, 75);
	const percentage2 = generateRandomFloatInRange(25, 75);
	const percentage3 = generateRandomFloatInRange(25, 75);
	const percentage4 = generateRandomFloatInRange(25, 75);

	const percentages = [
		100 - percentage1,
		100 - percentage2,
		100 - percentage3,
		100 - percentage4,
	];
	const borderRadius = `${percentage1}% ${percentages[0]}% ${percentages[1]}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentages[3]}% ${percentages[2]}%`;
	return borderRadius;
}

const _toRad = (deg: number) => deg * (Math.PI / 180.0);

const _divide = (count: number) => {
	const deg = 360 / count;

	return Array(count)
		.fill("a")
		.map((_, i) => i * deg);
};

const _randomDoubleGenerator = (s: number) => {
	const mask = 0xffffffff;
	let m_w = (123456789 + s) & mask;
	let m_z = (987654321 - s) & mask;

	return () => {
		m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
		m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

		let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
		result /= 4294967296;
		return result;
	};
};

const _magicPoint = (value: number, min: number, max: number) => {
	let radius = min + value * (max - min);
	if (radius > max) {
		radius = radius - min;
	} else if (radius < min) {
		radius = radius + min;
	}
	return radius;
};

const _point = (origin: number, radius: number, degree: number) => {
	const x = origin + radius * Math.cos(_toRad(degree));
	const y = origin + radius * Math.sin(_toRad(degree));
	return [Math.round(x), Math.round(y)];
};

const _shuffle = (array: Array<number>) => {
	array.sort(() => Math.random() - 0.5);
	return array;
};

const _createPoints = (
	size: number,
	minGrowth: number,
	edgesCount: number,
	seed: number | null,
) => {
	const outerRad = size / 2;
	const innerRad = minGrowth * (outerRad / 10);
	const center = size / 2;

	const slices = _divide(edgesCount);
	const maxRandomValue = _shuffle([99, 999, 9999, 99999, 999999])[0];
	const id = Math.floor(Math.random() * maxRandomValue);
	const seedValue = seed || id;
	const randVal = _randomDoubleGenerator(seedValue);
	const destPoints: Array<number[]> = [];

	for (let i = 0; i < slices.length; i++) {
		const degree = slices[i];

		const O = _magicPoint(randVal(), innerRad, outerRad);
		const end = _point(center, O, degree);
		destPoints.push(end);
	}

	return { destPoints, seedValue };
};

const _createSvgPath = (points: Array<number[]>) => {
	let svgPath = "";

	let mid = [
		(points[0][0] + points[1][0]) / 2,
		(points[0][1] + points[1][1]) / 2,
	];

	svgPath += `M${mid[0]},${mid[1]}`;

	for (let i = 0; i < points.length; i++) {
		const p1 = points[(i + 1) % points.length];
		const p2 = points[(i + 2) % points.length];
		mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
		svgPath += `Q${p1[0]},${p1[1]},${mid[0]},${mid[1]}`;
	}

	svgPath += "Z";

	return svgPath;
};

export function blobShape({
	size = 400,
	growth = 6,
	edges = 6,
	seed = null,
} = {}) {
	const { destPoints, seedValue } = _createPoints(size, growth, edges, seed);
	const path = _createSvgPath(destPoints);
	return { path, seedValue };
}
