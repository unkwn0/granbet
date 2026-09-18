import { useEffect } from 'react';

export function useFadeIn() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const elements = Array.from(document.querySelectorAll('[data-animate="fade-in"]'))
      .filter(el => !el.closest('[data-reveal="off"], #faq, #kontakt, #galeria'));

    if (!('IntersectionObserver' in window)) return;
    const animations = new Set<Animation>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (motion.matches || !entry.target.animate) return;
            // No inline transform or transition: hover styles take over after the reveal.
            const animation = entry.target.animate(
              [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
              { duration: 300, easing: 'ease-out', fill: 'none' }
            );
            animations.add(animation);
            animation.onfinish = () => {
              animation.cancel();
              animations.delete(animation);
            };
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
    const stopMotion = () => {
      if (motion.matches) {
        animations.forEach(animation => animation.cancel());
        animations.clear();
      }
    };
    motion.addEventListener('change', stopMotion);

    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      motion.removeEventListener('change', stopMotion);
    };
  }, []);
}
