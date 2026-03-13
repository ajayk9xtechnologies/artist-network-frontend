"use client";

interface FormErrorProps {
  message?: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="rounded-sm border border-red-500 bg-red-500/10 px-3 py-2 text-xs text-red-500">
      {message}
    </div>
  );
}

