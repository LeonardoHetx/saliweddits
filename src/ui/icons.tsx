export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  );
}

export function ArrowIcon({ className, dir = "right" }: { className?: string; dir?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 32 12"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M0 6h31M26 1l5 5-5 5" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M8 1v14M1 8h14" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 2l12 12M14 2L2 14" />
    </svg>
  );
}
