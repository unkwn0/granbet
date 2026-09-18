import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

afterEach(cleanup);

it('presents labelled phone actions before all three locations and preserves contact data', () => {
  render(<><ContactSection /><FooterSection /></>);
  const contact = screen.getByRole('region', { name: 'Kontakt' });
  const krylow = within(contact).getByRole('link', { name: 'Kryłów — zakład 502 480 543' });
  const hrubieszow = within(contact).getByRole('link', { name: 'Hrubieszów — biuro 697 994 924' });
  expect(krylow).toHaveAttribute('href', 'tel:+48502480543');
  expect(hrubieszow).toHaveAttribute('href', 'tel:+48697994924');
  const locations = document.getElementById('lokalizacje')!;
  expect(krylow.compareDocumentPosition(locations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(hrubieszow.compareDocumentPosition(locations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(within(locations).getAllByRole('heading', { level: 3 })).toHaveLength(3);
  expect(within(locations).getAllByRole('link', { name: 'Zobacz na mapie →' })).toHaveLength(3);
  expect(within(contact).getAllByRole('link', { name: 'granbet@vp.pl' })).toHaveLength(1);
  expect(screen.getAllByText(/7:00–17:00/)).toHaveLength(1);
  expect(screen.getAllByText(/8:00–17:00/)).toHaveLength(1);
  expect(screen.getByRole('link', { name: 'Godziny i dojazd' })).toHaveAttribute('href', '#lokalizacje');
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
