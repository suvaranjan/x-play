import {
  Box,
  Select,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserCreatedTeams } from "../../apis/api"; // Import your API function for fetching user-created teams
import { handleImageUpload } from "../../helper/imageUpload"; // Import the image upload function
import MyHeading from "../others/MyHeading";

function CreateMatch() {
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeam1, setSelectedTeam1] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [matchPoster, setMatchPoster] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    maxPlayers: "",
    description: "",
    winningAmount: "",
    rules: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserTeams();
  }, []);

  const fetchUserTeams = async () => {
    try {
      const res = await getUserCreatedTeams(token); // Assuming getUserCreatedTeams is an async function
      setUserTeams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeam1Select = (e) => {
    setSelectedTeam1(e.target.value);
    setSelectedTeams([]);
  };

  const handleTeam2Select = (e) => {
    const teamId = e.target.value;
    setSelectedTeams([selectedTeam1, teamId]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePosterUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await handleImageUpload(file, setMatchPoster, setImageUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is empty
    const isEmpty = Object.values(formData).some((value) => value === "");
    if (isEmpty) {
      alert("Please fill out all fields");
      return;
    }
    // Here you can send formData, selectedTeams, and matchPoster to your API to create the match
    console.log(formData);
    console.log(selectedTeams);
    console.log(matchPoster);
  };

  return (
    <Box mb="3rem">
      <MyHeading
        title="Create Match"
        description="Fill below from to create a match"
      />
      <form onSubmit={handleSubmit} className="container">
        <Box mb="4">
          <Text fontSize="lg" fontWeight="semibold" mb="1rem">
            Select Yours Teams
          </Text>
          <FormControl mb="2">
            <FormLabel>Team 1</FormLabel>
            <Select onChange={handleTeam1Select} value={selectedTeam1}>
              <option value="">Select Team</option>
              {userTeams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Team 2</FormLabel>
            <Select onChange={handleTeam2Select} disabled={!selectedTeam1}>
              <option value="">Select Team</option>
              {userTeams
                .filter((team) => team._id !== selectedTeam1)
                .map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl mb="4">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Time</FormLabel>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Max Players</FormLabel>
          <Input
            type="number"
            name="maxPlayers"
            value={formData.maxPlayers}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Match Poster</FormLabel>
          {matchPoster && (
            <Box mb={3}>
              <img
                src={matchPoster}
                alt="Match Poster"
                style={{ maxWidth: "200px" }}
              />
            </Box>
          )}
          <Input type="file" onChange={handlePosterUpload} p={1} isRequired />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Rules</FormLabel>
          <Textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            isRequired
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" isLoading={imageUploading}>
          Create Match
        </Button>
      </form>
    </Box>
  );
}

export default CreateMatch;
