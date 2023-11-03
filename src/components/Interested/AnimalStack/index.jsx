import { useState } from "react";

import { AnimalCard } from "../AnimalCard";
import { useFetch } from "../../../hooks/useFetch";
import { Card } from "react-bootstrap";
import { API } from "../../../API/API";

export const AnimalStack = () => {
  const session = JSON.parse(localStorage.getItem("user"));
  const { data: animals } = useFetch("animal-adp/?interested=" + session.id);

  let [cardIndex, setCardIndex] = useState(0);
  let type_d;

  const handleLike = async (card) => {
    console.log("Liked: ", card);
    next(card, "like");
  };

  const handleDislike = async (card) => {
    console.log("DisLiked: ", card);
    next(card, "dis");
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setCardIndex((prevCardIndex) => {
      const nextIndex = (prevCardIndex + 1) % animals.length;
      const nextCard = animals[nextIndex];
      return nextIndex;
    });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center w-100 position-relative"
        style={{ height: "80vh" }}
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
                        {card.nombre} <span>{card.edad}</span>
                      </Card.Title>
                      <Card.Text className="m-0 fs-6">
                        {card.descripcion.substring(0, 150)}{" "}
                        {card.descripcion >= 20 && "..."}
                      </Card.Text>
                    </Card.Body>
                  </Card.ImgOverlay>
                </Card>
              ) : (
                <div>Spinner</div>
              )
            }
          </AnimalCard>
        </div>
      </div>
    </>
  );
};

// <Card.Text className="m-0">Genero: {card.genero == "M" ? "Macho": "Hembra"}</Card.Text>
