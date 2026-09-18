import { Star } from 'lucide-react';

// ─── PRAWDZIWE OPINIE KLIENTÓW ────────────────────────────────────────
// Wpisuj TYLKO realne opinie (przepisane z Google / za zgodą klienta).
// Dopóki tablica jest pusta i nie ma linku do Google, sekcja się NIE renderuje —
// żadnych zmyślonych treści na stronie.
const testimonials: { text: string; author: string }[] = [];

// Link do wystawienia opinii w Google — WSTAW prawdziwy adres profilu firmy
// (Google Business Profile → „Poproś o opinie" → skopiuj link).
// Zostaw '' dopóki go nie masz — przycisk się wtedy nie pokaże.
const GOOGLE_REVIEW_URL = '';
// ──────────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  // Nic do pokazania — nie renderuj pustej/zmyślonej sekcji.
  if (testimonials.length === 0 && !GOOGLE_REVIEW_URL) return null;

  return (
    <section id="opinie" className="bg-g-darkCard py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-white text-center tracking-wide">Co mówią nasi klienci</h2>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-4" />
        <p className="font-inter text-lg text-g-textMuted text-center mb-12">Opinie rodzin, którym towarzyszyliśmy</p>

        {testimonials.length > 0 && (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-animate="fade-in"
                className="bg-[#333333] border-l-4 border-g-gold rounded-xl p-7 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(198,168,90,0.22)] transition-all duration-300"
              >
                <div className="flex gap-1 mb-3" aria-label="Ocena 5 na 5 gwiazdek">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-g-gold fill-g-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-inter text-[17px] text-g-textLight italic leading-relaxed mb-4">
                  „{t.text}"
                </blockquote>
                <cite className="font-cormorant text-base text-g-gold font-semibold not-italic">— {t.author}</cite>
              </div>
            ))}
          </div>
        )}

        {GOOGLE_REVIEW_URL && (
          <div className="mt-10 text-center">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-g-gold text-g-gold px-8 min-h-[48px] rounded-lg inline-flex items-center justify-center font-inter font-bold hover:bg-g-gold hover:text-g-dark transition-all duration-200"
            >
              Wystaw opinię w Google →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
