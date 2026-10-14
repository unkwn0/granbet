import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';
import OfficeSeasonalHours from './OfficeSeasonalHours';
import { readFileSync } from 'node:fs';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it('presents labelled phone actions before all three locations and preserves contact data', () => {
  render(<><ContactSection /><FooterSection /></>);
  const contact = screen.getByRole('region', { name: 'Kontakt' });
  const krylow = within(contact).getByRole('link', { name: 'Kryłów — zakład 502 480 543' });
  const hrubieszow = within(contact).getByRole('link', { name: 'Hrubieszów — biuro 697 994 924' });
  expect(krylow).toHaveAttribute('href', 'tel:+48502480543');
  expect(hrubieszow).toHaveAttribute('href', 'tel:+48697994924');
  const locations = document.getElementById('lokalizacje');
  if (!locations) throw new Error('Missing locations');
  expect(krylow.compareDocumentPosition(locations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(hrubieszow.compareDocumentPosition(locations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(within(locations).getAllByRole('heading', { level: 3 })).toHaveLength(3);
  expect(within(locations).getAllByRole('link', { name: 'Zobacz na mapie →' })).toHaveLength(3);
  expect(within(contact).getAllByRole('link', { name: 'granbet@vp.pl' })).toHaveLength(1);
  expect(screen.getByText('Pon–Pt 7:00–15:00, Sob 7:00–13:00')).toBeVisible();
  expect(screen.getAllByText('W niedziele i święta nieczynne')).toHaveLength(2);
  expect(screen.queryByText(/7:00–17:00/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Sob 7:00–15:00/)).not.toBeInTheDocument();
  expect(screen.getAllByText(/8:00–17:00/)).toHaveLength(1);
  expect(screen.getByRole('link', { name: 'Godziny i dojazd' })).toHaveAttribute('href', '#lokalizacje');
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

it('declares the confirmed year-round Kryłów hours in LocalBusiness JSON-LD', () => {
  const source = readFileSync('src/pages/Index.tsx', 'utf8');
  const schemaText = source.match(/const localBusinessSchema = (\{[\s\S]*?\n\});/)?.[1];
  if (!schemaText) throw new Error('Missing LocalBusiness schema');
  const schema = JSON.parse(schemaText);
  expect(schema.address.addressLocality).toBe('Kryłów');
  expect(schema.openingHoursSpecification).toEqual([
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '15:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:00', closes: '13:00' },
  ]);
});

it('keeps both office schedules in a fixed order with the confirmed hours', () => {
  render(<ContactSection />);
  const summer = screen.getByRole('group', { name: 'Kwiecień – październik' });
  const winter = screen.getByRole('group', { name: 'Listopad – marzec' });
  expect(summer.compareDocumentPosition(winter) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(within(summer).getByText('Pon–Pt 8:00–17:00')).toBeVisible();
  expect(within(summer).getByText('Sob 9:00–15:00')).toBeVisible();
  expect(within(winter).getByText('Pon–Pt 8:00–15:00, po wcześniejszym uzgodnieniu telefonicznym')).toBeVisible();
  expect(within(winter).getByText('Sob nieczynne')).toBeVisible();
  expect(screen.getAllByText('W niedziele i święta nieczynne')).toHaveLength(2);
  expect(screen.queryByText(/Sob 8:00–15:00/)).not.toBeInTheDocument();
  expect(screen.queryByText('Otwarte teraz')).not.toBeInTheDocument();
});

it.each([
  ['2026-10-14T10:28:00Z', 'Kwiecień – październik', 'Listopad – marzec'],
  ['2026-11-14T10:28:00Z', 'Listopad – marzec', 'Kwiecień – październik'],
  ['2026-10-31T23:30:00Z', 'Listopad – marzec', 'Kwiecień – październik'],
  ['2026-03-31T22:30:00Z', 'Kwiecień – październik', 'Listopad – marzec'],
])('highlights Warsaw season at %s', (date, active, inactive) => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(date));
  render(<ContactSection />);
  const activeGroup = screen.getByRole('group', { name: active });
  const inactiveGroup = screen.getByRole('group', { name: inactive });
  expect(within(activeGroup).getByText('Aktualny okres')).toBeVisible();
  expect(activeGroup).toHaveClass('bg-g-gold/10');
  expect(within(inactiveGroup).queryByText('Aktualny okres')).not.toBeInTheDocument();
  expect(inactiveGroup).not.toHaveClass('bg-g-gold/10');
});

it('renders both schedules without a precomputed highlight', () => {
  const html = renderToString(<OfficeSeasonalHours />);
  expect(html).toContain('Kwiecień – październik');
  expect(html).toContain('Listopad – marzec');
  expect(html).not.toContain('Aktualny okres');
  expect(html).not.toContain('bg-g-gold/10');
});

it('keeps both schedules visible if Warsaw formatting fails', () => {
  vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => { throw new Error('Timezone unavailable'); });
  render(<OfficeSeasonalHours />);
  expect(screen.getByText('Sob 9:00–15:00')).toBeVisible();
  expect(screen.getByText('Sob nieczynne')).toBeVisible();
  expect(screen.queryByText('Aktualny okres')).not.toBeInTheDocument();
});
