# Grafika Open Graph dla granbet.pl

## Cel
Podgląd linku (Facebook, Messenger, X, WhatsApp, LinkedIn) pokazuje załączoną grafikę 1200×630 oraz nowy, jednolity opis.

## Zmiany

1. **`public/og-image.jpg`**
   - Skopiować `user-uploads://granbet-og-final2.jpg` do `public/og-image.jpg` bez żadnych zmian (bajt w bajt, bez kompresji i przeskalowania).
   - Weryfikacja: `md5sum` oryginału i kopii identyczne; wymiary 1200×630.

2. **`index.html`** (jedyna edytowana treść)
   - Usunąć komentarz o celowo pominiętych `og:image / twitter:image`.
   - Wstawić w tym miejscu dokładnie:
     ```html
     <meta property="og:image" content="https://granbet.pl/og-image.jpg" />
     <meta property="og:image:secure_url" content="https://granbet.pl/og-image.jpg" />
     <meta property="og:image:type" content="image/jpeg" />
     <meta property="og:image:width" content="1200" />
     <meta property="og:image:height" content="630" />
     <meta property="og:image:alt" content="Granitowy nagrobek z krzyżem – granbet.pl, nagrobki granitowe, Hrubieszów i Kryłów" />
     <meta name="twitter:image" content="https://granbet.pl/og-image.jpg" />
     <meta name="twitter:image:alt" content="Granitowy nagrobek z krzyżem – granbet.pl, nagrobki granitowe, Hrubieszów i Kryłów" />
     ```
   - Zmienić `<meta name="twitter:card" content="summary">` na `summary_large_image`.
   - Ustawić identyczną treść `og:description` oraz `twitter:description`:
     „Nagrobki granitowe własnej produkcji od 1988 roku. Kryłów, Hrubieszów i Dołhobyczów. Transport i montaż na fundamencie w cenie nagrobka.”

## Bez zmian
- `<title>`, `og:title`, `twitter:title`, `<meta name="description">` oraz wszystkie inne pliki.
- Publikacja domyślnie pominięta; strona nie jest publikowana, ustawienia domeny nienaruszone.

## Kontrola
- `md5sum` oryginału i `public/og-image.jpg` — identyczne.
- Odczyt `index.html` — nowe tagi i nowy `og:description`/`twitter:description` na miejscu.
- Build (log `/tmp/observability/build-errors.log`) — bez błędów.
