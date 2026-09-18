import { Gem, Landmark, Camera, Sparkles, Flower2, Phone } from 'lucide-react';

// Świat pamięci — nagrobki i wszystko wokół nich. To jest oś strony.
const glowne = [
  { icon: Landmark, title: 'Grobowce', desc: 'Trwałe grobowce rodzinne — służące kolejnym pokoleniom.' },
  { icon: Camera, title: 'Fotoceramika', desc: 'Wizerunek bliskiej osoby w porcelanie i szkle — zachowany na lata.' },
  { icon: Flower2, title: 'Akcesoria nagrobkowe', desc: 'Lampiony, wazony i elementy uzupełniające nagrobek.' },
  { icon: Sparkles, title: 'Renowacja i liternictwo', desc: 'Odnawiamy stare nagrobki i wykonujemy napisy — czyszczenie i konserwacja kamienia.' },
];

export default function OfferSection() {
  return (
    <section id="oferta" className="bg-g-warmAlt py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-g-textDark text-center tracking-wide">Jak możemy pomóc?</h2>
        <p className="font-inter text-lg text-g-textDarkMuted text-center mt-2">Specjalizujemy się w nagrobkach granitowych — z własnej produkcji od 1988 roku</p>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12" />

        {/* Wyróżniony kafel — nagrobki (główny produkt, ~99% zamówień) */}
        <div
          data-animate="fade-in"
          className="bg-g-dark rounded-xl p-8 md:p-10 border border-g-gold/40 shadow-sm flex flex-col md:flex-row md:items-center gap-6 mb-6"
        >
          <div className="flex-1">
            <Gem className="w-10 h-10 text-g-gold mb-3" />
            <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold">Nagrobki granitowe</h3>
            <p className="font-inter text-base text-g-textWarm leading-relaxed mt-2 max-w-xl">
              Pomagamy godnie upamiętnić bliskich — nagrobki pojedyncze, podwójne i urnowe z naturalnego granitu.
              Doradzamy przy wyborze kamienia i liternictwa, wykonujemy i montujemy na miejscu.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:w-56 md:flex-shrink-0">
            <a href="#galeria" className="bg-g-gold text-g-dark font-inter font-bold px-6 min-h-[52px] rounded-lg inline-flex items-center justify-center hover:bg-g-goldHover transition-colors text-center">
              Zobacz realizacje
            </a>
            <a href="tel:+48502480543" className="border-2 border-g-gold text-g-gold font-inter font-bold px-6 min-h-[52px] rounded-lg inline-flex items-center justify-center gap-2 hover:bg-g-gold hover:text-g-dark transition-colors">
              <Phone className="w-5 h-5" /> 502 480 543
            </a>
          </div>
        </div>

        {/* Pozostałe usługi „pamięciowe" */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {glowne.map((o, i) => (
            <div
              key={i}
              data-animate="fade-in"
              className="bg-g-card border-t-4 border-g-gold p-6 rounded-lg shadow-sm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(198,168,90,0.18)] hover:border-t-g-goldHover transition-all duration-300"
            >
              <o.icon className="w-8 h-8 text-g-gold mb-3" />
              <h3 className="font-playfair text-lg text-g-textDark font-bold">{o.title}</h3>
              <p className="font-inter text-sm text-g-textDarkMuted leading-relaxed mt-2">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Usługi dodatkowe — dyskretny pasek, celowo nie konkuruje z nagrobkami */}
        <p className="font-inter text-center text-g-textDarkMuted mt-10">
          Z granitu wykonujemy również <span className="text-g-textDark font-semibold">schody · parapety · blaty</span> — na zamówienie.
          Zapytaj o wycenę: <a href="tel:+48502480543" className="inline-flex items-center min-h-[44px] whitespace-nowrap text-g-goldText font-semibold hover:text-g-goldTextHover transition-colors">502 480 543</a>.
        </p>
      </div>
    </section>
  );
}
