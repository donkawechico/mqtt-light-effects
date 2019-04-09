"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt = require("mqtt");
var AiBulb_1 = require("../AiBulb/AiBulb");
var client;
exports.getClient = function () { return client; };
var bulbs = {};
exports.getBulbs = function () { return bulbs; };
var configureMqttClient = function () {
    client = mqtt.connect(process.env.MQTT_HOST, {
        password: process.env.MQTT_PASS,
        port: process.env.MQTT_PORT ? +process.env.MQTT_PORT : 1883,
        username: process.env.MQTT_USER,
    });
    client.on('connect', function () {
        client.subscribe('home/+/light/#');
        // Effects.config({ client, bulbs });
    });
    client.on('message', function (topic, message) {
        var bulb = AiBulb_1.getAiBulb(topic, message);
        if (!bulb) {
            return;
        }
        bulbs[topic] = bulb;
    });
    client.on('error', function (err) {
        console.log("RECEIVED ERROR!!! " + err);
    });
    return client;
};
exports.default = configureMqttClient;
//# sourceMappingURL=MqttClient.js.map