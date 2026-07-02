const int PIN_TEMP = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("OK:CONNECTED");
}

void loop() {
  if (Serial.available()) {
    // Expects "READ\n"
    String line = Serial.readStringUntil('\n');
    line.trim();

    if (line == "READ") {
      float temp = read_temperature();
      Serial.println("OK:" + String(temp));
    } else {
      Serial.println("Invalid input");
    }
  }
}

float read_temperature() {
  float reading = analogRead(PIN_TEMP);
  float voltage = (reading / 1024.0) * 3300;
  float temp = voltage / 10;

  return temp;
}
