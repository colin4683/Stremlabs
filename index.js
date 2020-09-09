// Require dependancies
const PIXI = require('pixi.js');
let graphics = new PIXI.Graphics();
graphics.beginFill(0xFFFF00);

// set the line style to have a width of 5 and set the color to red
graphics.lineStyle(5, 0xFF0000);

// draw a rectangle
graphics.drawRect(0, 0, 300, 200);

stage.addChild(graphics);
require('dotenv').config();
const chalk = require('chalk');
require('better-logging')(console, {
    color: {
      base: chalk.grey,
      type: {
        debug: chalk.yellow,
        info: chalk.yellowBright,
        log: chalk.greenBright,
        error: chalk.redBright,
        warn: chalk.whiteBright,
      }
    },
});
const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io-client');

// Initialize socket io with streamlabs socket api url using token
const api_url = `https://sockets.streamlabs.com?token=${process.env.TOKEN}`;
const streamlabs = io(api_url);
console.log('Socket started');
console.info('Listening for events...');

// Wait for events
streamlabs.on('event', (event_data) => {
    let type = event_data.type;
    console.warn(`Event catched -> [Type: ${type}]`);
    let message = event_data.message;
    if (type == "follow") {
        const name = message[0].name;
        console.info(`New subscriber ${name}`);
    }
    else if (type == "donation") {
        const name = message[0].from;
        const amout = message[0].formatted_amount;
        const donate_message = message[0].message;
       console.info(`New donation from [${name}] | amount: ${amout} | message: ${donate_message}`);
    }

});