import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Furbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">FurEver</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas className="" id="basic-navbar-nav">
          <Nav className="justify-content-center p-3 p-lg-0">
            <Link to="interested" className="nav-link">Adoptar</Link>
            <Link to="/" className="nav-link">Comprar</Link>
            <Link to="/" className="nav-link">Mis Conexiones</Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

