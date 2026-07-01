const int PIN_R = 6;
const int PIN_G = 5;
const int PIN_B = 3;

void setup() {
  Serial.begin(9600);

  pinMode(PIN_R, OUTPUT);
  pinMode(PIN_G, OUTPUT);
  pinMode(PIN_B, OUTPUT);
}

void loop() {
    if (Serial.available()) {
      // Expects "R,G,B\n" e.g. "255,0,128\n"
      String line = Serial.readStringUntil('\n');
      int r, g, b;
  
      if (sscanf(line.c_str(), "%d,%d,%d", &r, &g, &b) == 3) {
        Serial.println("OK:" + String(r) + "," + String(g) + "," + String(b));
        setColor(constrain(r, 0, 255), constrain(g, 0, 255), constrain(b, 0, 255));
      } else {
        Serial.println("Invalid input");
      }
    }
}

void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(PIN_R, 255 - redValue);
  analogWrite(PIN_G, 255 - greenValue);
  analogWrite(PIN_B, 255 - blueValue);
}