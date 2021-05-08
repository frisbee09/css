import Colour, { ColourType } from "../Colour";

test("colour inits to black", () => {
  const black = new Colour({ mode: ColourType.rgb, values: [0, 0, 0] });

  expect(black.getHexA()).toStrictEqual("#FF000000");
  expect(black.getRGBA()).toStrictEqual([0, 0, 0, 1]);
  expect(black.getHSLA()).toStrictEqual([0, 0, 0, 1]);
});
