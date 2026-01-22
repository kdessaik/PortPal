import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { createUserProfile } from "../services/userService"
import { useAuth } from "../context/AuthContext"

export default function SelectRole() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
  if (!user) navigate("/login")
}, [user])

  const handleSelect = async (role) => {
    if (!user) return  // 🛡 safety guard

    await createUserProfile(user, role)
    navigate("/dashboard")
  }

  return (
    <div>
      <h1>Select your role</h1>

      <button onClick={() => handleSelect("provider")}>
        I am a Service Provider
      </button>

      <button onClick={() => handleSelect("organization")}>
        I am an Organization
      </button>
    </div>
  )
}
