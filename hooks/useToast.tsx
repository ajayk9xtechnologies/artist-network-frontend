import { useState, useCallback, useRef } from "react"

export type ToastType = "success" | "error" | "info" | "warning"
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  position?: ToastPosition
}

export interface ToastOptions {
  title: string
  message?: string
  duration?: number
  position?: ToastPosition
}

export function useToast(defaultPosition: ToastPosition = "top-right") {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeouts = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timeout = timeouts.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeouts.current.delete(id)
    }
  }, [])

  const show = useCallback(
    (type: ToastType, options: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const duration = options.duration ?? 4000
      const position = options.position ?? defaultPosition

      const toast: Toast = { id, type, duration, position, ...options }
      setToasts((prev) => [...prev, toast])

      if (duration > 0) {
        const timeout = setTimeout(() => dismiss(id), duration)
        timeouts.current.set(id, timeout)
      }

      return id
    },
    [defaultPosition, dismiss]
  )

  const success = useCallback(
    (options: ToastOptions) => show("success", options),
    [show]
  )
  const error = useCallback(
    (options: ToastOptions) => show("error", options),
    [show]
  )
  const info = useCallback(
    (options: ToastOptions) => show("info", options),
    [show]
  )
  const warning = useCallback(
    (options: ToastOptions) => show("warning", options),
    [show]
  )

  return { toasts, success, error, info, warning, dismiss }
}