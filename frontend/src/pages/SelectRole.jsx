import { createUserProfile } from "../services/userService"
import { useNavigate } from "react-router-dom"

export default function SelectRole({ user }) {
  const navigate = useNavigate()

  const handleSelect = async (role) => {
    await createUserProfile(user, role)
    navigate("/dashboard")
  }

  return (
    <div>
      <h1>Choose your role</h1>

      <button onClick={() => handleSelect("provider")}>
        I am a Service Provider
      </button>

      <button onClick={() => handleSelect("organization")}>
        I represent an Organization
      </button>
    </div>
  )
}
