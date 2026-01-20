import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./services/firebase"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import SelectRole from "./pages/SelectRole"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login user={user} />} />

        <Route
          path="/select-role"
          element={
            <ProtectedRoute user={user}>
              <SelectRole user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
