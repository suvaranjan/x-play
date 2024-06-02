import React from "react";
import { Avatar, Box, Heading, Text } from "@chakra-ui/react";

function AuthHero({
  heading,
  description,
  reviewText,
  reviewerName,
  reviewerRole,
  reviewerPhoto,
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDir="column"
      maxW="400px"
      // maxH="90vh"
      bg="purple.400"
      margin={0}
      p={7}
      borderRadius="md"
      m={3}
      maxH="95vh"
    >
      <Heading fontSize="1rem">XPLAY</Heading>
      <Box>
        <Heading mb={3}>{heading}</Heading>
        <Text>{description}</Text>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        borderRadius="md"
        bg="purple.300"
        p={3}
      >
        <Text mb={2}>{reviewText}</Text>
        <Box display="flex" alignItems="center">
          <Avatar name={reviewerName} src={reviewerPhoto} size="sm" mr={2} />
          <Box>
            <Text fontWeight="500">{reviewerName}</Text>
            <Text>{reviewerRole}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthHero;
