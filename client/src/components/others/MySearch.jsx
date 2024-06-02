import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";

function MySearch({ inputValue, setInputValue, handleSearch, placeholder }) {
  return (
    <Box display="flex">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </InputGroup>
      <Button ml="1rem" onClick={handleSearch} colorScheme="purple">
        Search
      </Button>
    </Box>
  );
}

export default MySearch;
