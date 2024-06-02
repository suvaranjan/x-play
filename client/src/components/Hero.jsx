import { Box, Button, Image, Text } from "@chakra-ui/react";
import Player from "././lottie/Player";
// import MySwiper from "./MySwiper";
// import { useNavigate } from "react-router-dom";

function Hero() {
  return (
    <Box minH="65vh" className="container" mt={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="hero-main"
      >
        <Box
          maxWidth="500px"
          gap="1rem"
          display="flex"
          flexDirection="column"
          className="hero-main-box-1"
        >
          {/* <MySwiper /> */}
          <Text
            fontSize={{ base: "2rem", md: "2.5rem" }}
            fontWeight="700"
            color="#2D2E32"
          >
            Create,Join, Share: Your Match,Team and Events
          </Text>
          <Text color="#555555" fontSize=".9rem">
            Organize games, join teams, and share events effortlessly online.
          </Text>
          <Button
            colorScheme="purple"
            width="fit-content"
            fontWeight="400"
            // onClick={trynowFunc}
          >
            Try now
          </Button>
        </Box>
        <Box boxSize="sm" display="flex" alignItems="center">
          {/* <Image
            src="https://plus.unsplash.com/premium_vector-1682303058649-52fb42b3c7cf?bg=FFFFFF&q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dan Abramov"
          /> */}
          <Player />
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
