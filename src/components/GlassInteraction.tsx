import React, { useEffect } from 'react';

/**
 * Global Water-Glass & Specular Lighting Interaction Engine
 * Automatically tracks cursor/touch coordinates across all interactive cards,
 * buttons, and glass icon surfaces, and injects localized water-glass ripples on press.
 */
export const GlassInteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // 1. Mouse Tracking for Specular Light Reflection
    const handlePointerMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        '.ios-card, .touch-target, .glass-icon-container, button, [role="button"]'
      ) as HTMLElement | null;

      if (target) {
        const rect = target.getBoundingClientRect();
        const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
        const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
        target.style.setProperty('--mouse-x', x);
        target.style.setProperty('--mouse-y', y);
      }
    };

    // 2. Localized Water-Glass Ripple Wave Generator
    const handlePointerDown = (e: PointerEvent) => {
      const interactiveEl = (e.target as HTMLElement)?.closest(
        '.ios-card, .touch-target, .glass-icon-container, .btn-press, button, [role="button"]'
      ) as HTMLElement | null;

      if (!interactiveEl) return;

      const rect = interactiveEl.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'water-ripple-wave';

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      interactiveEl.appendChild(ripple);

      // Clean up after wave expansion & surface tension damping completes
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 700);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return <>{children}</>;
};
