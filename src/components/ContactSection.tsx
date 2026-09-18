import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, CheckCircle, AlertCircle } from 'lucide-react';

// ─── FORMULARZ → e-mail ───────────────────────────────────────────────
// Formularz jest WYŁĄCZONY, dopóki klucz jest pusty. Bez klucza prawa kolumna
// pokazuje kontakt telefoniczny — nic „martwego" się nie pojawi, a Ty decydujesz
// o formularzu spokojnie, później.
//
// Gdy zdecydujesz (Web3Forms): https://web3forms.com → wpisz granbet@vp.pl →
// klucz przyjdzie mailem → wklej poniżej, formularz sam się włączy.
// Wolisz FormSubmit.co albo w ogóle bez formularza — powiedz, dostosuję.
const WEB3FORMS_KEY = ''; // <-- pusto = formularz OFF, kontakt telefoniczny
const formEnabled = WEB3FORMS_KEY.length > 0;
// ──────────────────────────────────────────────────────────────────────

const lokalizacje = [
  {
    tytul: 'Zakład produkcyjny — Kryłów',
    adres: 'ul. Hrubieszowska 33, Kryłów (gm. Mircze)',
    tel: { display: '502 480 543', href: 'tel:+48502480543' },
    godziny: 'Pon–Pt 7:00–17:00, Sob 7:00–15:00',
    uwaga: '',
    mapa: 'https://maps.google.com/?q=Krylow+ul.+Hrubieszowska+33+gmina+Mircze',
  },
  {
    tytul: 'Biuro handlowe — Hrubieszów',
    adres: 'ul. Nowa 10, Hrubieszów',
    tel: { display: '697 994 924', href: 'tel:+48697994924' },
    godziny: 'Pon–Pt 8:00–17:00, Sob 8:00–15:00',
    uwaga: '',
    mapa: 'https://maps.google.com/?q=Hrubieszow+ul.+Nowa+10',
  },
  {
    tytul: 'Ekspozycja nagrobków — Dołhobyczów',
    adres: 'ul. Spółdzielcza 10, Dołhobyczów (obok Urzędu Gminy)',
    tel: { display: '502 480 543', href: 'tel:+48502480543' },
    godziny: '',
    uwaga: 'Ekspozycja dostępna z zewnątrz. Oględziny i obsługę prosimy umawiać telefonicznie.',
    mapa: 'https://maps.google.com/?q=Dolhobyczow+ul.+Spoldzielcza+10',
  },
];

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', 'Zapytanie ze strony GRANBET');
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      setStatus(json.success ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="kontakt" className="bg-g-warmAlt pt-6 pb-12 md:pt-10 md:pb-20 scroll-mt-20" aria-label="Kontakt">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-g-textDark text-center tracking-wide">Skontaktuj się z nami</h2>
        <p className="font-inter text-lg text-g-textDarkMuted text-center mt-2">Chętnie odpowiemy na każde pytanie — bez zobowiązań</p>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-6 md:mb-10" />

        <div className="grid lg:grid-cols-2 items-start gap-8 lg:gap-12">
          {/* Prawa — formularz (jeśli włączony) albo kontakt telefoniczny */}
          <div className="lg:col-start-2 lg:row-start-1" data-animate="fade-in">
            {!formEnabled ? (
              <div className="bg-g-dark rounded-xl p-5 sm:p-8 border border-g-gold/40">
                <h3 className="font-playfair text-2xl text-white">Zadzwoń do wybranego punktu</h3>
                <div className="space-y-3 mt-4">
                  <a href="tel:+48502480543" className="w-full bg-g-gold text-g-dark font-inter font-bold min-h-[76px] px-3 py-2 rounded-lg inline-flex items-center justify-center gap-3 hover:bg-g-goldHover transition-colors text-lg">
                    <Phone className="w-5 h-5 shrink-0" aria-hidden="true" /><span className="flex flex-col"><span className="text-sm font-semibold">Kryłów — zakład</span><span className="whitespace-nowrap">502 480 543</span></span>
                  </a>
                  <a href="tel:+48697994924" className="w-full border-2 border-g-gold text-g-gold font-inter font-bold min-h-[76px] px-3 py-2 rounded-lg inline-flex items-center justify-center gap-3 hover:bg-g-gold hover:text-g-dark transition-colors text-lg">
                    <Phone className="w-5 h-5 shrink-0" aria-hidden="true" /><span className="flex flex-col"><span className="text-sm font-semibold">Hrubieszów — biuro</span><span className="whitespace-nowrap">697 994 924</span></span>
                  </a>
                </div>
              </div>
            ) : status === 'ok' ? (
              <div className="bg-g-darkCard border border-g-gold rounded-xl p-8 text-center" role="alert" aria-live="polite">
                <CheckCircle className="w-10 h-10 text-g-gold mx-auto mb-3" />
                <p className="font-playfair text-lg text-g-textLight">Dziękujemy! Odezwiemy się wkrótce.</p>
                <p className="font-inter text-sm text-g-textMuted mt-2">Jeśli sprawa jest pilna, zadzwoń: <a href="tel:+48502480543" className="text-g-gold font-bold">502 480 543</a></p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-g-card rounded-xl p-8 shadow-sm border border-g-goldSoft">
                <h3 className="font-playfair text-xl text-g-textDark mb-6">Napisz do nas</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="c-name" className="text-sm text-g-textDarkMuted mb-1 block font-inter">Imię i nazwisko *</label>
                    <input id="c-name" name="name" type="text" required aria-required="true" placeholder="np. Anna Kowalska"
                      className="w-full bg-white text-g-textDark border border-g-goldSoft rounded-lg p-3 text-[17px] font-inter focus:border-g-gold focus:outline-none focus:ring-2 focus:ring-g-gold/20 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="text-sm text-g-textDarkMuted mb-1 block font-inter">Adres e-mail</label>
                    <input id="c-email" name="email" type="email" placeholder="np. anna@email.pl"
                      className="w-full bg-white text-g-textDark border border-g-goldSoft rounded-lg p-3 text-[17px] font-inter focus:border-g-gold focus:outline-none focus:ring-2 focus:ring-g-gold/20 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="text-sm text-g-textDarkMuted mb-1 block font-inter">Numer telefonu</label>
                    <input id="c-phone" name="phone" type="tel" inputMode="tel" placeholder="Twój numer telefonu"
                      className="w-full bg-white text-g-textDark border border-g-goldSoft rounded-lg p-3 text-[17px] font-inter focus:border-g-gold focus:outline-none focus:ring-2 focus:ring-g-gold/20 transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="c-message" className="text-sm text-g-textDarkMuted mb-1 block font-inter">Wiadomość *</label>
                    <textarea id="c-message" name="message" rows={5} required aria-required="true" placeholder="Opisz, czego potrzebujesz — odpiszemy lub zadzwonimy…"
                      className="w-full bg-white text-g-textDark border border-g-goldSoft rounded-lg p-3 text-[17px] font-inter focus:border-g-gold focus:outline-none focus:ring-2 focus:ring-g-gold/20 transition-colors resize-none" />
                  </div>
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
                  {status === 'error' && (
                    <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Nie udało się wysłać. Zadzwoń: <a href="tel:+48502480543" className="font-bold underline">502 480 543</a> lub napisz na <a href="mailto:granbet@vp.pl" className="font-bold underline">granbet@vp.pl</a>.</span>
                    </div>
                  )}
                  <button type="submit" disabled={status === 'sending'}
                    className="w-full bg-g-gold text-g-dark font-inter font-bold py-4 rounded-lg text-[17px] min-h-[52px] hover:bg-g-goldHover hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                    {status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Lewa — dane kontaktowe (3 punkty) */}
          <div id="lokalizacje" className="space-y-8 lg:col-start-1 lg:row-start-1 scroll-mt-24" data-animate="fade-in">
            {lokalizacje.map((l) => (
              <div key={l.tytul}>
                <h3 className="font-cormorant text-xl text-g-goldText font-semibold mb-2">{l.tytul}</h3>
                <div className="space-y-1 font-inter text-base text-g-textDark">
                  <p className="flex items-start gap-2"><MapPin className="w-5 h-5 text-g-goldText flex-shrink-0 mt-0.5" />{l.adres}</p>
                  <p className="flex items-center gap-2"><Phone className="w-5 h-5 text-g-goldText flex-shrink-0" /><a href={l.tel.href} className="inline-flex items-center min-h-[44px] whitespace-nowrap font-bold text-g-goldText hover:text-g-goldTextHover transition-colors">{l.tel.display}</a></p>
                  {l.godziny && <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-g-goldText flex-shrink-0" />{l.godziny}</p>}
                  {l.uwaga && <p className="text-sm text-g-textDarkMuted ml-7">{l.uwaga}</p>}
                  <a href={l.mapa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] gap-1 text-sm text-g-goldText underline underline-offset-2 hover:text-g-goldTextHover transition-colors ml-7">Zobacz na mapie →</a>
                </div>
              </div>
            ))}

            <p className="flex items-center gap-2 font-inter text-base text-g-textDark pt-4 border-t border-g-gold/20">
              <Mail className="w-5 h-5 text-g-goldText flex-shrink-0" />
              <a href="mailto:granbet@vp.pl" className="inline-flex items-center min-h-[44px] text-g-goldText hover:text-g-goldTextHover transition-colors">granbet@vp.pl</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
