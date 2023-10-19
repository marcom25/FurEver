import { useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";

export const AnimalCard = ({
  nombre,
  especie,
  raza,
  vacunas_completas,
  edad,
  necesidades_esp,
  photos,
  genero,
  peso,
  descripcion,
  fecha_creacion,
}) => {
  const [showMore, setshowMore] = useState(false);

  return showMore ? (
    <Card className="rounded-3 h-100" style={{ width: "20vw" }}>
      <Card.Body className="d-flex align-items-start flex-column justify-content-center">
        <Card.Title>Informacion de {nombre}</Card.Title>
        <Card.Text>Especie: {especie}</Card.Text>
        <Card.Text>Raza: {raza}</Card.Text>
        <Card.Text>
          Vacunas Completas: {vacunas_completas ? "✅" : "❌"}
        </Card.Text>
        <Card.Text>Edad: {edad}</Card.Text>
        <Card.Text>Necesidades Especiales: {necesidades_esp}</Card.Text>
        <Card.Text>Genero: {genero}</Card.Text>
        <Card.Text>Peso : {peso}</Card.Text>
        <Card.Text>Fecha de creacion : {fecha_creacion}</Card.Text>
        <Button className="align-self-center" variant="primary" onClick={() => setshowMore(false)}>
          Volver
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <Card className="rounded-3 h-100" style={{ width: "20vw" }}>
      <Carousel>
        {photos.map((photo, index) => (
          <Carousel.Item key={index}>
            <Card.Img src={photo.link} alt={especie} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.ImgOverlay className="d-flex align-items-center flex-column justify-content-end">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Button variant="primary" onClick={() => setshowMore(true)}>
          Ver mas
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
};
