import { useState, useEffect } from "react";
import { Box, Button, Select, SimpleGrid, Text } from "@chakra-ui/react";
import LoadingCard from "../LoadingCard";
import TeamCard from "./TeamCard";
import {
  getAllTeams,
  getAllTeamsBySearch,
  checkPlayerTeamStatus,
  getMyTeams,
  getMyTeamsBySearch,
  teamJoinReq,
} from "../../apis/api";
import MyHeading from "../others/MyHeading";
import MySearch from "../others/MySearch";
import toast from "react-hot-toast";

function MyTeams() {
  const token = localStorage.getItem("token");
  const [teams, setTeams] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("allteams");
  const [isPlayerInTeam, setIsPlayerInTeam] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, [currentPage, selectedOption]);

  useEffect(() => {
    checkIsPlayerAlreadyInTeam();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);

      let res;
      if (selectedOption === "allteams") {
        res = await getAllTeams(token, currentPage);
      } else {
        res = await getMyTeams(token, currentPage);
      }

      console.log(res.data.teams);

      setTeams(res.data.teams);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = async () => {
    if (inputValue === "") return;
    try {
      setIsLoading(true);
      let res;
      if (selectedOption === "allteams") {
        res = await getAllTeamsBySearch(token, inputValue);
      } else {
        res = await getMyTeamsBySearch(token, inputValue);
      }
      setTeams(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setCurrentPage(1); // Reset to first page on selection change
  };

  const checkIsPlayerAlreadyInTeam = async () => {
    try {
      const res = await checkPlayerTeamStatus(token);
      setIsPlayerInTeam(res.data.isJoined);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinClick = async (teamId) => {
    console.log(teamId);
    try {
      const res = await teamJoinReq(token, teamId);
      toast.success("Team Join Request Sent");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Box mb="2rem">
      <MyHeading title="Teams" description="Explore All Global Teams" />

      <Box
        mb="1rem"
        className="container"
        display="flex"
        gap="1rem"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <Box flex={1}>
          <MySearch
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSearch={handleSearch}
            placeholder="Search Team"
          />
        </Box>
        <Select w="300px" onChange={handleSelectChange} value={selectedOption}>
          <option value="allteams">All Teams</option>
          <option value="myteams">My Teams</option>
        </Select>
      </Box>

      <Box className="container">
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 3 }}
          spacing="2rem"
          width="100%"
          justifyItems="center"
          mb="2rem"
        >
          {!isLoading &&
            teams.length > 0 &&
            teams.map((team) => (
              <TeamCard
                key={team._id}
                team={team}
                handleJoinClick={handleJoinClick}
                isPlayerInTeam={isPlayerInTeam}
              />
            ))}
          {isLoading && (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          )}
          {!isLoading && teams.length == 0 && (
            <Box minH="60vh" w="100%">
              <Text mt="2rem" fontSize="1rem">
                No Teams Found
              </Text>
            </Box>
          )}
        </SimpleGrid>
        <Box
          display="flex"
          justifyContent="space-between"
          margin="0 auto"
          gap="2"
        >
          <Button
            colorScheme="purple"
            fontWeight="400"
            variant="outline"
            onClick={handlePrevPage}
            isDisabled={!pagination || !pagination.previous}
          >
            Prev
          </Button>
          <Button
            colorScheme="purple"
            fontWeight="400"
            color="#000"
            onClick={handleNextPage}
            isDisabled={!pagination || !pagination.next}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default MyTeams;
