"use client"
 
export default function Button({ children, className, onClick, type, disabled }: { children: React.ReactNode, className?: string | undefined, onClick?: () => void, type?: "button" | "submit" | "reset", disabled?: boolean }) {
  return (
    <button type={type} disabled={disabled} 
    className={`inline-flex items-center justify-center whitespace-nowrap bg-primary text-white hover:bg-primary/90
    rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
    focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 py-4
     ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}