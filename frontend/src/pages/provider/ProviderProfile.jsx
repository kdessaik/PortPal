import { useEffect, useState } from "react"
import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { db } from "../../services/firebase"

export default function ProvidersSection({ search }) {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const loadProviders = async () => {
      const q = query(
        collection(db, "users"),
        where("role", "==", "provider"),
        limit(20)
      )

      const snapshot = await getDocs(q)
      setProviders(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })))
    }

    loadProviders()
  }, [])

  const filtered = providers.filter(p =>
    p.profile?.title?.toLowerCase().includes(search?.toLowerCase() || "") ||
    p.profile?.services?.toLowerCase().includes(search?.toLowerCase() || "") ||
    p.profile?.location?.toLowerCase().includes(search?.toLowerCase() || "")
  )

  return (
    <section>
      <h2>Service Providers</h2>

      {filtered.length === 0 && <p>No providers found.</p>}

      {filtered.map((p) => (
        <div
          key={p.uid}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>{p.name}</h3>

          {/* 👇 ROLE DISPLAY */}
          <p style={{ fontStyle: "italic", color: "#666", marginTop: "-0.5rem" }}>
            Role: {p.role?.charAt(0).toUpperCase() + p.role?.slice(1)}
          </p>

          <p>
            <strong>Title:</strong> {p.profile?.title || "No title"}
          </p>

          <p>
            <strong>Services:</strong> {p.profile?.services || "No services listed"}
          </p>

          <p>
            <strong>Location:</strong> {p.profile?.location || "No location specified"}
          </p>
        </div>
      ))}
    </section>
  )
}
