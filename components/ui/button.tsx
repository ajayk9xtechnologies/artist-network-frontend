"use client"

export default function Button({ children, className, onClick, type, disabled }: { children: React.ReactNode, className?: string | undefined, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  return (
    <button type={type} disabled={disabled} className={`inline-flex items-center justify-center whitespace-nowrap bg-primary py-2 rounded-xl ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}