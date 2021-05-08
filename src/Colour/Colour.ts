import { hslToRgb, rgbToHsl, rgbValueToHex } from './convert';

export enum ColourType {
	'hsl' = 'hsl',
	'rgb' = 'rgb',
}

interface IColour {
	mode: ColourType;
	values: [number, number, number];
	alpha?: number;
}

interface RGBA {
	r?: number;
	g?: number;
	b?: number;
	a?: number;
}

interface HSLA {
	h?: number;
	s?: number;
	l?: number;
	a?: number;
}

/**
 * Colour class that allows itself to get and set HSL or RGB values and return
 * them as HSL/RGB or Hex
 */
export class Colour {
	public r: number;
	public g: number;
	public b: number;
	public h: number;
	public s: number;
	public l: number;
	public alpha: number;

	/**
	 * Function that handles keeping values in sync.
	 * Used upon construction and updates
	 * @param param0
	 */
	private updateColourValues = ({ mode, values, alpha }: IColour) => {
		if (mode === ColourType.hsl) {
			[this.r, this.g, this.b] = hslToRgb(...values);
			[this.h, this.s, this.l] = values;
		} else if (mode === ColourType.rgb) {
			[this.r, this.g, this.b] = values;
			[this.h, this.s, this.l] = rgbToHsl(...values);
		}
		this.alpha = (Number.isFinite(alpha) ? alpha : 1) as number;
	};

	constructor(config: IColour) {
		if (config.mode in ColourType) {
			this.updateColourValues(config);
		} else {
			throw new Error(
				`Unrecognised colour type. Choose from ${Object.values(ColourType).join(
					', '
				)}.`
			);
		}
	}

	/**
	 * Gets the RGB values as an array
	 * @returns
	 */
	public getRGBA = () => [this.r, this.g, this.b, this.alpha];

	public getHSLA = () => [this.h, this.s, this.l, this.alpha];

	public getHexA = () => {
		const rgba = this.getRGBA();
		const alphaAsHex = rgbValueToHex(rgba.slice(-1)[0] * 255);
		const rgbAsHex = rgba.slice(0, -1).map(rgbValueToHex);

		return `#${[...rgbAsHex, alphaAsHex].join('').toLocaleUpperCase()}`;
	};

	public setRGB = ({ r, g, b, a }: RGBA) =>
		this.updateColourValues({
			mode: ColourType.rgb,
			values: [r || this.r, g || this.g, b || this.b],
			alpha: Number.isFinite(a) ? a : this.alpha,
		});

	public setHSL = ({ h, s, l, a }: HSLA) =>
		this.updateColourValues({
			mode: ColourType.hsl,
			values: [h || this.h, s || this.s, l || this.l],
			alpha: Number.isFinite(a) ? a : this.alpha,
		});
}
