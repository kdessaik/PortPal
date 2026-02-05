
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Header from './Header';


import { useState } from "react"

import ProvidersSection from "../components/providers/ProvidersSection"
import OrganizationsSection from "../components/organizations/OrganizationsSection"
import { main } from '@popperjs/core';

 export default function Home() {
  const [search, setSearch] = useState("")

  return (
    <main>
      <Header/>
      <section style={{ padding: "2rem" }}>
      <h1>PortPal</h1>

      {/* Search bar for filtering providers/organizations */}
      <input
        type="text"
        placeholder="Search Service needed or provided"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "2rem", padding: "0.5rem", width: "100%" }}
      />
      
      

      {/* Pass search term to sections */}
      <ProvidersSection search={search} />
      <OrganizationsSection search={search} />
    </section>

    </main>
    
  )
}
