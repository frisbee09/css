import { rgbValueToHex } from "../convert";

test('Can convert 0 > 255 scale to hex', () => {
    const aquaRGB = [132, 220, 198];
    const result = aquaRGB.map(rgbValueToHex);
    expect(result).toStrictEqual(["84", "dc", "c6"])
})