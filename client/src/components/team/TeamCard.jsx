import {
  Text,
  Card,
  CardBody,
  Stack,
  Heading,
  AspectRatio,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function TeamCard({ team, handleJoinClick, isPlayerInTeam }) {
  const navigate = useNavigate();

  return (
    <Card maxW="sm" cursor="pointer">
      <CardBody>
        <AspectRatio ratio={4 / 3}>
          <Image
            src={team.teamPoster}
            alt={team.name}
            borderRadius="lg"
            objectFit="cover"
          />
        </AspectRatio>
        <Stack mt="6" spacing="3">
          <Heading size="md">{team.name}</Heading>
          <Text fontSize=".8rem" color="#4A5568">
            {team.description.substring(0, 100)}...
          </Text>
        </Stack>
        <Flex alignItems="center" justifyContent="center" gap={2} mt={2}>
          <Button
            colorScheme="purple"
            type="submit"
            fontWeight="400"
            onClick={() => navigate(`/team/${team._id}`)}
            size="sm"
            flex="1"
          >
            View
          </Button>

          {!isPlayerInTeam && (
            <Button
              variant="outline"
              onClick={() => handleJoinClick(team._id)}
              colorScheme="purple"
              size="sm"
              flex="1"
            >
              Join
            </Button>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}

export default TeamCard;
