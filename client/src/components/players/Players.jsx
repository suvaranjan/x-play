import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import MyHeading from "../others/MyHeading";
import MySearch from "../others/MySearch";
import toast from "react-hot-toast";
import { getPlayersBySearch } from "../../apis/api";

function Players() {
  const [inputValue, setInputValue] = useState("");
  const [players, setPlayers] = useState([]);
  const [searching, setSearching] = useState(false);
  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (inputValue == "") return;
    try {
      setSearching(true);
      const res = await getPlayersBySearch(token, inputValue);
      setPlayers(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setSearching(false);
    }
  };
  const profileClick = (id) => {
    console.log(id);
  };
  return (
    <Box mb="2rem">
      <MyHeading
        title="Players"
        description="Explore all registered players."
      />

      <Box mb="1rem" className="container">
        <MySearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSearch={handleSearch}
          placeholder="Search Player"
        />
        <Box mt="2rem">
          {players.map((user) => {
            return (
              <PlayerCard
                // searchResults={searchResults}
                name={user.fullName}
                photo={user.avatar}
                playerId={user.playerId}
                profileClick={profileClick}
                key={user._id}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Players;

function PlayerCard({ name, photo, playerId, profileClick }) {
  return (
    <Box
      maxW="600px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="md"
      mb={3}
      p={3}
      borderWidth={1}
      // bg="#EDF2F7"
    >
      <Box display="flex" alignItems="center" mr="3rem">
        <Avatar src={photo} name={name} size="sm" />
        <Text fontSize="1rem" fontWeight="500" ml={3}>
          {name}
        </Text>
      </Box>

      <Button
        colorScheme="green"
        // size="sm"
        rightIcon={<ExternalLinkIcon />}
        mr={4}
        fontWeight="400"
        onClick={() => profileClick(playerId)}
      >
        Profile
      </Button>
    </Box>
  );
}
