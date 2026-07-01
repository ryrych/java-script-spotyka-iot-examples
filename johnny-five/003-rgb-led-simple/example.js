require("dotenv").config();
const Five = require("johnny-five");

const BOARD_PORT = process.env.BOARD_PORT;
const board = new Five.Board({
  port: BOARD_PORT,
});

function onReady() {
  const led = new Five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3,
    },
    isAnode: true,
  });
  board.repl.inject({ led });

  led.on();
  led.color("#00ff7b");
}

board.on("ready", onReady);
