import { useState } from "react";

import { AnimalCard } from "../AnimalCard";
import { useFetch } from "../../../hooks/useFetch";
import { Card, Form } from "react-bootstrap";
import { API } from "../../../API/API";

export const AnimalStack = () => {
  const session = JSON.parse(localStorage.getItem("user"));
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [triggerFectch, setTriggerFetch] = useState(false);

  const { data: animals } = useFetch(
    "animal-adp/?interested=" + session.id + "&especie=" + selectedSpecies,[triggerFectch]
  );

  // console.log(animals);
  let [cardIndex, setCardIndex] = useState(0);

  let type_d;

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
  };

  const handleLike = async (card) => {
    // console.log("Liked: ", card);
    next(card, "like");
    setTriggerFetch(!triggerFectch);
  };

  const handleDislike = async (card) => {
    // console.log("DisLiked: ", card);
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
      const response = await API.post("card-d/", {
        interested: session.id,
        animal: card.id,
        type: type_d,
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    setCardIndex((prevCardIndex) => {
      const nextIndex = (prevCardIndex + 1) % animals.length;
      return nextIndex;
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <Form.Select
          aria-label="Default select example"
          value={selectedSpecies}
          onChange={handleSpeciesChange}
          className="fur-bg text-white"
          style={{ width: "auto" }}
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
                        ? "https://drive.google.com/uc?id=" + card.photos[0].id
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
                      <Card.Text className="m-0 fs-6">
                        {card.descripcion.substring(0, 150)}{" "}
                        {card.descripcion >= 20 && "..."}
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
  );
};

// <Card.Text className="m-0">Genero: {card.genero == "M" ? "Macho": "Hembra"}</Card.Text>
