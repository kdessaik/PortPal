import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Image,Button} from 'react-bootstrap';
import Logoimg from '../assets/PortpalLogo.png';
import JobIcon from '../assets/JobIcon.svg'
import ProviderIcon from '../assets/OfficeWorker.svg'
import NewsIcon from "../assets/NewsIcon.svg"
import { useNavigate } from 'react-router-dom';



import '../index.css' 

function Header() {
  const navigation=useNavigate();
  
  const OnclickLogin=()=>{
      navigation('/login')
      }
  const OnclickSignUp=()=>{

  } 

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" >
      <Container style={{marginBottom:"-5px"}} >
        <Navbar.Brand href="./" style={{marginBottom:"-35px"}}>
        <Image src={Logoimg} alt='Portpal Logo' className='logo' width={150} fluid roundedCircle />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{gap:"50px", marginLeft:"25vw"}}>
            <Nav.Link href="#features"  style={{textAlign:'center'}} className='iconsNavbar'>
               <Image src={NewsIcon} className='Newlogo' alt='News'  width={30} fluid  /> <br/>News
              
              </Nav.Link>
              
        
            <Nav.Link href="#provider" style={{textAlign:'center'}} className='iconsNavbar'> 
              <Image src={JobIcon} alt='Job icon' className='Joblogo' width={30} fluid  /> <br/>Jobs
              
              </Nav.Link> 
              <Nav.Link href="#provider" style={{textAlign:'center'}} className='iconsNavbar'>
                <Image src={ProviderIcon} alt='Provider icon' className='Providerlogo' width={30} fluid  /> <br/>Providers
             
              </Nav.Link> 
            
          </Nav>
          <Nav>
            <Button variant="warning" className='login' id='login' onClick={OnclickLogin}>Login</Button>
             <Button variant="warning" className='signup'>Join Now</Button>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;