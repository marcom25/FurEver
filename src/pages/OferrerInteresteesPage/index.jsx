import React from "react";
import {Accordion, Container,Row,Button,Modal,ListGroup } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckCircle,FaTimesCircle, } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";

export const OferrerInterestees = () => {
const [showA, setShowAnimal] = useState(false);
const [showI, setShowInterested] = useState(false);

const {loading, error, data} = useFetch("animal-adp/");
console.log(typeof data)
const handleCloseA = () => setShowAnimal(false);
const handleShowA = () => setShowAnimal(true); 
const handleCloseI = () => setShowInterested(false);
const handleShowI = () => setShowInterested(true);  

  return (
    <>  
        <Container>
        <Row className="d-flex justify-content-md-center">
            <h1 className="text-center my-4">Mis Interesados</h1>
            <Accordion className="d-flex align-items-center flex-column ">
            <Accordion.Item eventKey="0" className="w-75">
                <Container className="d-flex flex-row p-0">
                <Button  variant="outline-info" className="w-10" onClick={handleShowA}>
                        <FaCircleInfo color="blue" size="2em" /> 
                    </Button>
                <Accordion.Header className="w-100">
                    <p className="m-0 fw-bold">Polo</p>
                    
                </Accordion.Header>
                </Container>
                <Accordion.Body>
                <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                    <Container className="d-flex flex-row align-items-center p-0">
                      <Button  variant="link" className="w-10" onClick={handleShowI}>
                          <FaCircleInfo color="blue" size="1.5em" /> 
                      </Button>
                      User1
                    </Container>
                    <Container className="d-flex flex-row justify-content-end align-items-center p-0">
                      <Button  variant="link" className="w-10" >
                          <FaTimesCircle size="1.5em" color="red" /> 
                      </Button>
                      <Button  variant="link" className="w-10" >
                          <FaCheckCircle size="1.5em" color="green" /> 
                      </Button>
                    </Container>
                  </ListGroup.Item>
                  
                  
                </ListGroup>
                </Accordion.Body>
                
            </Accordion.Item>
            </Accordion>
        </Row>
        </Container>

        <Modal show={showA} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title>Polo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
        <ListGroup className="d-flex justify-content-center">
        <ListGroup.Item ><b>Especie:</b> Especie</ListGroup.Item>
        <ListGroup.Item ><b>Raza:</b> Raza</ListGroup.Item>
        <ListGroup.Item ><b>Genero:</b> Genero</ListGroup.Item>
        <ListGroup.Item ><b>Edad:</b> Edad</ListGroup.Item>
        <ListGroup.Item ><b>Peso:</b> Peso</ListGroup.Item>
        <ListGroup.Item ><b>Vacunas:</b> Vacunas</ListGroup.Item>
        </ListGroup>
        <ListGroup>
        <ListGroup.Item>
          <h4>Descripción</h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Asperiores vitae officiis tempora aspernatur nesciunt ab, laudantium porro 
          odio commodi quae nihil animi alias! Earum suscipit modi expedita animi amet quos!
          </ListGroup.Item>
          <ListGroup.Item>
          <a href="#" download="imagen_casa.jpg">
           Foto 1
          </a>
          </ListGroup.Item>
          <ListGroup.Item>
          <a href="#" download="imagen_casa.jpg">
           Foto 2
          </a>
          </ListGroup.Item>
        </ListGroup>
        </Modal.Body>
      </Modal>

      <Modal show={showI} onHide={handleCloseI}>
        <Modal.Header closeButton>
          <Modal.Title>User1</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
        <ListGroup horizontal className="d-flex justify-content-center">
        <ListGroup.Item variant="danger">Animales previos: <b>No</b></ListGroup.Item>
        <ListGroup.Item variant="success">Animnales actuales: <b>Si</b></ListGroup.Item>
        <ListGroup.Item variant="danger">Niños: <b>No</b></ListGroup.Item>
        </ListGroup>
        <ListGroup>
        <ListGroup.Item>
          <h4>Descripción</h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Asperiores vitae officiis tempora aspernatur nesciunt ab, laudantium porro 
          odio commodi quae nihil animi alias! Earum suscipit modi expedita animi amet quos!
          </ListGroup.Item>
          <ListGroup.Item>
          <a href="#" download="imagen_casa.jpg">
           Foto 1
          </a>
          </ListGroup.Item>
          <ListGroup.Item>
          <a href="#" download="imagen_casa.jpg">
           Foto 2
          </a>
          </ListGroup.Item>
        </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

