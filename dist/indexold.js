"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var morgan = require("morgan");
var path = require("path");
// import * as effects from './app/effects/';
// import { waiting } from './app/effects/test';
var app = express();
app.set('port', 8000);
app.use(express.static(path.join(__dirname, '..', 'build', 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/bulbs', function () {
    console.log("asdfasdfasdf");
    // waiting(effects.fadeInOut(0, 255, 5), 100);
});
app.all('/*', function (req, res, next) {
    console.warn('Reading the main route through http request, sending index.html');
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('express listening on port ' + app.get('port'));
});
//# sourceMappingURL=indexold.js.map