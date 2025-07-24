// components/Spinner.tsx
export const Spinner = ({ className }: { className?: string }) => (
  <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${className}`} />
);