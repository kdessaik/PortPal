import ProvidersSection from "../components/providers/ProvidersSection"
import OrganizationsSection from "../components/organizations/OrganizationsSection"

export default function Home() {
  return (
    <main>
      <h1>PortPal</h1>

      <ProvidersSection />
      <OrganizationsSection />
    </main>
  )
}
