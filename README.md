# Calcul Schelă – Giovani Construct

Aplicație Android pentru calculul necesarului de schelă de fațadă pe cadre: din dimensiunile blocului rezultă lista de cadre, podine, balustrade, plinte, diagonale, scări, ancoraje și accesorii, cu greutate și număr de curse de transport.

## Descărcare APK

Ultima versiune: **Releases → CalculSchela.apk** (se construiește automat la fiecare modificare).

Pe telefon: descarcă fișierul, deschide-l și permite instalarea din „surse necunoscute” dacă Android îți cere.

## Windows

La Releases: **CalculSchela-Setup.exe** (se instalează, cu scurtătură pe desktop) sau **CalculSchela-Portable.exe** (pornește direct). Windows poate afișa „Windows a protejat computerul” – apasă *Mai multe informații → Rulează oricum* (aplicația nu este semnată digital).

## Structură

- `app/src/main/assets/index.html` – calculatorul (HTML + JS, merge și fără internet)
- `app/src/main/java/.../MainActivity.java` – fereastra Android (WebView)
- `desktop/` – varianta Windows (Electron) care folosește același `index.html`
- `.github/workflows/build-apk.yml` – construiește APK-ul și EXE-ul pe GitHub
