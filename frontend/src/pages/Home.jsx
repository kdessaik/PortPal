
import Container from 'react-bootstrap/Container';

import Header from './Header';
import {Image,Button} from 'react-bootstrap';
import WelcomeIntroImg from '../assets/WelcomeIntro.jpg'


import { useState } from "react"

import ProvidersSection from "../components/providers/ProvidersSection"
import OrganizationsSection from "../components/organizations/OrganizationsSection"
import { main } from '@popperjs/core';

 export default function Home() {
  const [search, setSearch] = useState("")

  return (
    <main>
      
       <WelcomeIntro/>
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

function WelcomeIntro(){
  return(
    
      <Container className='welcomeIntro'>
        <div>
          <h1>Welcome to Portpal;  <br/><span>Where Professionals Connect</span></h1><br/>
          <Button variant="warning" className='login'>Login</Button>
         <Button variant="warning" className='signup'>Create an account</Button>
        </div>
        
        <Image src={WelcomeIntroImg} alt='Welcome Intro img' className='welcomeIntroImg'   />
         

      </Container>
      

    
  )

}