import { AIBulb } from '../../app/components/AiBulb/AiBulb';
import { waiting } from './test';

export function * generator(from: number, to: number, increment: number) {
  for (let i = from; i < to; i += increment) {
    yield i;
  }
};

export type FadeIn = (bulb: AIBulb, from: number, to: number, increment: number) => void;
const fadeIn: FadeIn = (bulb, from, to, increment) => {
  waiting(
    generator(from, to, increment),
    (lastItem) => { 
      if (!lastItem.done) {
        bulb.setBrightness(lastItem.value)
      }
    },
    100
  );
}

export default fadeIn;
