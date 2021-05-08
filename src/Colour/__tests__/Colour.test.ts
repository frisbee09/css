import { Colour, ColourType } from '../Colour';

test('colour inits to black', () => {
	const black = new Colour({ mode: ColourType.rgb, values: [0, 0, 0] });

	expect(black.getHexA()).toStrictEqual('#000000');
	expect(black.getRGBA()).toStrictEqual([0, 0, 0, 1]);
	expect(black.getHSLA()).toStrictEqual([0, 0, 0, 1]);
});

test('Real aqua colour converts correctly', () => {
	const rgb = [132, 220, 198] as [number, number, number];
	const aqua = new Colour({ mode: ColourType.rgb, values: rgb });

	expect(aqua.r).toBe(132);
	expect(aqua.g).toBe(220);
	expect(aqua.b).toBe(198);
	expect(aqua.getHexA()).toStrictEqual('#84DCC6');
});
