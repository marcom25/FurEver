import { Navbar, Nav, Container } from "react-bootstrap"

export const Furbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">FurEver</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas className="" id="basic-navbar-nav">
          <Nav className="justify-content-center p-3 p-lg-0">
            <Nav.Link href="#home">Adoptar</Nav.Link>
            <Nav.Link href="#link">Comprar</Nav.Link>
            <Nav.Link href="#link">Mis Conexiones</Nav.Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

