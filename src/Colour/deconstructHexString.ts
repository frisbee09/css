const InvalidHex = (givenHexString: string) =>
	new Error(`${givenHexString} not of the form /(#)?[a-fA-F0-9]{3|4|6|8}/`);

export const deconstructHexString = (givenHexString: string) => {
	let hexString = givenHexString.replace('#', '');
	const length = hexString.length;
	const charPerValue = length / 3;
	// Only support hex codes 3,4, 6 or 8 long for colour definition
	// This accounts for rgb[?a] syntax with a shortcut
	if ([3, 4, 6, 8].includes(length)) {
		let rgba: string[] = [];
		while (hexString) {
			const hexCode = hexString.slice(0, charPerValue);
			if (!/[a-fA-F0-9]{1,2}/.test(hexCode)) {
				throw InvalidHex(givenHexString);
			}
			rgba.push(hexCode);
			hexString = hexString.slice(charPerValue);
		}
		return rgba;
	} else {
		throw InvalidHex(givenHexString);
	}
};
