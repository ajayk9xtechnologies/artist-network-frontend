import Image from "next/image";
import { Login } from "@/components/features/login";

export default function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-3.5rem)] w-full grid-cols-1 lg:grid-cols-2">
      {/* Left: hero image (col-6) – shadow follows PNG shape, not a square */}
      <div className="relative flex min-h-[40vh] items-center justify-center bg-muted/30 lg:min-h-full">
        <div className="relative h-full min-h-[40vh] w-full lg:min-h-0">
          <Image
            src="/images/hero.png"
            alt="Hero"
            fill
            className="object-contain object-center [filter:drop-shadow(0_25px_50px_rgba(220,38,38,0.4))]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 py-12 lg:px-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-md sm:text-4xl lg:text-5xl">
            Connect with artists. Share your work.
          </h1>
        </div>
      </div>
      {/* Right: login (col-6) */}
      <div className="flex flex-col bg-background">
        <Login />
      </div>
    </section>
  );
}
