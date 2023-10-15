import React from "react";
import {ListGroup,Modal } from 'react-bootstrap';



export const InterestedModal = ({nombre,descripcion,photos,ap,aa,ninos,horarios,hogar})=> {
    if(ap === true){
        ap = "SI"
    }else{
        ap="NO"
    }

    if(aa === true){
        aa = "SI"
    }else{
        aa="NO"
    }
    if(ninos === true){
        ninos = "SI"
    }else{
        ninos="NO"
    }



    return(
        <>
        <Modal.Header closeButton>
          <Modal.Title>{nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
        <ListGroup horizontal className="d-flex justify-content-center">
        <ListGroup.Item variant="danger">Animales previos: {ap}</ListGroup.Item>
        <ListGroup.Item variant="success">Animnales actuales: {aa}</ListGroup.Item>
        <ListGroup.Item variant="danger">Niños: {ninos}</ListGroup.Item>
        </ListGroup>
        <ListGroup>
        <ListGroup.Item>
            Horarios: {horarios}
        </ListGroup.Item>

        </ListGroup>
        <ListGroup>
        <ListGroup.Item>
            Hogar: {hogar}
        </ListGroup.Item>

        </ListGroup>
        <ListGroup>
        <ListGroup.Item>
          <h4>Descripción</h4>
          {descripcion}
          </ListGroup.Item>
          {photos?.length > 0 && photos.map((photo,index)=>(
            <ListGroup.Item key={photo}>
            <a href={photo}>
             Foto {index + 1}
            </a>
            </ListGroup.Item>

          ))}
        </ListGroup>
        </Modal.Body>

        </>
    );

}
