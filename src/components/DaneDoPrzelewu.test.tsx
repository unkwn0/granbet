import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import DaneDoPrzelewu from './DaneDoPrzelewu';
import { daneDoPrzelewu, formatujRachunek } from '@/data/przelew';

const ustawSchowek = (writeText: (t: string) => Promise<void>) =>
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

describe('DaneDoPrzelewu', () => {
  afterEach(() => vi.restoreAllMocks());

  it('wyświetla numer z tego samego źródła, w grupach', () => {
    render(<DaneDoPrzelewu />);
    expect(screen.getByText(formatujRachunek(daneDoPrzelewu.rachunek))).toBeInTheDocument();
    expect(formatujRachunek('13156011956407153420040001')).toBe('13 1560 1195 6407 1534 2004 0001');
  });

  it('kopiuje sam numer bez spacji i ogłasza sukces', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    ustawSchowek(writeText);
    render(<DaneDoPrzelewu />);
    fireEvent.click(screen.getByRole('button', { name: 'Kopiuj numer konta' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Numer konta skopiowany'));
    expect(writeText).toHaveBeenCalledWith(daneDoPrzelewu.rachunek);
    expect(writeText.mock.calls[0][0]).toMatch(/^\d{26}$/);
  });

  it('nie pokazuje sukcesu, gdy kopiowanie się nie uda', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('odmowa'));
    ustawSchowek(writeText);
    render(<DaneDoPrzelewu />);
    fireEvent.click(screen.getByRole('button', { name: 'Kopiuj numer konta' }));
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(screen.getByRole('status')).toHaveTextContent('');
  });
});
