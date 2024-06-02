import { Box, SimpleGrid, Text, Avatar, Code } from "@chakra-ui/react";
import React from "react";
import PersonalInformation from "./PersonalInformation";

export default function PlayerProfile({ userData }) {
  const { user, player } = userData;

  const fieldsPlayer = [
    "yearsOfExperience",
    "hoursPlayedPerWeek",
    "titlesOwn",
    "titlesWithSpecificTeamName",
    "strikerPositionScore",
    "wingerPositionScore",
    "midfielderPositionScore",
    "wingDefenderPositionScore",
    "centralBackPositionScore",
  ];

  return (
    <Box className="container" mt="3rem">
      <Box display="flex" flexDirection="column" gap={2} mb="2rem">
        <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
          <Avatar name={user.fullName} src={user.avatar} size="lg" />
          <Box>
            <Text fontSize="1rem" fontWeight="600">
              {user.fullName}
            </Text>
            <Code colorScheme="green" fontSize=".9rem">
              {user.userType}
            </Code>
          </Box>
        </Box>
        <Box display="flex" gap="2.5rem" fontSize=".9rem" mb={2}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontWeight="500">{player.ratings.length}</Text>
            <Text color="#2D3748">Ratings</Text>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontWeight="500">{player.fans.length}</Text>
            <Text color="#2D3748">Follower</Text>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text fontWeight="500">{player.zGold}</Text>
            <Text color="#2D3748">Zgold coin</Text>
          </Box>
        </Box>
      </Box>

      <PersonalInformation user={user} />

      <Box>
        <Text fontSize="1.3rem" fontWeight="600" mb="2rem">
          Player Information
        </Text>
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 2 }}
          spacing={4}
          fontSize="1rem"
        >
          {fieldsPlayer.map((field) => (
            <Box key={field}>
              <Text fontWeight="500" mb={1}>
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Text>
              <Text color="#4A5568">{player[field]}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
