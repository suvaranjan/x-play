import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";

function ReminderForm({ handleFormSubmit, teams }) {
  const [formData, setFormData] = useState({
    team: "",
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Check for empty fields
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleFormSubmit(formData);
    }
  };

  return (
    <Box>
      <Text fontSize="1.3rem" fontWeight="600" color="#4A5568" mb="1.5rem">
        Reminder Form
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl id="team" isInvalid={errors.team}>
          <FormLabel>Choose a Team</FormLabel>
          <Select
            name="team"
            value={formData.team}
            onChange={handleChange}
            placeholder="Select team"
          >
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.team}</FormErrorMessage>
        </FormControl>

        <FormControl id="title" isInvalid={errors.title} mt={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl id="message" isInvalid={errors.message} mt={4}>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter message"
            resize="vertical"
          />
          <FormErrorMessage>{errors.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="purple" mt={4} type="submit">
          Send Reminder
        </Button>
      </form>
    </Box>
  );
}

export default ReminderForm;
