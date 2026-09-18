// Lista miejscowości — pod lokalne SEO (naturalnie, nie spam).
const obszar = [
  'Hrubieszów', 'Kryłów', 'Dołhobyczów', 'Mircze', 'Werbkowice', 'Horodło',
  'Tyszowce', 'Łaszczów', 'Uchanie', 'Dubienka', 'Białopole', 'Trzeszczany',
  'Moniatycze', 'Telatyn', 'Rachanie', 'Tomaszów Lubelski', 'Chełm', 'Zamość',
];

export default function AboutSection() {
  return (
    <section id="o-nas" className="bg-g-warm py-24 scroll-mt-20" aria-label="O firmie GRANBET">
      <div className="h-px bg-g-gold/30" />
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <h2 className="font-playfair text-3xl md:text-4xl text-g-textDark text-center tracking-wide">O firmie GRANBET</h2>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12" />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-animate="fade-in">
            <p className="font-inter text-lg text-g-textDark leading-relaxed mb-4">
              Rozumiemy, że wybór nagrobka to jedna z najtrudniejszych decyzji. Dlatego od 1988 roku towarzyszymy rodzinom w Hrubieszowie, Kryłowie i okolicach — z szacunkiem, cierpliwością i pełnym zaangażowaniem.
            </p>
            <p className="font-inter text-lg text-g-textDark leading-relaxed mb-4">
              Nasz zakład produkcyjny mieści się w Kryłowie, przy trasie Hrubieszów–Dołhobyczów. Każdy nagrobek wykonujemy własnoręcznie — od projektu, przez obróbkę granitu i liternictwo, po montaż na cmentarzu. Biuro handlowe prowadzimy w Hrubieszowie, a w Dołhobyczowie mamy stałą ekspozycję nagrobków.
            </p>
            <p className="font-inter text-base text-g-textDarkMuted leading-relaxed">
              Firmę prowadzi Henryk Sobczuk — z dbałością o jakość kamienia i dotrzymywanie terminów.
            </p>
          </div>
          <div
            data-animate="fade-in"
            className="aspect-[4/3] bg-g-warmAlt rounded-xl overflow-hidden flex items-center justify-center border border-g-gold/30"
          >
            {/* Podmień na zdjęcie zakładu:
                <img src={...} alt="Zakład kamieniarski GRANBET w Kryłowie" className="w-full h-full object-cover" /> */}
            <span className="text-sm text-g-textDarkMuted font-inter">Zdjęcie zakładu — wkrótce</span>
          </div>
        </div>

        {/* Obszar działania — pod lokalne SEO */}
        <div className="mt-16 max-w-4xl mx-auto text-center" data-animate="fade-in">
          <h3 className="font-cormorant text-2xl text-g-goldText font-semibold">Obszar działania</h3>
          <p className="font-inter text-base text-g-textDarkMuted mt-2 mb-5">
            Wykonujemy nagrobki i realizujemy zamówienia w Hrubieszowie, Kryłowie, Dołhobyczowie oraz okolicznych miejscowościach:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {obszar.map((m) => (
              <span key={m} className="font-inter text-sm text-g-textDark bg-g-card border border-g-gold/30 rounded-full px-3 py-1">{m}</span>
            ))}
            <span className="font-inter text-sm text-g-textDarkMuted px-3 py-1">i inne</span>
          </div>
        </div>
      </div>
    </section>
  );
}
