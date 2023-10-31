import { useState } from "react";

import { AnimalCard } from "../AnimalCard";
import { useFetch } from "../../../hooks/useFetch";
import { Card } from "react-bootstrap";
import { API } from "../../../API/API";

export const AnimalStack = () => {
  const session = JSON.parse(localStorage.getItem("user"));
  const { data: animals } = useFetch("animal-adp/?interested="+session.id);

  let [cardIndex, setCardIndex] = useState(0);
  let type_d;
  

  const handleLike = async (card) => {
    console.log("Liked: ", card);
    next(card,"like");
  }

  const handleDislike = async (card) => {
    console.log("DisLiked: ", card);
    next(card,"dis");
  }

  const next = async (card,desi) => {
    if(desi == "like"){
      type_d = "P"
    }else{
      type_d="N"
    }
    try {
      const response = await API.post("card-d/", {
        interested: session.id,
        animal: card.id,
        type: type_d
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
      <div className="d-flex justify-content-center w-100 position-relative" style={{height: "80vh"}}>
        <div className={"desk"}>
          <AnimalCard
            card={animals[cardIndex]}
            nextCard={animals[(cardIndex + 1) % animals.length]}
            onDisliked={handleDislike}
            onLiked={handleLike}
          >
            {(card) =>
              animals.length > 0 && card ? (
                <Card draggable="false">
                  <Card.Img
                    src={
                      card.photos[0]
                        ? "https://drive.google.com/uc?id=" + card.photos[0].id
                        : ""
                    }
                    alt={card.nombre}
                    key={card.id}
                  />

                  <Card.ImgOverlay className="d-flex align-items-center flex-column justify-content-end">
                    <Card.Title>{card.nombre}</Card.Title>
                    <Card.Text>{card.descripcion}</Card.Text>
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

// return (
//   <>
//     <div
//       className="d-flex justify-content-center w-100"
//       style={{ height: "60vh" }}
//     >
//       {animals?.length > 0 &&
//         animals.map((animal, index) => (
//         <div
//           className="animal-card"
//           ref={childRefs[index]}
//           key={animal.nombre}
//           onSwipe={(dir) => swiped(dir, animal.nombre, index)}
//           onCardLeftScreen={() => outOfFrame(animal.nombre, index)}
//         >
//           <AnimalCard {...animal} />
//         </div>
//       ))}
//     </div>
//     <div className="m-2 p-1 rounded-2 w-100 d-flex flex-wrap flex-shrink-0 justify-content-center align-items-center gap-2">
//       <Button onClick={() => swipe("left")}>Izquierda</Button>
//       <Button onClick={() => swipe("right")}>Derecha</Button>
//     </div>
//   </>
// );
