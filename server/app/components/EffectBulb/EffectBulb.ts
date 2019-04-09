import { RGB } from '../AiBulb/AiBulb';


export interface LightEffect {
  name: string;
  execute(): void;
}

export interface EffectBulb {
  effect?: LightEffect;
  increaseBrightness(step?: number): void;
  decreaseBrightness(step?: number): void;
  setBrightness(brightness: number): void;
  setColor(color: RGB): void;
  fadeIn(from: number, to: number, step: number): void;
  fadeOut(from: number, to: number, step: number): void;
  fadeInOut(from: number, to: number, step: number, times?: number): void;
  candle(minimum: number, maximum: number, increment: number): void;
  colorFade(from: RGB, to: RGB, steps: number): void;
}
