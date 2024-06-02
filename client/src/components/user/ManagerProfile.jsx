import { Box, Text, Avatar, Code } from "@chakra-ui/react";
import React from "react";
import PersonalInformation from "./PersonalInformation";

export default function PlayerProfile({ user }) {
  // const { user, player } = userData;

  return (
    <Box className="container" mt="3rem">
      <Box display="flex" flexDirection="column" gap={2} mb="2rem">
        <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
          <Avatar name={user.fullName} src={user.avatar} size="lg" />
          <Box>
            <Text fontSize="1rem" fontWeight="600" mb={1}>
              {user.fullName}
            </Text>
            <Code colorScheme="green" fontSize=".9rem">
              {user.userType === "Team" && "Team Manager"}
              {user.userType !== "Team" && user.userType}
            </Code>
          </Box>
        </Box>
      </Box>

      <PersonalInformation user={user} />
    </Box>
  );
}
