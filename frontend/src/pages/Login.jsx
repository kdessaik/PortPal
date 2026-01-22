import { signInWithPopup } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, googleProvider } from "../services/firebase"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const { user } = useAuth()
  const navigate = useNavigate()

  
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div>
      <h1>Login to PortPal</h1>
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}
