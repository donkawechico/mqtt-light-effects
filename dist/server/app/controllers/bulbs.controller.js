"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* app/controllers/bulbs.controller.ts */
var dotenv = require("dotenv");
dotenv.config({ path: '.env.local' });
dotenv.load();
var express_1 = require("express");
var MqttClient_1 = require("../components/MqttClient/MqttClient");
var effects_1 = require("../effects");
// import * as Effects from '../effects';
var utils_1 = require("../utils");
// Assign router to the express.Router() instance
var router = express_1.Router();
MqttClient_1.default();
// const client = getClient();
// router.use(cors());
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/list', function (req, res) {
    // Extract the name from the request parameters
    var type = req.params.type;
    utils_1.debug("Received request for bulb list");
    res.send("Effect: '" + type + "' executed.");
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
    switch (type) {
        case 'fadeIn':
            utils_1.debug('In fadeIn');
            effects_1.fadeIn(10, 255, 5);
            break;
        default:
            effects_1.fadeIn(10, 255, 5);
    }
    res.send("Effect: '" + type + "' executed.");
});
// Export the express.Router() instance to be used by server.ts
exports.BulbsController = router;
//# sourceMappingURL=bulbs.controller.js.map