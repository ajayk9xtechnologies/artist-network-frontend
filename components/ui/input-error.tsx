"use client";

type InputErrorProps = {
  message?: string | null;
};

export default function InputError({ message }: InputErrorProps) {
  if (!message) return null;

  return <p className="text-xs text-red-500">{message}</p>;
}

