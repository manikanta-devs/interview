export function Badge({
  variant = "default",
  children,
  className = "",
  icon = null,
  ...props
}) {
  const variantStyles = {
    default: "border-white/8 bg-white/5 text-slate-300",
    primary: "border-violet-400/30 bg-violet-500/12 text-violet-200",
    success: "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
    warning: "border-amber-400/30 bg-amber-500/12 text-amber-200",
    error: "border-rose-400/30 bg-rose-500/12 text-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon ? <span className="text-sm">{icon}</span> : null}
      {children}
    </span>
  );
}
