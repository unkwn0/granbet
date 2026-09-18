import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section data-reveal="off" className="relative min-h-[90dvh] bg-gradient-to-b from-g-darkDeep via-g-dark to-g-darkCard flex items-center justify-center text-center px-4">
      <div className="relative z-10 max-w-3xl mx-auto" data-animate="fade-in">
        <span className="font-cormorant text-sm text-g-gold uppercase tracking-[5px]">EST. 1988</span>
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mt-4 tracking-wide">GRANBET</h1>
        <h2 className="font-playfair text-2xl md:text-4xl text-g-gold mt-2 tracking-wide">Zakład Kamieniarski</h2>
        <div className="w-24 h-0.5 bg-g-gold mx-auto my-6" />
        <p className="font-inter text-lg md:text-xl text-g-textWarm">
          Nagrobki granitowe z własnej produkcji od 1988 roku
        </p>
        <p className="font-inter text-base text-g-textMuted mt-2">
          Hrubieszów · Kryłów · Dołhobyczów
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#galeria"
            className="bg-g-gold text-g-dark font-inter font-bold px-8 min-h-[52px] rounded-lg inline-flex items-center justify-center hover:bg-g-goldHover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(198,168,90,0.35)] transition-all duration-200"
          >
            Nasze realizacje
          </a>
          <a
            href="#kontakt"
            className="bg-transparent text-g-gold border-2 border-g-gold font-inter font-bold px-8 min-h-[52px] rounded-lg inline-flex items-center justify-center hover:bg-g-gold hover:text-g-dark transition-all duration-200"
          >
            Porozmawiajmy
          </a>
        </div>
      </div>
      <a
        href="#o-nas"
        aria-label="Przejdź do sekcji o firmie"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-g-gold animate-bounce rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-g-gold focus-visible:ring-offset-2 focus-visible:ring-offset-g-dark"
      >
        <ChevronDown className="w-8 h-8" aria-hidden="true" />
      </a>
    </section>
  );
}
