"use client";

import { useState } from "react";
import { countryCodes } from "@/utils";


function isPhone(value: string) {
  return /^\+?[0-9]/.test(value); // starts with digit or +
}

export default function EmailOrPhoneField({ name }: { name: string}) {
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState<string>("+91");

  const isPhoneMode = isPhone(value);

  // What actually gets submitted: combined countryCode + number, or plain email
  const combinedValue = isPhoneMode
    ? `${countryCode}${value.replace(/^\+?\d*/, value)}` // strip any leading + the user typed
    : value;

  return (
    <>
      <div className="flex items-center rounded-md border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition">
  
  {/* Hidden input */}
  <input type="hidden" name={name} value={combinedValue} required />

  {/* Country code */}
  {isPhoneMode && (
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className="h-12 px-2 text-sm bg-secondary focus:outline-none border-none"
    >
      {countryCodes.map((c) => (
        <option key={c.iso2} value={c.dialCode}>
          {c.iso2} {c.dialCode}
        </option>
      ))}
    </select>
  )}

  {/* Input */}
  <input
    type="text"
    inputMode={isPhoneMode ? "tel" : "email"}
    placeholder="Email or phone number"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="h-12 px-3 w-full bg-secondary border-none focus:outline-none placeholder:text-muted-foreground"
  />
</div>
    </>
  );
}