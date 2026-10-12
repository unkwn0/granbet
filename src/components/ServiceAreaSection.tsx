import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const localities = ['Hrubieszów', 'Kryłów', 'Mircze', 'Dołhobyczów', 'Werbkowice', 'Uchanie', 'Horodło', 'Tyszowce'];

export default function ServiceAreaSection() {
  return (
    <section id="obszar-dzialania" aria-labelledby="obszar-dzialania-tytul" className="bg-g-warm py-16 md:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <h2 id="obszar-dzialania-tytul" className="font-playfair text-3xl md:text-4xl text-g-goldText">Obszar działania</h2>
          <div className="w-10 h-0.5 bg-g-gold mt-5 mb-6" />
          <p className="font-inter text-lg text-g-textDark leading-relaxed">
            Wykonujemy nagrobki i montujemy je bezpośrednio na cmentarzu — w powiatach hrubieszowskim, tomaszowskim, zamojskim, chełmskim i krasnostawskim. Dojeżdżamy także dalej, m.in. do Biłgoraja i Lublina.
          </p>
          <h3 className="font-inter text-base font-normal text-g-textDarkMuted mt-7 mb-3">Montujemy nagrobki m.in. w miejscowościach:</h3>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-inter text-base text-g-textDark" aria-label="Przykładowe miejscowości montażu">
            {localities.map((name) => <li key={name}>{name}</li>)}
          </ul>
          <div className="border border-g-gold/40 rounded-lg bg-g-card p-5 mt-7 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5 items-start sm:items-center lg:items-start xl:items-center">
            <p className="font-inter text-base text-g-textDark leading-relaxed flex-1">Twojej miejscowości nie ma na liście ani na mapie? Zadzwoń — ustalimy szczegóły dojazdu.</p>
            <div className="shrink-0">
              <Button asChild className="bg-g-gold text-g-dark hover:bg-g-goldHover font-inter font-bold text-base min-h-[52px] h-auto px-4 py-3 focus-visible:ring-g-goldText focus-visible:ring-offset-g-card" aria-describedby="obszar-telefon-opis">
                <a href="tel:+48502480543"><Phone aria-hidden="true" />502 480 543</a>
              </Button>
              <p id="obszar-telefon-opis" className="font-inter text-sm text-g-textDarkMuted mt-2">Kryłów — zakład</p>
            </div>
          </div>
        </div>
        <ServiceAreaMap />
      </div>
    </section>
  );
}