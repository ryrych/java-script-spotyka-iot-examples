const defaultColor = "#ff0000";
let colorPicker;
let socket;
let log;
let btnConnect;

window.addEventListener("load", init, false);

function init() {
  colorPicker = document.querySelector("#color-picker");
  log = document.getElementById("log");
  btnConnect = document.getElementById("btn-connect");

  colorPicker.value = defaultColor;

  btnConnect.addEventListener("click", () => {
    connect();
    btnConnect.classList.add("is-hidden");
  });
  colorPicker.addEventListener("input", handleColorChange, false);
  colorPicker.addEventListener("change", handleColorChange, false);
  colorPicker.select();
}

function hexTorgb(hex) {
  // e.g [ 255, 38, 0 ]
  return [
    ("0x" + hex[1] + hex[2]) | 0,
    ("0x" + hex[3] + hex[4]) | 0,
    ("0x" + hex[5] + hex[6]) | 0,
  ];
}

async function sendColor(color) {
  if (!writer) return;

  const [r, g, b] = color;
  const cmd = `${r},${g},${b}\n`;

  await writer.write(new TextEncoder().encode(cmd));
  logLine("→ " + cmd.trim());
}

function logLine(msg) {
  log.innerHTML += msg + "<br>";
  log.scrollTop = log.scrollHeight;
}

async function connect() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    writer = port.writable.getWriter();
    logLine("Connected.");

    const reader = port.readable.getReader();

    (async () => {
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          if (line) logLine("← " + line);
        }
      }
    })();
  } catch (err) {
    logLine("Error: " + err.message);
  }
}

function handleColorChange(event) {
  const element = document.querySelector("body");
  const color = event.target.value;

  if (element) {
    element.style.backgroundColor = color;
    sendColor(hexTorgb(color));
  }
}
