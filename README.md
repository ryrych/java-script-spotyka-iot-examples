# README

Przykłady użycia języka JavaScript w kontekście urządzeń _IoT_.

```sh
./
├── johnny-five
└── web-serial-api
```

- `./johnny-five`: przykłady do warsztatu [JavaScript spotyka iOT](https://javascript-i-iot.netlify.app/
)
- `./web-serial-api`: przykłady w [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)

--

Przykłady zawarte w katalogu `./johnny-five` początkowo pochodziły z roku 2023 i były stworzone jako przykłady w warsztacie [JavaScript spotyka iOT](https://javascript-i-iot.netlify.app/). W czerwcu 2026 zostały przejrzane, poprawione i przetestowane na _Arduino UNO_.

Zafascynował mnie wtedy kurs [Hardware with Arduino & JavaScript](https://frontendmasters.com/courses/arduino-javascript/) autorstwa Steve’a Kinney’a. Będąc wtedy na ławce przez krótki czas, postanowiłem zbłębić temat i podzielić się wiedzą na temat użycia języka _JavaScript_ z urządzeniami _IoT_. Najpierw jako mini-warsztat (albo bardzo rozszerzony lighting talk) prezentowałem z kolegą Maćkiem Bryłką (<https://github.com/MBrylka>) przykłady użycia [Johnny-Five](https://johnny-five.io/); Przykłady, które opracowałem zostały udokumentowane w [JavaScript spotyka iOT](https://javascript-i-iot.netlify.app/). W czerwcu 2026 uporządkowałem repozytorium i udostępniłem publicznie.

W tym roku (2026) postanowiłem sprawdziś stan _Johnny-Five_ i okazało się, że ostatni commit pochodzi właśnie z roku 2023. Wyczytałem, że aktualnie proponuje się wykorzystanie natywnego rozwiązania _Web Serial API_, które niestety ma ograniczoną dostępność:

> This feature is not Baseline because it does not work in some of the most widely-used browsers.
<https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility>

Katalog `./web-serial-api` zawiera przykłady wykorzystujące nowe API. Obecnie dodałem jedynie kontrolę diody LED (ekwiwalent przykładu `./johnny-five/003-led-control/example.js`).

## Setup (_Johnny-Five_)

Przykłady dla _Johnny-Five_ były testowane na _OS X_. Do uruchomienia konieczne jest zainstalowanie `node-gyp`. By sprawdzić pod jakim portem dostępne jest urządzenie należy uruchomić `npx @serialport/list`. Instrukcje dla przykładów znajdują się w pliku `README.md` w katalogu z przykładem.

## Setup (_Web Serial API_)

Na przykładzie `./web-serial-api/003-led-control/`.
Potrzebujemy strony hardware i firmware oraz aplikacji klienckiej.

`./web-serial-api/003-led-control/rgb_led/rgb_led.ino` kompilujemy na naszym urządzeniu. Ja testowałem na leciwym _Arduino UNO_ przy wykorzystaniu _Arduino IDE_. Piny musisz dostosować do siebie. Przykładowe podłączenie:

![Przykładowe podłączenie diody RGB do Arduino UNO](./web-serial-api/003-led-control/img/led-control.svg).

> [!IMPORTANT]  
> Obecnie (czerwiec 2026) przykłady działają z Chrome Edge.

## Resources

- [JavaScript spotyka iOT](https://javascript-i-iot.netlify.app/
)
- [JavaScript spotyka iOT - repozytorium](https://github.com/ryrych/java-script-spotyka-iot)
- [Johnny-Five](https://johnny-five.io/)
