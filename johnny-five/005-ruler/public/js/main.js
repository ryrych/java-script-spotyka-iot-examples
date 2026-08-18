let socket;
const EVENT_LENGTH_CHANGED = "lengthChanged";
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
  rulerValueElement.innerText = value;
  rulerValueProgressElement.style.width = `${(value / 20) * 100}%`;
}

(function () {
  initSocket();
  initView();
})();
