import { useId } from 'react';
import { border, bug, towns, ukraine, project } from '@/data/serviceAreaGeography';
import './ServiceAreaMap.css';

const path = (points: number[][]) => points.map((p, i) => {
  const [x, y] = project(p[0], p[1]);
  return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
}).join(' ');

export default function ServiceAreaMap() {
  const id = useId();
  return (
    <figure className="min-w-0 m-0 service-area-map">
      <svg viewBox="0 0 620 710" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="w-full h-auto bg-g-card border border-g-gold/40 rounded-lg">
        <title id={`${id}-title`}>Obszar działania GRANBET — mapa miejscowości</title>
        <desc id={`${id}-desc`}>Mapa wschodniej Lubelszczyzny z oddzielną granicą polsko-ukraińską i rzeką Bug. Złote punkty oznaczają zakład w Kryłowie, biuro w Hrubieszowie i ekspozycję w Dołhobyczowie. Kierunek do Lublina: północny zachód. Na telefonie widoczne są główne miejscowości; mapa nie wyznacza granicy dojazdu.</desc>
        <defs>
          <clipPath id={`${id}-clip`}><rect width="620" height="710" rx="8" /></clipPath>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
          {ukraine.map((ring, i) => <path key={`ua-${i}`} d={`${path(ring)} Z`} className="fill-g-warmAlt" />)}
          {bug.map((line, i) => <path key={`bug-${i}`} d={path(line)} className="service-map-river" />)}
          {border.map((line, i) => <path key={`border-${i}`} d={path(line)} className="service-map-border" />)}
          <text x="510" y="638" textAnchor="middle" className="service-map-country">UKRAINA</text>
          <g className="service-map-direction">
            <path d="M85 65 L40 30 M40 30 L43 46 M40 30 L56 32" fill="none" className="stroke-g-textDarkMuted" strokeWidth="2" />
            <text x="92" y="71" className="service-map-label">do Lublina ↖</text>
          </g>
          {towns.map((town) => {
            const [x, y] = project(town.lon, town.lat);
            return (
              <g key={town.name} data-town={town.name} data-lon={town.lon} data-lat={town.lat} className={town.mobile ? '' : 'service-map-desktop-only'}>
                <circle cx={x} cy={y} r={town.site ? 7 : town.major ? 4.5 : 3} className={town.site ? 'fill-g-gold stroke-g-textDark service-map-site' : 'fill-g-textDark'} strokeWidth={town.site ? 1.8 : 0} />
                <text x={x + town.dx} y={y + town.dy} textAnchor={town.anchor ?? 'start'} className={`service-map-label service-map-desktop-label ${town.major || town.site ? 'service-map-major' : ''}`}>{town.name}</text>
                {town.mobile && <text x={x + (town.mobileDx ?? town.dx)} y={y + (town.mobileDy ?? town.dy)} textAnchor={town.mobileAnchor ?? town.anchor ?? 'start'} className="service-map-label service-map-mobile-label service-map-major">{town.name}</text>}
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption className="font-inter text-sm text-g-textDarkMuted mt-3 leading-relaxed space-y-2">
        <p className="flex gap-2 items-start"><span aria-hidden="true" className="w-3 h-3 rounded-full bg-g-gold border border-g-textDark shrink-0 mt-1.5" />Zakład Kryłów · biuro Hrubieszów · ekspozycja Dołhobyczów</p>
        <p className="flex gap-2 items-start"><span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-g-textDark shrink-0 mt-2" />Przykładowe miejscowości — dojeżdżamy także poza pokazany obszar</p>
        <p className="text-xs pt-2 border-t border-g-gold/30">Granica: linia przerywana · Bug: linia niebieska.<br />Dane mapy: <a href="https://www.naturalearthdata.com/about/terms-of-use/" className="underline underline-offset-2">Natural Earth</a> (domena publiczna), <a href="https://www.geonames.org/" className="underline underline-offset-2">GeoNames</a> (CC BY 4.0).</p>
      </figcaption>
      <p className="sr-only">Miejscowości na pełnej mapie: {towns.map(t => t.name).join(', ')}. Wszystkie pokazane miejscowości znajdują się w Polsce. Dojeżdżamy również poza pokazany obszar.</p>
    </figure>
  );
}