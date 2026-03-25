"use client"

import { useEffect, useMemo, useState } from "react"

import OfflineFallback from "@/components/offline/OfflineFallback"

function is2gOrSlow(): boolean {
  const conn = (navigator as any).connection
  const effectiveType = conn?.effectiveType
  return effectiveType === "slow-2g" || effectiveType === "2g"
}

export default function NetworkGuard({ children }: { children: React.ReactNode }) {
  const initialBlocked = useMemo(() => {
    if (typeof navigator === "undefined") return false
    return !navigator.onLine || is2gOrSlow()
  }, [])

  const [blocked, setBlocked] = useState(initialBlocked)

  useEffect(() => {
    function check() {
      const offline = !navigator.onLine
      const slow2g = is2gOrSlow()
      setBlocked(offline || slow2g)
    }

    check()

    window.addEventListener("online", check)
    window.addEventListener("offline", check)
    ;(navigator as any).connection?.addEventListener?.("change", check)

    return () => {
      window.removeEventListener("online", check)
      window.removeEventListener("offline", check)
      ;(navigator as any).connection?.removeEventListener?.("change", check)
    }
  }, [])

  if (blocked) return <OfflineFallback />
  return <>{children}</>
}

