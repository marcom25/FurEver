import {
  Accordion,
  Container,
  Row,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const OferrerInteresteesPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-md-center">
          <h1 className="text-center my-4">Mis Interesados</h1>
          <Accordion className="d-flex align-items-center flex-column ">
            <Accordion.Item eventKey="0" className="w-75">
              <div className="d-flex flex-row">
                <Button
                  variant="outline-info"
                  className="w-10"
                  onClick={handleShow}
                >
                  <FaCircleInfo color="blue" size="2em" />
                </Button>
                <Accordion.Header className="w-100">
                  <p className="m-0 fw-bold">Polo</p>
                </Accordion.Header>
              </div>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <Button
                        variant="link"
                        className="w-10"
                        onClick={handleShow}
                      >
                        <FaCircleInfo color="blue" size="1.5em" />
                      </Button>
                      User1
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <Button
                        variant="link"
                        className="w-10"
                        onClick={handleShow}
                      >
                        <FaTimesCircle size="1.5em" color="red" />
                      </Button>
                      <Button
                        variant="link"
                        className="w-10"
                        onClick={handleShow}
                      >
                        <FaCheckCircle size="1.5em" color="green" />
                      </Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <Button
                        variant="link"
                        className="w-10"
                        onClick={handleShow}
                      >
                        <FaCircleInfo color="blue" size="1.5em" />
                      </Button>
                      User2
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <Button
                        variant="link"
                        className="w-10"
                        onClick={handleShow}
                      >
                        <FaTimesCircle size="1.5em" color="red" />
                      </Button>
                      <Button
                        variant="link"
                        className="w-10"
                        onClick={handleShow}
                      >
                        <FaCheckCircle size="1.5em" color="green" />
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Polo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      </Modal>
    </>
  );
};
