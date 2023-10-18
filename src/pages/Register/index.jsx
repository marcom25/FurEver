
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


export const Register = () => {
  

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>Registro de usuario</h1>
          <h3>¿Que buscas hacer en FurEver?</h3>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Link to="interested" className="btn btn-primary">
            Quiero adoptar o comprar
          </Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <Link to="offerer" className="btn btn-primary">
            Quiero dar en adopción o vender animales
          </Link>
        </Col>
      </Row>
    </>
  );
};
