import { useState, useEffect } from "react";
import { ListGroup, Modal, Button, Row } from "react-bootstrap";
import axios from "axios";

export const AnimalModal = ({ show, onHide, animal }) => {
  const [species, setSpecies] = useState("");
  const retrievedData = JSON.parse(localStorage.getItem("user"));
  let userType;

  useEffect(() => {
    if (animal) {
      switch (animal.especie) {
        case "P":
          setSpecies("Perro");
          break;
        case "G":
          setSpecies("Gato");
          break;
        case "C":
          setSpecies("Conejo");
          break;
        case "T":
          setSpecies("Tortuga");
          break;
        case "S":
          setSpecies("Serpiente");
          break;
        case "DG":
          setSpecies("De granja");
          break;
        case "O":
          setSpecies("Otros");
          break;
        default:
          setSpecies("No definido");
          break;
      }
    }
  }, [animal]);

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

  if (localStorage.getItem("user")) {
    userType = retrievedData.tipo;
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
            <b>Especie:</b> {species}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Raza:</b> {animal.raza}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Género:</b> {animal.genero === "M" ? "Macho" : "Hembra"}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Edad:</b> {animal.edad}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Peso:</b> {animal.peso}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Vacunas:</b> {animal.vacunas ? "Si" : "No"}
          </ListGroup.Item>

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
