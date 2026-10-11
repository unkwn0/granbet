import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GallerySection from './GallerySection';

vi.mock('yet-another-react-lightbox', () => ({
  default: ({ open, index, slides, carousel }: { open: boolean; index: number; slides: { src: string }[]; carousel: { preload: number } }) =>
    open ? <div data-testid="lightbox" data-index={index} data-count={slides.length} data-src={slides[index]?.src} data-preload={carousel.preload} /> : null,
}));

describe('Galeria A15', () => {
  it('zachowuje 15 unikalnych zdjęć w jawnej kolejności, osobny album i pełny lightbox', () => {
    render(<GallerySection />);
    const photos = screen.getAllByRole('button', { name: /^Powiększ zdjęcie:/ });
    const expected = ['01-kn079-sg124', '02-kn024-sg117', '03-kn019-sg009', '04-kn088-sg130', '05-kn017-sg116', '06-kn084-sg127', '07-kn060-sg113', '08-kn056', '09-kn077-sg122', '10-kn103-sg148', '11-kn085-sg128', '12-kn076-sg089', '13-kn023-sg135', '14-kn042-sg138', '15-kn069-sg103'];
    const sources = photos.map(button => button.querySelector('img')?.getAttribute('src'));
    expect(photos).toHaveLength(15);
    expect(new Set(sources).size).toBe(15);
    expected.forEach((name, i) => expect(sources[i]).toContain(`${name}.webp`));
    expect(screen.getAllByRole('link', { name: /album/i })).toHaveLength(2);
    photos.forEach((button, i) => {
      fireEvent.click(button);
      expect(screen.getByTestId('lightbox')).toHaveAttribute('data-index', String(i));
      expect(screen.getByTestId('lightbox')).toHaveAttribute('data-count', '15');
      expect(screen.getByTestId('lightbox')).toHaveAttribute('data-src', expect.stringContaining(`${expected[i]}.jpg`));
      expect(screen.getByTestId('lightbox')).toHaveAttribute('data-preload', '0');
      expect(button.querySelector('img')).toHaveAttribute('loading', 'lazy');
    });
  });

  it('rozwija dodatkowe zdjęcia z poprawnym aria-controls i aria-expanded', () => {
    render(<GallerySection />);
    const toggle = screen.getByRole('button', { name: 'Pokaż więcej' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'galeria-realizacje');
    const extra = document.querySelectorAll('[data-gallery-extra]');
    expect(extra).toHaveLength(9);
    extra.forEach(photo => expect(photo).toHaveClass('hidden', 'md:block'));
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    extra.forEach(photo => expect(photo).not.toHaveClass('hidden'));
  });
});