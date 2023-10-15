import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Furbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">
          <Image src="/images/FurEver__logo.png" width={125} alt="Logo" fluid />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas className="" id="basic-navbar-nav">
          <Nav className="justify-content-between p-3 p-lg-0">
            <div className="d-flex flex-grow-1 justify-content-center">
              <Link to="interested" className="nav-link">
                Adoptar
              </Link>
              <Link to="/" className="nav-link">
                Comprar
              </Link>
              <Link to="/" className="nav-link">
                Mis Conexiones
              </Link>
            </div>
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-primary">
                Registrarse
              </Link>
            </div>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
