import { useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Flex,
  Button,
  FormErrorMessage,
  SimpleGrid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import playerSchema from "../yup/playerSchema";

function PlayerForm({ onSubmit }) {
  const initialValues = {
    yearsOfExperience: "",
    hoursPlayedPerWeek: "",
    titlesOwn: "",
    titlesWithSpecificTeamName: "",
    strikerPositionScore: 50,
    wingerPositionScore: 50,
    midfielderPositionScore: 50,
    wingDefenderPositionScore: 50,
    centralBackPositionScore: 50,
  };

  const fileInputRef = useRef(null);

  const handleSubmit = (values, formik) => {
    onSubmit(values, formik);
  };

  return (
    <Box minH="100vh">
      <Box borderRadius="md" pt={6} pb={6} mt={5}>
        <Box className="container">
          <Formik
            initialValues={initialValues}
            validationSchema={playerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Box mb={8}>
                  <Text fontWeight="600" fontSize="1.2rem" mb="2rem">
                    Player Profile
                  </Text>
                  <SimpleGrid
                    columns={{ base: 1, md: 1, lg: 2 }}
                    spacing={4}
                    className="test-nutral-1"
                  >
                    <Field name="yearsOfExperience">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.yearsOfExperience &&
                            form.touched.yearsOfExperience
                          }
                        >
                          <FormLabel>Years of Experience</FormLabel>
                          <Input {...field} type="number" />
                          <FormErrorMessage>
                            {form.errors.yearsOfExperience}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="hoursPlayedPerWeek">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.hoursPlayedPerWeek &&
                            form.touched.hoursPlayedPerWeek
                          }
                        >
                          <FormLabel>Hours Played Per Week</FormLabel>
                          <Input {...field} type="number" />
                          <FormErrorMessage>
                            {form.errors.hoursPlayedPerWeek}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="titlesOwn">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.titlesOwn && form.touched.titlesOwn
                          }
                        >
                          <FormLabel>Titles Own</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.titlesOwn}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="titlesWithSpecificTeamName">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.titlesWithSpecificTeamName &&
                            form.touched.titlesWithSpecificTeamName
                          }
                        >
                          <FormLabel>Titles With Specific Team Name</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.titlesWithSpecificTeamName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </SimpleGrid>
                </Box>

                <Box mb={8}>
                  <Text fontWeight="600" fontSize="1.2rem" mb="2rem">
                    Skill Rating
                  </Text>
                  <SimpleGrid
                    columns={{ base: 1, md: 1, lg: 2 }}
                    spacing={4}
                    className="test-nutral-1"
                  >
                    <FormControl>
                      <FormLabel>
                        Striker Position Score
                        {` : ${values.strikerPositionScore}`}
                      </FormLabel>
                      <Slider
                        defaultValue={50}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFieldValue("strikerPositionScore", value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        Winger position score
                        {` : ${values.wingerPositionScore}`}
                      </FormLabel>
                      <Slider
                        defaultValue={50}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFieldValue("wingerPositionScore", value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        Midfielder position score
                        {` : ${values.midfielderPositionScore}`}
                      </FormLabel>
                      <Slider
                        defaultValue={50}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFieldValue("midfielderPositionScore", value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        Wing defender position score
                        {` : ${values.wingDefenderPositionScore}`}
                      </FormLabel>
                      <Slider
                        defaultValue={50}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFieldValue("wingDefenderPositionScore", value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                    <FormControl>
                      <FormLabel>
                        Central back position score
                        {` : ${values.centralBackPositionScore}`}
                      </FormLabel>
                      <Slider
                        defaultValue={50}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFieldValue("centralBackPositionScore", value)
                        }
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <Flex justifyContent="flex-end">
                  <Button
                    colorScheme="teal"
                    type="submit"
                    fontWeight="400"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default PlayerForm;
