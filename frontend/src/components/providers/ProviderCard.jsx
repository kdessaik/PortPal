export default function ProviderCard({ provider }) {
  return (
    <div>
      <img src={provider.photoURL} alt={provider.name} width="50" />
      <h3>{provider.name}</h3>
      <p>{provider.title}</p>
      <p>{provider.location}</p>
    </div>
  )
}
