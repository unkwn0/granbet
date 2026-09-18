# Pierwszy pakiet poprawek GRANBET

Gałąź robocza: `poprawki-etap-1`. Bez scalenia z `main` i bez publikacji.

## Korekty po recenzji Opusa

- Pełna nawigacja od 1024 px (klasy `lg` oraz zgodny próg zamykania menu).
- Krótkie przesunięcie używa Web Animations API, bez stylów inline. Po zakończeniu efekt jest zwalniany, dzięki czemu klasy hover kafelków działają ponownie. Zmiana preferencji na ograniczenie ruchu zatrzymuje aktywne animacje.
- Hero, „Dlaczego rodziny nam ufają?” i CTA mają jawne `data-reveal="off"`. FAQ, kontakt i galeria są jawnie wykluczone przez selektory sekcji. Obecność lub brak `id` nie decyduje już o animowaniu.
- Testy regresji sprawdzają wykluczenia pomimo dodania identyfikatora oraz zwolnienie animacji bez blokowania stylów hover. Weryfikacja DOM nie zastępuje kontroli wizualnej w przeglądarce.

## Zmiany

- `useFadeIn`: treść pozostaje widoczna, zniesiono narastające opóźnienia; ruch ograniczono do krótkiego przesunięcia. Hero, FAQ, kontakt i galeria są wyłączone z tego mechanizmu. Efekt uruchamia się raz i sprząta swoje style.
- `Header`: niezawijany numer telefonu, pola przycisków minimum 44 px, menu oparte na już zainstalowanym Radix Dialog (fokus, Escape, blokada tła, powrót fokusu), telefon w menu i zamknięcie po wyborze sekcji. Po recenzji pełna nawigacja od 1024 px. Na najwęższym telefonie ukryto wyłącznie ikonę telefonu, nie numer.
- `AboutSection`, `ContactSection`, `OfferSection`, `FaqSection`: ciemniejsze złoto tekstów i stanów hover na jasnym tle; bez przebudowy sekcji i bez zmiany danych firmy.
- `index.css`: widoczny fokus i ograniczenie ruchu zgodne z preferencją systemową.
- Testy regresji menu i mechanizmu animacji.

## Kontrast

Obliczenia ze źródłowych kolorów sRGB, nie pomiar z wyrenderowanej strony.

| Tło | Dawne złoto #C6A85A | Nowe złoto tekstu #796020 | Hover #614B16 |
|---|---:|---:|---:|
| #F1EFEA | 2,00:1 | 5,21:1 | 7,23:1 |
| #E8E4DD | 1,81:1 | 4,73:1 | 6,56:1 |
| #FAF8F5 | 2,17:1 | 5,65:1 | 7,84:1 |

Na tle #1F1F1F zachowane złoto #C6A85A daje 7,18:1.

## Weryfikacja i ograniczenia

- Build i kontrola TypeScript zakończone powodzeniem.
- Testy Vitest obejmują otwieranie menu, fokus, Tab/Shift+Tab, Escape, powrót fokusu, zamknięcie po wyborze kontaktu i widoczność treści animowanych. Testy DOM nie zastępują testów prawdziwej przeglądarki.
- Ogólny lint ma wcześniejsze błędy w `ui/command.tsx`, `ui/textarea.tsx` i istniejącym `require` w `tailwind.config.ts`. Nie zmieniano ich w tym pakiecie.
- `npm ci` nie działa z zastanym niespójnym `package-lock.json`. Do testów użyto `npm install --ignore-scripts --package-lock=false --no-audit --no-fund`, bez zapisywania zmian zależności.
- Serwer Vite uruchomiono na 127.0.0.1:5173. Brak dostępnej przeglądarki; pobieranie Chromium zakończyło się timeoutem. Nie wykonano zrzutów przed/po ani testów prawdziwych fontów, układu, FAQ i kotwic w przeglądarce.
- Przed akceptacją trzeba obejrzeć widoki 1440×900, 390×844 i 360×800 oraz przejście między nawigacją mobilną i desktopową. Potwierdzić brak poziomego przewijania, fonty, widoczność kontaktu, przewijanie menu i zachowanie kotwic.

Wynik jest przygotowany do przeglądu kodu, ale nie ma jeszcze akceptacji wizualnej. Nie publikować bez niej.
