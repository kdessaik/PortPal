import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "../services/userService"

import ProviderProfile from "./provider/ProviderProfile"
import OrganizationProfile from "./organization/OrganizationProfile"

export default function Dashboard({ user }) {
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
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

  if (profile.role === "provider") {
    return <ProviderProfile user={user} />
  }

  if (profile.role === "organization") {
    return <OrganizationProfile user={user} />
  }

  return null
}
