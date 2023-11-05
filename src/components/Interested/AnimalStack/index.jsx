import { useState, useEffect } from "react";
import { AnimalCard } from "../AnimalCard";
import { useFetch } from "../../../hooks/useFetch";
import {
  Card,
  Form,
  Container,
  Row,
  Col,
  Carousel,
  ListGroup,
} from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { API } from "../../../API/API";

export const AnimalStack = () => {
  const session = JSON.parse(localStorage.getItem("user"));
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [triggerFectch, setTriggerFetch] = useState(false);
  const [species, setSpecies] = useState("");

  const { data: animals } = useFetch(
    "animal-adp/?interested=" + session.id + "&especie=" + selectedSpecies,
    [triggerFectch]
  );

  let [cardIndex, setCardIndex] = useState(0);

  let type_d;

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
  };

  const handleShowMore = (card) => {
    setSelectedCard(card);
    setShowMore(!showMore);
  };

  const handleLike = async (card) => {
    next(card, "like");
    setTriggerFetch(!triggerFectch);
  };

  const handleDislike = async (card) => {
    next(card, "dis");
    setTriggerFetch(!triggerFectch);
  };

  const next = async (card, desition) => {
    if (desition === "like") {
      type_d = "P";
    } else {
      type_d = "N";
    }
    try {
      await API.post("card-d/", {
        interested: session.id,
        animal: card.id,
        type: type_d,
      });
    } catch (error) {
      console.log(error);
    }
    setCardIndex((prevCardIndex) => {
      const nextIndex = (prevCardIndex + 1) % animals.length;
      return nextIndex;
    });
  };

  useEffect(() => {
    if (selectedCard) {
      switch (selectedCard.especie) {
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
  }, [selectedCard]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {showMore && selectedCard ? (
            <Card>
              <Card.Header className="text-center text-white light-bg">
                <Card.Title className="fs-3 d-flex justify-content-between align-items-center">
                  Información de {selectedCard.nombre}
                  <AiOutlineClose onClick={handleShowMore} cursor="pointer" />
                </Card.Title>
              </Card.Header>
              <Card.Body className="mb-0">
                <Carousel>
                  {selectedCard.photos.map((photo) => (
                    <Carousel.Item
                      key={photo.id}
                      interval={2000}
                      style={{ height: "70vh" }}
                    >
                      <Card.Img
                        fluid
                        src={"https://drive.google.com/uc?id=" + photo.id}
                        alt={selectedCard.nombre}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Card.Text className="fs-6 mt-3">
                  Descripcion: {selectedCard.descripcion}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Especie: {species}</ListGroup.Item>
                <ListGroup.Item>Edad: {selectedCard.edad} años</ListGroup.Item>
                <ListGroup.Item>
                  Genero: {selectedCard.genero === "M" ? "Macho" : "Hembra"}
                </ListGroup.Item>
                <ListGroup.Item>Raza: {selectedCard.raza}</ListGroup.Item>
                <ListGroup.Item>Peso: {selectedCard.peso}</ListGroup.Item>
                <ListGroup.Item>
                  Vacunas: {selectedCard.vacunas ? "Si" : "No"}
                </ListGroup.Item>
                <ListGroup.Item>
                  Necesidades Especiales: {selectedCard.necesidades_esp}
                </ListGroup.Item>
              </ListGroup>
              <Card.Footer className="light-bg">
                Fecha cracion: {selectedCard.fecha_creacion}
              </Card.Footer>
            </Card>
          ) : (
            <>
              <div className="d-flex justify-content-center mb-3">
                <Form.Select
                  aria-label="Default select example"
                  value={selectedSpecies}
                  onChange={handleSpeciesChange}
                  className="fur-bg text-white w-auto"
                >
                  <option value="">¿Que estas buscando?</option>
                  <option value="P">Perro</option>
                  <option value="G">Gato</option>
                  <option value="C">Conejo</option>
                  <option value="T">Tortuga</option>
                  <option value="S">Serpiente</option>
                  <option value="DG">De granja</option>
                  <option value="O">Otros</option>
                </Form.Select>
              </div>
              <div
                className="d-flex justify-content-center w-100 position-relative"
                style={{ height: "70vh" }}
              >
                <div className={"desk"}>
                  <AnimalCard
                    card={animals[cardIndex]}
                    nextCard={animals[(cardIndex + 1) % animals.length]}
                    onDisliked={handleDislike}
                    onLiked={handleLike}
                  >
                    {(card) =>
                      animals.length > 0 && card ? (
                        <Card draggable="false" className="position-relative">
                          <Card.Img
                            src={
                              card.photos[0]
                                ? "https://drive.google.com/uc?id=" +
                                  card.photos[0].id
                                : ""
                            }
                            alt={card.nombre}
                            key={card.id}
                          />

                          <Card.ImgOverlay className="d-flex align-items-center flex-column animal-card text-white">
                            <Card.Body className="d-flex justify-content-start flex-column">
                              <Card.Title className="fs-3">
                                {card.nombre}, <span>{card.edad} años</span>
                              </Card.Title>

                              <Card.Text
                                className="m-0 fs-6"
                                onClick={() => handleShowMore(card)}
                              >
                                {card.descripcion.substring(0, 100)}{" "}
                                {card.descripcion.length >= 20 && "..."}
                              </Card.Text>
                            </Card.Body>
                          </Card.ImgOverlay>
                        </Card>
                      ) : (
                        <div>
                          <p>Parece que no hay animales disponibles..</p>
                        </div>
                      )
                    }
                  </AnimalCard>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
