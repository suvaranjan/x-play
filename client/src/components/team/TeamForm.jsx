import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  Flex,
  Button,
  FormErrorMessage,
  SimpleGrid,
  Textarea,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { handleImageUpload } from "../../helper/imageUpload";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import teamSchema from "../../yup/teamSchema";

export default function TeamForm({ onSubmit, TeamPoster, initialValues }) {
  const [myTeamPoster, setMyTeamPoster] = useState(TeamPoster);
  const [imageUploading, setImageUploading] = useState(false);

  const defaultInitialValues = {
    name: "",
    description: "",
    teamPoster: "",
    socialLinks: [{ platform: "", link: "" }],
    location: "",
  };

  const fileInputRef = useRef(null);

  const handleSubmit = (values, formik) => {
    const teamInfo = {
      ...values,
      teamPoster: myTeamPoster,
    };
    onSubmit(teamInfo, formik);
  };

  const handlePosterUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await handleImageUpload(file, setMyTeamPoster, setImageUploading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh">
      <Box className="container">
        <Formik
          initialValues={initialValues ? initialValues : defaultInitialValues}
          onSubmit={handleSubmit}
          validationSchema={teamSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Box mb={8}>
                <Text fontWeight="600" fontSize="1.2rem" mb="2rem">
                  Basic Information
                </Text>
                <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={4}>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Team Name</FormLabel>
                        <Input {...field} placeholder="Enter team name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel>Team Description</FormLabel>
                        <Textarea
                          {...field}
                          placeholder="Enter team description"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="teamPoster">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.teamPoster && form.touched.teamPoster
                        }
                      >
                        <FormLabel>Team Poster</FormLabel>
                        {myTeamPoster !== "" && (
                          <Image
                            boxSize="200px"
                            objectFit="cover"
                            src={myTeamPoster}
                            alt="Team Poster"
                            borderRadius="md"
                            mb={3}
                          />
                        )}
                        <Input
                          {...field}
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handlePosterUpload(e)}
                          p={1}
                        />
                        <FormErrorMessage>
                          {form.errors.teamPoster}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="location">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.location && form.touched.location
                        }
                      >
                        <FormLabel>Team Location</FormLabel>
                        <Input {...field} placeholder="Enter team location" />
                        <FormErrorMessage>
                          {form.errors.location}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
              </Box>

              <Box mb={8}>
                <Text fontWeight="600" fontSize="1.2rem" mb="2rem">
                  Social Links
                </Text>
                {values.socialLinks.map((link, index) => (
                  <Flex key={index} mb={4} alignItems="center">
                    <Field name={`socialLinks[${index}].platform`}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.socialLinks &&
                            form.errors.socialLinks[index] &&
                            form.errors.socialLinks[index].platform &&
                            form.touched.socialLinks &&
                            form.touched.socialLinks[index] &&
                            form.touched.socialLinks[index].platform
                          }
                        >
                          <FormLabel>Platform</FormLabel>
                          <Input {...field} placeholder="e.g., Facebook" />
                          <FormErrorMessage>
                            {form.errors.socialLinks &&
                              form.errors.socialLinks[index] &&
                              form.errors.socialLinks[index].platform}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name={`socialLinks[${index}].link`}>
                      {({ field, form }) => (
                        <FormControl
                          ml={4}
                          isInvalid={
                            form.errors.socialLinks &&
                            form.errors.socialLinks[index] &&
                            form.errors.socialLinks[index].link &&
                            form.touched.socialLinks &&
                            form.touched.socialLinks[index] &&
                            form.touched.socialLinks[index].link
                          }
                        >
                          <FormLabel>Link</FormLabel>
                          <Input
                            {...field}
                            placeholder="https://facebook.com/yourpage"
                          />
                          <FormErrorMessage>
                            {form.errors.socialLinks &&
                              form.errors.socialLinks[index] &&
                              form.errors.socialLinks[index].link}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <IconButton
                      aria-label="Delete link"
                      icon={<DeleteIcon />}
                      ml={4}
                      onClick={() => {
                        const links = values.socialLinks.filter(
                          (_, i) => i !== index
                        );
                        setFieldValue("socialLinks", links);
                      }}
                    />
                  </Flex>
                ))}
                <Button
                  leftIcon={<AddIcon />}
                  onClick={() =>
                    setFieldValue("socialLinks", [
                      ...values.socialLinks,
                      { platform: "", link: "" },
                    ])
                  }
                  variant="outline"
                  colorScheme="teal"
                >
                  Add Social Link
                </Button>
              </Box>

              <Flex justifyContent="flex-end">
                <Button
                  colorScheme="teal"
                  type="submit"
                  fontWeight="400"
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  isDisabled={imageUploading}
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
