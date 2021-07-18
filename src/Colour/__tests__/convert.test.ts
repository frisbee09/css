import { rgbToHsl, rgbValueToHex } from '../convert';

test('Can convert 0 > 255 scale to hex', () => {
	const aquaRGB = [132, 220, 198];
	const result = aquaRGB.map(rgbValueToHex);
	expect(result).toStrictEqual(['84', 'dc', 'c6']);
});

test('rgb converts properly to hsl', () => {
	const r = 137;
	const g = 255;
	const b = 18;

	const result = rgbToHsl(r, g, b);

	expect(result).toStrictEqual([90, 100, 54]);
});
