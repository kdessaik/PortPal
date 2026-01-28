import { useEffect, useState } from "react"
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../../services/firebase"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function ProviderCard({ provider }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return

    const q = query(
      collection(db, "connectionRequests"),
      where("fromUserId", "==", user.uid),
      where("toUserId", "==", provider.uid)
    )

    const unsub = onSnapshot(q, snap => {
      if (snap.empty) setStatus(null)
      else setStatus(snap.docs[0].data().status)
      setLoading(false)
    })

    return unsub
  }, [user?.uid, provider.uid])

  const connect = async (e) => {
    e.stopPropagation()
    if (!user) return navigate("/login")
    if (status) return

    await addDoc(collection(db, "connectionRequests"), {
      fromUserId: user.uid,
      fromRole: "user",
      toUserId: provider.uid,
      status: "pending",
      createdAt: serverTimestamp(),
    })
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <img src={provider.photoURL} width={70} />
      <h4>{provider.name}</h4>
      <p>{provider.services}</p>

      <button disabled={loading || status} onClick={connect}>
        {loading
          ? "Checking..."
          : status === "pending"
          ? "Request Sent"
          : status === "accepted"
          ? "Connected"
          : "Connect"}
      </button>
    </div>
  )
}
