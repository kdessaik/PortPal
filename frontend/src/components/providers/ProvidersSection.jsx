import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebase"
import ProviderCard from "./ProviderCard"

export default function ProvidersSection() {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const load = async () => {
      const snapshot = await getDocs(collection(db, "providers"))
      setProviders(snapshot.docs.map(doc => doc.data()))
    }
    load()
  }, [])

  return (
    <section>
      <h2>Service Providers</h2>
      {providers.map(p => (
        <ProviderCard key={p.uid} provider={p} />
      ))}
    </section>
  )
}
