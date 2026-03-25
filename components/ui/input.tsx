"use client"

import * as React from "react"
 
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, required, name, label, ...props }, ref) => {

    // ✅ auto validation rules based on type
    const validationProps: React.InputHTMLAttributes<HTMLInputElement> = {}

    if (type === "email") {
      validationProps.pattern = "[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$"
      validationProps.title = "Please include @ in the email address"
    }

    // Support both `type="tel"` and `type="phone"` usage in the app.
    if (type === "tel" || type === "phone" || name === "phone") {
      validationProps.pattern = "^\\+?[0-9\\s\\-]{7,15}$"
      validationProps.title = "Enter a valid phone number"
    }

    if (type === "password") {
      validationProps.minLength = 8
      validationProps.title = "Password must be at least 8 characters"
    }

    return (
      <>
        {label ? (
          <label className="text-sm font-semibold text-foreground">
            {label}
            {required ? <span className="text-red-500"> *</span> : null}
          </label>
        ) : null}

        <input
          type={type}
          required={required}
          name={name}
          ref={ref}
          {...validationProps} // ✅ apply validation
          {...props} // ✅ props last so user can override
          className={`${className} border border-border rounded-sm h-12 px-3 py-3 w-full bg-secondary placeholder:text-muted-foreground mt-2`}
        />
      </>
    )
  }
)

Input.displayName = "Input"
export default Input
 