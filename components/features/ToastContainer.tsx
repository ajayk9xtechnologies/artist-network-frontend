"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { Toast, ToastPosition } from "@/hooks/useToast"

const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M5 9.5L7.5 12L13 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M6 6L12 12M12 6L6 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M9 5.5V9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="12.5" r="1" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M9 8V13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="5.5" r="1" fill="currentColor" />
    </svg>
  ),
}

const COLORS: Record<string, { accent: string; bar: string }> = {
  success: { accent: "#22c55e", bar: "#16a34a" },
  error:   { accent: "#ef4444", bar: "#dc2626" },
  warning: { accent: "#f59e0b", bar: "#d97706" },
  info:    { accent: "#3b82f6", bar: "#2563eb" },
}

const POSITION_STYLES: Record<ToastPosition, React.CSSProperties> = {
  "top-left":      { top: 20, left: 20, alignItems: "flex-start" },
  "top-center":    { top: 20, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
  "top-right":     { top: 20, right: 20, alignItems: "flex-end" },
  "bottom-left":   { bottom: 20, left: 20, alignItems: "flex-start" },
  "bottom-center": { bottom: 20, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
  "bottom-right":  { bottom: 20, right: 20, alignItems: "flex-end" },
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast
  onDismiss: (id: string) => void
}) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const color = COLORS[toast.type]
  const duration = toast.duration ?? 4000

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))

    if (duration > 0) {
      const step = 100 / (duration / 50)
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p <= 0) {
            clearInterval(intervalRef.current!)
            return 0
          }
          return p - step
        })
      }, 50)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [duration])

  const handleDismiss = () => {
    setVisible(false)
    setTimeout(() => onDismiss(toast.id), 350)
  }

  const isBottom = toast.position?.startsWith("bottom")

  return (
    <div
      onClick={handleDismiss}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "14px 16px 14px 14px",
        minWidth: "300px",
        maxWidth: "380px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.4), 0 20px 40px -8px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : `translateY(${isBottom ? "12px" : "-12px"}) scale(0.96)`,
        transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: color.bar,
          borderRadius: "12px 0 0 12px",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: color.accent,
          opacity: 0.06,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          color: color.accent,
          flexShrink: 0,
          marginTop: "1px",
          marginLeft: "6px",
        }}
      >
        {ICONS[toast.type]}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: "13.5px",
            fontWeight: 600,
            color: "#f1f1f1",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p
            style={{
              margin: "3px 0 0",
              fontSize: "12.5px",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.4,
            }}
          >
            {toast.message}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleDismiss()
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.3)",
          padding: "0",
          lineHeight: 1,
          fontSize: "16px",
          flexShrink: 0,
          marginTop: "1px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")
        }
      >
        ✕
      </button>

      {/* Progress bar */}
      {duration > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color.bar}, ${color.accent})`,
            transition: "width 0.05s linear",
            borderRadius: "0 0 12px 12px",
          }}
        />
      )}
    </div>
  )
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[]
  onDismiss: (id: string) => void
}) {
  // Guard against server-side rendering where `document` is not available
  if (typeof document === "undefined") {
    return null
  }

  // Group by position
  const grouped = toasts.reduce<Record<ToastPosition, Toast[]>>(
    (acc, toast) => {
      const pos = toast.position ?? "top-right"
      if (!acc[pos]) acc[pos] = []
      acc[pos].push(toast)
      return acc
    },
    {} as Record<ToastPosition, Toast[]>
  )

  return createPortal(
    <>
       
      {(Object.entries(grouped) as [ToastPosition, Toast[]][]).map(
        ([position, posToasts]) => (
          <div
            key={position}
            style={{
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              flexDirection: position.startsWith("bottom") ? "column-reverse" : "column",
              gap: "10px",
              pointerEvents: "none",
              ...POSITION_STYLES[position],
            }}
          >
            {posToasts.map((toast) => (
              <div key={toast.id} style={{ pointerEvents: "auto" }}>
                <ToastItem toast={toast} onDismiss={onDismiss} />
              </div>
            ))}
          </div>
        )
      )}
    </>,
    document.body
  )
}
