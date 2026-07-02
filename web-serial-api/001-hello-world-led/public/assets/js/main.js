let port;
let writer;
let log;
let btnConnect;
let btnOn;
let btnOff;

window.addEventListener("load", init, false);

function init() {
  btnConnect = document.getElementById("btn-connect");
  btnOn = document.getElementById("btn-on");
  btnOff = document.getElementById("btn-off");
  log = document.getElementById("log");

  btnConnect.addEventListener("click", async () => {
    await connect();

    sendCommand("ON"); // Hello, world! on start

    btnConnect.classList.add("is-hidden");
    btnOn.classList.remove("is-hidden");
    btnOff.classList.remove("is-hidden");
  });

  btnOn.addEventListener("click", () => sendCommand("ON"));
  btnOff.addEventListener("click", () => sendCommand("OFF"));
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
