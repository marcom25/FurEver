import { useState, useRef, useMemo, createRef } from "react";
import { Button } from "react-bootstrap";
import TinderCard from "react-tinder-card";
import { AnimalCard } from "../AnimalCard";
import { useFetch } from "../../../hooks/useFetch";

import "./index.css";

export const AnimalStack = () => {
  const { loading, error, data: animals } = useFetch("animal-adp/");

  const [currentIndex, setCurrentIndex] = useState(animals.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(animals.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < animals.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center w-100"
        style={{ height: "60vh" }}
      >
        {animals?.length > 0 &&
          animals.map((animal, index) => (
          <TinderCard
            className="animal-card"
            ref={childRefs[index]}
            key={animal.nombre}
            onSwipe={(dir) => swiped(dir, animal.name, index)}
            onCardLeftScreen={() => outOfFrame(animal.name, index)}
          >
            <AnimalCard {...animal} />
          </TinderCard>
        ))}
      </div>
      <div className="m-2 p-1 rounded-2 w-100 d-flex flex-wrap flex-shrink-0 justify-content-center align-items-center gap-2">
        <Button onClick={() => swipe("left")}>Izquierda</Button>
        <Button onClick={() => swipe("right")}>Derecha</Button>
      </div>
    </>
  );
};
