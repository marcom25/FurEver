import React from "react";
import {ListGroup,Modal } from 'react-bootstrap';



export const AnimalModal = ({nombre,descripcion,photos,especie,peso,raza,genero,vacunas,edad})=> {
    if(vacunas === true){
        vacunas = "SI"
    }else{
        vacunas="NO"
    }

    if(genero === "M"){
        genero = "Macho"
    }else{
        genero="Hembra"
    }



    return(
        <>
        <Modal.Header closeButton>
          <Modal.Title>{nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
        <ListGroup className="d-flex justify-content-center">
        <ListGroup.Item ><b>Especie:</b> {especie}</ListGroup.Item>
        <ListGroup.Item ><b>Raza:</b> {raza}</ListGroup.Item>
        <ListGroup.Item ><b>Género:</b> {genero}</ListGroup.Item>
        <ListGroup.Item ><b>Edad:</b> {edad}</ListGroup.Item>
        <ListGroup.Item ><b>Peso:</b> {peso}</ListGroup.Item>
        <ListGroup.Item ><b>Vacunas:</b> {vacunas}</ListGroup.Item>
        </ListGroup>
        <ListGroup>
        <ListGroup.Item>
          <h4>Descripción</h4>
          {descripcion}
          </ListGroup.Item >
          {photos?.map((photo,index)=>(
            <ListGroup.Item key={photo}>
            <a href={photo}>
             Foto {index +1}
            </a>
            </ListGroup.Item>

          ))}
          
        </ListGroup>
        </Modal.Body>
        </>
    );

}
