/**
 * LOGO OPTION 1: Tech Minimal - Interlocking Circles (Modern AI Design)
 */
export function LogoOption1({
  size = "md",
  animated = false,
}: {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}) {
  const sizeMap = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeMap[size]} transition-transform ${animated ? "hover:scale-110 hover:rotate-12" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="logo1-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="logo1-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle
        cx="35"
        cy="35"
        r="20"
        fill="none"
        stroke="url(#logo1-grad1)"
        strokeWidth="3"
        opacity="0.8"
      />
      <circle
        cx="65"
        cy="35"
        r="20"
        fill="none"
        stroke="url(#logo1-grad2)"
        strokeWidth="3"
        opacity="0.8"
      />
      <circle
        cx="50"
        cy="65"
        r="20"
        fill="none"
        stroke="url(#logo1-grad1)"
        strokeWidth="3"
        opacity="0.8"
      />
      <circle cx="50" cy="50" r="6" fill="url(#logo1-grad1)" />
    </svg>
  );
}

/**
 * LOGO OPTION 2: Bold Shield with AI Spark (Security + Intelligence)
 */
export function LogoOption2({
  size = "md",
  animated = false,
}: {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}) {
  const sizeMap = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeMap[size]} transition-transform ${animated ? "hover:scale-110 hover:-rotate-12" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="logo2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path
        d="M 50 15 L 75 30 L 75 55 Q 50 75 50 75 Q 25 75 25 55 L 25 30 Z"
        fill="url(#logo2-grad)"
        opacity="0.2"
        stroke="url(#logo2-grad)"
        strokeWidth="2.5"
      />
      <circle cx="42" cy="45" r="4" fill="url(#logo2-grad)" />
      <circle cx="58" cy="45" r="4" fill="url(#logo2-grad)" />
      <circle cx="50" cy="58" r="4" fill="url(#logo2-grad)" />
      <path
        d="M 50 15 L 55 20"
        stroke="url(#logo2-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * LOGO OPTION 3: Dynamic Arrow "N" (Growth + Professional)
 */
export function LogoOption3({
  size = "md",
  animated = false,
}: {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}) {
  const sizeMap = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeMap[size]} transition-transform ${animated ? "hover:scale-110 hover:skew-y-6" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="logo3-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M 25 70 L 25 25 L 35 35 M 75 25 L 75 70 L 65 60"
        stroke="url(#logo3-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 35 35 L 65 60"
        stroke="url(#logo3-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path d="M 70 15 L 85 15 L 75 30" fill="url(#logo3-grad)" />
    </svg>
  );
}

/**
 * LOGO OPTION 4: Interview Pulse (Conversation + Tech)
 */
export function LogoOption4({
  size = "md",
  animated = false,
}: {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}) {
  const sizeMap = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeMap[size]} transition-transform ${animated ? "hover:scale-110 hover:rotate-6" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <defs>
        <linearGradient id="logo4-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M 25 35 Q 25 25 35 25 L 65 25 Q 75 25 75 35 L 75 60 Q 75 70 65 75 L 45 85 L 50 75 Q 40 75 35 70 Q 25 65 25 55 Z"
        fill="url(#logo4-grad)"
        opacity="0.15"
        stroke="url(#logo4-grad)"
        strokeWidth="2.5"
      />
      <circle cx="35" cy="42" r="3" fill="url(#logo4-grad)" />
      <circle cx="50" cy="42" r="3" fill="url(#logo4-grad)" />
      <circle cx="65" cy="42" r="3" fill="url(#logo4-grad)" />
      <path
        d="M 60 55 Q 65 60 60 68"
        stroke="url(#logo4-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
