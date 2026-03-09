"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, required, ...props }, ref) => {
    return (
      <input
        type={type} required={required} name={name ?? ""}
        className={cn(
          "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
