/**
 * Unified NexHire Logo Component
 * Single professional logo used throughout the entire app
 * Features: Dynamic arrow "N" design, gradient colors, responsive sizing, animations
 */

interface UnifiedLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
  showText?: boolean;
  textSize?: "sm" | "md" | "lg";
}

export function UnifiedLogo({
  size = "md",
  animated = false,
  className = "",
  showText = false,
  textSize = "md",
}: UnifiedLogoProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const containerClasses = showText
    ? "flex items-center gap-2"
    : `${sizeMap[size]}`;

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* SVG Logo - Dynamic Arrow "N" */}
      <svg
        viewBox="0 0 100 100"
        className={`${sizeMap[size]} transition-transform ${
          animated ? "hover:scale-110 hover:skew-y-6" : ""
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          {/* Main gradient: Blue → Cyan → Purple */}
          <linearGradient
            id="nexhire-unified-grad"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="nexhire-unified-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle with subtle gradient */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#nexhire-unified-grad)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Main arrow design - Dynamic N shape */}
        <g filter="url(#nexhire-unified-glow)">
          {/* Left vertical line */}
          <path
            d="M 25 70 L 25 25"
            stroke="url(#nexhire-unified-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right vertical line */}
          <path
            d="M 75 25 L 75 70"
            stroke="url(#nexhire-unified-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Diagonal connecting line - creates the N */}
          <path
            d="M 25 60 L 75 30"
            stroke="url(#nexhire-unified-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Arrow at top-right - indicates growth/upward trajectory */}
          <path
            d="M 70 15 L 85 15 L 75 30"
            fill="url(#nexhire-unified-grad)"
            opacity="0.9"
          />

          {/* Accent dot at intersection */}
          <circle cx="50" cy="45" r="2.5" fill="url(#nexhire-unified-grad)" opacity="0.7" />
        </g>
      </svg>

      {/* Text Logo */}
      {showText && (
        <div className={`flex flex-col leading-none ${textSizeMap[textSize]}`}>
          <span className="font-black tracking-tight text-white">
            Nex<span className="text-violet-300">Hire</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 leading-tight">
            AI Interview Intelligence
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Export aliases for compatibility
 */
export function NexHireLogo(props: UnifiedLogoProps) {
  return <UnifiedLogo {...props} />;
}

export function AppLogo(props: UnifiedLogoProps) {
  return <UnifiedLogo {...props} />;
}
