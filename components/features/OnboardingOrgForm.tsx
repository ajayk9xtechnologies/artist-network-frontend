"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Plus, Search, Sparkles, ShieldCheck, BriefcaseBusiness } from "lucide-react"

import { ToastContainer } from "@/components/features/ToastContainer"
import OnboardingIntro from "@/components/features/OnboardingIntro"
import { Button, Input, InputError } from "@/components/ui"
import { useToast } from "@/hooks/useToast"
import { orgOnboardingAction } from "@/actions/profile.action"
import type { ResponseState } from "@/lib/types"

type Step = 1 | 2 | 3 | 4 | 5
const TOTAL_STEPS = 5

const ALL_CATEGORIES = [
  "Event Venue",
  "Music Producer",
  "Catering",
  "Fashion Brand",
  "Photography Studio",
  "Beauty & Makeup",
  "Sound Engineer",
  "Choreography Studio",
  "Corporate Events",
  "Hospitality",
]

const INTRO_SLIDES = [
  {
    title: "Build Your\nOrganisation Profile",
    description:
      "Set up your brand identity and share what your organisation offers to artists and partners.",
    icon: BriefcaseBusiness,
    imageSrc: "/images/3d_character_onboarding.jpg",
  },
  {
    title: "Get Discovered\nBy The Right People",
    description:
      "Add categories, location, and details so artists can find and trust your organisation quickly.",
    icon: Sparkles,
    imageSrc: "/images/get_discovered_onboarding.jpg",
  },
  {
    title: "Secure Setup\nIn Minutes",
    description:
      "Complete onboarding once and unlock your hub experience with role-based access and tools.",
    icon: ShieldCheck,
    imageSrc: "/images/premium_saas_onboarding.jpg",
  },
] as const

const panelClass = "rounded-xl border border-border bg-card/60 p-6"
const inputClass = "bg-background border-border text-foreground placeholder:text-muted-foreground"
const labelClass = "text-sm font-semibold text-foreground"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="inputClass px-6 text-white hover:bg-primary/90">
      {pending ? "Saving..." : "Submit"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  )
}

export default function OnboardingOrgForm() {
  const { toasts, dismiss, success, error } = useToast("top-right")
  const formRef = useRef<HTMLFormElement>(null)
  const [step, setStep] = useState<Step>(1)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showIntro, setShowIntro] = useState(true)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")

  const [categoryQuery, setCategoryQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const [employeeCount, setEmployeeCount] = useState("")
  const [foundedYear, setFoundedYear] = useState("")
  const [website, setWebsite] = useState("")

  const [instagram, setInstagram] = useState("")
  const [facebook, setFacebook] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")

  const progress = useMemo(() => (TOTAL_STEPS <= 1 ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100), [step])

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase()
    return q ? ALL_CATEGORIES.filter((c) => c.toLowerCase().includes(q)) : ALL_CATEGORIES
  }, [categoryQuery])

  const [state, formAction] = useActionState<ResponseState, FormData>(orgOnboardingAction, {
    success: false,
    message: "",
    status: 0,
  })
