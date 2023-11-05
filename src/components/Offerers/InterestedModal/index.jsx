import React from "react";
import { ListGroup, Modal } from "react-bootstrap";

export const InterestedModal = ({
  nombre,
  descripcion,
  photos,
  ap,
  aa,
  ninos,
  horarios,
  hogar,
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-center">
        <ListGroup horizontal className="d-flex justify-content-center w-100">
          <ListGroup.Item className="flex-grow-1" variant={ap ? "success" : "danger"}>
            Animales previos: {ap ? "Si" : "No"}
          </ListGroup.Item>
          <ListGroup.Item className="flex-grow-1" variant={aa ? "success" : "danger"}>
            Animales actuales: {aa ? "Si" : "No"}
          </ListGroup.Item>
          <ListGroup.Item className="flex-grow-1" variant={ninos ? "success" : "danger"}>
            Niños: {ninos ? "Si" : "No"}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>Horarios: {horarios}</ListGroup.Item>
          <ListGroup.Item>Hogar: {hogar}</ListGroup.Item>
          <ListGroup.Item>
            <h4>Descripción</h4>
            {descripcion}
          </ListGroup.Item>
          {photos?.length > 0 &&
            photos.map((photo, index) => (
              <ListGroup.Item key={photo}>
                <a href={photo}>Foto {index + 1}</a>
              </ListGroup.Item>
            ))}
        </ListGroup>
      
      </Modal.Body>
    </>
  );
};
