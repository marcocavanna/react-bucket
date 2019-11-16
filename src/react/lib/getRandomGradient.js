import tinycolor from 'tinycolor2';

/**
 * @function randomGradient
 *
 * @param {String} name Name to use to Generate Gradient
 * @param {('vertical'|'horizontal'|'diagonal'|'radial')} [direction='diagonal'] Gradient Direction
 */
export default function getRandomGradient(name, direction = 'diagonal') {

  if (typeof name !== 'string') {
    return {};
  }

  if (!['vertical', 'horizontal', 'diagonal', 'radial'].includes(direction)) {
    return {};
  }

  const hue = (() => {
    let hash = 5381;
    let i = name.length;

    while (i) {
      hash = (hash * 33) ^ name.charCodeAt(--i);  // eslint-disable-line
    }

    return hash >>> 0   // eslint-disable-line
  })() % 360;
  const saturation = 0.95;
  const lightness = 0.5;

  const darkTextColor = 'rgba(61, 66, 81, .95)';
  const lightTextColor = 'hsl(212, 10%, 97%)';
  const baseColor = tinycolor({ h: hue, s: saturation, l: lightness }).desaturate(20).lighten(10);
  const analogColor = baseColor.clone().analogous()[1];

  const baseHex = baseColor.toHexString();
  const analogHex = analogColor.toHexString();

  let background;

  switch (direction) {
    case 'horizontal':
      background = `linear-gradient(${baseHex}, ${analogHex})`;
      break;

    case 'vertical':
      background = `linear-gradient(to right, ${baseHex}, ${analogHex})`;
      break;

    case 'diagonal':
      background = `linear-gradient(to top right, ${baseHex}, ${analogHex})`;
      break;

    case 'radial':
      background = `radial-gradient(circle, ${baseHex}, ${analogHex})`;
      break;

    default:
      background = `linear-gradient(to top right, ${baseHex}, ${analogHex})`;
  }

  return {
    background,
    color: tinycolor.mostReadable(baseHex, [darkTextColor, lightTextColor]).toPercentageRgbString()
  };

}
