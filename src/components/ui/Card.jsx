export function Card({
  children,
  className = "",
  glass = false,
  interactive = false,
  ...props
}) {
  return (
    <div
      className={`rounded-2xl border shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition ${glass ? "border-white/10 bg-white/5 backdrop-blur-xl" : "border-white/8 bg-slate-950/80"} ${interactive ? "hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-[0_24px_70px_rgba(124,58,237,0.18)]" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      className={`border-b border-white/8 pb-4 mb-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      className={`border-t border-white/8 pt-6 mt-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
