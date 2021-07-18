import { hslToRgb, rgbToHsl, rgbValueToHex } from './convert';

export enum ColourType {
	'hsl' = 'hsl',
	'rgb' = 'rgb',
}

interface IColour {
	mode: ColourType;
	values: number[];
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
		const colourValues = values.slice(0, 3) as [number, number, number];
		if (mode === ColourType.hsl) {
			[this.r, this.g, this.b] = hslToRgb(...colourValues);
			[this.h, this.s, this.l] = values;
		} else if (mode === ColourType.rgb) {
			[this.r, this.g, this.b] = values;
			[this.h, this.s, this.l] = rgbToHsl(...colourValues);
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
	public getRGBA = (override?: RGBA): [number, number, number, number] => {
		if (override) {
			const { r, g, b, a } = override;
			return [r ?? this.r, g ?? this.g, b ?? this.b, a ?? this.alpha];
		} else {
			return [this.r, this.g, this.b, this.alpha];
		}
	};

	public getHSLA = (override?: HSLA): [number, number, number, number] => {
		if (override) {
			const { h, s, l, a } = override;
			return [h ?? this.h, s ?? this.s, l ?? this.l, a ?? this.alpha];
		} else {
			return [this.h, this.s, this.l, this.alpha];
		}
	};

	/**
	 * Creates a new colour from this one with the overrides applied. Useful for
	 * partially overriding a colour definition in one syntax but exporting as
	 * another
	 * @param override
	 */
	public override = (override: HSLA | RGBA) => {
		if ('h' in override || 's' in override || 'l' in override) {
			const newBase = this.getHSLA(override);
			return new Colour({
				mode: ColourType.hsl,
				values: newBase.slice(0, 3) as [number, number, number],
				alpha: newBase.slice(-1)[0],
			});
		} else if ('r' in override || 'g' in override || 'b' in override) {
			const newBase = this.getRGBA(override);
			return new Colour({
				mode: ColourType.rgb,
				values: newBase.slice(0, 3) as [number, number, number],
				alpha: newBase.slice(-1)[0],
			});
		}
	};

	public getHexA = () => {
		const rgba = this.getRGBA();
		const alpha = rgba.slice(-1)[0];
		const alphaAsHex = alpha ? rgbValueToHex(alpha * 255) : undefined;
		const rgbAsHex = (rgba.slice(0, 3) as [number, number, number]).map(
			rgbValueToHex
		);

		return `#${[...rgbAsHex, alphaAsHex === 'ff' ? '' : alphaAsHex]
			.join('')
			.toLocaleUpperCase()}`;
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
