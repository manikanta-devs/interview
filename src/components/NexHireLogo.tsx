/**
 * NexHire Unique Logo Component
 * Modern AI Interview Intelligence Platform Logo
 * Features: Gradient design, interactive hover effects
 */

interface NexHireLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export default function NexHireLogo({
  size = "md",
  className = "",
  animated = false,
}: NexHireLogoProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeMap[size]} ${className} transition-transform ${animated ? "hover:scale-110" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient
          id="nexhire-gradient-1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        <linearGradient
          id="nexhire-gradient-2"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        <filter id="nexhire-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Circle with gradient */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#nexhire-gradient-1)"
        opacity="0.1"
        strokeWidth="2"
        stroke="url(#nexhire-gradient-1)"
      />

      {/* Brain/AI Icon - Left Side */}
      <g filter="url(#nexhire-glow)">
        {/* Brain curves */}
        <path
          d="M 35 45 Q 30 40 30 35 Q 30 30 35 30 Q 40 30 40 35 Q 40 40 35 45"
          fill="url(#nexhire-gradient-1)"
          strokeWidth="1.5"
          stroke="#06b6d4"
        />
        <path
          d="M 35 45 Q 25 50 20 55 Q 15 60 20 65 Q 25 68 30 65 Q 32 62 35 60"
          fill="none"
          stroke="url(#nexhire-gradient-1)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* Microphone/Interview Icon - Right Side */}
      <g filter="url(#nexhire-glow)">
        {/* Microphone body */}
        <rect
          x="58"
          y="32"
          width="12"
          height="16"
          rx="6"
          fill="url(#nexhire-gradient-2)"
          stroke="#ec4899"
          strokeWidth="1"
        />
        {/* Microphone stand */}
        <path
          d="M 64 48 L 64 62"
          stroke="url(#nexhire-gradient-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Microphone base */}
        <circle
          cx="64"
          cy="65"
          r="5"
          fill="none"
          stroke="url(#nexhire-gradient-2)"
          strokeWidth="2"
        />
      </g>

      {/* Connection Lines - symbolizing AI communication */}
      <g
        opacity="0.6"
        stroke="url(#nexhire-gradient-1)"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M 45 42 L 55 48" />
        <path d="M 45 50 L 55 50" />
        <path d="M 45 58 L 55 52" />
      </g>

      {/* Center Pulse/Glow Circle */}
      <circle
        cx="50"
        cy="50"
        r="3"
        fill="url(#nexhire-gradient-1)"
        opacity="0.8"
      />

      {/* Animated pulse (optional) */}
      {animated && (
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="none"
          stroke="url(#nexhire-gradient-1)"
          strokeWidth="1"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            from="3"
            to="15"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.6"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Top accent - represents career growth */}
      <path
        d="M 45 20 L 50 15 L 55 20"
        fill="none"
        stroke="url(#nexhire-gradient-2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}
