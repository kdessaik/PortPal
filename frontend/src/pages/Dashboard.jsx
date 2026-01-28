import { useEffect, useState } from "react" 
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "../services/userService"
import { useAuth } from "../context/AuthContext"

import ProviderProfile from "./provider/ProviderProfile"
import OrganizationProfile from "./organization/OrganizationProfile"

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    const loadProfile = async () => {
      const data = await getUserProfile(user.uid)

      if (!data) {
        navigate("/select-role")
        return
      }

      setProfile(data)
    }

    loadProfile()
  }, [user, navigate])

  if (!profile) return <p>Loading...</p>

  const roleLabel =
    profile.role?.charAt(0).toUpperCase() + profile.role?.slice(1)

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <button
        onClick={() => setEditing(!editing)}
        style={{ marginBottom: "1rem" }}
      >
        {editing ? "Cancel Edit" : "Edit Profile"}
      </button>

      {/* ================= HEADER ================= */}
      <div style={{ marginBottom: "1rem" }}>
        <h2>{profile.name}</h2>
        <p >
          Role: {roleLabel}
        </p>
      </div>

      {/* ================= PROVIDER ================= */}
      {profile.role === "provider" && (
        editing ? (
          <ProviderProfile user={user} role={profile.role} />
        ) : (
          <div>
            <p>Title: {profile.profile?.title || "-"}</p>
            <p>Services: {profile.profile?.services || "-"}</p>
            <p>Location: {profile.profile?.location || "-"}</p>
            <p>Bio: {profile.profile?.bio || "-"}</p>
          </div>
        )
      )}

      {/* ================= ORGANIZATION ================= */}
      {profile.role === "organization" && (
        editing ? (
          <OrganizationProfile user={user} role={profile.role} />
        ) : (
          <div>
            <p>Description: {profile.profile?.description || "-"}</p>
            <p>Services Needed: {profile.profile?.servicesNeeded || "-"}</p>
            <p>Location: {profile.profile?.location || "-"}</p>
          </div>
        )
      )}
    </div>
  )
}
