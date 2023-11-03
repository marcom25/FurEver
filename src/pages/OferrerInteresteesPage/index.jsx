import React from "react";
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
import { FaCheckCircle, FaTimesCircle, FaCheck, FaTimes } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import { AnimalModal } from "../../components/common/AnimalModal";
import { InterestedModal } from "../../components/Offerers/InterestedModal";
import { API } from "../../API/API";
export const OferrerInteresteesPage = () => {
  const retrievedData = JSON.parse(localStorage.getItem("user"));
  let offererName;
  let offererId;

  if (localStorage.getItem("user")) {
    offererName = retrievedData.username;
    offererId = retrievedData.id;
  }
  const { loading, error, data } = useFetch("animal-adp/?owner=" + offererName);

  const [showModalA, setShowModalA] = useState(false);
  const [showModalI, setShowModalI] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedInterested, setSelectedInterested] = useState(null);

  const decideHandler = async (decision) => {
    try {
      const response = await API.post("conection-d/", decision);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModalA = (animal) => {
    setSelectedAnimal(animal);
    setShowModalA(true);
  };

  const handleShowModalI = (interested) => {
    setSelectedInterested(interested);
    setShowModalI(true);
  };

  const selectButtons = (interested, animal) => {
    if (interested.conection === "EE") {
      return (
        <Container className="d-flex flex-row justify-content-end p-0 h-100">
          <Button
            variant="link"
            className="w-10"
            onClick={() =>
              decideHandler({
                interested: interested.id,
                animal: animal.id,
                answer: "reject",
              })
            }
          >
            <FaTimesCircle size="1.5em" color="red" />
          </Button>
          <Button
            variant="link"
            className="w-10"
            onClick={() =>
              decideHandler({
                interested: interested.id,
                animal: animal.id,
                answer: "accept",
              })
            }
          >
            <FaCheckCircle size="1.5em" color="green" />
          </Button>
        </Container>
      );
    } else if (interested.conection === "AC") {
      return (
        <Container className="d-flex flex-row justify-content-end align-items-center p-0">
          <div
            className=" rounded d-flex justify-content-center h-75 align-items-center"
            style={{ width: "15%", backgroundColor: "#008000" }}
          >
            <FaCheck size="1em" color="white" />
          </div>
        </Container>
      );
    } else {
      return (
        <Container className="d-flex flex-row justify-content-end align-items-center p-0">
          <div
            className=" rounded d-flex justify-content-center h-75 align-items-center"
            style={{ width: "15%", backgroundColor: "red" }}
          >
            <FaTimes size="1em" color="white" />
          </div>
        </Container>
      );
    }
  };

  const handleHideModalA = () => setShowModalA(false);
  const handleHideModalI = () => setShowModalI(false);

  return (
    <Container className="h-100">
      <h1 className="text-center my-4">Mis Ofertas</h1>
      <Row className="d-flex justify-content-md-center">
        {data?.length > 0 &&
          data.map((animal, index) => (
            <Accordion
              key={index}
              className="d-flex align-items-center flex-column"
            >
              <Accordion.Item eventKey={index} className="w-75">
                <Container className="d-flex flex-row p-0">
                  <Button
                    variant="outline-info"
                    className="w-10"
                    onClick={() => handleShowModalA(animal)}
                  >
                    <FaCircleInfo color="blue" size="2em" />
                  </Button>
                  <Accordion.Header className="w-100">
                    <p className="m-0 fw-bold">{animal.nombre}</p>
                    <p className="m-0 text-primary">
                      - Interesado/s: {animal.interested.length}
                    </p>
                  </Accordion.Header>
                </Container>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    {animal.interested?.length > 0 &&
                      animal.interested.map((interested, indexI) => (
                        <ListGroup.Item
                          key={indexI}
                          className="d-flex justify-content-between"
                        >
                          <Container className="d-flex flex-row align-items-center p-0">
                            <Button
                              variant="link"
                              className="w-10"
                              onClick={() => handleShowModalI(interested)}
                            >
                              <FaCircleInfo color="blue" size="1.5em" />
                            </Button>
                            {interested?.name}
                          </Container>

                          {selectButtons(interested, animal)}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </Row>

      
      <AnimalModal
        show={showModalA}
        onHide={handleHideModalA}
        animal={selectedAnimal}
      />
        

      <Modal show={showModalI} onHide={handleHideModalI}>
        <InterestedModal
          nombre={selectedInterested?.name}
          descripcion={selectedInterested?.descripcion}
          photos={selectedInterested?.photos}
          ap={selectedInterested?.animales_previos}
          aa={selectedInterested?.animales_actuales}
          ninos={selectedInterested?.ninos}
          hogar={selectedInterested?.tipo_hogar}
          horarios={selectedInterested?.horarios}
        ></InterestedModal>
      </Modal>
    </Container>
  );
};
