import { useEffect, useState } from 'react';

const periods = [
  { id: 'summer', name: 'Kwiecień – październik', weekdays: 'Pon–Pt 8:00–17:00', saturday: 'Sob 9:00–15:00' },
  { id: 'winter', name: 'Listopad – marzec', weekdays: 'Pon–Pt 8:00–15:00', note: '(po uzgodnieniu tel.)', saturday: 'Sob nieczynne' },
] as const;

export default function OfficeSeasonalHours() {
  const [currentPeriod, setCurrentPeriod] = useState<'summer' | 'winter' | null>(null);

  useEffect(() => {
    try {
      const month = Number(new Intl.DateTimeFormat('en-US', {
        month: 'numeric', timeZone: 'Europe/Warsaw',
      }).format(new Date()));
      if (month >= 1 && month <= 12) {
        setCurrentPeriod(month >= 4 && month <= 10 ? 'summer' : 'winter');
      }
    } catch {
      // Both schedules remain readable when timezone formatting is unavailable.
    }
  }, []);

  return (
    <div className="min-w-0 text-g-textDark">
      <div className="space-y-1">
        {periods.map((period) => (
          <div key={period.id} role="group" aria-label={period.name}
            className={`px-2 py-1 rounded-sm ${currentPeriod === period.id ? 'bg-g-gold/10' : ''}`}>
            <p className="flex flex-wrap items-baseline gap-x-2 font-semibold">
              <span>{period.name}</span>
              {currentPeriod === period.id && <>{' '}<span className="text-xs font-medium border border-g-goldSoft rounded-sm px-1.5 leading-5">Aktualny okres</span></>}
            </p>
            <p>
              <span className="whitespace-nowrap">{period.weekdays}</span>
              {'note' in period && <> {period.note}</>}
              {' '}<span className="whitespace-nowrap">· {period.saturday}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}