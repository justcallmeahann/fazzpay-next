import { useNProgress } from "@tanem/react-nprogress";

import { Bar } from "./Bar";
import { Container } from "./Container";

export const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  <Container animationDuration={animationDuration} isFinished={isFinished}>
    <Bar animationDuration={animationDuration} progress={progress} />
  </Container>;
};
