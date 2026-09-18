> **UWAGA — dokument historyczny, nie źródło danych firmy.**
> To zapis pierwotnego promptu budowy strony. Zawiera nieaktualne i
> niepotwierdzone liczby („ponad 35 lat", „35+", „500+ rodzin",
> „setki zrealizowanych nagrobków", „4–8 tygodni", „około 20 km od
> Hrubieszowa"), które zostały ze strony usunięte w Etapie 5.
> Nie kopiuj stąd treści z powrotem do kodu. Obowiązujące dane firmy
> znajdują się w komponentach sekcji kontaktowej, FAQ i stopki.

# PROMPT FINALNY — WARIANT C „Złoto i Tradycja"

# POLECENIE

Zbuduj kompletną, w pełni responsywną, jednostronicową aplikację React + Tailwind CSS
dla Zakładu Kamieniarskiego GRANBET. Wygeneruj WSZYSTKIE sekcje w jednym przebiegu.
Nie pomijaj żadnej sekcji — jest ich 14. Nie używaj osobnych plików CSS — wyłącznie
Tailwind utility classes i tailwind.config. Użyj TypeScript.

---

# KONTEKST PROJEKTU

Firma: Zakład Kamieniarski GRANBET — nagrobki, grobowce, fotoceramika, schody granitowe.
Działalność od 1988 roku. Lokalizacje: Kryłów (zakład produkcyjny), Hrubieszów
i Dołhobyczów (biura handlowe).

Grupa docelowa: osoby 50–75 lat, rodziny w trudnych emocjonalnych chwilach.
Ton komunikacji: empatyczny, ciepły, bez żargonu branżowego.
Styl wizualny: „Złoto i Tradycja" — hybrid ciemnego prestiżu ze złotem i ciepłych beży.
Sekcje przeplatają się rytmicznie: ciemne z jasnymi. Złoto #C6A85A łączy obie warstwy
jako wspólny akcent na CAŁEJ stronie.

---

# ARCHITEKTURA TECHNICZNA

- Framework: React + TypeScript + Tailwind CSS
- Nawigacja: single-page z kotwicami (#o-nas, #oferta, #galeria, #faq, #kontakt)
  — BEZ React Router
- SEO: react-helmet-async (meta tagi + JSON-LD LocalBusiness + JSON-LD FAQPage)
- Formularz: Formspree (action URL: https://formspree.io/f/PLACEHOLDER_ID)
- Galeria: yet-another-react-lightbox
- Ikony: lucide-react
- Animacje: IntersectionObserver fade-in, hover transitions, count-up, FAQ akordeon
  — wszystko przez Tailwind classes + custom hooks
- Fonty Google: Playfair Display (700), Cormorant Garamond (600), Inter (400, 600, 700)
- Deployment: statyczny build → eksport ZIP

---

# SEO — META TAGI (react-helmet-async)

Umieść w <Helmet> w głównym komponencie App:

<title>GRANBET Zakład Kamieniarski | Nagrobki Hrubieszów, Kryłów, Dołhobyczów</title>

<meta name="description"
  content="Zakład Kamieniarski GRANBET — nagrobki granitowe, schody, parapety,
  grobowce i fotoceramika. Własna produkcja od 1988 roku.
  Kryłów ☎ 502 480 543 | Hrubieszów ☎ 697 994 924" />

<meta property="og:title"
  content="GRANBET Zakład Kamieniarski | Nagrobki i Kamieniarstwo" />
<meta property="og:description"
  content="Nagrobki, grobowce, fotoceramika, schody granitowe.
  Tradycja od 1988 roku. Hrubieszów, Kryłów, Dołhobyczów." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://granbet.pl" />
<meta property="og:locale" content="pl_PL" />
<meta property="og:image" content="https://granbet.pl/og-image.jpg" />

<link rel="canonical" href="https://granbet.pl" />

NIE dodawaj meta keywords.

---

# SEO — JSON-LD #1 (LocalBusiness)

Umieść jako <script type="application/ld+json"> w <Helmet>:

{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GRANBET Zakład Kamieniarski",
  "description": "Zakład kamieniarski oferujący nagrobki granitowe, grobowce, fotoceramikę, schody i parapety. Tradycja od 1988 roku.",
  "telephone": "+48502480543",
  "email": "granbet@vp.pl",
  "url": "https://granbet.pl",
  "image": "https://granbet.pl/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Hrubieszowska 33",
    "addressLocality": "Kryłów",
    "addressRegion": "lubelskie",
    "postalCode": "22-540",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.6825,
    "longitude": 24.0083
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "07:00",
      "closes": "15:00"
    }
  ],
  "foundingDate": "1988-01-01",
  "priceRange": "$$",
  "hasMap": "https://maps.google.com/?q=Krylow+ul.+Hrubieszowska+33+gmina+Mircze",
  "review": [
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "Rodzina K."},
      "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
      "reviewBody": "Jesteśmy bardzo wdzięczni za pomoc i profesjonalne podejście. Nagrobek wykonany dokładnie według naszych życzeń."
    },
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "Rodzina W."},
      "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
      "reviewBody": "Obsługa z sercem — czuliśmy się zaopiekowani na każdym etapie. Nagrobek jest piękny i trwały."
    },
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "Rodzina N."},
      "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
      "reviewBody": "Terminowość, jakość i ludzkie podejście na najwyższym poziomie."
    }
  ]
}

