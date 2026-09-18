# Etap 2 — kontakt i CTA

Baza: `7299ba3` (etap 1). Gałąź: `etap-2-kontakt`. Do przeglądu, bez scalenia i publikacji.

## Zmiany

- Usunięto renderowanie osobnej sekcji CTA „Pomożemy…”; plik komponentu zachowano.
- Zachowano nagłówek „Skontaktuj się z nami”, zmniejszono odstęp nad kontaktem.
- Skrócony ciemny boks zawiera dwa opisane przyciski: Kryłów — zakład i Hrubieszów — biuro. Bez powtórzonych godzin, e-maila i dodatkowego akapitu.
- Na telefonie boks jest przed lokalizacjami również w DOM; od 1024 px lokalizacje są po lewej, boks po prawej. Boks nie rozciąga się na wysokość adresów.
- Godziny pozostają w kartach punktów; stopka ma opisane numery i link „Godziny i dojazd” bezpośrednio do `#lokalizacje`.
- Telefony i mapy w kartach oraz linki kontaktowe stopki mają minimum 44 px wysokości. Telefon w zdaniu o innych wyrobach nie łamie się.
- Dane firmy, FAQ, metadane, hero i galeria bez zmian. Formularz nadal wyłączony. Brak nowych zależności.

## Sprawdzone lokalnie

- Testy: 6/6; nowy test sprawdza kolejność kontaktu, etykiety i adresy linków, trzy lokalizacje, brak powtórzonych godzin i wyłączony formularz.
- TypeScript: konfiguracje app i node przechodzą.
- ESLint zmienionych plików TS/TSX przechodzi. Nie oznacza to usunięcia wcześniejszych błędów w innych plikach.
- Build produkcyjny i `git diff --check` przechodzą.
- Nie wykonano weryfikacji wizualnej: pobranie Chromium przez Playwright zakończyło się błędami sieci i timeoutami. Nie ma zrzutów ani potwierdzonych pomiarów układu.

## Odbiór w przeglądarce — do wykonania przez recenzenta

Porównać z bazą przy poprawnie załadowanych fontach: 360×800, 390×844, 768 px, 1024 px i 1440×900.

1. Kliknięcie „Porozmawiajmy” pokazuje nagłówek kontaktu bez zasłonięcia przez pasek. Na obu telefonach oba przyciski telefoniczne powinny być widoczne w pierwszym ekranie po skoku; jeżeli nie, skorygować odstępy bez zmniejszania czytelności.
2. Na telefonie boks przed adresami; na komputerze adresy po lewej i boks po prawej. Brak przewijania poziomego i nakładania elementów.
3. Numery są niełamliwe, pola dotyku mają deklarowane minimum 44 px. Sprawdzić fokus i kolejność Tab, menu oraz skoki z menu.
4. „Godziny i dojazd” trafia bezpośrednio do kart punktów, poniżej przyklejonego nagłówka. Mapy i tel/mailto zachowują adresy.
5. Między FAQ a kontaktem nie ma osobnej sekcji „Pomożemy…”. Brak widocznego przycisku „Napisz do nas”. Hero, galeria i dane bez regresji.
6. Dołączyć zrzuty kontaktu na telefonie i komputerze oraz stopki. Przed publikacją sprawdzić menu na prawdziwym iPhonie.

## Odłożone

- Nowe zdanie o schodach, parapetach i blatach w boksie — właściciel musi wskazać numer do tych zapytań. Istniejąca wzmianka w ofercie pozostaje.
- Termin realizacji, statystyki, SEO oraz znana niespójność package-lock/npm ci — osobny zakres, nie naprawiano tutaj.
