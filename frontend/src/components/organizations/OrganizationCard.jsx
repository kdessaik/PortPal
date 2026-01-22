export default function OrganizationCard({ organization }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{organization.name || "Organization"}</h3>

      <p>
        <strong>Industry:</strong>{" "}
        {organization.industry || "Not specified"}
      </p>

      <p>
        <strong>Services Needed:</strong>{" "}
        {organization.servicesNeeded || "Not specified"}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {organization.location || "Not specified"}
      </p>
    </div>
  )
}