# SEO — JSON-LD #2 (FAQPage)

Drugi OSOBNY <script type="application/ld+json"> w <Helmet>:

{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Jak zamówić nagrobek w GRANBET?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wystarczy zadzwonić pod numer 502 480 543 lub odwiedzić nas w Kryłowie albo Hrubieszowie. Razem omówimy projekt, materiał i termin realizacji."
      }
    },
    {
      "@type": "Question",
      "name": "Ile kosztuje nagrobek granitowy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cena zależy od wybranego granitu, rozmiaru i zdobień. Zapraszamy na bezpłatną konsultację — dopasujemy projekt do budżetu."
      }
    },
    {
      "@type": "Question",
      "name": "Jak długo czeka się na wykonanie nagrobka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standardowy czas realizacji wynosi 4–8 tygodni od zatwierdzenia projektu. Prostsze modele mogą być gotowe szybciej."
      }
    },
    {
      "@type": "Question",
      "name": "Czy GRANBET wykonuje renowacje starych nagrobków?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak — oferujemy czyszczenie, odświeżenie napisów, wymianę elementów i konserwację kamienia."
      }
    },
    {
      "@type": "Question",
      "name": "Gdzie znajdę zakład kamieniarski w Hrubieszowie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biuro handlowe GRANBET przy ul. Nowej 10 w Hrubieszowie. Zakład produkcyjny w Kryłowie przy trasie Hrubieszów–Dołhobyczów."
      }
    },
    {
      "@type": "Question",
      "name": "Czy GRANBET obsługuje klientów z całego powiatu hrubieszowskiego?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tak — obsługujemy Hrubieszów, Kryłów, Dołhobyczów i cały powiat hrubieszowski. Dowozimy i montujemy nagrobki na miejscu."
      }
    }
  ]
}

---

# PALETA KOLORÓW (tailwind.config.ts)

Rozszerz Tailwind w tailwind.config.ts → theme.extend.colors:

colors: {
  g: {
    dark:        '#1F1F1F',
    darkCard:    '#2A2A2A',
    darkDeep:    '#141414',
    darkFooter:  '#0D0D0D',

    warm:        '#F1EFEA',
    warmAlt:     '#E8E4DD',
    card:        '#FAF8F5',

    gold:        '#C6A85A',
    goldHover:   '#B8963E',
    goldSoft:    '#C4B89A',

    navy:        '#2E3A46',

    textLight:   '#E5E5E5',
    textMuted:   '#9A9A9A',
    textWarm:    '#D0C8BC',

    textDark:    '#2A2A2A',
    textDarkMuted: '#5A5A5A',
  }
}

Wszystkie kolory przez g-* (np. bg-g-dark, text-g-gold, border-g-goldSoft).

---

# TYPOGRAFIA

- H1–H2: 'Playfair Display', serif — 700
- H3–H4, etykiety: 'Cormorant Garamond', serif — 600
- Body, przyciski, formularze: 'Inter', sans-serif
- Rozmiar bazowy body: 18px (1.125rem)
- Line-height body: 1.75
- Letter-spacing nagłówków: tracking-wide
- Kontrast WCAG AA:
  #2A2A2A na #F1EFEA = 11.4:1 ✅
  #E5E5E5 na #1F1F1F = 12.1:1 ✅
  #9A9A9A na #1F1F1F = 4.6:1 ✅
  #C6A85A na #1F1F1F = 5.3:1 ✅

