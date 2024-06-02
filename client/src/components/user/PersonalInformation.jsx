import { Box, SimpleGrid, Text } from "@chakra-ui/react";

export default function PersonalInformation({ user }) {
  const fieldsPersonal = [
    "fullName",
    "address",
    "dateOfBirth",
    "phone",
    "age",
    "gender",
    "occupation",
  ];

  return (
    <Box mb="2rem">
      <Text fontSize="1.3rem" fontWeight="600" mb="2rem">
        Personal Information
      </Text>
      <SimpleGrid
        columns={{ base: 2, md: 2, lg: 2 }}
        spacing={4}
        fontSize="1rem"
      >
        {fieldsPersonal.map((field) => (
          <Box key={field}>
            <Text fontWeight="500" mb={1}>
              {field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Text>
            <Text color="#4A5568">
              {field.includes("dateOfBirth")
                ? new Date(user[field]).toLocaleDateString()
                : user[field]}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
