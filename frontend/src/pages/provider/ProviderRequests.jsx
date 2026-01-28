import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "../../services/firebase"

export default function ProviderRequests({ providerId }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔍 Fetch sender profile (always from users)
  const getSenderProfile = async (fromUserId) => {
    const snap = await getDoc(doc(db, "users", fromUserId))
    return snap.exists() ? snap.data() : null
  }

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const q = query(
          collection(db, "connectionRequests"),
          where("providerId", "==", providerId),
          where("status", "==", "pending")
        )

        const snap = await getDocs(q)

        const enriched = await Promise.all(
          snap.docs.map(async (reqDoc) => {
            const data = reqDoc.data()
            const profile = await getSenderProfile(data.fromUserId)

            return {
              id: reqDoc.id,
              ...data,
              profile,
            }
          })
        )

        setRequests(enriched)
      } catch (err) {
        console.error("Failed to load requests:", err)
      } finally {
        setLoading(false)
      }
    }

    loadRequests()
  }, [providerId])

  const updateStatus = async (id, status) => {
    await updateDoc(
      doc(db, "connectionRequests", id),
      { status }
    )

    setRequests(prev => prev.filter(r => r.id !== id))
  }

  if (loading) return <p>Loading connection requests…</p>
  if (requests.length === 0) return <p>No pending connection requests.</p>

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Connection Requests</h3>

      {requests.map(req => (
        <div
          key={req.id}
          style={{
            display: "flex",
            gap: "1rem",
            border: "1px solid #ddd",
            padding: "1rem",
            borderRadius: 8,
            marginBottom: "1rem",
          }}
        >
          <img
            src={req.profile?.photoURL || "/placeholder-user.png"}
            alt={req.profile?.name}
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
          />

          <div style={{ flex: 1 }}>
            <strong>{req.profile?.name || "Unknown"}</strong>

            <p style={{ margin: 0, color: "#555" }}>
              {req.fromRole === "organization"
                ? `Services Needed: ${req.profile?.profile?.servicesNeeded || "-"}`
                : `Service: ${req.profile?.profile?.services || "-"}`}
            </p>

            <small style={{ color: "#888" }}>
              {req.fromRole}
            </small>
          </div>

          <button onClick={() => updateStatus(req.id, "accepted")}>
            Accept
          </button>

          <button onClick={() => updateStatus(req.id, "rejected")}>
            Decline
          </button>
        </div>
      ))}
    </div>
  )
}
