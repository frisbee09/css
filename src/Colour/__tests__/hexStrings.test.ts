import { deconstructHexString } from '../deconstructHexString';

test('hex strings deconstruct properly', () => {
	expect(deconstructHexString('#DC1A9F')).toStrictEqual(['DC', '1A', '9F']);
	expect(deconstructHexString('#DC1A9FFF')).toStrictEqual([
		'DC',
		'1A',
		'9F',
		'FF',
	]);
	expect(deconstructHexString('#AAA')).toStrictEqual(['A', 'A', 'A']);
	expect(deconstructHexString('#AAAA')).toStrictEqual(['A', 'A', 'A', 'A']);
});

test('hex strings deconstruct properly without the #', () => {
	expect(deconstructHexString('DC1A9F')).toStrictEqual(['DC', '1A', '9F']);
	expect(deconstructHexString('DC1A9FFF')).toStrictEqual([
		'DC',
		'1A',
		'9F',
		'FF',
	]);
	expect(deconstructHexString('AAA')).toStrictEqual(['A', 'A', 'A']);
	expect(deconstructHexString('AAAA')).toStrictEqual(['A', 'A', 'A', 'A']);
});

test("hex strings that don't match the pattern get thrown", () => {
	expect(() => deconstructHexString('asdiansdnasd')).toThrowError();
	expect(() => deconstructHexString('12123asdlmasdkm')).toThrowError();
	expect(() => deconstructHexString('#sss')).toThrowError();
	expect(() => deconstructHexString('#akmsdklmasd')).toThrowError();
});
