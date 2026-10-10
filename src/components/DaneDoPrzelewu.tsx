import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { daneDoPrzelewu, formatujRachunek } from '@/data/przelew';

export default function DaneDoPrzelewu() {
  const [skopiowano, setSkopiowano] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const kopiuj = async () => {
    setSkopiowano(false);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Brak dostępu do schowka');
      await navigator.clipboard.writeText(daneDoPrzelewu.rachunek);
      setSkopiowano(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setSkopiowano(false), 4000);
    } catch {
      // Bez komunikatu sukcesu — numer można zaznaczyć i skopiować ręcznie.
    }
  };

  return (
    <div className="bg-g-card border border-g-gold/30 rounded-lg p-5">
      <h3 className="font-cormorant text-xl text-g-goldText font-semibold mb-2">Dane do przelewu</h3>
      <p className="font-inter text-base text-g-textDark">{daneDoPrzelewu.odbiorca}</p>
      <p className="font-inter text-base text-g-textDark">
        {/* Kod pocztowy (np. 22-530) nie może się łamać przy myślniku. */}
        {daneDoPrzelewu.adres.split(/(\d{2}-\d{3})/).map((czesc, i) =>
          i % 2 ? <span key={i} className="whitespace-nowrap">{czesc}</span> : czesc,
        )}
      </p>
      <p className="font-inter text-sm text-g-textDarkMuted mt-3">Numer rachunku</p>
      <p className="font-inter text-lg font-semibold text-g-textDark tabular-nums tracking-wide break-words select-text">
        {formatujRachunek(daneDoPrzelewu.rachunek)}
      </p>
      <p className="font-inter text-sm text-g-textDarkMuted">Bank: {daneDoPrzelewu.bank}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={kopiuj}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg border-2 border-g-gold text-g-goldText font-inter font-semibold text-base hover:bg-g-gold hover:text-g-dark transition-colors"
        >
          {skopiowano ? <Check className="w-5 h-5" aria-hidden="true" /> : <Copy className="w-5 h-5" aria-hidden="true" />}
          Kopiuj numer konta
        </button>
        <p role="status" aria-live="polite" className="font-inter text-sm text-g-goldText">
          {skopiowano ? 'Numer konta skopiowany' : ''}
        </p>
      </div>
    </div>
  );
}
