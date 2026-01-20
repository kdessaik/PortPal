import { useEffect, useState } from "react"
import { saveOrganizationProfile, getOrganizationProfile } from "../../services/profileService"

export default function OrganizationProfile({ user }) {
  const [form, setForm] = useState({
    industry: "",
    servicesNeeded: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    const load = async () => {
      const data = await getOrganizationProfile(user.uid)
      if (data) setForm(data)
    }
    load()
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await saveOrganizationProfile(user.uid, {
      ...form,
      name: user.displayName,
      logoURL: user.photoURL,
    })
    alert("Organization profile saved")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Organization Profile</h2>

      <input name="industry" placeholder="Industry" onChange={handleChange} value={form.industry} />
      <input name="servicesNeeded" placeholder="Services needed" onChange={handleChange} value={form.servicesNeeded} />
      <input name="location" placeholder="Location" onChange={handleChange} value={form.location} />
      <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} />

      <button type="submit">Save</button>
    </form>
  )
}
