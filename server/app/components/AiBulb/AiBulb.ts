// import { getClient } from '../../../../dist/app/components/MqttClient/MqttClient';
import { fadeIn, fadeInOut, fadeOut } from '../../../app/effects';
import candle from '../../../app/effects/candle';
import colorFade from '../../../app/effects/colorFade';
import { debug } from '../../../app/utils';
import { EffectBulb } from '../EffectBulb/EffectBulb';
import { getClient } from '../MqttClient/MqttClient';

const MAX_BRIGHTNESS = 255;
const MIN_BRIGHTNESS = 0;

export interface AIBulb extends EffectBulb {
  readonly stateTopic: string;
  readonly setTopic: string;
  readonly name: string;
  state: AIBulbState;
}

export enum PowerState {
  'OFF',
  'ON'
}

export interface AIBulbState extends AIBulbMQTTResponse {
  power: PowerState;
}

export interface AIBulbMQTTResponse {
  readonly state: PowerState;
  brightness: number;
  white_value: number;
  color_temp: number;
  color: RGB;
  gamma: boolean;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}  

const validateBrightness = (bulb: AIBulb) => {
  if (bulb.state.brightness >= MAX_BRIGHTNESS) {
    bulb.state.brightness = MAX_BRIGHTNESS;
  }
  if (bulb.state.brightness <= MIN_BRIGHTNESS) {
    bulb.state.brightness = MIN_BRIGHTNESS;
  }
  return bulb;
}

const increaseBrightness = (bulb: AIBulb, step: number) => {
  console.log(`in inc bright with ${step}`);
  bulb.state.brightness += step;
  bulb = validateBrightness(bulb);
  saveBulb(bulb);
  return bulb;
}

const setBrightness = (bulb: AIBulb, brightness: number) => {
  bulb.state.brightness = brightness;
  bulb = validateBrightness(bulb);
  saveBulb(bulb);
  return bulb;
}

const setColor = (bulb: AIBulb, color: RGB) => {
  bulb.state.color = color;
  saveBulb(bulb);
  return bulb;
}

const saveBulb = (bulb: AIBulb) => {
  const client = getClient();
  const mqtt = convertStateToMQTT(bulb.state);
  client.publish(bulb.setTopic, mqtt);
}

export function getAiBulb(topic: string, message: AIBulbMQTTResponse) {
  if (topic.endsWith('status') || topic.endsWith('set')) {
    return;
  }
  const mqttresponse = JSON.parse(message.toString());

  const bulb: AIBulb = {
    name: topic,
    setTopic: `${topic}/set`,
    state: {
      ...mqttresponse,
      power: mqttresponse.state,
    },
    stateTopic: topic,
    candle: (minimum: number, maximum: number, increment: number) => { candle(bulb, minimum, maximum, increment) },
    decreaseBrightness: (step: number) => { increaseBrightness(bulb, -step) },
    fadeIn: (from: number, to: number, step: number) => { fadeIn(bulb, from, to, step) },
    fadeInOut: (from: number, to: number, step: number, times?: number) => { fadeInOut(bulb, from, to, step, times) },
    fadeOut: (from: number, to: number, step: number) => { fadeOut(bulb, from, to, step) },
    increaseBrightness: (step: number) => { increaseBrightness(bulb, step) },
    setBrightness: (brightness: number) => { setBrightness(bulb, brightness) },
    setColor: (color: RGB) => { setColor(bulb, color) },
    colorFade: (from: RGB, to: RGB, steps: number) => { colorFade(bulb, from, to, steps) },
  };

  return bulb;
}

export function convertStateToMQTT(state: AIBulbState) {
  debug(`About to convert state to mqtt message: `, state);
  const message = `
    {
      "state": "${state.power}",
      "brightness": ${state.brightness},
      "color": ${JSON.stringify(state.color)}
    }`;
  return message;
}