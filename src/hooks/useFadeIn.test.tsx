import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useFadeIn } from './useFadeIn';

afterEach(() => { cleanup(); document.body.innerHTML = ''; vi.unstubAllGlobals(); });

it('uses explicit exclusions even when IDs are added and observes sections without IDs', () => {
  document.body.innerHTML = '<section id="hero" data-reveal="off"><div data-animate="fade-in" id="hero-content"></div></section><section id="trust" data-reveal="off"><div data-animate="fade-in"></div></section><section id="faq"><div data-animate="fade-in"></div></section><section id="kontakt"><div data-animate="fade-in"></div></section><section><div data-animate="fade-in" id="animated"></div></section>';
  const observe = vi.fn();
  const disconnect = vi.fn();
  vi.stubGlobal('IntersectionObserver', class { observe = observe; disconnect = disconnect; });
  const { unmount } = renderHook(useFadeIn);
  expect(observe).toHaveBeenCalledTimes(1);
  const animated = document.getElementById('animated')!;
  expect(observe).toHaveBeenCalledWith(animated);
  expect(animated).not.toHaveAttribute('style');
  for (const selector of ['#hero-content', '#faq div', '#kontakt div']) {
    expect(document.querySelector(selector)).not.toHaveAttribute('style');
  }
  unmount();
  expect(disconnect).toHaveBeenCalled();
  expect(animated.style.transform).toBe('');
});

it('releases the reveal animation after completion without overriding hover styles', () => {
  document.body.innerHTML = '<section><div data-animate="fade-in" id="card" class="hover:-translate-y-1"></div></section>';
  const card = document.getElementById('card')!;
  const animation = { cancel: vi.fn(), onfinish: null as null | (() => void) };
  const animate = vi.fn(() => animation);
  Object.defineProperty(card, 'animate', { value: animate });
  let onIntersect: (entries: { target: HTMLElement; isIntersecting: boolean }[]) => void;
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof onIntersect) { onIntersect = callback; }
    observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn();
  });
  renderHook(useFadeIn);
  onIntersect!([{ target: card, isIntersecting: true }]);
  expect(animate).toHaveBeenCalledWith(expect.any(Array), { duration: 300, easing: 'ease-out', fill: 'none' });
  animation.onfinish!();
  expect(animation.cancel).toHaveBeenCalledOnce();
  expect(card).not.toHaveAttribute('style');
  expect(card).toHaveClass('hover:-translate-y-1');
});
