import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 500vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1.0, borderRadius: "100px" },
  drag: {},
};

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-600, 600], [-360, 360]);
  const gradient = useTransform(
    x,
    [-600, 600],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  useEffect(() => {
    scrollYProgress.onChange(() => console.log(scrollYProgress.get()));
  }, [scrollYProgress]);

  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{ x: x, rotateZ: rotateZ, scale: scale }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default App;
