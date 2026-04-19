export function Input({
  label,
  error,
  errorMessage,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400"
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <input
        className={`app-input ${error ? "border-rose-400/70 focus:border-rose-400" : ""} ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <span className="text-sm text-rose-300">{errorMessage}</span>
      )}
    </div>
  );
}

export function Textarea({
  label,
  error,
  errorMessage,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400"
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <textarea
        className={`app-textarea ${error ? "border-rose-400/70 focus:border-rose-400" : ""} ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <span className="text-sm text-rose-300">{errorMessage}</span>
      )}
    </div>
  );
}
