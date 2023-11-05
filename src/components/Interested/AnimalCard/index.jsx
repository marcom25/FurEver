import { useState, useRef, useMemo, useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import Voodoo from "react-voodoo";
import * as cardStyles from "../../../utils/utils.js";
import { LuDog } from 'react-icons/lu';


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
            if (pos < 0 && !events.current.hasSwiped) {
              events.current.onDisliked?.(events.current?.curCard);
              tweener.pushAnim(cardStyles.anims.pushIn("dislikeOverlay", 250));
              events.current.hasSwiped = true;
            }
          },
        },
        {
          from: 85,
          duration: 0.01,
          entering: (pos) => {
            if (pos > 0 && !events.current.hasSwiped) {
              events.current.onLiked?.(events.current?.curCard);
              tweener.pushAnim(cardStyles.anims.pushIn("likeOverlay", 250));
              events.current.hasSwiped = true;
            }
          },
        },
      ],
    };
  }, []);

  useEffect(
    (e) => {
      events.current = { onDisliked, onLiked, curCard, hasSwiped: false };
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
          <div className="nextCard w-100 h-100" draggable="false" key={"nextCard"}>
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
            <div className="card w-100 h-100" draggable="false">
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
          <div className={"fur-icon-yes"}>
            {/* <h1 className="fur-font">Conectados!</h1> */}
            <LuDog color="white" size="70px"/>
          </div>
        </Voodoo.Node>
        <Voodoo.Node
          id={"dislikeOverlay"}
          axes={styles.dislikeOverlay.axes}
          style={styles.dislikeOverlay.style}
        >
          <div className={"fur-icon-no"}>
            {/* <h1>Rechazado</h1> */}
            <LuDog color="white" size="70px"/>
          </div>
        </Voodoo.Node>
      </div>
      <div
        className="likeBtn text-success"
        onClick={(e) =>
          tweener.axes.hSwipe.scrollTo(100, 500, "easeCubicInOut")
        }
      >
        <BsHeartFill className="icons"/>
      </div>
      <div
        className="dislikeBtn text-danger"
        onClick={(e) => tweener.axes.hSwipe.scrollTo(0, 500, "easeCubicInOut")}
      >
        <FiX className="icons"/>
      </div>
    </ViewBox>
  );
};


