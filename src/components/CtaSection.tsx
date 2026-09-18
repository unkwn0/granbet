// ─── SEKCJA NIEUŻYWANA ────────────────────────────────────────────────
// Ten komponent NIE jest renderowany od Etapu 2 (kontakt został uproszczony).
// Zostaje wyłącznie jako materiał historyczny. Zanim wrócisz go na stronę:
// sprawdź numery, treści i wszelkie liczby względem aktualnych danych firmy —
// tu nie ma automatycznej kontroli spójności z sekcją kontaktową.
// ──────────────────────────────────────────────────────────────────────
export default function CtaSection() {
  return (
    <section data-reveal="off" className="bg-g-dark py-20 border-t-[3px] border-g-gold text-center">
      <div className="max-w-3xl mx-auto px-4">
        <span className="font-cormorant text-base text-g-gold uppercase tracking-[3px]">Jesteśmy tu dla Ciebie</span>
        <h2 className="font-playfair text-3xl md:text-4xl text-white mt-4 tracking-wide">Pomożemy Ci godnie upamiętnić bliskich</h2>
        <p className="font-inter text-lg text-g-textWarm mt-4">
          Skontaktuj się z nami — telefonicznie, mailowo lub odwiedź nas osobiście w Kryłowie lub Hrubieszowie.
        </p>
        <a href="tel:+48502480543" className="block text-g-gold font-inter font-bold text-3xl md:text-4xl mt-6 hover:text-white transition-colors">
          ☎ 502 480 543
        </a>
        <a href="tel:+48697994924" className="block text-g-textLight font-inter text-lg mt-2 hover:text-white transition-colors">
          Biuro Hrubieszów: ☎ 697 994 924
        </a>
        <a
          href="#kontakt"
          className="mt-8 bg-transparent border-2 border-g-gold text-g-gold px-8 min-h-[52px] rounded-lg inline-flex items-center justify-center font-inter font-bold hover:bg-g-gold hover:text-g-dark transition-all duration-200"
        >
          Napisz do nas
        </a>
      </div>
    </section>
  );
}
