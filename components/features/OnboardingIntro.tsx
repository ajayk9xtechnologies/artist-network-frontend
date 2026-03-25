"use client"

import { useMemo, useState } from "react"
import type { ComponentType } from "react"
import { ArrowRight, ChevronLeft } from "lucide-react"

type IntroSlide = {
  title: string
  description: string
  icon?: ComponentType<{ className?: string }>
  imageSrc?: string
}

type OnboardingIntroProps = {
  slides: IntroSlide[]
  onDone: () => void
}

export default function OnboardingIntro({ slides, onDone }: OnboardingIntroProps) {
  const [introStep, setIntroStep] = useState(0)

  const activeIntro = useMemo(() => slides[introStep], [slides, introStep])
  const IntroIcon = activeIntro?.icon

  function goNext() {
    if (introStep >= slides.length - 1) {
      onDone()
      return
    }
    setIntroStep((s) => s + 1)
  }

  function goPrev() {
    if (introStep > 0) {
      setIntroStep((s) => s - 1)
    }
  }

  function skip() {
    onDone()
  }

  if (!activeIntro) return null

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      {activeIntro.imageSrc && (
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.5) 50%), url('${activeIntro.imageSrc}')`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundAttachment: "fixed",
          }}
        />
      )}
 
      {/* Main Content Container */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header - Step Counter & Skip Button */}
        <div className="flex items-center justify-between px-6 py-6 sm:px-8 sm:py-8 md:px-12 border-b border-white/5 backdrop-blur-sm">
          <div className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wide">
            STEP {introStep + 1} OF {slides.length}
          </div>
          <button
            type="button"
            onClick={skip}
            className="text-sm font-medium text-slate-400 transition-colors hover:text-white duration-200"
          >
            Skip
          </button>
        </div>

        {/* Content Section - Flex Grow to Fill Space */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-12 py-8 md:py-12">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            {/* Icon Badge */}
            {IntroIcon && (
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-colors duration-300">
                <IntroIcon className="h-8 w-8" />
              </div>
            )}

            {/* Title & Description */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white tracking-tight">
                {activeIntro.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                {activeIntro.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-8 md:px-12 py-8 border-t border-white/5 backdrop-blur-sm">
          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5 order-2 sm:order-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIntroStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === introStep
                    ? "w-8 bg-white"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={introStep === 0}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white text-slate-900 transition-all duration-200 hover:bg-white/90 shadow-lg hover:shadow-xl font-semibold"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
