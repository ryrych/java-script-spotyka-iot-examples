const defaultColor = "#0000ff";
let colorPicker;
let socket;

window.addEventListener("load", startup, false);

function startup() {
  socket = io();

  colorPicker = document.querySelector("#color-picker");
  colorPicker.value = defaultColor;
  colorPicker.addEventListener("input", handleColorChange, false);
  colorPicker.addEventListener("change", handleColorChange, false);
  colorPicker.select();

  socket.emit("color-changed", defaultColor);
}

function handleColorChange(event) {
  const element = document.querySelector("body");
  const color = event.target.value;
  if (element) {
    element.style.backgroundColor = color;
    socket.emit("color-changed", color);
  }
}
