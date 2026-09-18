# Etap 3 — zależności i porządki techniczne

Baza: `a80b4c0`. Gałąź: `etap-3-techniczne`. Do przeglądu; bez scalenia i publikacji.

## Zmiany

- Uzupełniono package-lock.json na podstawie package.json. Wcześniej npm ci odrzucało lockfile, m.in. z powodu brakujących bibliotek testowych, react-helmet-async i yet-another-react-lightbox.
- Usunięto bezpośrednie zależności @hookform/resolvers i zod: brak odwołań w źródłach i konfiguracji. Zachowano date-fns, ponieważ stanowi peer dependency react-day-picker używanego przez komponent kalendarza.
- Zachowano zależności istniejących komponentów UI, routera i galerii. Nie usuwano komponentów tylko dlatego, że nie występują na stronie głównej.
- Zastąpiono dwa puste interfejsy aliasami typów (command, textarea) oraz require w konfiguracji Tailwind importem ESM. Usuwa to trzy błędy ESLint bez wyłączania reguł.
- Nie zmieniano treści, danych firmy, układu strony ani konfiguracji ESLint.

## Kontrola

- Czyste npm ci (z normalną obsługą skryptów instalacyjnych): zakończone powodzeniem, 496 paczek.
- npm run lint: 0 błędów, 7 wcześniejszych ostrzeżeń Fast Refresh.
- npm test: 6/6.
- TypeScript app i node: bez błędów.
- Produkcyjny build: poprawny, JS gzip 135,04 kB, CSS gzip 13,41 kB. Nie przypisujemy zmiany rozmiaru usunięciu dwóch nieużywanych zależności: poprzednie pomiary pochodziły z instalacji bez lockfile.
- Utrzymano wersje już zapisane w lockfile z wyjątkiem trzech zależności pośrednich wymaganych przy jego uzgodnieniu: sourcemap-codec 1.5.0 → 1.6.0, debug 4.3.7 → 4.4.3, hasown 2.0.2 → 2.0.4. Dodano brakujące wpisy; nie wykonano zbiorczego aktualizowania pakietów.

## Ostrzeżenia i ograniczenia

- Siedem ostrzeżeń react-refresh/only-export-components dotyczy mieszanych eksportów komponentów UI (badge, button, form, navigation-menu, sidebar, sonner, toggle). Nie blokują buildu. Ich usunięcie wymaga wydzielenia eksportów pomocniczych; pozostawiono je jawnie, bez wyciszania reguły i bez poszerzania przebudowy komponentów.
- npm sygnalizuje przestarzałe zależności pośrednie jsdom: abab, domexception, whatwg-encoding. Nie aktualizowano głównej wersji jsdom tylko w celu usunięcia komunikatów.
- Build sygnalizuje starą bazę Browserslist/caniuse-lite. Aktualizacja tej bazy jest osobnym, opcjonalnym krokiem, wymagającym ponownego sprawdzenia generowanego CSS.
- Komunikat npm o http-proxy pochodzi ze środowiska uruchomieniowego; repozytorium nie zawiera .npmrc z tą opcją.
- Pozostawiono istniejące bun.lock i bun.lockb. Sprawdzony tutaj proces instalacji to npm ci; nie zweryfikowano instalacji przez Bun.
- Nie przeprowadzono nowej kontroli wizualnej. Przed scaleniem warto sprawdzić nagłówek/menu i kontakt na 360/390/1440 px oraz działanie galerii, jeśli są w niej dostępne realizacje. Czysta instalacja może używać innych wersji niż wcześniejsza instalacja z pominięciem lockfile.

## Odbiór

W świeżej kopii gałęzi wykonać npm ci, npm run lint, npm test, oba sprawdzenia TypeScript oraz npm run build. Potwierdzić brak zmian lockfile po npm ci. Nie wymagać zerowej liczby ostrzeżeń: powyżej wymieniono jawnie pozostawione komunikaty.
