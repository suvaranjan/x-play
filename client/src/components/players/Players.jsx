import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MyHeading from "../others/MyHeading";
import MySearch from "../others/MySearch";

function Players() {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    console.log(inputValue);
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

        <Checkbox colorScheme="purple" defaultChecked mt="1rem" mb="1rem">
          Show All Players
        </Checkbox>
      </Box>
    </Box>
  );
}

export default Players;
