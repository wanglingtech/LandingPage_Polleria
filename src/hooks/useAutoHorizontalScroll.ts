import { RefObject, useCallback, useEffect, useRef } from 'react';

interface AutoHorizontalScrollOptions {
  enabled?: boolean;
  speed?: number;
  resetDelay?: number;
  pauseAfterInteraction?: number;
}

export const useAutoHorizontalScroll = (
  ref: RefObject<HTMLElement | null>,
  {
    enabled = true,
    speed = 0.35,
    resetDelay = 900,
    pauseAfterInteraction = 2600,
  }: AutoHorizontalScrollOptions = {}
) => {
  const pauseUntilRef = useRef(0);
  const isPointerDownRef = useRef(false);

  const pauseTemporarily = useCallback(
    (duration = pauseAfterInteraction) => {
      pauseUntilRef.current = performance.now() + duration;
    },
    [pauseAfterInteraction]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let animationFrame = 0;
    let resetTimer: number | undefined;

    const getMaxScroll = () => Math.max(0, element.scrollWidth - element.clientWidth);

    const animate = (now: number) => {
      const maxScroll = getMaxScroll();

      if (maxScroll > 1 && !isPointerDownRef.current && now >= pauseUntilRef.current) {
        if (element.scrollLeft >= maxScroll - 1) {
          pauseUntilRef.current = now + resetDelay + pauseAfterInteraction;

          if (!resetTimer) {
            resetTimer = window.setTimeout(() => {
              element.scrollTo({ left: 0, behavior: 'smooth' });
              resetTimer = undefined;
            }, resetDelay);
          }
        } else if (!resetTimer) {
          element.scrollLeft = Math.min(maxScroll, element.scrollLeft + speed);
        }
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerDown = () => {
      isPointerDownRef.current = true;
      pauseTemporarily();
    };
    const handlePointerUp = () => {
      isPointerDownRef.current = false;
      pauseTemporarily();
    };
    const handleInteraction = () => pauseTemporarily();

    element.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    element.addEventListener('mouseenter', handleInteraction, { passive: true });
    element.addEventListener('focusin', handleInteraction);
    element.addEventListener('wheel', handleInteraction, { passive: true });
    element.addEventListener('touchmove', handleInteraction, { passive: true });

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (resetTimer) window.clearTimeout(resetTimer);
      element.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('mouseenter', handleInteraction);
      element.removeEventListener('focusin', handleInteraction);
      element.removeEventListener('wheel', handleInteraction);
      element.removeEventListener('touchmove', handleInteraction);
    };
  }, [enabled, pauseAfterInteraction, pauseTemporarily, ref, resetDelay, speed]);

  return { pauseTemporarily };
};
