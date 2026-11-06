/**
 * Alba Medical brand mark: a bold "A" monogram whose crossbar is an ECG trace.
 * Uses currentColor so it can sit on the teal badge, on white, or on a dark footer.
 */
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5.4 26.2 16 5.9l10.6 20.3"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 20.6h4.7l1.7-3.1 2.2 6 1.6-2.9h5.4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
