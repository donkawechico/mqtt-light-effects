"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import { getClient } from '../MqttClient/MqttClient';
var MqttClient_1 = require("../../../../dist/app/components/MqttClient/MqttClient");
var utils_1 = require("../../../app/utils");
var client = MqttClient_1.getClient();
var MAX_BRIGHTNESS = 255;
var MIN_BRIGHTNESS = 0;
var PowerState;
(function (PowerState) {
    PowerState[PowerState["OFF"] = 0] = "OFF";
    PowerState[PowerState["ON"] = 1] = "ON";
})(PowerState = exports.PowerState || (exports.PowerState = {}));
function getAiBulb(topic, message) {
    if (topic.endsWith('status') || topic.endsWith('set')) {
        return;
    }
    var mqttresponse = JSON.parse(message.toString());
    var bulb = {
        decreaseBrightness: function (step) {
            mqttresponse.state.brightness -= step;
            if (mqttresponse.state.brightness <= MIN_BRIGHTNESS) {
                mqttresponse.state.brightness = MIN_BRIGHTNESS;
            }
            var mqtt = convertStateToMQTT(mqttresponse.state);
            client.publish(topic, mqtt);
        },
        increaseBrightness: function (step) {
            bulb.state.brightness += step;
            if (bulb.state.brightness >= MAX_BRIGHTNESS) {
                bulb.state.brightness = MAX_BRIGHTNESS;
            }
            var mqtt = convertStateToMQTT(bulb.state);
            client.publish(bulb.setTopic, mqtt);
            return bulb;
        },
        name: topic,
        setTopic: topic + "/set",
        state: tslib_1.__assign({}, mqttresponse, { power: mqttresponse.state }),
        stateTopic: topic,
    };
    return bulb;
}
exports.getAiBulb = getAiBulb;
function convertStateToMQTT(state) {
    utils_1.debug("About to convert state to mqtt message: ", state);
    var message = "\n    {\n      \"state\": \"" + state.power + "\",\n      \"brightness\": " + state.brightness + "}\n    }";
    return message;
}
exports.convertStateToMQTT = convertStateToMQTT;
//# sourceMappingURL=AiBulb.js.map