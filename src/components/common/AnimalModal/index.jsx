import React from "react";
import { ListGroup, Modal, Button, Row } from "react-bootstrap";
import axios from "axios";

export const AnimalModal = ({ show, onHide, animal }) => {
  const retrievedData = JSON.parse(localStorage.getItem("user"));
  let userType;

  if (!animal) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Loading...</Modal.Body>
      </Modal>
    );
  }
  console.log(animal.especie);
  switch (animal.especie) {
    case "P":
      animal.especie = "Perro";
      break;
    case "G":
      animal.especie = "Gato";
      break;
    case "C":
      animal.especie = "Conejo";
      break;
    case "T":
      animal.especie = "Tortuga";
      break;
    case "S": 
      animal.especie = "Serpiente";
      break;
    case "DG":
      animal.especie = "De granja";
      break;
    case "O":
      animal.especie = "Otros";
      break;
    default:
      animal.especie = "";
      break;
  }

  if (localStorage.getItem("user")) {
    userType = retrievedData.tipo;
  }
  if (animal.vacunas === true) {
    animal.vacunas = "SI";
  } else {
    animal.vacunas = "NO";
  }

  if (animal.genero === "M") {
    animal.genero = "Macho";
  } else {
    animal.genero = "Hembra";
  }

  let deleteButton;
  if (userType === "Offerer") {
    deleteButton = (
      <Button
        className="w-50"
        variant="outline-danger"
        onClick={() => decideDelete(animal.id)}
      >
        {" "}
        Eliminar animal{" "}
      </Button>
    );
  }

  const decideDelete = async (animal) => {
    try {
      await axios.delete(
        "http://localhost:8000/furever/api/animal-adp/" + animal + "/"
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{animal?.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-center">
        <ListGroup className="d-flex justify-content-center">
          <ListGroup.Item>
            <b>Especie:</b> {animal.especie}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Raza:</b> {animal.raza}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Género:</b> {animal.genero}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Edad:</b> {animal.edad}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Peso:</b> {animal.peso}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Vacunas:</b> {animal.vacunas}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            <h4>Descripción</h4>
            {animal.descripcion}
          </ListGroup.Item>
          {animal.photos?.map((photo, index) => (
            <ListGroup.Item key={photo}>
              <a
                href={photo.link}
                target="_blank"
                rel="nonereferrer noreferrer"
              >
                Foto {index + 1}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Row className="d-flex justify-content-center mt-3">{deleteButton}</Row>
      </Modal.Body>
    </Modal>
  );
};
