import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import { AddIcon, ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import InvitePlayers from "./InvitePlayers";
import TeamContract from "./TeamContract";
import { sendContractOffer } from "../../apis/api";

function TeamMembers({ players, teamId, isLoginUserManager }) {
  const token = localStorage.getItem("token");
  const [isInvitingPlayers, setIsInvitingPlayers] = useState(false);
  const [isAssigningContract, setIsAssigningContract] = useState(false);
  const [assigningContractDetails, setAssigningContractDetails] = useState({});

  const handleInviteClick = () => {
    setIsInvitingPlayers(!isInvitingPlayers);
  };

  const handleAssignContractClick = (obj) => {
    setIsAssigningContract(!isAssigningContract);
    setAssigningContractDetails(obj);
  };

  const handleContractSubmit = async (values, formik) => {
    try {
      const res = await sendContractOffer(
        token,
        assigningContractDetails.playerId,
        teamId,
        values
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  return (
    <Box mt="3rem">
      <Box className="container">
        <Box display="flex" alignItems="center" mb="1.5rem">
          <Text
            fontWeight="600"
            fontSize="1.5rem"
            textAlign={{ base: "center", md: "center", lg: "left" }}
            mr={3}
          >
            Team Members
          </Text>
        </Box>

        {!isInvitingPlayers && !isAssigningContract && (
          <Box>
            <Box display="flex" mb="1rem">
              <Text fontWeight="500" fontSize="1.2rem" mr="2rem">
                Players
              </Text>
            </Box>

            <Box>
              {isLoginUserManager && (
                <Box mb="1rem">
                  <Button
                    leftIcon={<AddIcon />}
                    variant="outline"
                    colorScheme="teal"
                    size="sm"
                    // mr="1rem"
                    onClick={handleInviteClick}
                  >
                    Invite Players
                  </Button>
                </Box>
              )}

              <Box mb="1rem">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input type="text" placeholder="Search Player" maxW="400px" />
                </InputGroup>
              </Box>

              <Box
                maxH="250px"
                overflow="scroll"
                overflowX="hidden"
                mb="1rem"
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  "&": {
                    msOverflowStyle: "none", // IE and Edge
                    scrollbarWidth: "none", // Firefox
                  },
                }}
              >
                {players.map((player) => {
                  return (
                    <PlayerCard
                      player={player}
                      key={player._id}
                      isLoginUserManager={isLoginUserManager}
                      handleAssignContractClick={handleAssignContractClick}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}

        {/* Invite Player Component */}
        {isInvitingPlayers && (
          <InvitePlayers
            handleInviteClick={handleInviteClick}
            teamId={teamId}
          />
        )}

        {/* Contract assignment form for player component */}
        {isAssigningContract && (
          <Box>
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={() => setIsAssigningContract(!isAssigningContract)}
              fontWeight="400"
              mb="1rem"
            >
              Go Back
            </Button>

            <TeamContract
              onSubmit={handleContractSubmit}
              playerName={assigningContractDetails.playerName}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default TeamMembers;
