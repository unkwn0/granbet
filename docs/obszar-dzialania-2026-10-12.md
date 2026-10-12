# Obszar działania GRANBET — 2026-10-12

## Zakres

Baza: `c636ce1a01d1d2c2e9dc6e3ec0d3fcf21b460a43`, sprawdzona przed rozpoczęciem.
Dodano tylko nową sekcję po galerii i przed FAQ. Dwie kolumny od 1024 px;
poniżej jedna kolumna: tekst, CTA, mapa. Treści oraz numer telefonu zgodne
z poleceniem. Lista 8 miejscowości to zwykły tekst, nie przyciski.
Na komputerze 32 miejscowości; na telefonie 9 głównych podpisów, w tym
3 punkty GRANBET, Mircze, miasta powiatowe i Biłgoraj. Osobny kierunek do Lublina.
SVG ma title/desc i alternatywę tekstową, legendę i uznanie źródeł.
Nie dodano dialogu, zewnętrznego API ani zależności.

## Źródła i licencje

Wszystkie dane pobrano na etapie przygotowania; mapa działa offline.

- **Natural Earth, 1:10m, domena publiczna**:
  - https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_boundary_lines_land.geojson — osobne geometrie POL/UKR;
  - https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson — polygon Ukrainy i kontrola polygonu Polski;
  - https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson — rzeka o nazwie Bug, nie Southern Bug;
  - licencja: https://www.naturalearthdata.com/about/terms-of-use/.
- **GeoNames, CC BY 4.0**: https://download.geonames.org/export/dump/PL.zip;
  uznanie: https://www.geonames.org/. Identyfikatory miejscowości zapisane przy punktach.
  Wybrano Siedliszcze 759381 w powiecie chełmskim, nie miejscowość o tej samej nazwie
  w powiecie włodawskim. Lublin 765876: 22.57009 E, 51.25058 N.
- OSM nie wykorzystano: próba pobrania Bugu przez Overpass nie powiodła się.
  Nie zastąpiono rzeki granicą; użyto odrębnego zbioru rzek Natural Earth.

Projekcja wszystkich punktów i linii jednakowa: equirectangular z korektą
poziomej skali cos(50.8° N), północ u góry. Przesunięto wyłącznie etykiety.
Źródłowe wierzchołki linii zachowano w lokalnym wycinku; polygon przycięto do
prostokąta, poza kadrem SVG. Granica i Bug są osobnymi ścieżkami: Bug po południowej
stronie odchodzi na Ukrainę, nie udaje południowej granicy lądowej.
Bez granic powiatów, promienia 55 km, granicy dojazdu i wizualizacji natężenia obsługi.

## Rzeczywiście wykonane sprawdzenia

Lokalny Chromium, aplikacja http://localhost:8080, bez logowania i bez publikacji.
Zrzuty samej sekcji zapisano w `/tmp/browser/granbet-area/section-{width}.png`;
wszystkie cztery obejrzano. To sprawdzenie renderu, nie pomiar transferu lub Lighthouse.

| Szerokość CSS px | scrollWidth/clientWidth px | Szerokość mapy px | Widoczne podpisy miejscowości | Kolizje prostokątów podpisów |
| ---: | ---: | ---: | ---: | ---: |
| 1440 | 1440/1440 | 675 | 32 | 0 |
| 1024 | 1024/1024 | 467 | 32 | 0 |
| 390 | 390/390 | 354 | 9 | 0 |
| 360 | 360/360 | 324 | 9 | 0 |

- 0 błędów wykonania JavaScript w tym przebiegu.
- DOM: `galeria > obszar-dzialania > faq`; CTA `tel:+48502480543`.
- Kontrola punkt-w-polygon na źródłowym polygonie Polski: **32/32 w Polsce**.
  Dorohusk (23.80325 E, 51.15475 N), Kryłów (24.05679 E, 50.68280 N),
  Dołhobyczów (24.03594 E, 50.58591 N): wszystkie po polskiej stronie.
- Lublin leży na północny zachód od pokazanego obszaru; strzałka skierowana NW.
- Obejrzano relacje Tyszowce / Dołhobyczów / Telatyn / Łaszczów;
  punkty wynikają z współrzędnych, podpisy bez kolizji.
- `bunx vitest run`: **7 plików, 13/13 testów zielonych**,
  w tym GallerySection 2/2. Nie zmieniano istniejących testów.
- Automatyczna kontrola kompilacji/TypeScript środowiska: najnowszy wpis
  `/tmp/observability/build-errors.log` **build OK** po zmianach kodu.
  Nie uruchamiano ręcznie `vite build` ani osobnego polecenia TS;
  nie deklarujemy takiego przebiegu.

## Zmienione pliki

- `src/components/ServiceAreaSection.tsx` — nowa sekcja;
- `src/components/ServiceAreaMap.tsx` — mapa SVG i alternatywa tekstowa;
- `src/components/ServiceAreaMap.css` — podpisy i wariant mobilny;
- `src/data/serviceAreaGeography.ts` — dane offline i wspólna projekcja;
- `src/pages/Index.tsx` — tylko import i wstawienie nowej sekcji;
- `src/index.css` — dwa tokeny kolorystyczne używane wyłącznie przez mapę;
- `AGENTS.md` — reguła mapy offline i rozdzielenia geometrii;
- `roadmap.md` — wymagane zadanie i jego zakończenie;
- `docs/obszar-dzialania-2026-10-12.md` — ten raport.

## Ograniczenia i brak zmian poza zakresem

Natural Earth to uproszczone dane kartograficzne 1:10m, nie pomiar geodezyjny ani
mapa nawigacyjna; drobne meandry mogą być pominięte. Przy 1024 px drobne podpisy
mają około 10.5 px; na telefonach osobne podpisy około 13.6–14.8 px.
Nie testowano hostowanego podglądu, rzeczywistego czytnika ekranu, połączenia
telefonicznego ani usług zewnętrznych. Nie wykonano Lighthouse ani audytu galerii.
Nie odtworzono referencji piksel w piksel; zachowano opisaną kompozycję.

Galeria i zdjęcia, SEO/JSON-LD, FAQ, pozostałe sekcje i zależności bez zmian.
Wcześniejszy blok Obszar działania w AboutSection pozostawiono zgodnie z zakazem
zmian innych sekcji. Nie publikowano, nie zmieniano domeny, widoczności ani noindex.
Commit kodu po ostatniej korekcie podpisu: `be2a86aa62fc8219360e570ef31ac82d97dea22e`;
raport i zakończenie zadania zapisane później przez automatyczną historię projektu.