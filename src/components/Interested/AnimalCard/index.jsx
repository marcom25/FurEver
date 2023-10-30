import { useState, useRef, useMemo, useEffect } from "react";
import Voodoo from "react-voodoo";
import * as cardStyles from "../../../utils/utils.js";

export const AnimalCard = ({
  children,
  onDisliked,
  onLiked,
  nextCard,
  card,
}) => {
  const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true });
  const [curCard, setCurCard] = useState(card);
  const [curNextCard, setCurNextCard] = useState(nextCard);
  const renderCard = children;
  const rootNode = useRef();
  const events = useRef({});
  const styles = useMemo(() => {
    return {
      inverse: (delta) => -delta,
      container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        perspective: "800px",
        transform: "translate(-50%,-50%)",
      },
      ...cardStyles,
      hInertia: {
        wayPoints: [{ at: 0 }, { at: 50 }, { at: 100 }],
      },
      vInertia: {
        wayPoints: [{ at: 50 }],
      },
      hSwipeAxis: [
        {
          from: 30,
          duration: 40,
          moving: (pos, precPos, update) => {
            tweener.scrollTo(Math.abs(0.5 - pos) * 200, 0, "showNext");
          },
        },
        {
          from: 15,
          duration: 0.01,
          entering: (pos) => {
            if (pos < 0) {
              // from 50 to 0 ( init go from 0 to 50 )
              events.current.onDisliked?.(events.current?.curCard);
              tweener.pushAnim(cardStyles.anims.pushIn("dislikeOverlay", 250));
            }
          },
        },
        {
          from: 85,
          duration: 0.01,
          entering: (pos) => {
            if (pos > 0) {
              // from 50 to 100
              events.current.onLiked?.(events.current?.curCard);
              tweener.pushAnim(cardStyles.anims.pushIn("likeOverlay", 250));
            }
          },
        },
      ],
    };
  }, []);

  useEffect(
    (e) => {
      events.current = { onDisliked, onLiked, curCard };
    },
    [onDisliked, onLiked, curCard]
  );

  useEffect(
    (e) => {
      if (card !== curCard)
        tweener.scrollTo(0, 250, "show").then((e) => {
          setCurCard(card);
        });
    },
    [card, curCard, tweener]
  );
  useEffect(
    (e) => {
      tweener.scrollTo(50, 0, "hSwipe");
      tweener.scrollTo(50, 0, "vSwipe");
      tweener.scrollTo(100, 0, "showNext");
      tweener.scrollTo(100, 250, "show").then((e) => {
        tweener.scrollTo(0, 0, "showNext");
        setCurNextCard(nextCard);
      });
    },
    [curCard, tweener]
  );
  return (
    <ViewBox className={"SwipeCard"} style={styles.container} ref={rootNode}>
      <Voodoo.Axis
        axe={"hSwipe"}
        size={100}
        scrollableWindow={40}
        defaultPosition={50}
        items={styles.hSwipeAxis}
        inertia={styles.hInertia}
      />
      <Voodoo.Axis
        axe={"vSwipe"}
        size={100}
        defaultPosition={50}
        inertia={styles.vInertia}
      />

      <Voodoo.Axis axe={"show"} size={100} defaultPosition={100} />

      <Voodoo.Axis axe={"showNext"} size={100} defaultPosition={100} />

      <div className={"layer"}>
        <Voodoo.Node axes={styles.nextCard.axes} style={styles.nextCard.style}>
          <div className={"nextCard"} draggable="false" key={"nextCard"}>
            {renderCard?.(curNextCard)}
          </div>
        </Voodoo.Node>
      </div>

      <div className={"layer"}>
        <Voodoo.Draggable
          yHook={styles.inverse}
          xHook={styles.inverse}
          yAxis={"vSwipe"}
          xAxis={"hSwipe"}
        >
          <Voodoo.Node axes={styles.card.axes} style={styles.card.style}>
            <div className={"card"} draggable="false">
              {renderCard?.(curCard)}
            </div>
          </Voodoo.Node>
        </Voodoo.Draggable>
      </div>

      <div className={"layer noEvent"}>
        <Voodoo.Node
          id={"likeOverlay"}
          axes={styles.likeOverlay.axes}
          style={styles.likeOverlay.style}
        >
          <div className={"likeOverlay"}>
            <h1>Aceptado</h1>
          </div>
        </Voodoo.Node>
        <Voodoo.Node
          id={"dislikeOverlay"}
          axes={styles.dislikeOverlay.axes}
          style={styles.dislikeOverlay.style}
        >
          <div className={"dislikeOverlay"}>
            <h1>Rechazado</h1>
          </div>
        </Voodoo.Node>
      </div>
      <div
        className={"likeBtn"}
        onClick={(e) =>
          tweener.axes.hSwipe.scrollTo(100, 500, "easeCubicInOut")
        }
      >
        ❤️
      </div>
      <div
        className={"dislikeBtn"}
        onClick={(e) => tweener.axes.hSwipe.scrollTo(0, 500, "easeCubicInOut")}
      >
        ❌
      </div>
    </ViewBox>
  );
};

// export const AnimalCard = ({
//   nombre,
//   especie,
//   raza,
//   vacunas_completas,
//   edad,
//   necesidades_esp,
//   photos,
//   genero,
//   peso,
//   descripcion,
//   fecha_creacion,
// }) => {
//   const [showMore, setshowMore] = useState(false);

//   return showMore ? (
//     <Card className="rounded-3 h-100" style={{ width: "20vw" }}>
//       <Card.Body className="d-flex align-items-start flex-column justify-content-center">
//         <Card.Title>Informacion de {nombre}</Card.Title>
//         <Card.Text>Especie: {especie}</Card.Text>
//         <Card.Text>Raza: {raza}</Card.Text>
//         <Card.Text>
//           Vacunas Completas: {vacunas_completas ? "✅" : "❌"}
//         </Card.Text>
//         <Card.Text>Edad: {edad}</Card.Text>
//         <Card.Text>Necesidades Especiales: {necesidades_esp}</Card.Text>
//         <Card.Text>Genero: {genero}</Card.Text>
//         <Card.Text>Peso : {peso}</Card.Text>
//         <Card.Text>Fecha de creacion : {fecha_creacion}</Card.Text>
//         <Button
//           className="align-self-center"
//           variant="primary"
//           onClick={() => setshowMore(false)}
//         >
//           Volver
//         </Button>
//       </Card.Body>
//     </Card>
//   ) : (
//     <Card className="rounded-3 h-100" style={{ width: "20vw" }}>
//       <Card.Img src={ photos.length > 0 ? "https://drive.google.com/uc?id="+photos[0].id : placeholderImg} alt={especie} />
//       <Card.ImgOverlay className="d-flex align-items-center flex-column justify-content-end">
//         <Card.Title>{nombre}</Card.Title>
//         <Card.Text>{descripcion}</Card.Text>
//         <Button variant="primary" onClick={() => setshowMore(true)}>
//           Ver mas
//         </Button>
//       </Card.ImgOverlay>
//     </Card>
//   );
// };
