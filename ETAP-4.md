# Etap 4 — zgodność Bun/Lovable i podatności zależności

Baza: `03515ea`. Zakres: wyłącznie zależności i środowisko instalacji. Bez zmian treści, danych firmy, SEO, layoutu i stylistyki.

## Bun / Lovable — zgodność

- Środowisko Lovable instaluje zależności Bunem (bun 1.3.3) na podstawie `bun.lock`. Instalacja przebiega deterministycznie i bez ostrzeżeń o niezgodności.
- Problem znaleziony: w repozytorium istniały równolegle trzy pliki blokad — `bun.lock` (tekstowy, używany), `bun.lockb` (binarny, nieaktualny, pozostałość) i `package-lock.json` (dodany w Etapie 3). `bun.lockb` był przestarzały wobec `bun.lock`, co przy instalacji Bunem w innej wersji może dać inny zestaw wersji niż środowisko Lovable. Usunięto `bun.lockb`.
- `package-lock.json` pozostawiono, ponieważ Etap 3 opiera odbiór na `npm ci`. Został ponownie uzgodniony z `package.json`, więc oba pliki opisują ten sam zestaw wersji. Wymaga to jednak aktualizowania obu plików przy każdej zmianie zależności; docelowo warto zdecydować się na jeden menedżer (Lovable używa Buna).
- Nie deklarowano wymagań `engines` ani `.nvmrc`: projekt nie korzysta z API zależnych od konkretnej wersji Node, a Lovable nie używa Node do instalacji.
- Nie zmieniano menedżera pakietów.

## Podatności — stan przed

9 zgłoszeń w zależnościach produkcyjnych: 2 wysokie, 7 średnich.

| Pakiet | Rodzaj | Charakter | Analiza |
|---|---|---|---|
| `react-router-dom` 6.30.1 (przez `react-router`, `@remix-run/router`) | bezpośrednia, podatność w zależnościach przechodnich | kod produkcyjny (routing strony) | 1 wysoka (XSS przez open redirect) + 4 średnie (open redirect, wstrzyknięcie konstruktora w hydracji SSR) |
| `recharts` 2.15.4 (przez `lodash`) | bezpośrednia, podatność w `lodash` | brak w kodzie produkcyjnym — `recharts` importuje wyłącznie nieużywany `src/components/ui/chart.tsx`, którego nic nie renderuje, więc nie wchodzi do bundla | 1 wysoka (`_.template` code injection) + 2 średnie (prototype pollution w `_.unset`/`_.omit`) |

## Wykonane zmiany (minimalne)

- `react-router-dom` `^6.30.1` → `^6.30.6` (aktualizacja poprawkowa w obrębie 6.x; podnosi `react-router` do 6.30.6 i `@remix-run/router` do 1.23.4). Bez breaking changes — brak zmian API w 6.30.x.
- Dodano `overrides: { "lodash": "^4.18.1" }`. `recharts` deklaruje `lodash: ^4.17.21`, ale blokady przypinały 4.17.21; override wymusza poprawioną 4.18.1 w całym drzewie, zgodnie z zadeklarowanym zakresem semver. Pole `overrides` respektują zarówno Bun, jak i npm.
- Usunięto nieaktualny `bun.lockb`.
- Przegenerowano `bun.lock` i uzgodniono `package-lock.json`. Czysta instalacja podniosła trzy zależności w ramach istniejących zakresów: `@testing-library/react` 16.3.3, `vitest` 3.2.7, `yet-another-react-lightbox` 3.32.2.
- Nie użyto `npm audit fix --force`, nie wykonywano zbiorczych ani dużych aktualizacji.

## Podatności — stan po

2 zgłoszenia, oba średnie, oba nierozwiązane:

- `react-router`: „Arbitrary Constructor Injection via deserializeErrors() in SSR Hydration” — poprawka tylko w `react-router@7.18.0`. Projekt jest w pełni kliencki (`BrowserRouter`, brak SSR i hydracji), więc podatny mechanizm nie jest używany.
- `react-router`: „Open redirect via backslash in `<Link>`/`useNavigate` (obejście CVE-2025-68470)” — poprawka tylko w `react-router@7.18.0`. Aplikacja używa wyłącznie statycznych ścieżek własnych; brak nawigacji na podstawie danych z URL lub od użytkownika.

Nie wykonano automatycznie przejścia na React Router 7: jest to aktualizacja główna wersji (zmiany API, inny pakiet `react-router` w miejsce `react-router-dom`), obarczona ryzykiem regresji nawigacji. Bezpieczna droga: osobny etap, aktualizacja do `react-router` 7 z przepisaniem importów w `src/App.tsx`, `src/components/NavLink.tsx` i `src/pages/NotFound.tsx` oraz ponowną kontrolą nawigacji i menu. Alternatywnie — rezygnacja z routera, skoro serwis jest jednostronicowy z nawigacją po zakotwiczeniach.

## Weryfikacja

- Czysta instalacja Bunem z nowego `bun.lock`: powodzenie, deterministyczna.
- Testy: 6/6 (4 pliki).
- Build produkcyjny: poprawny. JS gzip 134,59 kB, CSS gzip 13,41 kB.
- Kontrola przeglądarki 1440 px i 390 px: nawigacja desktop (6 pozycji), hamburger otwiera modal i zamyka się Escapem, 13 przycisków telefonicznych, godziny 7:00–17:00 i 8:00–17:00 obecne, wygląd bez zmian.
- Konsola: wyłącznie wcześniej istniejące ostrzeżenia React o `refs` w komponentach funkcyjnych (pochodzą z `react-helmet-async` i występowały przed tym etapem). Brak błędów wykonania.
- Regresje Etapów 1–3: brak.
- Utrzymuje się znany komunikat o starej bazie Browserslist/caniuse-lite — poza zakresem etapu.

## Zmodyfikowane pliki

- `package.json` (wersja `react-router-dom`, pole `overrides`)
- `bun.lock` (przegenerowany)
- `package-lock.json` (uzgodniony)
- `bun.lockb` (usunięty)
- `ETAP-4.md` (nowy)

## Gałąź i commit

Zmiany są zapisywane automatycznie przez środowisko Lovable na jego wewnętrznej gałęzi roboczej. Nie mam możliwości utworzenia gałęzi `etap-4-bun-security`, wykonania commita ani wypchnięcia jej na GitHub — operacje gitowe są tu zarządzane przez platformę. Gałąź trzeba utworzyć z tego stanu ręcznie lub w GitHubie; scalenia z `main` nie wykonano.
