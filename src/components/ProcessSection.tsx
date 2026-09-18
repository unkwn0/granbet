import { MessageCircle, PenTool, Hammer, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  { icon: MessageCircle, num: '01', title: 'Konsultacja', desc: 'Zadzwoń, napisz lub odwiedź nas osobiście. Wysłuchamy i doradzimy bez presji.' },
  { icon: PenTool, num: '02', title: 'Projekt', desc: 'Wspólnie zaprojektujemy nagrobek dopasowany do Twoich oczekiwań i budżetu.' },
  { icon: Hammer, num: '03', title: 'Realizacja', desc: 'Wykonujemy nagrobek we własnym zakładzie w Kryłowie — pełna kontrola jakości na każdym etapie.' },
  { icon: CheckCircle, num: '04', title: 'Montaż', desc: 'Dowozimy i montujemy nagrobek na cmentarzu — zajmujemy się wszystkim na miejscu.' },
];

export default function ProcessSection() {
  return (
    <section id="proces" className="bg-g-warm py-24 scroll-mt-20">
      <div className="h-px bg-g-gold/30" />
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <h2 className="font-playfair text-3xl md:text-4xl text-g-textDark text-center tracking-wide">Jak wygląda nasza współpraca?</h2>
        <p className="font-inter text-lg text-g-textDarkMuted text-center mt-2">Krok po kroku — od pierwszej rozmowy do gotowego nagrobka</p>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12" />
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          {steps.map((s, i) => (
            <div key={i} className="contents">
              <div
                data-animate="fade-in"
                className="relative bg-g-card border-2 border-g-warmAlt rounded-xl p-7 flex-1 hover:border-g-gold hover:bg-g-warmAlt transition-all duration-200"
              >
                <span className="font-playfair text-5xl text-g-gold/15 absolute top-2 right-4">{s.num}</span>
                <s.icon className="w-8 h-8 text-g-gold mb-3" />
                <h3 className="font-playfair text-xl text-g-textDark font-bold">{s.title}</h3>
                <p className="font-inter text-base text-g-textDarkMuted leading-relaxed mt-2">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block w-6 h-6 text-g-goldSoft flex-shrink-0 self-center mx-2" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="tel:+48502480543"
            className="bg-g-gold text-g-dark px-10 min-h-[52px] rounded-lg inline-flex items-center justify-center font-inter font-bold text-lg hover:bg-g-goldHover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(198,168,90,0.35)] transition-all duration-200"
          >
            Zadzwoń i umów konsultację
          </a>
        </div>
      </div>
    </section>
  );
}
