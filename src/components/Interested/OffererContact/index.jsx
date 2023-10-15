import React from "react";
import {Container, ListGroup,Modal } from 'react-bootstrap';


export const OffererContactModal = ({nombre,telefono})=> {
    return(
        <>
        <Modal.Header className="d-flex justify-content-center" closeButton >
        <Modal.Title>Información de contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body  className="d-flex flex-column justify-content-center">
        <Container className="d-flex flex-column justify-content-center">
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <p className="m-0">Nombre:</p>
            <h3>{nombre}</h3>
        </Container>
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <p className="m-0">Teléfono:</p>
            <h3>{telefono}</h3>
        </Container>
        </Container>
        </Modal.Body>
        
        </>
    )
}
