import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Phone } from 'lucide-react';

// ─── GALERIA REALIZACJI — DODAWANIE / USUWANIE ZDJĘĆ ──────────────────
// Nie dotykasz kodu. Po prostu:
//   • DODAJ zdjęcie → wrzuć plik do   src/assets/realizacje/
//   • USUŃ zdjęcie  → skasuj plik z   src/assets/realizacje/
// Zdjęcia pojawią się / znikną same po publikacji.
// Kolejność = wg nazwy pliku → nazywaj 01-..., 02-... itd.
// Nazwa pliku staje się opisem (alt, ważne dla Google) — nazywaj po ludzku,
// np.  01-nagrobek-granitowy-pojedynczy-czarny.jpg
//
// (Opcjonalnie) ładniejszy opis niż z nazwy pliku — klucz = nazwa bez rozszerzenia:
const opisy: Record<string, string> = {
  '01-nagrobek-szeroki-czarna-stela-krucyfiks': 'Szeroki nagrobek z jasnoszarą płytą i czarną stelą z krzyżem i krucyfiksem',
  '02-nagrobek-pojedynczy-zaokraglona-plyta': 'Nagrobek pojedynczy z szarą płytą o zaokrąglonym końcu i czarną stelą z jasnym krzyżem',
  '03-nagrobek-pojedynczy-zylkowany-kamien': 'Nagrobek pojedynczy z jasnego, żyłkowanego kamienia, z ciemnym krzyżem przy steli',
  '04-trzy-nagrobki-wspolna-podstawa': 'Trzy nagrobki w jednej kompozycji, na wspólnej stopniowanej podstawie z ciemnego kamienia',
  '05-nagrobek-niski-tablica-ksiega': 'Niski czarny nagrobek z poziomym krzyżem na płycie i tablicą w kształcie otwartej księgi',
  '06-nagrobek-ciemny-prosta-forma': 'Ciemny nagrobek pojedynczy o prostej formie, z krzyżem na steli',
  '07-nagrobek-pojedynczy-jasny-krzyz': 'Nagrobek pojedynczy z jasnoszarą płytą, ciemnymi bokami i ciemną stelą z jasnym krzyżem',
  '08-nagrobek-podwojny-dwie-stele': 'Nagrobek podwójny z jasnoszarymi płytami, dwiema czarnymi stelami i krucyfiksem pośrodku',
  '09-nagrobek-czerwonobrazowe-boki': 'Nagrobek z ciemną płytą, czerwonobrązowymi bokami i dwiema stelami pod wspólnym daszkiem, z jasnym krzyżem',
  '10-nagrobek-figura-maryi': 'Nagrobek z jasnego kamienia ze złocistą figurą Maryi przy steli',
  '11-nagrobek-podwojny-czarny-pas': 'Nagrobek podwójny z jasnoszarymi płytami, czarnym pasem i czarną stelą z krzyżem z boku',
  '12-nagrobek-niski-skosna-tablica': 'Niski nagrobek z jasnoszarą płytą, brązowymi bokami, poziomym krzyżem i skośną tablicą',
  '13-nagrobek-zylkowany-czarna-stela': 'Nagrobek z jasnego, żyłkowanego kamienia, z czarną stelą i wąską stelą z krzyżem',
  '14-nagrobek-rodzinny-lancuchy': 'Nagrobek rodzinny z jasnoszarego kamienia, z dwudzielną stelą, krucyfiksem i ogrodzeniem z łańcuchów',
};

// Kadr miniaturki dla zdjęć, w których środek ucina stelę lub krzyż (klucz jak wyżej).
// Wartość: pozycja jak CSS object-position albo 'contain' = cały obraz w kafelku na tle galerii.
// Powiększenie (lightbox) zawsze pokazuje pełne zdjęcie.
const kadry: Record<string, string> = {
  '06-nagrobek-ciemny-prosta-forma': '50% 6%', // nr 209
  '08-nagrobek-podwojny-dwie-stele': '50% 0%', // nr 189
  '10-nagrobek-figura-maryi': '50% 22%', // nr 217
  '13-nagrobek-zylkowany-czarna-stela': 'contain', // nr 213
};
// ──────────────────────────────────────────────────────────────────────

