const int PIN_LED = 15; // D8 on ESP8266

void setup() {
  Serial.begin(9600);
  
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  if (Serial.available()) {
    // Expects "ON\n" or "OFF\n"
    String line = Serial.readStringUntil('\n');
    line.trim();

    if (line == "ON") {
      digitalWrite(PIN_LED, HIGH);
      Serial.println("OK:ON");
    } else if (line == "OFF") {
      digitalWrite(PIN_LED, LOW);
      Serial.println("OK:OFF");
    } else {
      Serial.println("Invalid input");
    }
  }
}
