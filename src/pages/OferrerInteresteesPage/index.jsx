import React from "react";
import {Accordion, Container,Row,Button,Modal,ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckCircle,FaTimesCircle, } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import { AnimalModal } from "../../components/Offerers/AnimalModal";
import { InterestedModal } from "../../components/Offerers/InterestedModal";

export const OferrerInteresteesPage = () => {
  const { loading, error, data } = useFetch("animal-adp/");
  data.map((animal, index) => (
    console.log(animal.interested)
  ))
  const [showModalA, setShowModalA] = useState(false);
  const [showModalI, setShowModalI] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedInterested, setSelectedInterested] = useState(null);

  const handleShowModalA = (animal) => {
    setSelectedAnimal(animal);
    setShowModalA(true);
  };

  const handleShowModalI = (interested) => {
    setSelectedInterested(interested);
    setShowModalI(true);
  };

  const handleHideModalA = () => setShowModalA(false);
  const handleHideModalI = () => setShowModalI(false);

  return (
    <Container>
      <h1 className="text-center my-4">Mis Interesados</h1>
      <Row className="d-flex justify-content-md-center">
        {data?.length > 0 &&
          data.map((animal, index) => (
            <Accordion key={index} className="d-flex align-items-center flex-column">
              <Accordion.Item eventKey={index} className="w-75">
                <Container className="d-flex flex-row p-0">
                  <Button variant="outline-info" className="w-10" onClick={() => handleShowModalA(animal)}>
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
                        <ListGroup.Item key={indexI} className="d-flex justify-content-between">
                          <Container className="d-flex flex-row align-items-center p-0">
                            <Button variant="link" className="w-10" onClick={() => handleShowModalI(interested)}>
                              <FaCircleInfo color="blue" size="1.5em" />
                            </Button>
                            {interested?.name}
                          </Container>
                          <Container className="d-flex flex-row justify-content-end align-items-center p-0">
                            <Button variant="link" className="w-10">
                              <FaTimesCircle size="1.5em" color="red" />
                            </Button>
                            <Button variant="link" className="w-10">
                              <FaCheckCircle size="1.5em" color="green" />
                            </Button>
                          </Container>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </Row>

      <Modal show={showModalA} onHide={handleHideModalA}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAnimal?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
        
            <AnimalModal
          descripcion={selectedAnimal?.descripcion}
          photos={selectedAnimal?.photos}
          especie={selectedAnimal?.especie}
          raza={selectedAnimal?.raza}
          edad={selectedAnimal?.edad}
          peso={selectedAnimal?.peso}
          vacunas={selectedAnimal?.vacunas_completas}
          genero={selectedAnimal?.genero}

        />

        </Modal.Body>
      </Modal>

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
            >
          </InterestedModal>
      </Modal>
    </Container>
  );
};
