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
  // '01-nagrobek-granitowy-pojedynczy-czarny': 'Nagrobek pojedynczy, granit Impala, Kryłów',
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
    return { src, file, alt: opisy[key] ?? (prettify(file) || 'Realizacja GRANBET — nagrobek granitowy') };
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
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
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
