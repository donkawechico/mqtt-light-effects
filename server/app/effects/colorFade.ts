import { AIBulb, RGB } from '../../app/components/AiBulb/AiBulb';
import { waiting } from './test';

function getIncrementNeeded(from: number, to: number, steps: number) {
  const diff = to - from;
  return Math.ceil(diff / steps);
}

function validateColor(color: RGB) {
  return {
    r: validateSingleColor(color.r),
    g: validateSingleColor(color.g),
    b: validateSingleColor(color.b),
  }
}

function validateSingleColor(singleColorValue: number) {
  if (singleColorValue >= 255) {
    singleColorValue = 255;
  } else if (singleColorValue <= 0) {
    singleColorValue = 0;
  }
  return singleColorValue;
}
export function * generator(from: RGB, to: RGB, steps: number) {
  const rInc = getIncrementNeeded(from.r, to.r, steps);
  const gInc = getIncrementNeeded(from.g, to.g, steps);
  const bInc = getIncrementNeeded(from.b, to.b, steps);
  
  let rNext: number = from.r;
  let gNext: number = from.g;
  let bNext: number = from.b;

  for (let i = 0; i <= steps; i++) {
    rNext += rInc;
    gNext += gInc;
    bNext += bInc;
    const nextColor = validateColor({ r: rNext, g: gNext, b: bNext });
    console.log(`next color:`, nextColor);
    yield nextColor;
  }
};

export type ColorFade = (bulb: AIBulb, from: RGB, to: RGB, steps: number) => void;
const colorFade: ColorFade = (bulb, from, to, steps) => {
  waiting(
    generator(from, to, steps),
    (lastItem) => { 
      if (!lastItem.done) {
        bulb.setColor(lastItem.value)
      }
    },
    100
  );
}

export default colorFade;
