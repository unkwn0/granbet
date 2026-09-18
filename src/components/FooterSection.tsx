export default function FooterSection() {
  return (
    <footer className="bg-g-darkFooter border-t-[3px] border-g-gold">
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        <div>
          <span className="font-playfair font-bold text-xl text-white">GRANBET</span>
          <span className="block font-cormorant text-g-gold">Zakład Kamieniarski — Henryk Sobczuk</span>
          <p className="font-inter text-sm text-g-textMuted mt-2">
            Działamy od 1988 roku.<br />
            Nagrobki granitowe · grobowce · fotoceramika
          </p>
        </div>
        <div>
          <h2 className="font-cormorant text-g-gold font-semibold mb-3">Adresy</h2>
          <ul className="space-y-2 font-inter text-sm text-g-textLight">
            <li><span className="text-g-textMuted">Zakład:</span> Kryłów, ul. Hrubieszowska 33 (gm. Mircze)</li>
            <li><span className="text-g-textMuted">Biuro:</span> Hrubieszów, ul. Nowa 10</li>
            <li><span className="text-g-textMuted">Ekspozycja:</span> Dołhobyczów, ul. Spółdzielcza 10</li>
          </ul>
        </div>
        <div>
          <h2 className="font-cormorant text-g-gold font-semibold mb-3">Kontakt</h2>
          <div className="space-y-1 font-inter text-base">
            <a href="tel:+48502480543" className="flex flex-wrap items-center gap-x-2 min-h-[44px] text-g-textLight hover:text-g-gold transition-colors"><span>Kryłów:</span><span className="whitespace-nowrap">502 480 543</span></a>
            <a href="tel:+48697994924" className="flex flex-wrap items-center gap-x-2 min-h-[44px] text-g-textLight hover:text-g-gold transition-colors"><span>Hrubieszów:</span><span className="whitespace-nowrap">697 994 924</span></a>
            <a href="mailto:granbet@vp.pl" className="flex items-center min-h-[44px] text-g-textLight hover:text-g-gold transition-colors">granbet@vp.pl</a>
            <a href="#lokalizacje" className="inline-flex items-center min-h-[44px] text-sm text-g-gold underline underline-offset-4 hover:text-white transition-colors">Godziny i dojazd</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6 pb-6 text-center">
        <p className="font-inter text-sm text-g-textMuted/60">© {new Date().getFullYear()} GRANBET Zakład Kamieniarski Henryk Sobczuk. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
