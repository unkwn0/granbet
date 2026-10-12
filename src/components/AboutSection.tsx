export default function AboutSection() {
  return (
    <section id="o-nas" className="bg-g-warm py-24 scroll-mt-20" aria-label="O firmie GRANBET">
      <div className="h-px bg-g-gold/30" />
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <h2 className="font-playfair text-3xl md:text-4xl text-g-textDark text-center tracking-wide">O firmie GRANBET</h2>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12" />
        <div className="max-w-2xl mx-auto">
          <div data-animate="fade-in">
            <p className="font-inter text-lg text-g-textDark leading-relaxed mb-4">
              Rozumiemy, że wybór nagrobka to jedna z najtrudniejszych decyzji. Dlatego od 1988 roku towarzyszymy rodzinom w Hrubieszowie, Kryłowie i okolicach — z szacunkiem, cierpliwością i pełnym zaangażowaniem.
            </p>
            <p className="font-inter text-lg text-g-textDark leading-relaxed mb-4">
              Nasz zakład produkcyjny mieści się w Kryłowie, przy trasie Hrubieszów–Dołhobyczów. Każdy nagrobek wykonujemy własnoręcznie — od doboru kamienia, przez obróbkę granitu i liternictwo, po montaż na cmentarzu. Biuro handlowe prowadzimy w Hrubieszowie, a w Dołhobyczowie mamy stałą ekspozycję nagrobków.
            </p>
            <p className="font-inter text-base text-g-textDarkMuted leading-relaxed">
              Firmę prowadzi Henryk Sobczuk — z dbałością o jakość kamienia i dotrzymywanie terminów.
            </p>
            <a href="#obszar-dzialania" className="inline-block mt-5 font-inter text-base text-g-goldText hover:text-g-goldTextHover">Sprawdź, gdzie montujemy →</a>
          </div>
        </div>

      </div>
    </section>
  );
}
