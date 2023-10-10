import { Navbar, Nav, Container,Image } from "react-bootstrap"

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
            <Nav.Link href="#home">Adoptar</Nav.Link>
            <Nav.Link href="#link">Comprar</Nav.Link>
            <Nav.Link href="/offerer/interestees">Mis Conexiones</Nav.Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

