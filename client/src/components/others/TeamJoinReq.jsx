import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  getTeamJoinReqs,
  teamJoinReqAccept,
  teamJoinReqReject,
} from "../../apis/api";
import MyHeading from "./MyHeading";
import toast from "react-hot-toast";

function TeamJoinReq() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [playerReqs, setPlayerReqs] = useState([]);

  useEffect(() => {
    fetchTeamJoinReqs();
  }, []);

  const fetchTeamJoinReqs = async () => {
    try {
      setIsLoading(true);
      const res = await getTeamJoinReqs(token);
      console.log(res.data.joinRequests);
      setPlayerReqs(res.data.joinRequests);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (playerId, teamId) => {
    try {
      const res = await teamJoinReqAccept(token, playerId, teamId);
      setPlayerReqs((prev) => prev.filter((p) => p.playerId !== playerId));
      toast.success("Join request accepted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (playerId, teamId) => {
    try {
      const res = await teamJoinReqReject(token, playerId, teamId);
      setPlayerReqs((prev) => prev.filter((p) => p.playerId !== playerId));
      toast.success("Join request rejected successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mb="3rem">
      <MyHeading
        title="Team Join Requests"
        description="The players who have requested to join all of your created teams."
      />
      <Box className="container">
        {playerReqs.map((p, i) => {
          return (
            <ReqCard
              teamName={p.teamName}
              userAvatar={p.avatar}
              userName={p.fullName}
              playerId={p.playerId}
              teamId={p.teamId}
              handleAccept={handleAccept}
              handleReject={handleReject}
              key={i}
            />
          );
        })}
        {isLoading && (
          <Center minH="50vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          </Center>
        )}
        {!isLoading && playerReqs.length === 0 && (
          <Text fontSize="1rem">You have no new team join requests</Text>
        )}
      </Box>
    </Box>
  );
}

function ReqCard({
  teamName,
  userAvatar,
  userName,
  playerId,
  teamId,
  handleAccept,
  handleReject,
}) {
  return (
    <Box
      border="1px solid #CBD5E0"
      fontSize="1rem"
      width="fit-content"
      borderRadius="md"
    >
      <Box p={1} color="#4A5568">
        <Text textAlign="center" mb={1} fontSize="1rem" fontWeight="500">
          New Player Request
        </Text>
        <Text textAlign="center" fontSize=".8rem">
          Team name : {teamName}{" "}
        </Text>
      </Box>

      <Divider borderWidth={1} borderColor="#CBD5E0" />
      <Box display="flex" alignItems="center" gap={2} p="1rem">
        <Avatar src={userAvatar} />
        <Box>
          <Text mb={2} fontWeight="500" color="#4A5568">
            {userName}
          </Text>
          <Box>
            <Button
              variant="outline"
              colorScheme="red"
              fontWeight="400"
              size="sm"
              onClick={() => handleReject(playerId, teamId)}
            >
              Reject
            </Button>
            <Button
              ml={2}
              colorScheme="purple"
              fontWeight="400"
              size="sm"
              onClick={() => handleAccept(playerId, teamId)}
            >
              Accept
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TeamJoinReq;
