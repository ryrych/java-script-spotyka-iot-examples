let socket;
const EVENT_LENGTH_CHANGED = "lengthChanged";
const MAX_RANGE_CM = 20;
let rulerValueElement;
let rulerValueProgressElement;

function initSocket() {
  socket = io();
  socket.on(EVENT_LENGTH_CHANGED, function ({ length }) {
    console.log("received:", length);
    updateView(length);
  });
}

function initView() {
  rulerValueElement = document.querySelector(".ruler-value-value");
  rulerValueProgressElement = document.querySelector(".ruler-value-progress");
}

function updateView(value = 0) {
  const clamped = Math.min(Math.max(value, 0), MAX_RANGE_CM);
  rulerValueElement.innerText = value;
  rulerValueProgressElement.style.width = `${(clamped / MAX_RANGE_CM) * 100}%`;
}

(function () {
  initSocket();
  initView();
})();
