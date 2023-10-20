import { Navbar, Nav, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Furbar = () => {

  let userType;
  
  if (localStorage.getItem("user")) {
    const retrievedData = JSON.parse(localStorage.getItem("user"));
    userType = retrievedData.tipo;
  }

  const handleLogOut = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }

    window.location.reload();
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">
          <Image src="/images/FurEver__logo.png" width={125} alt="Logo" fluid />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas className="" id="basic-navbar-nav">
          <Nav className="justify-content-between p-3 p-lg-0">
            {userType === "Interested" ? (
              <div className="d-flex flex-grow-1 justify-content-center">
                <Link to="interested" className="nav-link">
                  Adoptar
                </Link>
                <Link to="interested/sales" className="nav-link">
                  Comprar
                </Link>
                <Link to="interested/connections" className="nav-link">
                  Mis Conexiones
                </Link>
              </div>
            ) : userType === "Offerer" ? (
              <div className="d-flex flex-grow-1 justify-content-center">
                <Link to="interested" className="nav-link">
                  Adopción
                </Link>
                <Link to="interested/sales" className="nav-link">
                  Venta
                </Link>
                <Link to="offerer/interestees" className="nav-link">
                  Mis Ofertas
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-grow-1 justify-content-center">
                <Link to="interested" className="nav-link">
                  About Us?
                </Link>
              </div>
            )}

            {localStorage.getItem("user") ? (
              <div className="d-flex gap-2">
                <Button onClick={()=> handleLogOut()}>Cerrar Sesión</Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-primary">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Registrarse
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
