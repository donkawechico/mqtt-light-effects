"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* app/controllers/bulbs.controller.ts */
var dotenv = require("dotenv");
dotenv.config({ path: '.env.local' });
dotenv.load();
var express_1 = require("express");
var MqttClient_1 = require("../components/MqttClient/MqttClient");
// import { fadeIn } from '../effects';
// import * as Effects from '../effects';
var utils_1 = require("../utils");
// Assign router to the express.Router() instance
var router = express_1.Router();
MqttClient_1.default();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/:topic*/effect/:effect', function (req, res) {
    // Extract the name from the request parameters
    var colorBits;
    var newColor = { r: 0, g: 0, b: 0 };
    var topic = req.params.topic + req.params[0];
    var effect = req.params.effect;
    var _a = req.query, brightness = _a.brightness, fromColor = _a.fromColor, toColor = _a.toColor, _b = _a.step, step = _b === void 0 ? 10 : _b;
    if (toColor) {
        colorBits = toColor.split(',');
        newColor = {
            r: parseInt(colorBits[0], 10),
            g: parseInt(colorBits[1], 10),
            b: parseInt(colorBits[2], 10),
        };
    }
    var stepInt = parseInt(step, 10);
    var brightnessInt = parseInt(brightness, 10);
    utils_1.debug("Received request for bulb " + topic, req.query);
    var bulbs = MqttClient_1.getBulbs();
    utils_1.debug("Found bulbs: ", bulbs);
    var bulb = bulbs[topic];
    utils_1.debug("Found bulb: ", bulb);
    switch (effect) {
        case 'increaseBrightness':
            bulb.increaseBrightness(stepInt);
            break;
        case 'decreaseBrightness':
            bulb.decreaseBrightness(stepInt);
            break;
        case 'setBrightness':
            bulb.setBrightness(brightnessInt);
            break;
        case 'fadeIn':
            bulb.fadeIn(0, 255, 10);
            break;
        case 'fadeOut':
            bulb.fadeOut(255, 0, 10);
            break;
        case 'fadeInOut':
            bulb.fadeInOut(0, 255, 10, 5);
            break;
        case 'candle':
            bulb.candle(0, 200, 10);
            break;
        case 'colorFade':
            bulb.colorFade(fromColor ? fromColor : bulb.state.color, newColor, 10);
            break;
        case 'setColor':
            console.log("setting color to " + newColor, newColor);
            bulb.setColor(newColor);
            break;
        default:
    }
    res.send(bulb);
});
router.get('/:topic*', function (req, res) {
    // Extract the name from the request parameters
    var topic = req.params.topic + req.params[0];
    utils_1.debug("Received request for bulb " + topic, req.params);
    var bulbs = MqttClient_1.getBulbs();
    var bulb = bulbs[topic];
    res.send(bulb);
});
// The / here corresponds to the route that the BulbsController
// is mounted on in the server.ts file.
// In this case it's /bulbs
router.get('/', function (req, res) {
    res.send(MqttClient_1.getBulbs());
});
router.get('/effects/:type', function (req, res) {
    // Extract the name from the request parameters
    var type = req.params.type;
    utils_1.debug("Received request for effect: " + type);
    // switch (type) {
    //   case 'fadeIn':
    //     debug('In fadeIn');
    //     fadeIn(10, 255, 5); break;
    //   default:
    //     fadeIn(10, 255, 5);
    // }
    res.send("Effect: '" + type + "' executed.");
});
// Export the express.Router() instance to be used by server.ts
exports.BulbsController = router;
//# sourceMappingURL=bulbs.controller.js.map