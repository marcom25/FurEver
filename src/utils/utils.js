import { pushIn } from "./anims";

export const anims = { pushIn };
export const card = {
  style: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: ["100%", "-20px"],
    height: ["100%", "-170px"],
    transform: [
      {
        translateY: "100%",
        translateX: "0%",
      },
      {
        rotateZ: "-30deg",
        rotateY: "30deg",
      },
      {
        translateZ: "-200px",
        translateY: "-200%",
      },
      {},
    ],
    //filter            : {// this cause some lag in low perf devices
    //	grayscale: "100%"
    //},
    opacity: 0,
    backgroundColor: "white",
    borderRadius: "5px",
    overflow: "hidden",
    cursor: "pointer",
    backfaceVisibility: "hidden", // safari perfs
    zIndex: 100,
  },
  axes: {
    hSwipe: [
      {
        from: 0,
        duration: 100,
        apply: {
          transform: [
            {},
            {
              rotateY: "-60deg",
              rotateZ: "60deg",
            },
            {},
          ],
        },
      },
      {
        from: 40,
        duration: 10,
        apply: {
          //filter: {
          //	grayscale: "-100%"
          //},
        },
      },
      {
        from: 0,
        duration: 20,
        apply: {
          opacity: 1,
        },
      },
      {
        from: 80,
        duration: 20,
        apply: {
          opacity: -1,
        },
      },
    ],
    vSwipe: [
      {
        from: 0,
        duration: 100,
        apply: {
          transform: [
            {
              translateY: "200%",
            },
            {},
            {
              //translateZ: "10px"
            },
          ],
        },
      },
    ],
    show: [
      {
        from: 0,
        duration: 100,
        apply: {
          //opacity: 1
        },
      },
    ],
  },
};
export const dislikeOverlay = {
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "200px",
    height: "200px",
    transform: [
      {
        translateX: "-50%",
        translateY: "-50%",
      },
    ],
    fontSize: "12px",
    opacity: 0,
    pointerEvents: "none",
  },
  axes: {
    hSwipe: [
      {
        from: 35,
        duration: 15,
        apply: {
          transform: [
            {
              translateY: "100%",
            },
          ],
          opacity: -1,
        },
      },
    ],
    show: [
      {
        from: 0,
        duration: 50,
        apply: {
          opacity: 1,
        },
      },
    ],
  },
};
export const likeOverlay = {
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "200px",
    height: "200px",
    transform: [
      {
        translateX: "-50%",
        translateY: "150%",
      },
    ],
    opacity: 0,
    pointerEvents: "none",
  },
  axes: {
    hSwipe: [
      {
        from: 50,
        duration: 15,
        apply: {
          transform: [
            {
              translateY: "-100%",
            },
          ],
          opacity: 1,
        },
      },
    ],
    show: [
      {
        from: 0,
        duration: 50,
        apply: {
          opacity: 0,
        },
      },
    ],
  },
};
export const nextCard = {
  style: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: ["100%", "-20px"],
    height: ["100%", "-170px"],
    perspective: "1",
    transform: [
      {
        translateZ: "-20px",
      },
      {},
      {},
      {},
    ],
    //filter         : {
    //	blur: "5px"
    //},
    backgroundColor: "white",
    borderRadius: "5px",
    opacity: 0.5,
    overflow: "hidden",
    zIndex: 1,
  },
  axes: {
    showNext: [
      {
        from: 0,
        duration: 100,
        apply: {
          transform: [
            {
              translateZ: "20px",
            },
          ],
          //filter         : {
          //	blur: "-5px"
          //},
          opacity: 0.5,
        },
      },
    ],
  },
};
