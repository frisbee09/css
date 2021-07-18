const getC = (normR: number, normG: number, normB: number) => {
	const Cmax = Math.max(normR, normG, normB);
	const Cmin = Math.min(normR, normG, normB);
	const Cdelta = Cmax - Cmin;

	return {
		max: Cmax,
		min: Cmin,
		delta: Cdelta,
	};
};

const getH = (normR: number, normG: number, normB: number) => {
	const { max, delta } = getC(normR, normG, normB);
	if (delta === 0) {
		return 0;
	}
	switch (max) {
		case normR: {
			return 60 * (((normG - normB) / delta) % 6);
		}
		case normG: {
			return 60 * ((normB - normR) / delta + 2);
		}
		case normB: {
			return 60 * ((normR - normG) / delta + 4);
		}
		default: {
			return 0;
		}
	}
};

export const rgbToHsl = (
	r: number,
	g: number,
	b: number
): [number, number, number] => {
	const normRGB = [r, g, b].map(num => num / 255) as [number, number, number];
	const { max, min, delta } = getC(...normRGB);

	const H = getH(...normRGB);
	const L = (max + min) / 2;
	const S = delta === 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));

	return [Math.round(H), Math.round(S * 100), Math.round(L * 100)];
};

/**
 * This array decides the order to assign C, X and 0 to R, G and B
 * Lower and Higher refer to range of H. Lower is inclusive, Higher is not.
 * Order assumes "C, X, 0" and maps accordingly
 */
const breaks: {
	lower: number;
	higher: number;
	order: ('C' | 'X' | '0')[];
}[] = [
	{
		lower: 0,
		higher: 60,
		order: ['C', 'X', '0'],
	},
	{
		lower: 60,
		higher: 120,
		order: ['X', 'C', '0'],
	},
	{
		lower: 120,
		higher: 180,
		order: ['0', 'C', 'X'],
	},
	{
		lower: 180,
		higher: 240,
		order: ['0', 'X', 'C'],
	},
	{
		lower: 240,
		higher: 300,
		order: ['X', '0', 'C'],
	},
	{
		lower: 300,
		higher: 360,
		order: ['C', '0', 'X'],
	},
];
export const hslToRgb = (
	h: number,
	s: number,
	l: number
): [number, number, number] => {
	const normS = s / 100;
	const normL = l / 100;
	const C = (1 - Math.abs(2 * normL - 1)) * normS;
	const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = normL - C / 2;

	const rgbAssigningObject = {
		C: C,
		X: X,
		'0': 0,
	};

	const breakToUse = breaks.find(
		({ lower, higher }) => h >= lower && h < higher
	);
	if (!breakToUse) {
		throw 'H is not in range 0 - 360';
	} else {
		const normRGB = breakToUse.order.map(key => rgbAssigningObject[key]);
		return normRGB.map(num => Math.round((num + m) * 255)) as [
			number,
			number,
			number
		];
	}
};

export const rgbValueToHex = (v: number) => {
	const hex = v.toString(16);
	return `${hex.length === 1 ? '0' : ''}${hex}`;
};
