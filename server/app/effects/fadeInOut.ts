import { AIBulb } from '../../app/components/AiBulb/AiBulb';
import { generator as fadeInGenerator } from './fadeIn';
import { generator as fadeOutGenerator } from './fadeOut';
import { waiting } from './test';

function * fadeInOutOnce(from: number, to: number, increment: number) {
  const inFader = fadeInGenerator(from, to, increment);
  const outFader = fadeOutGenerator(to, from, increment);
  let lastIn;
  let lastOut;

  for (let i = from; i < to; i += increment) {
    lastIn = inFader.next().value;
    yield lastIn;
  }
  for (let i = from; i < to; i += increment) {
    lastOut = outFader.next().value;
    yield lastOut
  }
};

export function * generator(from: number, to: number, increment: number, times?: number) {
  let i: number = 0;
  while((times? i++ < times : true)) {
    for (const x of fadeInOutOnce(from, to, increment)) {
      yield x;
    }
  }
};

export type FadeInOut = (bulb: AIBulb, from: number, to: number, increment: number, times?: number) => void;
const fadeInOut: FadeInOut = (bulb, from, to, decrement, times) => {
  waiting(
    generator(from, to, decrement, times),
    (lastItem) => {
      if (!lastItem.done) {
        bulb.setBrightness(lastItem.value)
      }
    },
    100
  );
}

export default fadeInOut;