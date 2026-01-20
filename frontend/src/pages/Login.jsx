import { Navigate } from "react-router-dom"
import { signInWithGoogle } from "../services/auth"

export default function Login({ user }) {
  if (user) return <Navigate to="/dashboard" />

  return (
    <div>
      <h1>Login to PortPal</h1>
      <button onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  )
}
