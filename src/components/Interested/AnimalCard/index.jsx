import React from "react";
import { Card, Button, Carousel } from "react-bootstrap";

export const AnimalCard = ({nombre, descripcion, photos, especie}) => {
  

  return (
    <Card className="rounded-3 h-100" style={{width: "20vw"}}>
        <Carousel>
          {photos.map((photo) => {
            <Carousel.Item>
              <Card.Img src={photo} alt={especie}/>
            </Carousel.Item>
          })}
        </Carousel>
        <Card.ImgOverlay className="d-flex align-items-center flex-column justify-content-end">
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>
            {descripcion}
          </Card.Text>
          <Button variant="primary">Ver mas</Button>
        </Card.ImgOverlay>
      </Card>
  );
};
