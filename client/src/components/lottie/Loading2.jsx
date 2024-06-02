import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "./loading2.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Loading2() {
  return (
    <Box minH="80vh" display="flex" justifyContent="center" alignItems="center">
      <Lottie options={defaultOptions} width={300} />
    </Box>
  );
}
