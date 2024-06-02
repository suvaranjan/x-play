import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  Tooltip,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import TeamForm from "./TeamForm";
import { ArrowBackIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { updateTeam } from "../../apis/api";
import toast from "react-hot-toast";

function TeamHeader({ team, isLoginUserManager }) {
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = (values, formik) => {
    try {
      const res = updateTeam(token, values, team._id);

      toast.promise(res, {
        loading: `updating...`,
        success: (res) => {
          console.log(res.data);
          return "Team Updated";
        },
        error: (e) => {
          console.log(e);
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const initialValues = {
    name: team.name,
    description: team.description,
    teamPoster: "",
    socialLinks: team.socialLinks,
    location: team.location,
  };

  return (
    <Box w="100%" mt="2rem">
      {!isEditing && (
        <>
          <Box w="100%" p={4} mb="1rem">
            <Box className="container">
              <Box display="flex" alignItems="center">
                <Text
                  fontWeight="600"
                  fontSize="1.5rem"
                  textAlign={{ base: "center", md: "center", lg: "left" }}
                  mr={3}
                >
                  Basic Information
                </Text>
                {isLoginUserManager && (
                  <Tooltip
                    label="Click to edit Basic Information"
                    placement="top"
                  >
                    <EditIcon boxSize={5} onClick={handleEditClick} />
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{
              base: "column",
              md: "column",
              lg: "row-reverse",
            }}
            gap={{ base: "", md: 6 }}
            alignItems={{ base: "center", md: "center", lg: "flex-start" }}
            justifyContent={{
              base: "center",
              md: "center",
              lg: "flex-start",
            }}
            // textAlign={{ base: "center", md: "center", lg: "left" }}
            className="container"
          >
            <Image
              src={team.teamPoster}
              alt={team.name}
              borderRadius="lg"
              w={{ base: "md", md: "md", lg: "md" }}
            />
            <Stack mt={{ base: 6, md: 0 }} spacing="3">
              <Box>
                <Text fontSize="1rem" fontWeight="500" mb={2}>
                  Team Name :
                </Text>
                <Text color="#4A5568" fontSize={{ base: ".9rem", md: ".9rem" }}>
                  {team.name}
                </Text>
              </Box>
              <Box>
                <Text fontSize="1rem" fontWeight="500" mb={2}>
                  Team Description :
                </Text>
                <Text fontSize={{ base: ".9rem", md: ".9rem" }} color="#4A5568">
                  {team.description}
                </Text>
              </Box>
              <Box>
                <Text fontSize="1rem" fontWeight="500" mb={2}>
                  Location
                </Text>
                <Text fontSize={{ base: ".9rem", md: ".9rem" }} color="#4A5568">
                  {team.location}
                </Text>
              </Box>
              <Box>
                <Text fontSize="1rem" fontWeight="500" mb={2}>
                  Social Links
                </Text>
                {team.socialLinks.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Link
                        fontSize={{ base: ".9rem", md: ".9rem" }}
                        href={item.link}
                        isExternal
                        color="blue.500"
                      >
                        {item.platform} <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Box>
                  );
                })}
              </Box>
            </Stack>
          </Box>
        </>
      )}
      {isEditing && (
        <Box>
          <Box className="container" mb="1rem">
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={handleEditClick}
              fontWeight="400"
            >
              Go Back
            </Button>
          </Box>
          <TeamForm
            onSubmit={handleSubmit}
            heading="Update Basic Information"
            initialValues={initialValues}
            TeamPoster={team.teamPoster}
          />
        </Box>
      )}
    </Box>
  );
}

export default TeamHeader;
