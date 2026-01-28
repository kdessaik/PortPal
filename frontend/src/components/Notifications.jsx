import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../services/firebase"

export default function Notifications({ userId }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔍 Fetch sender profile dynamically
  const getSenderProfile = async (req) => {
    const col =
      req.fromRole === "organization" ? "organizations" : "users"

    const snap = await getDoc(doc(db, col, req.fromUserId))
    return snap.exists() ? snap.data() : null
  }

  useEffect(() => {
    if (!userId) return

    const q = query(
      collection(db, "connectionRequests"),
      where("toProviderId", "==", userId),
      where("status", "==", "pending")
    )

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const enriched = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data()
          const profile = await getSenderProfile(data)
          return {
            id: docSnap.id,
            ...data,
            profile,
          }
        })
      )
      setRequests(enriched)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId])

  const handleUpdate = async (requestId, status) => {
    await updateDoc(doc(db, "connectionRequests", requestId), { status })
    setRequests((prev) => prev.filter((r) => r.id !== requestId))
  }

  if (loading) return <p>Loading notifications...</p>
  if (requests.length === 0) return <p>No pending requests.</p>

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Connection Requests</h3>

      {requests.map((req) => (
        <div
          key={req.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: 6,
          }}
        >
          {/* 👤 Profile */}
          <img
            src={req.profile?.photoURL || "/placeholder-user.png"}
            alt={req.profile?.name || "Unknown"}
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
              {req.fromRole === "organization" ? "Organization" : "User"}
            </small>
          </div>

          {/* ✅ Actions */}
          <button
            onClick={() => handleUpdate(req.id, "accepted")}
            style={{ marginRight: "0.5rem" }}
          >
            Accept
          </button>
          <button onClick={() => handleUpdate(req.id, "rejected")}>
            Decline
          </button>
        </div>
      ))}
    </div>
  )
}
