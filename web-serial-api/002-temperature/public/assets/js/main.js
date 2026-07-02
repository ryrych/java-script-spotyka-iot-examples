let port;
let writer;
let log;
let btnConnect;
let btnRead;
let temperatureElement;

const units = {
  Celcius: "°C",
};

const config = {
  minTemp: -20,
  maxTemp: 50,
  unit: "Celcius",
};

window.addEventListener("load", init, false);

function init() {
  btnConnect = document.getElementById("btn-connect");
  btnRead = document.getElementById("btn-read");
  log = document.getElementById("log");
  temperatureElement = document.querySelector(".temperature");

  btnConnect.addEventListener("click", async () => {
    try {
      await connect();
      sendCommand("READ");

      btnConnect.classList.add("is-hidden");
      btnRead.classList.remove("is-hidden");
      document.querySelector("body").classList.add("is-connected");
    } catch (e) {
      console.error(e);
    }
  });

  btnRead.addEventListener("click", () => sendCommand("READ"));
}

async function sendCommand(cmd) {
  if (!writer) return;

  await writer.write(new TextEncoder().encode(cmd + "\n"));
  logLine("→ " + cmd);
}

function logLine(msg) {
  log.innerHTML += msg + "<br>";
  log.scrollTop = log.scrollHeight;
}

function setTemperature(value = 0) {
  temperatureElement.style.height =
    ((value - config.minTemp) / (config.maxTemp - config.minTemp)) * 100 + "%";
  temperatureElement.dataset.value = value + units[config.unit];
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
          if (line) {
            processLine(line);
          }
        }
      }
    })();
  } catch (err) {
    logLine("Error: " + err.message);
    throw new Error(err);
  }
}

function processLine(line) {
  logLine("← " + line);

  if (line.startsWith("OK:")) {
    const value = parseFloat(line.slice(3));
    if (!Number.isNaN(value)) setTemperature(value);
  }
}
