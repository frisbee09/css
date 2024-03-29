import { Colour, ColourType } from '../Colour';

test('colour inits to black', () => {
	const black = new Colour({ mode: ColourType.rgb, values: [0, 0, 0] });

	expect(black.getHexA()).toStrictEqual('#000000');
	expect(black.getRGBA()).toStrictEqual([0, 0, 0, 1]);
	expect(black.getHSLA()).toStrictEqual([0, 0, 0, 1]);
});

test('colour inits to black and overrides to red in line', () => {
	const black = new Colour({ mode: ColourType.rgb, values: [0, 0, 0] });

	expect(black.getHexA()).toStrictEqual('#000000');
	expect(black.getRGBA({ r: 255 })).toStrictEqual([255, 0, 0, 1]);
	expect(black.getHSLA({ s: 100, l: 50 })).toStrictEqual([0, 100, 50, 1]);
});

test('colour inits to black but overrides to create a red instance', () => {
	const black = new Colour({ mode: ColourType.rgb, values: [0, 0, 0] });

	expect(black.getHexA()).toStrictEqual('#000000');
	const red = black.override({ r: 255 });
	expect(red.getRGBA()).toStrictEqual([255, 0, 0, 1]);
	expect(red.getHSLA()).toStrictEqual([0, 100, 50, 1]);
});

test('Real aqua colour converts correctly', () => {
	const rgb = [132, 220, 198] as [number, number, number];
	const aqua = new Colour({ mode: ColourType.rgb, values: rgb });

	expect(aqua.r).toBe(132);
	expect(aqua.g).toBe(220);
	expect(aqua.b).toBe(198);
	expect(aqua.getHexA()).toStrictEqual('#84DCC6');
	expect(aqua.getHSLA()).toStrictEqual([165, 56, 69, 1]);
});

test('Real aqua colour accepts hsl override', () => {
	const rgb = [132, 220, 198] as [number, number, number];
	const aqua = new Colour({ mode: ColourType.rgb, values: rgb });

	expect(aqua.getHSLA()).toStrictEqual([165, 56, 69, 1]);

	const darkAqua = aqua.override({ l: 90 });
	expect(darkAqua.getHSLA()).toStrictEqual([165, 56, 90, 1]);
	expect(darkAqua.getRGBA()).toStrictEqual([215, 244, 237, 1]);
	expect(darkAqua.getHexA()).toStrictEqual('#D7F4ED');
});

test('Real aqua colour accepts alpha override', () => {
	const rgb = [132, 220, 198] as [number, number, number];
	const aqua = new Colour({ mode: ColourType.rgb, values: rgb });

	expect(aqua.getHSLA()).toStrictEqual([165, 56, 69, 1]);

	const darkAqua = aqua.override({ a: 0.5 });
	expect(darkAqua.getHSLA()).toStrictEqual([165, 56, 69, 0.5]);
	expect(darkAqua.getHexA()).toStrictEqual('#84DCC680');
});

test('Initialising the same colour through rgb, hsl and hex gets the same result', () => {
	const rgb = [132, 220, 198] as [number, number, number];
	const hsl = [165, 56, 69] as [number, number, number];
	const aquaRGB = new Colour({ mode: ColourType.rgb, values: rgb });
	const aquaHSL = new Colour({ mode: ColourType.hsl, values: hsl });
	const aquaHex = new Colour({ mode: ColourType.hex, values: '#84DCC6' });

	expect(JSON.stringify(aquaHSL)).toStrictEqual(JSON.stringify(aquaRGB));
	expect(JSON.stringify(aquaHex)).toStrictEqual(JSON.stringify(aquaRGB));
});
