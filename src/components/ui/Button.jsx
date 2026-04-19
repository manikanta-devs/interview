export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  children,
  className = "",
  ...props
}) {
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_12px_30px_rgba(124,58,237,0.28)] hover:shadow-[0_16px_36px_rgba(124,58,237,0.34)]",
    secondary:
      "border border-white/10 bg-white/5 text-slate-100 hover:border-violet-400/60 hover:bg-violet-500/10",
    ghost: "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
    danger:
      "bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-[0_12px_30px_rgba(244,63,94,0.24)] hover:shadow-[0_16px_36px_rgba(244,63,94,0.3)]",
  };

  const sizeStyles = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-sm",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-extrabold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="inline-block animate-spin">⟳</span> : null}
      {children}
    </button>
  );
}
