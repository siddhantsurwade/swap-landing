'use client';

import { useEffect, useRef, type FC } from 'react';

/**
 * ============================================================================
 * TUNABLE CONFIGURATION: 4 HERO PNG BLOB IMAGES
 * ============================================================================
 * Edit sizes, positions, offsets, and drift speeds easily here.
 */

interface BlobItemConfig {
  id: string;
  name: string;
  src: string;
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Responsive container classes (coordinates, widths per breakpoint, and visibility) */
  wrapperClassName: string;
  imgClassName: string;
  transformOrigin: string;
  animClass: string;
  duration: number; // in seconds (25s to 40s)
  delay: number;    // negative delay in seconds
  hideOnMobile?: boolean;
}

const BLOB_CONFIGS: BlobItemConfig[] = [
  {
    id: 'blob-1-top-left',
    name: 'Blob 1: Top-Left Corner Flush',
    src: '/images/blobs/blob-1-top-left.png',
    corner: 'top-left',
    // Flush to top-0 and left-0; ~38vw desktop (max 720px), ~62vw mobile
    wrapperClassName: 'absolute top-0 left-0 w-[62vw] sm:w-[48vw] lg:w-[38vw] max-w-[720px] pointer-events-none select-none',
    imgClassName: 'w-full h-auto block select-none pointer-events-none',
    transformOrigin: '0% 0%',
    animClass: 'animate-blob-drift-1',
    duration: 28,
    delay: -6
  },
  {
    id: 'blob-2-top-right',
    name: 'Blob 2: Top-Right / Upper-Middle Flush',
    src: '/images/blobs/blob-2-top-right.png',
    corner: 'top-right',
    // Upper-middle right edge, offset -2% past right edge to crop rounded corners; hidden on mobile (< sm)
    wrapperClassName: 'hidden sm:block absolute top-[6%] lg:top-[8%] -right-[2%] w-[80vw] sm:w-[60vw] lg:w-[48vw] max-w-[920px] pointer-events-none select-none',
    imgClassName: 'w-full h-auto block select-none pointer-events-none',
    transformOrigin: '100% 50%',
    animClass: 'animate-blob-drift-2',
    duration: 34,
    delay: -14,
    hideOnMobile: true
  },
  {
    id: 'blob-3-bottom-left',
    name: 'Blob 3: Bottom-Left Corner Flush',
    src: '/images/blobs/blob-3-bottom-left.png',
    corner: 'bottom-left',
    // Flush to bottom-0 and left-0; ~50vw desktop (max 960px), ~85vw mobile
    wrapperClassName: 'absolute bottom-0 left-0 w-[85vw] sm:w-[65vw] lg:w-[50vw] max-w-[960px] pointer-events-none select-none',
    imgClassName: 'w-full h-auto block select-none pointer-events-none',
    transformOrigin: '0% 100%',
    animClass: 'animate-blob-drift-3',
    duration: 30,
    delay: -10
  },
  {
    id: 'blob-4-bottom-right',
    name: 'Blob 4: Bottom-Right Corner Flush',
    src: '/images/blobs/blob-4-bottom-right.png',
    corner: 'bottom-right',
    // Bottom-0 right edge, offset -2% past right edge; smaller size on mobile (< sm)
    wrapperClassName: 'absolute bottom-0 -right-[2%] w-[58vw] sm:w-[44vw] max-w-[840px] pointer-events-none select-none',
    imgClassName: 'w-full h-auto block select-none pointer-events-none',
    transformOrigin: '100% 100%',
    animClass: 'animate-blob-drift-4',
    duration: 36,
    delay: -18
  }
];

export const BlobBackdrop: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.classList.remove('paused-blobs');
          } else {
            node.classList.add('paused-blobs');
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {BLOB_CONFIGS.map(blob => (
        <div
          key={blob.id}
          className={`${blob.wrapperClassName} ${blob.animClass} blob-animated`}
          style={{
            transformOrigin: blob.transformOrigin,
            animationDuration: `${blob.duration}s`,
            animationDelay: `${blob.delay}s`
          }}
        >
          <img
            src={blob.src}
            alt=""
            draggable={false}
            decoding="async"
            loading="eager"
            className={blob.imgClassName}
          />
        </div>
      ))}
    </div>
  );
};

export default BlobBackdrop;
