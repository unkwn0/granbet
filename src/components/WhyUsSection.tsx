import { Check } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

// ─── DANE TEJ SEKCJI ──────────────────────────────────────────────────
// Wyłącznie informacje potwierdzone w projekcie: rok 1988, trzy lokalizacje,
// dwa punkty z obsługą klienta (Kryłów i Hrubieszów — w Dołhobyczowie jest
// ekspozycja bez stałej obsługi) oraz lokalizacja zakładu produkcyjnego.
// Rok 1988 podajemy statycznie: nie znamy dokładnej daty rozpoczęcia
// działalności ani nie mamy potwierdzenia jej nieprzerwanego prowadzenia,
// więc nie wyliczamy liczby lat i nie animujemy roku jak licznika.
// Nie dopisuj tu liczb bez potwierdzenia od właściciela.
// ──────────────────────────────────────────────────────────────────────
type Stat = {
  value: string;
  label: string;
  count?: { end: number; suffix: string };
  // Dla wartości słownych (dłuższych niż liczba) mniejszy stopień pisma,
  // żeby zmieściły się w kolumnie przy 360 px — bez zmiany typografii strony.
  valueClass?: string;
};

const VALUE_CLASS = 'font-playfair text-6xl md:text-7xl text-g-gold font-bold';

const stats: Stat[] = [
  { value: '1988', label: 'Rok rozpoczęcia działalności' },
  { value: '3', label: 'Lokalizacje', count: { end: 3, suffix: '' } },
  { value: '2', label: 'Punkty z obsługą klienta', count: { end: 2, suffix: '' } },
  { value: 'Kryłów', label: 'Zakład produkcyjny', valueClass: 'font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-g-gold font-bold' },
];

const checks = [
  'Doświadczenie zdobywane od 1988 roku',
  'Nagrobki, grobowce i renowacje',
  'Indywidualne podejście do każdego zlecenia',
  'Terminowość i rzetelność',
  'Obsługa Hrubieszów, Kryłów i Dołhobyczów',
];

function CountedValue({ end, suffix }: { end: number; suffix: string }) {
  const { ref, display } = useCountUp(end, suffix);
  return <span ref={ref} className={VALUE_CLASS}>{display}</span>;
}

function StatItem({ value, label, count, valueClass }: Stat) {
  return (
    <div className="text-center" data-animate="fade-in">
      {count
        ? <CountedValue end={count.end} suffix={count.suffix} />
        : <span className={valueClass ?? VALUE_CLASS}>{value}</span>}
      <p className="font-inter text-base text-g-textLight mt-2">{label}</p>
    </div>
  );
}

export default function WhyUsSection() {
  return (
    <section data-reveal="off" className="bg-g-dark py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-white text-center tracking-wide">Dlaczego rodziny nam ufają?</h2>
        <p className="font-inter text-lg text-g-textMuted text-center mt-2">Od 1988 roku budujemy zaufanie jedną realizacją na raz</p>
        <div className="w-10 h-0.5 bg-g-gold mx-auto mt-4 mb-12" />
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
          {stats.map((s, i) => <StatItem key={i} {...s} />)}
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-x-12 gap-y-3 max-w-4xl mx-auto">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-3" data-animate="fade-in">
              <Check className="w-5 h-5 text-g-gold flex-shrink-0" />
              <span className="font-inter text-[17px] text-g-textLight">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