Załaduj fonty przez Google Fonts  w index.html .

---

# ZASADY DESIGNU

1. Sekcje przeplatają się RYTMICZNIE: ciemne ↔ jasne
2. Złoto g-gold obecne w KAŻDEJ sekcji jako element łączący
3. Jasne sekcje: ciepłe beże, NIGDY czysta biel #fff
4. Ciemne sekcje: głęboki grafit + złote akcenty
5. Hover karty: translateY(-4px) + shadow ze złotym odcieniem
6. Hover przyciski: translateY(-2px) + złoty shadow lub fill
7. Fade-in: IntersectionObserver, translateY(24px)→0, opacity 0→1
8. BEZ auto-sliderów, BEZ migających efektów, BEZ parallax
9. Przyciski CTA: min-h-[52px]
10. Padding sekcji: py-24
11. prefers-reduced-motion: wyłącz translate i count-up

---

# RYTM SEKCJI — OBOWIĄZKOWY

Header         → bg-g-card       (jasny)
Hero           → bg-g-dark       (CIEMNY)
O nas          → bg-g-warm       (jasny)
Oferta         → bg-g-warmAlt    (jasny)
Dlaczego my    → bg-g-dark       (CIEMNY)
Opinie         → bg-g-darkCard   (CIEMNY — inny odcień niż Dlaczego my)
Proces         → bg-g-warm       (jasny)
Galeria        → bg-g-darkDeep   (CIEMNY)
FAQ            → bg-g-warm       (jasny)
CTA            → bg-g-navy       (CIEMNY)
Kontakt        → bg-g-warmAlt    (jasny)
Footer         → bg-g-darkFooter (CIEMNY)

