import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import FaqSection from './FaqSection';
import { faqs } from '@/data/faq';

afterEach(cleanup);

it('connects heading buttons to stable panels and exposes only the open answer', () => {
  render(<FaqSection />);
  const headings = screen.getAllByRole('heading', { level: 3 });
  const buttons = headings.map(heading => within(heading).getByRole('button'));
  const panelIds = buttons.map(button => button.getAttribute('aria-controls'));
  expect(new Set(panelIds).size).toBe(faqs.length);
  buttons.forEach((button, i) => {
    const panelId = panelIds[i];
    expect(panelId).toBeTruthy();
    const panel = panelId ? document.getElementById(panelId) : null;
    expect(panel).toHaveAttribute('aria-labelledby', button.id);
    expect(panel).toHaveTextContent(faqs[i].a);
    expect(button).toHaveAttribute('aria-expanded', String(i === 0));
    expect(panel).toHaveAttribute('aria-hidden', String(i !== 0));
  });
  expect(screen.getAllByRole('region')).toHaveLength(2);
  fireEvent.click(buttons[1]);
  expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  expect(screen.queryByRole('region', { name: faqs[0].q })).not.toBeInTheDocument();
  expect(screen.getByRole('region', { name: faqs[1].q })).toBeInTheDocument();
  fireEvent.click(buttons[1]);
  expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getAllByRole('region')).toHaveLength(1);
  expect(buttons.map(button => button.getAttribute('aria-controls'))).toEqual(panelIds);
});