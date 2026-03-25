import ArtistOnboarding from "@/components/role/onboarding/Artist"
import OnboardingOrgForm from "@/components/features/OnboardingOrgForm"

type Params = {
  params: Promise<{ role: string }>
}
export default async function page({ params }: Params) {
  const { role } = await params
  return role === "artist" ? <ArtistOnboarding /> : <OnboardingOrgForm />
}