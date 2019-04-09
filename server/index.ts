/* app/server.ts */
import * as dotenv from 'dotenv';
dotenv.config({path: '@/.env.local'});
dotenv.load();

// import express from "express";
import express = require('express');

// Import everything from express and assign it to the express variable

import { BulbsController } from './app/controllers/bulbs.controller';

// Create a new express application instance
const app: express.Application = express();


const port: string | undefined = process.env.PORT || '8000';

// Mount the WelcomeController at the /welcome route
// app.use('/welcome', WelcomeController);
// // Serve the application at the given port
// app.listen(port, () => {
//     // Success callback
//     console.log(`Listening at http://localhost:${port}/`);
// });

app.use('/bulbs', BulbsController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});