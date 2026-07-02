require("dotenv").config();
const Five = require("johnny-five");

const BOARD_PORT = process.env.BOARD_PORT;
const board = new Five.Board({
  port: BOARD_PORT,
});

function onReady() {
  const led = new Five.Led("13");

  led.blink(500);

  this.repl.inject({
    led: led,
  });
}

board.on("ready", onReady);
