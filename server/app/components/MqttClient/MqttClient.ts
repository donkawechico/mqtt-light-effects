import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import { AIBulbMQTTResponse, getAiBulb } from '../AiBulb/AiBulb';
import { AIBulbList } from '../AiBulbList/AiBulbList';

let client: MqttClient;

export function getClient() {
  return client;
}

const bulbs: AIBulbList = {};

export const getBulbs: () => AIBulbList = () => bulbs;

const configureMqttClient = () => {
  client = mqtt.connect(
    process.env.MQTT_HOST,
    { 
      password: process.env.MQTT_PASS,
      port: process.env.MQTT_PORT ? +process.env.MQTT_PORT : 1883,
      username: process.env.MQTT_USER,
    }
  );

  client.on('connect', () => {
    client.subscribe('home/+/light/#');
    // Effects.config({ client, bulbs });
  });

  client.on('message', (topic: string, message: AIBulbMQTTResponse) => {
    const bulb = getAiBulb(topic, message);
    if (!bulb) {
      return;
    }
    bulbs[topic] = bulb;
  });

  client.on('error', (err) => {
    console.log(`RECEIVED ERROR!!! ${err}`)
  })

  return client;
}

export default configureMqttClient;