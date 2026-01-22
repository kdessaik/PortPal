import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebase"
import OrganizationCard from "./OrganizationCard"

export default function OrganizationsSection({ search }) {
  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "organizations"))
      setOrganizations(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })))
    }
    load()
  }, [])

  const filtered = organizations.filter(o =>
    o.servicesNeeded?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section>
      <h2>Organizations</h2>

      {filtered.length === 0 && <p>No organizations found.</p>}

      {filtered.map(o => (
        <OrganizationCard key={o.uid} organization={o} />
      ))}
    </section>
  )
}
