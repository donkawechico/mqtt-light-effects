"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import { getClient } from '../../../../dist/app/components/MqttClient/MqttClient';
var effects_1 = require("../../../app/effects");
var candle_1 = require("../../../app/effects/candle");
var colorFade_1 = require("../../../app/effects/colorFade");
var utils_1 = require("../../../app/utils");
var MqttClient_1 = require("../MqttClient/MqttClient");
var MAX_BRIGHTNESS = 255;
var MIN_BRIGHTNESS = 0;
var PowerState;
(function (PowerState) {
    PowerState[PowerState["OFF"] = 0] = "OFF";
    PowerState[PowerState["ON"] = 1] = "ON";
})(PowerState = exports.PowerState || (exports.PowerState = {}));
var validateBrightness = function (bulb) {
    if (bulb.state.brightness >= MAX_BRIGHTNESS) {
        bulb.state.brightness = MAX_BRIGHTNESS;
    }
    if (bulb.state.brightness <= MIN_BRIGHTNESS) {
        bulb.state.brightness = MIN_BRIGHTNESS;
    }
    return bulb;
};
var increaseBrightness = function (bulb, step) {
    console.log("in inc bright with " + step);
    bulb.state.brightness += step;
    bulb = validateBrightness(bulb);
    saveBulb(bulb);
    return bulb;
};
var setBrightness = function (bulb, brightness) {
    bulb.state.brightness = brightness;
    bulb = validateBrightness(bulb);
    saveBulb(bulb);
    return bulb;
};
var setColor = function (bulb, color) {
    bulb.state.color = color;
    saveBulb(bulb);
    return bulb;
};
var saveBulb = function (bulb) {
    var client = MqttClient_1.getClient();
    var mqtt = convertStateToMQTT(bulb.state);
    client.publish(bulb.setTopic, mqtt);
};
function getAiBulb(topic, message) {
    if (topic.endsWith('status') || topic.endsWith('set')) {
        return;
    }
    var mqttresponse = JSON.parse(message.toString());
    var bulb = {
        name: topic,
        setTopic: topic + "/set",
        state: tslib_1.__assign({}, mqttresponse, { power: mqttresponse.state }),
        stateTopic: topic,
        candle: function (minimum, maximum, increment) { candle_1.default(bulb, minimum, maximum, increment); },
        decreaseBrightness: function (step) { increaseBrightness(bulb, -step); },
        fadeIn: function (from, to, step) { effects_1.fadeIn(bulb, from, to, step); },
        fadeInOut: function (from, to, step, times) { effects_1.fadeInOut(bulb, from, to, step, times); },
        fadeOut: function (from, to, step) { effects_1.fadeOut(bulb, from, to, step); },
        increaseBrightness: function (step) { increaseBrightness(bulb, step); },
        setBrightness: function (brightness) { setBrightness(bulb, brightness); },
        setColor: function (color) { setColor(bulb, color); },
        colorFade: function (from, to, steps) { colorFade_1.default(bulb, from, to, steps); },
    };
    return bulb;
}
exports.getAiBulb = getAiBulb;
function convertStateToMQTT(state) {
    utils_1.debug("About to convert state to mqtt message: ", state);
    var message = "\n    {\n      \"state\": \"" + state.power + "\",\n      \"brightness\": " + state.brightness + ",\n      \"color\": " + JSON.stringify(state.color) + "\n    }";
    return message;
}
exports.convertStateToMQTT = convertStateToMQTT;
//# sourceMappingURL=AiBulb.js.map