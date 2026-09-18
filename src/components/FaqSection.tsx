import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/faq';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-g-warm py-24 scroll-mt-20" aria-label="Najczęściej zadawane pytania">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-g-textDark text-center tracking-wide">Najczęściej zadawane pytania</h2>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-4" />
        <p className="font-inter text-lg text-g-textDarkMuted text-center mb-12">Odpowiedzi na pytania, które słyszymy najczęściej</p>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-g-card border border-g-goldSoft rounded-lg overflow-hidden" data-animate="fade-in">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-playfair text-lg text-g-textDark hover:text-g-goldText transition-colors"
                  aria-expanded={isOpen}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-g-goldText transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-5 pb-5">
                    <div className="h-px bg-g-gold/20 mb-4" />
                    <p className="font-inter text-base text-g-textDarkMuted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