const modules = import.meta.glob('@/assets/realizacje/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const prettify = (file: string) =>
  file.replace(/\.[^.]+$/, '').replace(/^\d+[-_\s]*/, '').replace(/[-_]+/g, ' ').trim();

const realizacje = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split('/').pop() ?? '';
    const key = file.replace(/\.[^.]+$/, '');
    return { src, file, kadr: kadry[key], alt: opisy[key] ?? (prettify(file) || 'Realizacja GRANBET — nagrobek granitowy') };
  })
  .sort((a, b) => a.file.localeCompare(b.file, 'pl', { numeric: true }));

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  const hasPhotos = realizacje.length > 0;

  return (
    <section id="galeria" className="bg-g-darkDeep py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-white text-center tracking-wide">Nasze realizacje</h2>
        <p className="font-inter text-lg text-g-textMuted text-center mt-2">Każdy nagrobek to osobna historia — wykonana z szacunkiem</p>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12" />

        {hasPhotos ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {realizacje.map((r, i) => (
              <button
                key={r.src}
                data-animate="fade-in"
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-g-gold focus-visible:ring-offset-2 focus-visible:ring-offset-g-darkDeep"
                aria-label={`Powiększ zdjęcie: ${r.alt}`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={r.src}
                  alt={r.alt}
                  loading="lazy"
                  // Przy własnym kadrze powiększenie po najechaniu rośnie od góry, żeby nie ucinało steli;
                  // przy 'contain' bez powiększenia, żeby nie przycinać krawędzi całego obrazu.
                  style={r.kadr && r.kadr !== 'contain' ? { objectPosition: r.kadr, transformOrigin: 'top' } : undefined}
                  className={`w-full h-full transition-transform duration-300 ${
                    r.kadr === 'contain' ? 'object-contain' : 'object-cover group-hover:scale-[1.03]'
                  }`}
                />
                <div className="absolute inset-0 bg-g-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-g-darkCard border border-g-gold/40 rounded-xl p-10">
            <p className="font-playfair text-xl text-g-textLight">Zdjęcia realizacji pojawią się wkrótce</p>
            <p className="font-inter text-g-textMuted mt-3">
              Chętnie pokażemy wykonane nagrobki i doradzimy przy wyborze granitu oraz liternictwa.
              Zadzwoń — umówimy się na rozmowę lub wizytę w zakładzie.
            </p>
          </div>
        )}

        {/* Więcej realizacji — album Google Photos */}
        <div className="mt-10 mb-6 flex flex-col items-center text-center">
          <a
            href="https://photos.google.com/share/AF1QipOfmUCRwRAypK-olLNgeCLx0_MNAiC6GP-uVLvcMG0jWnHA0pFIEWujlymwLvVHFw?key=eUZEQjhQREQ4OS0waENua002MDMtLTVrMk00UlBB"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="galeria-album-opis"
            className="bg-transparent text-g-gold border-2 border-g-gold font-inter font-bold px-8 min-h-[52px] max-w-full rounded-lg inline-flex items-center justify-center hover:bg-g-gold hover:text-g-dark transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-g-gold focus-visible:ring-offset-2 focus-visible:ring-offset-g-darkDeep"
          >
            Zobacz więcej realizacji
          </a>
          <p id="galeria-album-opis" className="font-inter text-sm text-g-textMuted mt-3">
            Album w Google Photos — otwiera się w nowej karcie
          </p>
        </div>

        {/* Telefon — zawsze pod galerią */}
        <div className="mt-4 bg-g-darkCard border border-g-gold rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-playfair text-lg text-g-textLight">Chcesz zamówić podobny nagrobek?</span>
          <a href="tel:+48502480543" className="text-g-gold font-inter font-bold text-2xl hover:text-white transition-colors flex items-center gap-2">
            <Phone className="w-6 h-6" />
            502 480 543
          </a>
        </div>
      </div>

      {hasPhotos && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={realizacje.map(r => ({ src: r.src, alt: r.alt }))}
          styles={{ container: { backgroundColor: '#000000' } }}
        />
      )}
    </section>
  );
}
