import ArtHub from "@/components/role/hub/Art"
import OrgHub from "@/components/role/hub/Org"

type Params = {
  params: Promise<{ role: string }>
}
export default async function page({ params }: Params) {
  const { role } = await params
  return <div>
    <h1>Hub {role}</h1>
    {role === "artist" ? <ArtHub /> : <OrgHub />}
  </div>
}