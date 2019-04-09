import * as dotenv from 'dotenv';
dotenv.config({path: '.env.local'});
dotenv.load();


export function debug(message: string, obj?: any) {
  const DEBUG = process.env.DEBUG || false;
  if (DEBUG) {
    if (obj) {
      console.log(`DEBUG: ${message}`, obj);
    } else {
      console.log(`DEBUG: ${message}`);
    }
  }
}

export const ZERO_BRIGHTNESS = '{"state":"OFF","brightness":0,"white_value":0,"color_temp":154,"color":{"r":255,"g":136,"b":12},"gamma":true}';


// mqttresponse.name = topic;
//   mqttresponse.setTopic = `${topic}/set`;
//   mqttresponse.stateTopic = topic;

//   bulbs[topic] = normalizeMQTTResponse(mqttresponse);
// export const normalizeMQTTResponse: (mqttResponseAsJson: AIBulb) => AIBulb = mqttResponseAsJson => {
//   mqttResponseAsJson.state.power = mqttResponseAsJson.state;
//   return {
//     ...mqttResponseAsJson,
//     power: mqttResponseAsJson.state.state,
//   };
// }