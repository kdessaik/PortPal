import { useState } from "react"
import ProvidersSection from "../components/providers/ProvidersSection"
import OrganizationsSection from "../components/organizations/OrganizationsSection"

export default function Home() {
  const [search, setSearch] = useState("")

  return (
    <main style={{ padding: "2rem" }}>
      <h1>PortPal</h1>

      {/* Search bar for filtering providers/organizations */}
      <input
        type="text"
        placeholder="Search Service needed or provided"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "2rem", padding: "0.5rem", width: "100%" }}
      />

      {/* Pass search term to sections */}
      <ProvidersSection search={search} />
      <OrganizationsSection search={search} />
    </main>
  )
}
