let socket;
const EVENT_TEMPERATURE_CHANGED = 'temperatureChanged';

function initSocket() {
  socket = io();
  socket.on(EVENT_TEMPERATURE_CHANGED, function ({ celsius }) {
    setTemperature(celsius);
  });
}

const temperatureElement = document.querySelector('.temperature');

const units = {
  Celcius: '°C',
};

const config = {
  minTemp: -20,
  maxTemp: 50,
  unit: 'Celcius',
};

function setTemperature(value = 0) {
  temperatureElement.style.height = ((value - config.minTemp) / (config.maxTemp - config.minTemp)) * 100 + '%';
  temperatureElement.dataset.value = value + units[config.unit];
}

(function () {
  initSocket();
  setTemperature();
})();
