/**
 * Shared background / overlay components used across CourseCatalog
 * and in-course pages for visual consistency.
 */

/** Fixed SVG noise overlay rendered once on screen */
export function NoiseOverlay() {
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-[0.035]">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/** Three animated gradient blobs. Accepts className for positioning overrides. */
export function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] animate-[meshFloat1_12s_ease-in-out_infinite]"
        style={{ background: 'var(--color-primary)', top: '-10%', left: '-5%' }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] animate-[meshFloat2_14s_ease-in-out_infinite]"
        style={{ background: 'var(--color-primary-hover)', top: '20%', right: '-8%' }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-[100px] animate-[meshFloat3_10s_ease-in-out_infinite]"
        style={{ background: 'var(--color-accent)', bottom: '-15%', left: '30%' }}
      />
    </div>
  );
}

/** Topographic contour-line pattern background */
export function TopographicBg({ className = '' }: { className?: string }) {
  return (
    <>
      <div className={`absolute inset-0 -z-10 bg-surface/30 ${className}`} aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, var(--color-primary) 40px, var(--color-primary) 41px, transparent 41px, transparent 80px),
            repeating-radial-gradient(circle at 30% 70%, transparent 0, transparent 60px, var(--color-primary) 60px, var(--color-primary) 61px, transparent 61px, transparent 120px),
            repeating-radial-gradient(circle at 70% 30%, transparent 0, transparent 50px, var(--color-primary) 50px, var(--color-primary) 51px, transparent 51px, transparent 100px)
          `,
        }}
      />
    </>
  );
}
