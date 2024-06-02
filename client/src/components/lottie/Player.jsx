import { Box } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "./player.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Player() {
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie options={defaultOptions} width={300} />
    </Box>
  );
}
