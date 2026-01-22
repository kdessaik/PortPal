import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebase"
import ProviderCard from "./ProviderCard"

export default function ProvidersSection({ search }) {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "providers"))
      setProviders(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })))
    }
    load()
  }, [])

  const filtered = providers.filter(p =>
    p.services?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section>
      <h2>Service Providers</h2>

      {filtered.length === 0 && <p>No providers found.</p>}

      {filtered.map(p => (
        <ProviderCard key={p.uid} provider={p} />
      ))}
    </section>
  )
}
