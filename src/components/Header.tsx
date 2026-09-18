import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const navLinks = [
  { label: 'O nas', href: '#o-nas' },
  { label: 'Oferta', href: '#oferta' },
  { label: 'Realizacje', href: '#galeria' },
  { label: 'Proces', href: '#proces' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The dialog handles focus, Escape and scroll locking; close on desktop resize.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-g-gold transition-all duration-300 ${
        scrolled
          ? 'bg-g-dark shadow-[0_2px_16px_rgba(0,0,0,0.4)]'
          : 'bg-g-card'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 gap-2 flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" onClick={scrollToTop} className="block" aria-label="GRANBET — powrót na górę strony">
            <span className={`font-playfair font-bold text-2xl transition-colors duration-300 ${scrolled ? 'text-white' : 'text-g-textDark'}`}>
              GRANBET
            </span>
            <span className={`block font-cormorant text-[13px] leading-none transition-colors duration-300 ${scrolled ? 'text-g-textMuted' : 'text-g-textDarkMuted'}`}>
              Zakład Kamieniarski od 1988 r.
            </span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Nawigacja główna" className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`font-inter text-base transition-colors duration-200 ${
                scrolled ? 'text-g-textLight hover:text-g-gold' : 'text-g-textDark hover:text-g-goldText'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Phone + hamburger */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <a
            href="tel:+48502480543"
            className={`font-inter font-bold text-[17px] whitespace-nowrap px-5 py-2.5 rounded-lg transition-all duration-300 hidden sm:inline-flex items-center gap-2 ${
              scrolled
                ? 'bg-g-gold text-g-dark'
                : 'bg-g-dark text-g-gold'
            }`}
          >
            <Phone className="w-4 h-4" />
            502 480 543
          </a>
          {/* Mobile phone */}
          <a
            href="tel:+48502480543"
            className={`sm:hidden font-inter font-bold text-[16px] whitespace-nowrap min-h-[44px] flex items-center gap-1 ${scrolled ? 'text-g-gold' : 'text-g-goldText'}`}
          >
            <Phone className="hidden min-[390px]:block w-4 h-4 shrink-0" aria-hidden="true" />
            502 480 543
          </a>
          <button
            ref={menuBtnRef}
            className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg ${scrolled ? 'text-g-gold' : 'text-g-goldText'}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Otwórz menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobilne"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-g-dark" />
          <Dialog.Content id="menu-mobilne" aria-describedby={undefined}
            onCloseAutoFocus={(event) => { event.preventDefault(); menuBtnRef.current?.focus(); }}
            className="fixed inset-0 z-[61] bg-g-dark overflow-y-auto px-6 pt-20 pb-8">
          <Dialog.Title className="sr-only">Menu nawigacyjne</Dialog.Title>
          <Dialog.Close
            className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-g-gold rounded-lg"
            aria-label="Zamknij menu"
          >
            <X className="w-8 h-8" />
          </Dialog.Close>
          <nav aria-label="Nawigacja mobilna" className="flex flex-col items-center gap-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-inter text-xl text-g-textLight py-4 hover:text-g-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a href="tel:+48502480543" className="mt-6 mx-auto w-fit flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-lg bg-g-gold text-g-dark font-bold whitespace-nowrap">
            <Phone className="w-5 h-5" aria-hidden="true" />502 480 543
          </a>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
