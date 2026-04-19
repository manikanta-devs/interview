/**
 * NexHire Premium Logo Component
 * Modern, AI-inspired design with gradient and geometric elements
 */

export function PremiumNexHireLogo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:drop-shadow-lg transition-all duration-300"
    >
      <defs>
        <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#5b6fff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="logoGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#5b6fff", stopOpacity: 0.8 }} />
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer Circle Background */}
      <circle cx="24" cy="24" r="23" fill="rgba(79, 70, 229, 0.05)" stroke="url(#logoGradient1)" strokeWidth="1.5" />

      {/* Main Shape - Geometric Hexagon */}
      <g filter="url(#logoGlow)">
        {/* Top Triangle */}
        <path
          d="M 24 8 L 32 16 L 28 24 Z"
          fill="url(#logoGradient1)"
          opacity="0.9"
        />

        {/* Right Triangle */}
        <path
          d="M 32 16 L 36 28 L 28 24 Z"
          fill="url(#logoGradient1)"
          opacity="0.8"
        />

        {/* Bottom Right Triangle */}
        <path
          d="M 36 28 L 28 36 L 20 28 Z"
          fill="url(#logoGradient2)"
          opacity="0.9"
        />

        {/* Bottom Left Triangle */}
        <path
          d="M 20 28 L 12 36 L 12 24 Z"
          fill="url(#logoGradient2)"
          opacity="0.8"
        />

        {/* Left Triangle */}
        <path
          d="M 12 24 L 12 16 L 20 20 Z"
          fill="url(#logoGradient1)"
          opacity="0.7"
        />

        {/* Top Left Triangle */}
        <path
          d="M 12 16 L 24 8 L 20 20 Z"
          fill="url(#logoGradient1)"
          opacity="0.85"
        />
      </g>

      {/* Center Circle - AI Core */}
      <circle cx="24" cy="24" r="6" fill="url(#logoGradient1)" opacity="0.6" />
      <circle cx="24" cy="24" r="4" fill="none" stroke="url(#logoGradient2)" strokeWidth="1" opacity="0.8" />

      {/* Inner Dot */}
      <circle cx="24" cy="24" r="2" fill="#06b6d4" opacity="0.9" />

      {/* Decorative Accent Lines */}
      <line x1="24" y1="12" x2="24" y2="6" stroke="url(#logoGradient1)" strokeWidth="1.5" opacity="0.5" />
      <line x1="35" y1="24" x2="40" y2="24" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="36" x2="24" y2="42" stroke="url(#logoGradient1)" strokeWidth="1.5" opacity="0.5" />
      <line x1="13" y1="24" x2="8" y2="24" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

// Export as standalone for use in other contexts
export function PremiumNexHireLogoLarge() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:drop-shadow-2xl transition-all duration-500"
    >
      <defs>
        <linearGradient id="logoGradientLarge1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#5b6fff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="logoGradientLarge2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#5b6fff", stopOpacity: 0.8 }} />
        </linearGradient>
        <filter id="logoGlowLarge">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer Circle Background */}
      <circle cx="24" cy="24" r="23" fill="rgba(79, 70, 229, 0.08)" stroke="url(#logoGradientLarge1)" strokeWidth="2" />

      {/* Main Shape - Geometric Hexagon */}
      <g filter="url(#logoGlowLarge)">
        <path d="M 24 8 L 32 16 L 28 24 Z" fill="url(#logoGradientLarge1)" opacity="0.9" />
        <path d="M 32 16 L 36 28 L 28 24 Z" fill="url(#logoGradientLarge1)" opacity="0.8" />
        <path d="M 36 28 L 28 36 L 20 28 Z" fill="url(#logoGradientLarge2)" opacity="0.9" />
        <path d="M 20 28 L 12 36 L 12 24 Z" fill="url(#logoGradientLarge2)" opacity="0.8" />
        <path d="M 12 24 L 12 16 L 20 20 Z" fill="url(#logoGradientLarge1)" opacity="0.7" />
        <path d="M 12 16 L 24 8 L 20 20 Z" fill="url(#logoGradientLarge1)" opacity="0.85" />
      </g>

      {/* Center Circle - AI Core */}
      <circle cx="24" cy="24" r="6" fill="url(#logoGradientLarge1)" opacity="0.6" />
      <circle cx="24" cy="24" r="4" fill="none" stroke="url(#logoGradientLarge2)" strokeWidth="1.5" opacity="0.8" />
      <circle cx="24" cy="24" r="2" fill="#06b6d4" opacity="0.9" />

      {/* Decorative Accent Lines */}
      <line x1="24" y1="12" x2="24" y2="6" stroke="url(#logoGradientLarge1)" strokeWidth="2" opacity="0.5" />
      <line x1="35" y1="24" x2="40" y2="24" stroke="url(#logoGradientLarge2)" strokeWidth="2" opacity="0.5" />
      <line x1="24" y1="36" x2="24" y2="42" stroke="url(#logoGradientLarge1)" strokeWidth="2" opacity="0.5" />
      <line x1="13" y1="24" x2="8" y2="24" stroke="url(#logoGradientLarge2)" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export default PremiumNexHireLogo;
