import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Header from './Header';

afterEach(cleanup);

describe('mobile navigation', () => {
  it('opens an accessible modal, focuses close, and restores focus on Escape', async () => {
    render(<Header />);
    const trigger = screen.getByRole('button', { name: 'Otwórz menu' });
    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Menu nawigacyjne' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    expect(screen.getByRole('button', { name: 'Zamknij menu' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.body).not.toHaveAttribute('data-scroll-locked');
  });

  it('keeps focus inside the modal and closes after choosing a section', async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: 'Otwórz menu' }));
    const dialog = screen.getByRole('dialog');
    const links = dialog.querySelectorAll('a');
    const phone = links[links.length - 1];
    expect(phone).toHaveAttribute('href', 'tel:+48502480543');
    phone.focus();
    fireEvent.keyDown(phone, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Zamknij menu' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: 'Tab', shiftKey: true });
    expect(phone).toHaveFocus();
    fireEvent.click(screen.getByRole('link', { name: 'Kontakt' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
