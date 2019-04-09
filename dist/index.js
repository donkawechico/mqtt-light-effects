"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* app/server.ts */
var dotenv = require("dotenv");
dotenv.config({ path: '@/.env.local' });
dotenv.load();
// import express from "express";
var express = require("express");
// Import everything from express and assign it to the express variable
var bulbs_controller_1 = require("./app/controllers/bulbs.controller");
// Create a new express application instance
var app = express();
var port = process.env.PORT || '8000';
// Mount the WelcomeController at the /welcome route
// app.use('/welcome', WelcomeController);
// // Serve the application at the given port
// app.listen(port, () => {
//     // Success callback
//     console.log(`Listening at http://localhost:${port}/`);
// });
app.use('/bulbs', bulbs_controller_1.BulbsController);
// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=index.js.map