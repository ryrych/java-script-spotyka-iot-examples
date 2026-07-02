# README

Example of reading temperature. I used *ESP8266* and *LM35* thermometer connected to `A0` pin.

Compile and upload `./temperature/temperature.ino`.

```sh
nvm use 24
npm install
```

Start Express server:

```sh
npm start
```

Go to `http://localhost:3000`, click **Connect to Device** and pair your device. Once connected, temperature will be read. Click **Read temperature** to get new measurement.

Note: the server only serves static files — the browser talks to the Arduino directly over serial using the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API), so it only works in Chromium-based browsers (Chrome, Edge) over `http://localhost` or HTTPS.
