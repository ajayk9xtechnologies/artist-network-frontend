"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, required, name, ...props }, ref) => {
    return (
      <input
        type={type} required={required} name={name}
        className={cn("rounded-sm h-12 px-3 py-3 w-full bg-secondary border placeholder:text-muted-foreground", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
