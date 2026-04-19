/**
 * NexHire Premium Logo Component
 * Hexagon + N design (lime colored)
 */

export function PremiumNexHireLogo() {
  return (
    <svg
      width="48"
      height="56"
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:drop-shadow-lg transition-all duration-300"
    >
      {/* Hexagon outline */}
      <polygon points="24,2 46,15 46,41 24,54 2,41 2,15" stroke="#c6ff00" strokeWidth="1.8" fill="none"/>
      
      {/* N shape lines */}
      <line x1="14" y1="40" x2="14" y2="16" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="14" y1="16" x2="34" y2="40" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="34" y1="40" x2="34" y2="16" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
      
      {/* Center accent dot */}
      <circle cx="24" cy="28" r="1.8" fill="#ff4500"/>
    </svg>
  );
}


// Export as standalone for use in other contexts
export function PremiumNexHireLogoLarge() {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:drop-shadow-2xl transition-all duration-500"
    >
      {/* Hexagon outline */}
      <polygon points="24,2 46,15 46,41 24,54 2,41 2,15" stroke="#c6ff00" strokeWidth="1.8" fill="none"/>
      
      {/* N shape lines */}
      <line x1="14" y1="40" x2="14" y2="16" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="14" y1="16" x2="34" y2="40" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="34" y1="40" x2="34" y2="16" stroke="#c6ff00" strokeWidth="2.8" strokeLinecap="round"/>
      
      {/* Center accent dot */}
      <circle cx="24" cy="28" r="1.8" fill="#ff4500"/>
    </svg>
  );
}

export default PremiumNexHireLogo;
