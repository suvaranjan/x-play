import { Box, Text } from "@chakra-ui/react";
import React from "react";

function MyHeading({ title, description }) {
  return (
    <Box bg="purple.100" p="1rem" mb="1rem" mt="1.5rem">
      <Box className="container">
        <Text
          fontWeight="600"
          fontSize="1.5rem"
          textAlign={{ base: "center", md: "center", lg: "left" }}
        >
          {title}
        </Text>
        <Text
          fontSize=".8rem"
          mt={2}
          textAlign={{ base: "center", md: "center", lg: "left" }}
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
}

export default MyHeading;
