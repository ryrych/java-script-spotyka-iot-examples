# README

```sh
nvm use 24
npm install
```

Wire an LED (with a current-limiting resistor) to pin a pin of your choice and GND on your Arduino UNO. I was testing on _ESP8266_ and **D8** pin which maps to pin number `15` (See: `const int PIN_LED = 15; // D8 on ESP8266`)

Compile and upload `./hello_world_led/hello_world_led.ino`.

Start Express server:

```sh
npm start
```

Go to `http://localhost:3000`, click **Connect to Device** and pair your Arduino. Once connected, use the **ON** / **OFF** buttons to control the LED.

Note: the server only serves static files — the browser talks to the Arduino directly over serial using the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API), so it only works in Chromium-based browsers (Chrome, Edge) over `http://localhost` or HTTPS.
