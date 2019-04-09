import { AIBulb } from '../../app/components/AiBulb/AiBulb';
import { waiting } from './test';

export function * generator(from: number, to: number, decrement: number) {
  for (let i = from; i > to; i -= decrement) {
    yield i;
  }
};

export type FadeOut = (bulb: AIBulb, from: number, to: number, decrement: number) => void;
const fadeOut: FadeOut = (bulb, from, to, decrement) => {
  waiting(
    generator(from, to, decrement),
    (lastItem) => { 
      if (!lastItem.done) {
        bulb.setBrightness(lastItem.value) 
      }
    },
    100
  );
}

export default fadeOut;
