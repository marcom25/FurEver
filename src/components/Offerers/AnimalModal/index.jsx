import React from "react";
import {ListGroup,Modal,Button,Row } from 'react-bootstrap';
import axios from "axios";



export const AnimalModal = ({id,nombre,descripcion,photos,especie,peso,raza,genero,vacunas,edad})=> {
  const retrievedData = JSON.parse(localStorage.getItem("user"));
  let userType
  
  if (localStorage.getItem("user")) {
    userType = retrievedData.tipo
  }
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

    let deleteButton;
    if(userType == "Offerer"){
      deleteButton =  <Button className="w-50" variant="outline-danger" onClick={() => decideDelete(id)}> Eliminar animal </Button>

    }


    const decideDelete = async (animal) => {
        try {
          const response = await axios.delete("http://localhost:8000/furever/api/animal-adp/"+ animal+"/");
          window.location.reload()
    
        } catch (error) {
          console.log(error);
        }
      };
    



    return(
        <>
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
            <a href={photo.link} target="_blank">
             Foto {index +1}
            </a>
            </ListGroup.Item>

          ))}
          
        </ListGroup>
        <Row className="d-flex justify-content-center mt-3">
        {deleteButton}

        </Row>

        </Modal.Body>
        </>
    );

}
