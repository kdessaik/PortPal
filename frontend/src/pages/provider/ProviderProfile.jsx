import { useEffect, useState } from "react"
import { saveProviderProfile, getProviderProfile } from "../../services/profileService"

export default function ProviderProfile({ user }) {
  const [form, setForm] = useState({
    title: "",
    services: "",
    location: "",
    bio: "",
  })

  useEffect(() => {
    const load = async () => {
      const data = await getProviderProfile(user.uid)
      if (data) setForm(data)
    }
    load()
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await saveProviderProfile(user.uid, {
      ...form,
      name: user.displayName,
      photoURL: user.photoURL,
    })
    alert("Profile saved")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Provider Profile</h2>

      <input name="title" placeholder="Title" onChange={handleChange} value={form.title} />
      <input name="services" placeholder="Services (comma separated)" onChange={handleChange} value={form.services} />
      <input name="location" placeholder="Location" onChange={handleChange} value={form.location} />
      <textarea name="bio" placeholder="Bio" onChange={handleChange} value={form.bio} />

      <button type="submit">Save</button>
    </form>
  )
}
