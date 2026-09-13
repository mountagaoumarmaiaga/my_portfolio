/**
 * The badge at the head of the navbar: a globe reduced to a meridian, an equator
 * and one green point. It is the whole site in 36 pixels, and it matches the
 * favicon so a pinned tab and the header agree.
 */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="brand-mark-face" cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#16202f" />
          <stop offset="100%" stopColor="#080b11" />
        </radialGradient>
      </defs>

      <circle cx="20" cy="20" r="18.5" fill="url(#brand-mark-face)" />
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="rgba(255,255,255,0.16)" />

      {/* Equator and two meridians — enough curvature to read as a sphere. */}
      <g fill="none" stroke="rgba(134,188,255,0.30)" strokeWidth="0.9">
        <path d="M2.4 20h35.2" />
        <ellipse cx="20" cy="20" rx="8" ry="18.5" />
        <path d="M5.6 11.2c4 2 9 3.1 14.4 3.1s10.4-1.1 14.4-3.1" />
        <path d="M5.6 28.8c4-2 9-3.1 14.4-3.1s10.4 1.1 14.4 3.1" />
      </g>

      {/* Bamako. Same point the hero flies to. */}
      <circle cx="14.6" cy="23.4" r="4.2" fill="#14B45C" opacity="0.22" />
      <circle cx="14.6" cy="23.4" r="1.9" fill="#3BD47F" />
    </svg>
  );
}
