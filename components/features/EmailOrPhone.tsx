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
      <div className="flex items-center rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-black">  
      {/* Hidden input carries the real submitted value */}
      <input type="hidden" name={name} value={combinedValue} required={true}/>

      {/* Country code selector — only visible in phone mode */}
      {isPhoneMode && (
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)} required={true}
          className="w-17 h-12 border-gray-300 py-2 text-sm focus:outline-none bg-secondary"
        >
          {countryCodes.map((c) => (
            <option key={c.iso2} value={c.dialCode}>
              {c.iso2} {c.dialCode}
            </option>
          ))}
        </select>
      )}

      {/* Visible input (uncontrolled display value) */}
      <input
        type="text"
        inputMode={isPhoneMode ? "tel" : "email"}
        placeholder="Email or phone number" required={true}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=" h-12 px-3 py-3 w-full bg-secondary border placeholder:text-muted-foreground"
      />
    </div>
    </>
  );
}