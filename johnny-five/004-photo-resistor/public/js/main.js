let socket;
const EVENT_LIGHT_LEVEL_CHANGED = 'lightLevelChanged';

function initSocket() {
  socket = io();
  socket.on(EVENT_LIGHT_LEVEL_CHANGED, function ({ lightLevel: value }) {
    setAperture(value);
    changeTheme(value);
  });
}

const apertureElement = document.querySelector('.aperture');
const themeSwitchElement = document.querySelector('.theme-switch');

function setAperture(value = 0) {
  const borderWidth = 100 - value;
  apertureElement.style.borderWidth = `${borderWidth}px`;
  apertureElement.dataset.value = value;
}

function changeTheme(value = 0) {
  const isDark = value <= 40;
  const checkboxValue = isDark ? true : false;
  themeSwitchElement.checked = checkboxValue;
}

(function () {
  initSocket();
  setAperture();
})();
