import { AIBulb } from '../../app/components/AiBulb/AiBulb';
import { waiting } from './test';

export function * generator(minimum: number, maximum: number, increment: number) {
  let currentValue = getNextValue((minimum + maximum)/2, minimum, maximum);
  while(true) {
    currentValue = getNextValue(currentValue, minimum, maximum);
    yield currentValue;
  }
};

export type Candle = (bulb: AIBulb, minimum?: number, maximum?: number, increment?: number) => void;
const candle: Candle = (
  bulb, 
  minimum = 0,
  maximum = 255,
  increment = 10
) => {
  waiting(
    generator(minimum, maximum, increment),
    (lastItem) => {
      if (!lastItem.done) {
        bulb.setBrightness(lastItem.value)
      }
    },
    100
  );
}

export default candle;

function getNextValue(currentBrightness: number, minimum: number, maximum: number) {
  let newMax = currentBrightness + 50;
  let newMin = currentBrightness - 50;

  if (newMax > maximum) {
    newMin -= newMax - maximum;
    newMax = maximum;
  } else if (newMin < minimum) {
    newMax += minimum - newMin;
    newMin = minimum;
  }
  return getRandomInt(newMin, newMax);
}

function getRandomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * Math.floor(max));
}

// async function candle(
//   minimum: number = 0,
//   maximum: number = 200,
//   increment: number = 10) {
//   return fader(
//     minimum,
//     (currentBrightness) => {
//       let newMax = currentBrightness + 50;
//       let newMin = currentBrightness - 50;

//       if (newMax > maximum) {
//         newMin -= newMax - maximum;
//         newMax = maximum;
//       } else if (newMin < minimum) {
//         newMax += minimum - newMin;
//         newMin = minimum;
//       }
//       return getRandomInt(newMin, newMax);
//     },
//     () => false,
//   );
// }

