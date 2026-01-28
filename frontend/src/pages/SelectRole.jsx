import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { createUserProfile, getUserProfile } from "../services/userService"
import { useAuth } from "../context/AuthContext"

export default function SelectRole() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user, navigate])

  const handleSelect = async (role) => {
    if (!user || loading) return

    try {
      setLoading(true)

      // 1️⃣ Create profile
      await createUserProfile(user, role)

      // 2️⃣ Confirm profile exists before redirecting
      const profile = await getUserProfile(user.uid)

      if (profile && ["provider", "organization"].includes(profile.role)) {
        navigate("/dashboard")
      } else {
        navigate("/select-role")
      }
    } catch (err) {
      console.error("Role selection failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Select your role</h1>

      <button disabled={loading} onClick={() => handleSelect("provider")}>
        I am a Service Provider
      </button>

      <button disabled={loading} onClick={() => handleSelect("organization")}>
        I am an Organization
      </button>

      {loading && <p>Saving role...</p>}
    </div>
  )
}
