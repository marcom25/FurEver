
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
      <Row className="w-50">
        <Col className="d-flex justify-content-center">
          <Link to="interested" className="btn submit-btn register-choice text-white vh-15">
            Quiero adoptar o comprar
          </Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <Link to="offerer" className="btn submit-btn register-choice text-white">
            Quiero dar en adopción o vender animales
          </Link>
        </Col>
      </Row>
    </>
  );
};
