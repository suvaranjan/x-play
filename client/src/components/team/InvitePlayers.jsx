import { ArrowBackIcon, SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getPlayersBySearch, sendTeamInviteToPlayer } from "../../apis/api";
import toast from "react-hot-toast";

function InvitePlayers({ handleInviteClick, teamId }) {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (keyword == "") return;
    try {
      setSearching(true);
      const res = await getPlayersBySearch(token, keyword);
      setSearchResults(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setSearching(false);
    }
  };

  const inviteClick = async (playerId) => {
    try {
      const res = await sendTeamInviteToPlayer(token, teamId, playerId);
      console.log(res);
      toast.success("Invitation Sent");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Box>
      <Box>
        <Box display="flex" alignItems="center" mb="1rem">
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={handleInviteClick}
            fontWeight="400"
            mr={3}
          >
            Go Back
          </Button>
          <Text fontWeight="600" fontSize="1.2rem" color="#4A5568">
            Invite Players
          </Text>
        </Box>

        <Box display="flex" maxW="600px">
          <InputGroup mr={3}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search Player For Invitation"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </InputGroup>
          <Button
            colorScheme="teal"
            onClick={handleSearch}
            isLoading={searching}
            loadingText="Searching"
          >
            Search
          </Button>
        </Box>
      </Box>
      {searchResults.length > 0 && (
        <Box
          maxH="250px"
          overflow="scroll"
          overflowX="hidden"
          mb="1rem"
          mt="1rem"
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
          {searchResults.map((user) => {
            return (
              <PlayerCard
                searchResults={searchResults}
                name={user.fullName}
                photo={user.avatar}
                playerId={user.playerId}
                inviteClick={inviteClick}
                key={user._id}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}

function PlayerCard({ name, photo, playerId, inviteClick }) {
  return (
    <Box
      maxW="600px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="md"
      mb={3}
      p={3}
      bg="#EDF2F7"
    >
      <Box display="flex" alignItems="center" mr="3rem">
        <Avatar src={photo} name={name} size="sm" />
        <Text fontSize="1rem" fontWeight="500" ml={3}>
          {name}
        </Text>
      </Box>

      <Button
        colorScheme="teal"
        size="sm"
        rightIcon={<ExternalLinkIcon />}
        mr={4}
        fontWeight="400"
        onClick={() => inviteClick(playerId)}
      >
        Invite
      </Button>
    </Box>
  );
}

export default InvitePlayers;
