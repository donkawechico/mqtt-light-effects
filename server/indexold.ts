import * as express from 'express'
import * as http from 'http'
import * as morgan from 'morgan'
import * as path from 'path'
// import * as effects from './app/effects/';
// import { waiting } from './app/effects/test';

const app = express()
app.set('port', 8000)

app.use(express.static(path.join(__dirname, '..', 'build', 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/bulbs', () => {
    console.log("asdfasdfasdf");
    // waiting(effects.fadeInOut(0, 255, 5), 100);
});

app.all('/*', (req, res, next) => {
    console.warn('Reading the main route through http request, sending index.html');
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

const server = http.createServer(app)
server.listen(app.get('port'), () => {
    console.log('express listening on port ' + app.get('port'))
})