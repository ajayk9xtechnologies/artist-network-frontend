import type { Metadata } from "next"

import OfflineFallback from "@/components/offline/OfflineFallback"

export const metadata: Metadata = {
  title: "Offline",
}

export default function OfflinePage() {
  return <OfflineFallback />
}