console.log("state", state)
  useEffect(() => {
    if (!state.message) return
    if (state.success) {
      success({ title: "Profile saved!", message: state.message })
    } else {
      error({ title: "Failed", message: state.message })
    }
  }, [state.success, state.message, success, error])

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validateStep(): boolean {
    const isNonEmpty = (v: string) => v.trim().length > 0
    const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = (v: string) => /^(\+?\d{1,3}[-.\s]?)?\d{10}$/.test(v)
    const nextErrors: Record<string, string> = {}

    if (step === 1) {
      if (!isNonEmpty(name)) nextErrors.name = "Organisation name is required."
      if (!isNonEmpty(description)) nextErrors.description = "Description is required."
      if (!isEmail(email)) nextErrors.email = "Please enter a valid email."
      if (!isPhone(phone)) nextErrors.phone = "Please enter a valid phone number."
    }
    if (step === 2) {
      if (!isNonEmpty(country)) nextErrors.country = "Country is required."
      if (!isNonEmpty(city)) nextErrors.city = "City is required."
      if (!isNonEmpty(address)) nextErrors.address = "Address is required."
    }
    if (step === 3 && selectedCategories.length === 0) {
      nextErrors.categories = "Select at least one category."
    }
    if (step === 4) {
      if (!isNonEmpty(employeeCount)) nextErrors.employeeCount = "Employee count is required."
      if (!isNonEmpty(foundedYear)) nextErrors.foundedYear = "Founded year is required."
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function goNext() {
    setFieldErrors({})
    if (validateStep()) setStep((s) => (s < TOTAL_STEPS ? ((s + 1) as Step) : s))
  }

  function goBack() {
    setFieldErrors({})
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s))
  }

  function toggleCategory(category: string) {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  return (
    <>
    <ToastContainer toasts={toasts} onDismiss={dismiss} />

    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col  lg:px-8 ">
      {showIntro ? (
        <OnboardingIntro slides={[...INTRO_SLIDES]} onDone={() => setShowIntro(false)} />
      ) : (
      <>
       <div className="space-y-6 px-4 py-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Organisation Setup</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1>Complete Your Profile</h1>
            <p className="mt-2 text-muted-foreground">Guided setup for your organisation profile</p>
          </div>
        </div>
      </div>

       <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{Math.round((step / TOTAL_STEPS) * 100)}% Complete</span>
        </div>
        <div className="absolute left-0 top-0 h-2.5 w-full overflow-hidden border border-border bg-muted" >
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
 
      {state.success ? (
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-muted">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <h1 className="mb-2">All Done!</h1>
              <p className="max-w-xl text-muted-foreground">
                Your application has been submitted successfully. We ll review your profile and get back to you soon.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Form Section */
        <form
          ref={formRef}
          action={formAction}
          className="rounded-xl card shadow-sm md:p-8"
          onSubmit={(e) => {
            if (step < TOTAL_STEPS) e.preventDefault()
          }}
        >
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="description" value={description} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="country" value={country} />
          <input type="hidden" name="city" value={city} />
          <input type="hidden" name="address" value={address} />
          <input type="hidden" name="employeeCount" value={employeeCount} />
          <input type="hidden" name="foundedYear" value={foundedYear} />
          <input type="hidden" name="website" value={website} />
          <input type="hidden" name="instagram" value={instagram} />
          <input type="hidden" name="facebook" value={facebook} />
          <input type="hidden" name="linkedin" value={linkedin} />
          <input type="hidden" name="twitter" value={twitter} />
          {selectedCategories.map((c) => (
            <input key={c} type="hidden" name="categories" value={c} />
          ))}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 `}>
              <div className="space-y-2">
                <label className={labelClass}>Organisation Name <span className="text-destructive">*</span></label>
                <Input name="name" type="text" required value={name} onChange={(e) => { setName(e.target.value); clearFieldError("name") }} placeholder="Enter organisation name" className={inputClass} />
                <InputError message={fieldErrors.name} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Email <span className="text-destructive">*</span></label>
                <Input name="email" type="email" required value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError("email") }} placeholder="your@email.com" className={inputClass} />
                <InputError message={fieldErrors.email} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className={labelClass}>Description <span className="text-destructive">*</span></label>
                <textarea
                  name="description"
                  required
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); clearFieldError("description") }}
                  placeholder="Tell us about your organisation..."
                  rows={5}
                  className="mt-2 flex w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <InputError message={fieldErrors.description} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Phone <span className="text-destructive">*</span></label>
                <Input name="phone" type="tel" required value={phone} onChange={(e) => { setPhone(e.target.value); clearFieldError("phone") }} placeholder="+1 (555) 000-0000" className={inputClass} />
                <InputError message={fieldErrors.phone} />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-2`}>
              <div className="space-y-2">
                <label className={labelClass}>Country <span className="text-destructive">*</span></label>
                <Input name="country" type="text" required value={country} onChange={(e) => { setCountry(e.target.value); clearFieldError("country") }} placeholder="Enter country" className={inputClass} />
                <InputError message={fieldErrors.country} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>City <span className="text-destructive">*</span></label>
                <Input name="city" type="text" required value={city} onChange={(e) => { setCity(e.target.value); clearFieldError("city") }} placeholder="Enter city" className={inputClass} />
                <InputError message={fieldErrors.city} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className={labelClass}>Address <span className="text-destructive">*</span></label>
                <Input name="address" type="text" required value={address} onChange={(e) => { setAddress(e.target.value); clearFieldError("address") }} placeholder="Enter full address" className={inputClass} />
                <InputError message={fieldErrors.address} />
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {step === 3 && (
            <div className={`space-y-5 `}>
              <div>
                <label className={`mb-3 block ${labelClass}`}>Categories <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={categoryQuery} onChange={(e) => setCategoryQuery(e.target.value)} placeholder="Search categories..." className={`pl-11 ${inputClass}`} />
                </div>
              </div>
              <div
  className="rounded-[40px] p-8"
  style={{
    boxShadow:
      "inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2), inset -6px -6px 10px 0 rgba(27, 27, 27, 0.78)",
  }}
>
                <div className="flex flex-wrap gap-3">
                  {filteredCategories.map((category) => {
                    const selected = selectedCategories.includes(category)
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                          selected
                            ? "border-primary/60 bg-primary/15 text-primary shadow-sm"
                            : "border-border bg-muted text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                          {selected ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4 transition-transform group-hover:scale-110" />}
                        {category}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Selected: <span className="font-semibold text-primary">{selectedCategories.length}</span></p>
              </div>
              <InputError message={fieldErrors.categories} />
            </div>
          )}

          {/* Step 4: Company Details */}
          {step === 4 && (
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 `}>
              <div className="space-y-2">
                <label className={labelClass}>Employee Count <span className="text-destructive">*</span></label>
                <Input name="employeeCount" type="number" required value={employeeCount} onChange={(e) => { setEmployeeCount(e.target.value); clearFieldError("employeeCount") }} placeholder="e.g. 50" className={inputClass} />
                <InputError message={fieldErrors.employeeCount} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Founded Year <span className="text-destructive">*</span></label>
                <Input name="foundedYear" type="date" required value={foundedYear} onChange={(e) => { setFoundedYear(e.target.value); clearFieldError("foundedYear") }} className={inputClass} />
                <InputError message={fieldErrors.foundedYear} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className={labelClass}>Website</label>
                <Input name="website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com (optional)" className={inputClass} />
                <InputError message={fieldErrors.website} />
              </div>
            </div>
          )}

          {/* Step 5: Social Media */}
          {step === 5 && (
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-2  `}>
              <div className="space-y-2">
                <label className={labelClass}>Instagram</label>
                <Input name="instagram" type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourprofile (optional)" className={inputClass} />
                <InputError message={fieldErrors.instagram} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Facebook</label>
                <Input name="facebook" type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook URL (optional)" className={inputClass} />
                <InputError message={fieldErrors.facebook} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>LinkedIn</label>
                <Input name="linkedin" type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL (optional)" className={inputClass} />
                <InputError message={fieldErrors.linkedin} />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Twitter</label>
                <Input name="twitter" type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@yourprofile (optional)" className={inputClass} />
                <InputError message={fieldErrors.twitter} />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
            <Button 
              type="button" 
              onClick={goBack} 
              disabled={step === 1} 
              className=" bg-secondary px-6 py-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < TOTAL_STEPS ? (
              <Button 
                type="button" 
                onClick={goNext} 
                className="px-6 py-2"
              >
                Next <ArrowRight className="ml-2 h-4 w-4 " />
              </Button>
            ) : (
              <SubmitButton />
            )}
          </div>
        </form>
      )}
      </>
      )}
    </div>
  </>

  )
}
