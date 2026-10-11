import { useEffect, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Phone } from 'lucide-react';
import albumImage from '@/assets/album/7_a.jpg.asset.json';
import { Button } from '@/components/ui/button';
import photo01 from '@/assets/realizacje/a15/01-kn079-sg124.jpg.asset.json';
import photo02 from '@/assets/realizacje/a15/02-kn024-sg117.jpg.asset.json';
import photo03 from '@/assets/realizacje/a15/03-kn019-sg009.jpg.asset.json';
import photo04 from '@/assets/realizacje/a15/04-kn088-sg130.jpg.asset.json';
import photo05 from '@/assets/realizacje/a15/05-kn017-sg116.jpg.asset.json';
import photo06 from '@/assets/realizacje/a15/06-kn084-sg127.jpg.asset.json';
import photo07 from '@/assets/realizacje/a15/07-kn060-sg113.jpg.asset.json';
import photo08 from '@/assets/realizacje/a15/08-kn056.jpg.asset.json';
import photo09 from '@/assets/realizacje/a15/09-kn077-sg122.jpg.asset.json';
import photo10 from '@/assets/realizacje/a15/10-kn103-sg148.jpg.asset.json';
import photo11 from '@/assets/realizacje/a15/11-kn085-sg128.jpg.asset.json';
import photo12 from '@/assets/realizacje/a15/12-kn076-sg089.jpg.asset.json';
import photo13 from '@/assets/realizacje/a15/13-kn023-sg135.jpg.asset.json';
import photo14 from '@/assets/realizacje/a15/14-kn042-sg138.jpg.asset.json';
import photo15 from '@/assets/realizacje/a15/15-kn069-sg103.jpg.asset.json';

// Jawna kolejność A15 — niezależna od nazw plików i sortowania.
const realizacje = [
  { src: photo01.url, alt: 'Ciemna płyta z odbiciami i pionowa tablica z krzyżem' },
  { src: photo02.url, alt: 'Kompozycja płyt i tablic na wspólnej stopniowanej podstawie' },
  { src: photo03.url, alt: 'Płyta z falistym dodatkiem i zaokrąglona tablica z owalnym portretem' },
  { src: photo04.url, alt: 'Jasna płyta i profilowana tablica z figurą' },
  { src: photo05.url, alt: 'Jasna płyta z łukowym frontem i brązowa tablica' },
  { src: photo06.url, alt: 'Jasna płyta o wyrazistym wzorze i ciemna tablica z krzyżem' },
  { src: photo07.url, alt: 'Ciemna płyta z brązowymi bokami i tablica z jasnym krzyżem' },
  { src: photo08.url, alt: 'Jasna płyta z brązowym falistym pasem i ciemna tablica z krucyfiksem' },
  { src: photo09.url, alt: 'Jasna prostokątna płyta i ciemna tablica z krzyżem' },
  { src: photo10.url, alt: 'Rozległa kompozycja płyt na podstawie otoczonej słupkami i łańcuchami' },
  { src: photo11.url, alt: 'Szeroka jasna płyta i ciemna tablica z krzyżem' },
  { src: photo12.url, alt: 'Jasna płyta z brązową falą i brązowa tablica ze złocistym krucyfiksem' },
  { src: photo13.url, alt: 'Jasna płyta z zaokrąglonym frontem i ciemna tablica z wysokim krzyżem' },
  { src: photo14.url, alt: 'Jasna płyta na stopniowanej podstawie z krzyżem i wazonem' },
  { src: photo15.url, alt: 'Ciemna płyta z poziomym krzyżem i tablicą w kształcie otwartej księgi' },
];

export default function GallerySection() {
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded || window.matchMedia('(min-width: 768px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Wspólny hook pomija galerię; nowe zdjęcia animujemy lokalnie bez ukrywania treści.
    const animations = Array.from(gridRef.current?.querySelectorAll('[data-gallery-extra]') ?? [])
      .flatMap(element => element.animate ? [element.animate(
        [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
        { duration: 300, easing: 'ease-out', fill: 'none' }
      )] : []);
    return () => animations.forEach(animation => animation.cancel());
  }, [expanded]);

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

        <div className="flex justify-center text-center mb-6">
          <a
            href="https://photos.google.com/share/AF1QipOfmUCRwRAypK-olLNgeCLx0_MNAiC6GP-uVLvcMG0jWnHA0pFIEWujlymwLvVHFw?key=eUZEQjhQREQ4OS0waENua002MDMtLTVrMk00UlBB"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="galeria-album-opis"
            className="font-inter text-g-gold underline underline-offset-4 min-h-[44px] max-w-full inline-flex flex-wrap items-center justify-center gap-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-g-gold focus-visible:ring-offset-2 focus-visible:ring-offset-g-darkDeep rounded-lg"
          >
            <span>Zobacz więcej realizacji</span><span className="whitespace-nowrap">w albumie →</span>
          </a>
        </div>
        <p id="galeria-album-opis" className="sr-only">Album w Google Photos — otwiera się w nowej karcie</p>

        {hasPhotos ? (
          <div id="galeria-realizacje" ref={gridRef} className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {realizacje.map((r, i) => (
              <button
                key={r.src}
                data-animate="fade-in"
                data-gallery-extra={i >= 6 ? true : undefined}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-g-gold focus-visible:ring-offset-2 focus-visible:ring-offset-g-darkDeep ${i >= 6 && !expanded ? 'hidden md:block' : ''}`}
                aria-label={`Powiększ zdjęcie: ${r.alt}`}
                onClick={() => openLightbox(i)}
              >
                {/* Całe zdjęcie w kafelku 4:3, wyśrodkowane na tle galerii; bez powiększania po najechaniu. */}
                <img
                  src={r.src}
                  alt={r.alt}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-g-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
            <a
              href="https://photos.google.com/share/AF1QipOfmUCRwRAypK-olLNgeCLx0_MNAiC6GP-uVLvcMG0jWnHA0pFIEWujlymwLvVHFw?key=eUZEQjhQREQ4OS0waENua002MDMtLTVrMk00UlBB"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="galeria-album-opis"
              className={`relative aspect-[4/3] rounded-lg overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-g-gold focus-visible:ring-offset-2 focus-visible:ring-offset-g-darkDeep ${!expanded ? 'hidden md:block' : ''} lg:col-span-3 lg:aspect-auto lg:h-48`}
            >
              <img src={albumImage.url} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-g-darkDeep/70" />
              <div className="absolute inset-3 border border-g-gold pointer-events-none" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                <h3 className="font-playfair text-2xl text-background">Więcej naszych realizacji</h3>
                <span className="w-10 h-0.5 bg-g-gold my-4" />
                <span className="font-inter text-base font-bold text-g-gold group-hover:text-background transition-colors whitespace-nowrap">Otwórz album →</span>
              </div>
            </a>
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

        <div className="flex justify-center mt-6 md:hidden">
          <Button
            variant="ghost"
            className="font-inter text-base text-g-gold border border-g-gold min-h-[44px] hover:bg-g-gold/15 hover:text-g-gold focus-visible:ring-g-gold focus-visible:ring-offset-g-darkDeep"
            aria-expanded={expanded}
            aria-controls="galeria-realizacje"
            onClick={() => setExpanded(value => !value)}
          >
            {expanded ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Button>
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
