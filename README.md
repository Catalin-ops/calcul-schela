# Calcul Schelă – Giovani Construct

Aplicație Android pentru calculul necesarului de schelă de fațadă pe cadre: din dimensiunile blocului rezultă lista de cadre, podine, balustrade, plinte, diagonale, scări, ancoraje și accesorii, cu greutate și număr de curse de transport.

## Descărcare APK

Ultima versiune: **Releases → CalculSchela.apk** (se construiește automat la fiecare modificare).

Pe telefon: descarcă fișierul, deschide-l și permite instalarea din „surse necunoscute” dacă Android îți cere.

## Structură

- `app/src/main/assets/index.html` – calculatorul (HTML + JS, merge și fără internet)
- `app/src/main/java/.../MainActivity.java` – fereastra Android (WebView)
- `.github/workflows/build-apk.yml` – construiește APK-ul pe GitHub
