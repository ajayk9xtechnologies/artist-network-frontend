import Link from "next/link"

export default function OfflineFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-bold">No Internet Connection</h1>
        <p className="mt-3 text-muted-foreground">
          Please check your network. If you are on a slow connection (2G), switching to Wi‑Fi is recommended.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <button
            className="w-full rounded-xl border border-border bg-background px-4 py-3 font-semibold hover:bg-muted transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>

          <Link
            href="/"
            className="w-full text-center rounded-xl bg-primary text-primary-foreground px-4 py-3 font-semibold hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