WAŻNE: Dlaczego my (#1F1F1F) i Opinie (#2A2A2A) to dwa RÓŻNE ciemne odcienie
pod rząd — zamierzone. NIE unifikuj ich.
Złoto g-gold łączy WSZYSTKIE sekcje.

---

# ALT-TEXT I WYDAJNOŚĆ

Każdy  i placeholder:
- Opisowy alt="" — „[Typ] – realizacja GRANBET"
- loading="lazy"
- decoding="async"
Placeholdery: div z role="img" i aria-label.

---

# SEKCJE STRONY — 14 SEKCJI

## 1. HEADER (sticky top-0 z-50)

STAN POCZĄTKOWY (przed scrollem):
Tło: bg-g-card. Dolna linia: border-b-2 border-g-gold.
Logo „GRANBET": Playfair bold text-2xl text-g-textDark.
Podtytuł „Zakład Kamieniarski od 1988 r.": Cormorant 13px text-g-textDarkMuted.
Menu: Inter 16px text-g-textDark hover:text-g-gold transition-colors.

STAN PO SCROLLU (>60px) — transition-all duration-300:
Tło: bg-g-dark. Logo: text-white. Menu: text-g-textLight hover:text-g-gold.
Shadow: shadow-[0_2px_16px_rgba(0,0,0,0.4)]. Linia border-g-gold zostaje.

Telefon (prawy róg):
Przed scrollem:  „☎ 502 480 543"
bg-g-dark text-g-gold font-bold text-[17px] px-5 py-2.5 rounded-lg.
Po scrollu: bg-g-gold text-g-dark (inwersja).

MOBILE:
- Górny pasek (ZAWSZE WIDOCZNY):
  - Lewo: logo „GRANBET" (Playfair bold text-xl)
  - Środek lub prawo:  „☎ 502 480 543"
    font-bold text-base text-g-gold — KLIKALNY, WIDOCZNY ZAWSZE
  - Prawo: hamburger Menu z lucide-react (text-g-gold)
- Menu mobile po otwarciu:
  Pełnoekranowe bg-g-dark, linki text-xl text-g-textLight py-4,
  hover:text-g-gold. Zamknięcie: X z lucide-react.

WAŻNE: Numer telefonu na mobile MUSI być widoczny w headerze BEZ otwierania menu.

---

## 2. HERO

Wysokość: min-h-[90dvh].
Tło: bg-g-dark. Gradient overlay: rgba(0,0,0,0.55).
Placeholder: bg-gradient-to-b from-g-dark to-stone-800.

Treść wyśrodkowana:

- Nad H1: „EST. 1988"
  — Cormorant 14px text-g-gold uppercase tracking-[5px]
- H1: „GRANBET"
  — Playfair text-7xl md:text-8xl text-white
- H2: „Zakład Kamieniarski"
  — Playfair text-2xl md:text-4xl text-g-gold
- Separator: div w-24 h-0.5 bg-g-gold mx-auto my-6
- Tagline: „Tradycja od 1988 roku · Hrubieszów · Kryłów · Dołhobyczów"
  — Inter text-lg text-g-textWarm
- Dwa przyciski (flex gap-4, stagger fade-in 300ms):
  1. „Nasze realizacje" → #galeria
     bg-g-gold text-g-dark font-bold px-8 min-h-[52px] rounded-lg
     hover:bg-g-goldHover hover:-translate-y-0.5
     hover:shadow-[0_6px_20px_rgba(198,168,90,0.35)]
     transition-all duration-200
  2. „Porozmawiajmy" → #kontakt
     bg-transparent text-g-gold border-2 border-g-gold px-8 min-h-[52px] rounded-lg
     hover:bg-g-gold hover:text-g-dark transition-all duration-200

- Scroll: ChevronDown lucide-react text-g-gold animate-bounce absolute bottom-8
  aria-hidden="true"

---

## 3. O NAS (id="o-nas") — JASNA

Tło: bg-g-warm. scroll-mt-20. Aria-label="O firmie GRANBET".
Linia na górze: div h-px bg-g-gold/30.

H2: „O firmie GRANBET" — Playfair text-g-textDark text-center.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.

Układ: lg:grid-cols-2 gap-12 items-center. 1 kolumna mobile.

Lewa — tekst:
Akapit 1: „Rozumiemy, że wybór nagrobka to jedna z najtrudniejszych decyzji.
Dlatego od ponad 35 lat towarzyszymy rodzinom w Hrubieszowie, Kryłowie
i okolicach — z szacunkiem, cierpliwością i pełnym zaangażowaniem."

Akapit 2: „Nasz zakład produkcyjny mieści się w Kryłowie przy trasie
Hrubieszów–Dołhobyczów. Każdy nagrobek wytwarzamy własnoręcznie — od projektu
po montaż na cmentarzu. Biura handlowe prowadzimy w Hrubieszowie
i Dołhobyczowie."

Inter text-lg text-g-textDark leading-relaxed. Akapity mb-4.

Prawa — placeholder:
div aspect-[4/3] bg-stone-400 rounded-xl overflow-hidden
role="img" aria-label="Zakład kamieniarski GRANBET w Kryłowie – widok warsztatu".
Tekst „Zdjęcie zakładu" (text-sm text-stone-600).
Animacja: fade-in translate-x-8.

---

## 4. OFERTA (id="oferta") — JASNA

Tło: bg-g-warmAlt. scroll-mt-20.

H2: „Jak możemy pomóc?" — Playfair text-g-textDark.
Podtytuł: „Wykonujemy z kamienia wszystko, czego potrzebujesz"
— Inter text-lg text-g-textDarkMuted.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.

Grid: lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6.

6 kart — każda:
bg-g-card border-t-4 border-g-gold p-6 rounded-lg shadow-sm
hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(198,168,90,0.18)]
hover:border-t-g-goldHover transition-all duration-250.

Karty (ikona lucide-react w-8 h-8 text-g-gold mb-3):

1. Gem | „Nagrobki granitowe"
   „Pomagamy godnie upamiętniać bliskich — z naturalnego granitu, na wieki."

2. Landmark | „Grobowce rodzinne"
   „Trwałe grobowce rodzinne — służące kolejnym pokoleniom."

3. Camera | „Fotoceramika"
   „Zdjęcia w krysztale i porcelanie — wizerunek bliskiej osoby zachowany na lata."

4. ArrowUpFromLine | „Schody, parapety, blaty"
   „Elementy granitowe do wnętrz i ogrodów — precyzja i elegancja."

5. Flame | „Kominki i tarasy"
   „Granitowe obudowy kominków, tarasy i chodniki z kostki."

6. Wrench | „Renowacje"
   „Przywracamy nagrobkom dawny blask — konserwacja i czyszczenie kamienia."

