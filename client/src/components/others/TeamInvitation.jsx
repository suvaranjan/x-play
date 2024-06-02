import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyHeading from "./MyHeading";
import {
  acceptTeamInvitation,
  fetchTeamInvitations,
  rejectTeamInvitation,
} from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function TeamInvitation() {
  const token = localStorage.getItem("token");
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      const res = await fetchTeamInvitations(token);
      setInvitations(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (teamId) => {
    try {
      const res = await acceptTeamInvitation(token, teamId);
      setInvitations((prev) => prev.filter((p) => p._id !== teamId));
      toast.success("Team invitation accepted");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleReject = async (teamId) => {
    try {
      const res = await rejectTeamInvitation(token, teamId);
      setInvitations((prev) => prev.filter((p) => p._id !== teamId));
      toast.success("Team invitation rejected");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Box>
      <MyHeading
        title="Team Invitation"
        description="Your All team invitation appear here"
      />
      <Box className="container">
        {!isLoading &&
          invitations.length > 0 &&
          invitations.map((invitation, index) => {
            return (
              <InvitationCad
                invitation={invitation}
                key={index}
                navigate={navigate}
                handleAccept={handleAccept}
                handleReject={handleReject}
              />
            );
          })}
        {!isLoading && invitations.length == 0 && (
          <Text mt="4" fontSize="1rem">
            You have no invitations.
          </Text>
        )}
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
      </Box>
    </Box>
  );
}

function InvitationCad({ invitation, navigate, handleAccept, handleReject }) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Text textAlign="center" fontSize="1.2rem" fontWeight="500" mb={3}>
          New team Invitation
        </Text>

        <Divider borderColor="#A0AEC0" />

        <Box
          mt="4"
          fontSize=".9rem"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box display="flex" gap={2}>
            <Text fontWeight="500">Team Name : </Text>
            <Text>{invitation.name}</Text>
          </Box>

          <Box display="flex" justifyContent="space-between" mt="1rem">
            <Button
              size="sm"
              variant="outline"
              colorScheme="purple"
              onClick={() => navigate(`/team/${invitation._id}`)}
            >
              View Team
            </Button>
            <Box display="flex" gap={2}>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleReject(invitation._id)}
              >
                Reject
              </Button>
              <Button
                size="sm"
                colorScheme="purple"
                onClick={() => handleAccept(invitation._id)}
              >
                Accept
              </Button>
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
export default TeamInvitation;
