import React, { useState, useEffect } from 'react';
import { Flame, ImageOff } from 'lucide-react';

export interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
  showSkeleton?: boolean;
}

export const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80';

/**
 * Reusable and resilient AppImage component.
 * - Handles lazy loading by default (eager if priority=true)
 * - Shows smooth skeleton shimmer while loading
 * - Recovers from broken URLs using fallbackSrc or DEFAULT_FALLBACK_IMAGE
 * - Provides an elegant branded placeholder if all image sources fail
 * - Passes referrerPolicy="no-referrer" for external asset compatibility
 */
export const AppImage: React.FC<AppImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  className = '',
  containerClassName = '',
  priority = false,
  aspectRatio,
  showSkeleton = true,
  ...restProps
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  // Sync state if incoming src changes
  useEffect(() => {
    if (src) {
      setCurrentSrc(src);
      setHasError(false);
      setTriedFallback(false);
      setIsLoading(true);
    } else {
      setCurrentSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClassName} ${
        aspectRatio ? aspectRatio : 'w-full h-full'
      }`}
    >
      {/* Loading Skeleton */}
      {showSkeleton && isLoading && !hasError && (
        <div className="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-800 animate-pulse flex items-center justify-center z-10">
          <Flame className="w-6 h-6 text-neutral-400/50 animate-bounce" />
        </div>
      )}

      {/* Fallback branded box if image failed completely */}
      {hasError ? (
        <div className="w-full h-full min-h-[140px] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex flex-col items-center justify-center p-4 text-center text-neutral-400 space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-[#D62828]">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xs font-heading font-black text-neutral-300 line-clamp-1 max-w-[200px]">
            {alt || 'Brasas del Sabor'}
          </span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
            Pollería & Brasas
          </span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...restProps}
        />
      )}
    </div>
  );
};