Tytuł: Playfair text-lg text-g-textDark font-bold.
Opis: Inter text-base text-g-textDarkMuted leading-relaxed.

---

## 5. DLACZEGO MY — CIEMNA (#1F1F1F)

Tło: bg-g-dark.

H2: „Dlaczego rodziny nam ufają?" — Playfair text-white.
Podtytuł: „Ponad 35 lat budujemy zaufanie jedną realizacją na raz"
— Inter text-lg text-g-textMuted.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.

Grid: lg:grid-cols-4 grid-cols-2 gap-8 text-center.

4 statystyki (count-up):
- „35+" → „Lat nieprzerwanej działalności"
- „500+" → „Rodzin, którym pomogliśmy"
- „3" → „Miejsca obsługi klientów"
- „100%" → „Własna produkcja w Kryłowie"

Liczba: Playfair text-6xl md:text-7xl text-g-gold font-bold.
Opis: Inter text-base text-g-textLight mt-2.

Count-up: 0→wartość ~2s, easeOutCubic. prefers-reduced-motion: statycznie.

Pod statystykami (mt-12): grid lg:grid-cols-2 gap-x-12 gap-y-3.
Check lucide-react w-5 h-5 text-g-gold.
Inter text-[17px] text-g-textLight.

- „35 lat doświadczenia"
- „Setki zrealizowanych nagrobków i pomników"
- „Indywidualne podejście do każdego zlecenia"
- „Terminowość i rzetelność"
- „Obsługa Hrubieszów, Kryłów i Dołhobyczów"

---

## 6. OPINIE KLIENTÓW (id="opinie") — CIEMNA (#2A2A2A)

