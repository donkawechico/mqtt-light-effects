/* app/controllers/bulbs.controller.ts */
import * as dotenv from 'dotenv';
dotenv.config({path: '.env.local'});
dotenv.load();

import { Request, Response, Router } from 'express';
import { RGB } from '../../app/components/AiBulb/AiBulb';
import configureMqttClient, { getBulbs } from '../components/MqttClient/MqttClient';
// import { fadeIn } from '../effects';
// import * as Effects from '../effects';
import { debug } from '../utils';

// Assign router to the express.Router() instance
const router: Router = Router();
configureMqttClient();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/:topic*/effect/:effect', (req: Request, res: Response) => {
  // Extract the name from the request parameters
  let colorBits;
  let newColor: RGB = { r: 0, g: 0, b: 0};
  const topic = req.params.topic + req.params[0];
  const { effect } = req.params;
  const { brightness, fromColor, toColor, step = 10 } = req.query;

  if (toColor) {
    colorBits = toColor.split(',');
    newColor = {
      r: parseInt(colorBits[0], 10),
      g: parseInt(colorBits[1], 10),
      b: parseInt(colorBits[2], 10),
    };
  }
  const stepInt = parseInt(step, 10);
  const brightnessInt = parseInt(brightness, 10);

  debug(`Received request for bulb ${topic}`, req.query);

  const bulbs = getBulbs();
  debug(`Found bulbs: `, bulbs);
  const bulb = bulbs[topic];

  debug(`Found bulb: `, bulb);

  switch (effect) {
    case 'increaseBrightness':
      bulb.increaseBrightness(stepInt); break;
    case 'decreaseBrightness':
      bulb.decreaseBrightness(stepInt); break;
    case 'setBrightness':
      bulb.setBrightness(brightnessInt); break;
    case 'fadeIn':
      bulb.fadeIn(0, 255, 10); break;
    case 'fadeOut':
      bulb.fadeOut(255, 0, 10); break;
    case 'fadeInOut':
      bulb.fadeInOut(0, 255, 10, 5); break;
    case 'candle':
      bulb.candle(0, 200, 10); break;
    case 'colorFade':
      bulb.colorFade(fromColor? fromColor : bulb.state.color, newColor, 10); break;
    case 'setColor':
      console.log(`setting color to ${newColor}`, newColor);
      bulb.setColor(newColor); break;
    default:
  }

  res.send(bulb);
});

router.get('/:topic*', (req: Request, res: Response) => {
  // Extract the name from the request parameters
  const topic = req.params.topic + req.params[0];
  
  debug(`Received request for bulb ${topic}`, req.params);

  const bulbs = getBulbs();
  
  const bulb = bulbs[topic];
  
  res.send(bulb);
});



// The / here corresponds to the route that the BulbsController
// is mounted on in the server.ts file.
// In this case it's /bulbs
router.get('/', (req: Request, res: Response) => {
  res.send(getBulbs());
});

router.get('/effects/:type', (req: Request, res: Response) => {
  // Extract the name from the request parameters
  const { type } = req.params;
  
  debug(`Received request for effect: ${type}`);
    
  // switch (type) {
  //   case 'fadeIn':
  //     debug('In fadeIn');
  //     fadeIn(10, 255, 5); break;
  //   default:
  //     fadeIn(10, 255, 5);
  // }

  res.send(`Effect: '${type}' executed.`);
});

// Export the express.Router() instance to be used by server.ts
export const BulbsController: Router = router;