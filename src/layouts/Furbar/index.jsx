import { Navbar, Nav, Container,Image } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Furbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="ms-0">
        <Navbar.Brand href="#home">
          <Image src="/images/FurEver__logo.png" width={125} alt="Logo" fluid />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas className="" id="basic-navbar-nav">
          <Nav className="justify-content-center p-3 p-lg-0">
            <Link to="interested" className="nav-link">Adoptar</Link>
            <Link to="/interested/sales" className="nav-link">Comprar</Link>
            <Link to="/interested/conections" className="nav-link">Mis Conexiones</Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