Tło: bg-g-darkCard (#2A2A2A) — INNY odcień niż Dlaczego my (#1F1F1F). Zamierzone.

H2: „Co mówią nasi klienci" — Playfair text-white text-center.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.
Podtytuł: „Opinie rodzin, którym towarzyszyliśmy"
— Inter text-lg text-g-textMuted.

Grid: lg:grid-cols-3 grid-cols-1 gap-6. Stagger fade-in (+100ms).

3 karty — każda:



bg-[#333333] border-l-4 border-g-gold rounded-xl p-7
hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(198,168,90,0.22)]
transition-all duration-250.

Gwiazdki: 5× Star lucide-react w-5 h-5 text-g-gold fill-g-gold.
Wrapper: flex gap-1 mb-3, aria-label="Ocena 5 na 5 gwiazdek".
Każda Star: aria-hidden="true".

Cytat: 

 Inter text-[17px] text-g-textLight italic leading-relaxed mb-4.
Autor: 

 Cormorant 16px text-g-gold font-semibold. Prefix „— ".

Opinia 1:
„Jesteśmy bardzo wdzięczni za pomoc i profesjonalne podejście. Nagrobek wykonany
dokładnie według naszych życzeń — na czas i w dobrej cenie."
— Rodzina K., Hrubieszów

Opinia 2:
„Obsługa z sercem — czuliśmy się zaopiekowani na każdym etapie. Cierpliwie
doradzono nam wybór granitu i napisu. Nagrobek jest piękny i trwały."
— Rodzina W., Kryłów

Opinia 3:
„Solidny zakład kamieniarski. Terminowość, jakość i ludzkie podejście
— wszystko na najwyższym poziomie. Polecamy."
— Rodzina N., Dołhobyczów

Przycisk pod kartami (mt-10 text-center):

„Wystaw opinię w Google →"
bg-transparent border-2 border-g-gold text-g-gold
px-8 min-h-[48px] rounded-lg inline-flex items-center justify-center
hover:bg-g-gold hover:text-g-dark transition-all duration-200.

---

## 7. PROCES (id="proces") — JASNA

Tło: bg-g-warm. scroll-mt-20.
Linia na górze: div h-px bg-g-gold/30.

H2: „Jak wygląda nasza współpraca?" — Playfair text-g-textDark.
Podtytuł: „Krok po kroku — od pierwszej rozmowy do gotowego nagrobka"
— Inter text-lg text-g-textDarkMuted.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.

Desktop: flex flex-row items-stretch gap-4 ze strzałkami.
Mobile: flex flex-col gap-6, bez strzałek.

4 karty:

01 — MessageCircle | „Konsultacja"
„Zadzwoń, napisz lub odwiedź nas osobiście. Wysłuchamy i doradzimy bez presji."

02 — PenTool | „Projekt"
„Wspólnie zaprojektujemy nagrobek dopasowany do Twoich oczekiwań i budżetu."

03 — Hammer | „Realizacja"
„Wykonujemy nagrobek we własnym zakładzie w Kryłowie — pełna kontrola
jakości na każdym etapie."

04 — CheckCircle | „Montaż"
„Dowozimy i montujemy nagrobek na cmentarzu — pełna obsługa w cenie."

Styl karty: bg-g-card border-2 border-g-warmAlt rounded-xl p-7 flex-1
hover:border-g-gold hover:bg-g-warmAlt transition-all duration-200.

Numer: Playfair text-5xl text-g-gold/15 absolute top-2 right-4.
Ikona: lucide-react w-8 h-8 text-g-gold mb-3.
Tytuł: Playfair text-xl text-g-textDark font-bold.
Opis: Inter text-base text-g-textDarkMuted leading-relaxed.

Strzałki (desktop only):
ArrowRight lucide-react w-6 h-6 text-g-goldSoft flex-shrink-0 self-center mx-2.

Przycisk (mt-10 text-center):
 „Zadzwoń i umów konsultację"
bg-g-gold text-g-dark px-10 min-h-[52px] rounded-lg inline-flex items-center
justify-center font-bold text-lg
hover:bg-g-goldHover hover:-translate-y-0.5
hover:shadow-[0_6px_20px_rgba(198,168,90,0.35)] transition-all duration-200.

---

## 8. GALERIA (id="galeria") — CIEMNA

Tło: bg-g-darkDeep. scroll-mt-20.

H2: „Nasze realizacje" — Playfair text-white.
Podtytuł: „Każdy nagrobek to osobna historia — wykonana z szacunkiem"
— Inter text-lg text-g-textMuted.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.

Grid: lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4.

9 placeholderów:
div aspect-[4/3] bg-[#C8C0B4] rounded-lg overflow-hidden cursor-pointer
role="img" aria-label="Nagrobek granitowy – realizacja GRANBET [1-9]".
Hover: scale-[1.03] + overlay absolute inset-0 bg-g-gold/15
(opacity 0→1, transition duration-300).
Tekst „Zdjęcie realizacji [numer]" (text-sm text-[#6E6560]).

Kliknięcie → yet-another-react-lightbox. Lightbox tło: #000000.

BLOK TELEFONU po 6. zdjęciu:
col-span-full bg-g-darkCard border border-g-gold rounded-xl p-6
flex flex-col sm:flex-row items-center justify-between gap-4.
„Chcesz zamówić podobny nagrobek?" — Playfair text-lg text-g-textLight.
 „☎ 502 480 543"
text-g-gold font-bold text-2xl hover:text-white transition-colors.

---

## 9. FAQ (id="faq") — JASNA

Tło: bg-g-warm. scroll-mt-20. Aria-label="Najczęściej zadawane pytania".

H2: „Najczęściej zadawane pytania" — Playfair text-g-textDark text-center.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.
Podtytuł: „Odpowiedzi na pytania, które słyszymy najczęściej"
— Inter text-lg text-g-textDarkMuted.

Akordeon: max-w-3xl mx-auto flex flex-col gap-3.
Stan React: useState. Jedno pytanie otwarte na raz. Pierwsze domyślnie otwarte.

Każdy element:




    
      {pytanie}
    
    

  


    


      


        {odpowiedź}
      


    



6 pytań — identyczne treści jak w JSON-LD FAQPage powyżej:

1. „Jak zamówić nagrobek w GRANBET?"
→ „Wystarczy zadzwonić pod numer 502 480 543 lub odwiedzić nas w Kryłowie albo Hrubieszowie. Razem omówimy projekt, materiał i termin realizacji — bez żadnych zobowiązań."

2. „Ile kosztuje nagrobek granitowy?"
→ „Cena zależy od wybranego granitu, rozmiaru i zdobień. Zapraszamy na bezpłatną konsultację — dopasujemy projekt do Twoich potrzeb i budżetu."

3. „Jak długo czeka się na wykonanie nagrobka?"
→ „Standardowy czas realizacji wynosi 4–8 tygodni od zatwierdzenia projektu. W przypadku prostszych modeli możemy działać szybciej."

4. „Czy GRANBET wykonuje renowacje starych nagrobków?"
→ „Tak — oferujemy pełną renowację: czyszczenie kamienia, odświeżenie napisów, wymianę uszkodzonych elementów oraz konserwację. Skontaktuj się z nami, żeby omówić zakres prac."

5. „Gdzie znajdę zakład kamieniarski w Hrubieszowie?"
→ „Biuro handlowe GRANBET mieści się przy ul. Nowej 10 w Hrubieszowie. Zakład produkcyjny działa w Kryłowie przy trasie Hrubieszów–Dołhobyczów, około 20 km od Hrubieszowa."

6. „Czy GRANBET obsługuje klientów z całego powiatu hrubieszowskiego?"
→ „Tak — obsługujemy klientów z Hrubieszowa, Kryłowa, Dołhobyczowa i całego powiatu hrubieszowskiego. Dowozimy i montujemy nagrobki bezpośrednio na cmentarzu."

---

## 10. CTA — CIEMNA (granat)

Tło: bg-g-navy. text-center py-20.
Linia na górze: border-t-[3px] border-g-gold.

Nad H2: „Jesteśmy tu dla Ciebie"
— Cormorant 16px text-g-gold uppercase tracking-[3px].
H2: „Pomożemy Ci godnie upamiętnić bliskich"
— Playfair text-3xl md:text-4xl text-white.
Opis: „Skontaktuj się z nami — telefonicznie, mailowo lub odwiedź nas
osobiście w Kryłowie lub Hrubieszowie."
— Inter text-lg text-g-textWarm mt-4.

Numer główny (mt-6):
 „☎ 502 480 543"
text-g-gold font-bold text-3xl md:text-4xl hover:text-white transition-colors.

Numer dodatkowy (mt-2):
 „Biuro Hrubieszów: ☎ 697 994 924"
text-g-textLight text-lg hover:text-white transition-colors.

Przycisk (mt-8): „Napisz do nas" → #kontakt
bg-transparent border-2 border-g-gold text-g-gold px-8 min-h-[52px] rounded-lg
hover:bg-g-gold hover:text-g-dark transition-all duration-200.

---

## 11. KONTAKT (id="kontakt") — JASNA

Tło: bg-g-warmAlt. scroll-mt-20. Aria-label="Kontakt".
Linia na górze: div h-px bg-g-gold/30.

H2: „Skontaktuj się z nami" — Playfair text-g-textDark.
Podtytuł: „Chętnie odpowiemy na każde pytanie — bez zobowiązań"
— Inter text-lg text-g-textDarkMuted.
Linia pod H2: div w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12.

Układ: lg:grid-cols-2 gap-12.

### Lewa kolumna — dane + mapa

Blok 1 — H3: „Zakład produkcyjny" (Cormorant 20px text-g-gold font-semibold)
MapPin + „ul. Hrubieszowska 33, Kryłów (gm. Mircze)"
Phone +  „502 480 543" (font-bold text-g-gold)
Clock + „Pon–Pt 7:00–17:00, Sob 7:00–15:00"

Blok 2 — H3: „Biuro handlowe — Hrubieszów" (Cormorant 20px text-g-gold)
MapPin + „ul. Nowa 10, Hrubieszów"
Phone +  „697 994 924"

Blok 3 — H3: „Punkt obsługi — Dołhobyczów" (Cormorant 20px text-g-gold)
MapPin + „ul. Spółdzielcza, Dołhobyczów"

Mail + @vp.pl"> „granbet@vp.pl" (text-g-gold)

Ikony lucide-react w-5 h-5 text-g-gold inline.

StaticMap (mt-6):
div bg-g-warmAlt rounded-xl p-6 border-2 border-g-gold text-center.
MapPin w-12 h-12 text-g-gold mx-auto.
„Zakład Kamieniarski GRANBET" — Playfair text-lg text-g-textDark.
Adres: Inter text-sm text-g-textDarkMuted.
Przycisk:

„Otwórz w Google Maps →"
bg-g-gold text-g-dark px-5 py-3 rounded-lg text-sm font-bold
hover:bg-g-goldHover transition-colors.

### Prawa kolumna — formularz





bg-g-card rounded-xl p-8 shadow-sm border border-g-goldSoft.
H3: „Napisz do nas" — Playfair text-xl text-g-textDark mb-6.

Styl KAŻDEGO inputa:
w-full bg-white text-g-textDark border border-g-goldSoft rounded-lg p-3 text-[17px]
focus:border-g-gold focus:outline-none focus:ring-2 focus:ring-g-gold/20
transition-colors.

Label: text-sm text-g-textDarkMuted mb-1 block.

Pola:
1. Label „Imię i nazwisko *" → input name="name" type="text" required
   placeholder="np. Jan Kowalski" aria-required="true"
2. Label „Adres e-mail" → input name="_replyto" type="email"
   placeholder="np. jan@email.pl"
3. Label „Numer telefonu" → input name="phone" type="tel" inputMode="tel"
   placeholder="np. 602 123 456"
4. Label „Wiadomość *" → textarea name="message" rows={5} required
   placeholder="Opisz czego potrzebujesz — odpiszemy lub zadzwonimy…"
   aria-required="true" + resize-none

Honeypot: input name="_gotcha" type="text" className="hidden" tabIndex={-1}

Button type="submit": „Wyślij wiadomość"
w-full bg-g-gold text-g-dark font-bold py-4 rounded-lg text-[17px]
min-h-[52px] hover:bg-g-goldHover hover:-translate-y-0.5 hover:shadow-md
transition-all duration-200.

Po wysłaniu (stan React, role="alert" aria-live="polite"):
div bg-g-darkCard border border-g-gold rounded-xl p-6 text-center.
CheckCircle text-g-gold w-10 h-10 mx-auto mb-3.
„Dziękujemy! Skontaktujemy się wkrótce." — Playfair text-lg text-g-textLight.

---

## 12. FOOTER

Tło: bg-g-darkFooter. Border górny: border-t-[3px] border-g-gold.




Grid: lg:grid-cols-3 gap-8 py-12 px-6.

Kolumna 1:
„GRANBET" — Playfair bold text-xl text-white.
„Zakład Kamieniarski" — Cormorant text-g-gold.
„Tradycja od 1988 roku. Hrubieszów · Kryłów · Dołhobyczów"
— Inter text-sm text-g-textMuted mt-2.

Kolumna 2:

H4: „Menu" — Cormorant text-g-gold font-semibold mb-3.
Linki: Oferta | Realizacje | O nas | FAQ | Proces | Kontakt
— Inter text-base text-g-textLight hover:text-g-gold transition-colors.

Kolumna 3:
H4: „Kontakt" — Cormorant text-g-gold font-semibold mb-3.
 „☎ 502 480 543" text-g-textLight hover:text-g-gold
 „☎ 697 994 924" text-g-textLight
@vp.pl"> „granbet@vp.pl" text-g-textLight hover:text-g-gold
„Pon–Pt 7:00–17:00, Sob 7:00–15:00" text-g-textMuted text-sm.

Dolna belka (border-t border-white/10 mt-8 pt-6 text-center):
„© {new Date().getFullYear()} GRANBET Zakład Kamieniarski.
Wszelkie prawa zastrzeżone." — Inter text-sm text-g-textMuted/60.

---

# IMPLEMENTACJA — CUSTOM HOOKS

## useFadeIn
Obserwuj elementy z data-animate="fade-in".
Przy wejściu (threshold 0.15): opacity-0 translate-y-6 → opacity-100 translate-y-0.
Transition: duration-700 ease-out. Stagger: delay 100ms.
prefers-reduced-motion: pokaż od razu.

## useCountUp
Props: end, suffix. Animuj 0→end w ~2s, easeOutCubic.
Start przy wejściu w viewport.
prefers-reduced-motion: statycznie.

---

# SMOOTH SCROLL

html { scroll-behavior: smooth; }
Każda sekcja z id: scroll-mt-20.

---

# RESPONSYWNOŚĆ

Mobile (<768px):
- Header: logo + telefon + hamburger w jednej linii. Telefon WIDOCZNY ZAWSZE.
- Hero: text-5xl H1, przyciski flex-col
- Gridy: 1 kolumna
- Proces: pionowo, bez strzałek
- Galeria blok tel: col-span-full flex-col text-center
- FAQ: max-w pełne
- Opinie: 1 kolumna

Tablet (768–1024px):
- Oferta: 2 kolumny
- Galeria: 2 kolumny

Desktop (>1024px):
- Pełne layouty

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://wariantc.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/48c61be3-6dc1-46c7-9457-56cf864d1944).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
