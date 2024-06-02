import { useRef, useState } from "react";
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
  Select,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import userPlayerSchema from "../../yup/userPlayerSchema";
import { handleImageUpload } from "../../helper/imageUpload";

function PlayerRegisterForm({ onSubmit }) {
  const [myAvatar, setMyAvatar] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const initialValues = {
    fullName: "",
    address: "",
    dateOfBirth: "",
    phone: "",
    age: "",
    gender: "",
    occupation: "",
    avatar: "",
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
    const userInfo = {
      ...values,
      avatar: myAvatar,
    };
    onSubmit(userInfo, formik);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await handleImageUpload(file, setMyAvatar, setImageUploading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh">
      <Box borderRadius="md" pt={6} pb={6} mt={5}>
        <Box className="container">
          <Formik
            initialValues={initialValues}
            validationSchema={userPlayerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Box mb={8}>
                  <Text fontWeight="600" fontSize="1.2rem" mb="2rem">
                    User Information
                  </Text>
                  <SimpleGrid
                    columns={{ base: 1, md: 1, lg: 2 }}
                    spacing={4}
                    className="test-nutral-1"
                  >
                    <Field name="fullName">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.fullName && form.touched.fullName
                          }
                        >
                          <FormLabel>Full Name</FormLabel>
                          <Input {...field} placeholder="Enter full name" />
                          <FormErrorMessage>
                            {form.errors.fullName}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="address">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.address && form.touched.address
                          }
                        >
                          <FormLabel>Address</FormLabel>
                          <Textarea {...field} placeholder="Enter address" />
                          <FormErrorMessage>
                            {form.errors.address}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="dateOfBirth">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.dateOfBirth && form.touched.dateOfBirth
                          }
                        >
                          <FormLabel>Date of Birth</FormLabel>
                          <Input {...field} type="date" />
                          <FormErrorMessage>
                            {form.errors.dateOfBirth}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                        >
                          <FormLabel>Phone</FormLabel>
                          <Input {...field} placeholder="Enter phone number" />
                          <FormErrorMessage>
                            {form.errors.phone}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="age">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.age && form.touched.age}
                        >
                          <FormLabel>Age</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter age"
                          />
                          <FormErrorMessage>{form.errors.age}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="gender">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.gender && form.touched.gender}
                        >
                          <FormLabel>Gender</FormLabel>
                          <Select {...field} placeholder="Select gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.gender}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="occupation">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.occupation && form.touched.occupation
                          }
                        >
                          <FormLabel>Occupation</FormLabel>
                          <Input {...field} placeholder="Enter occupation" />
                          <FormErrorMessage>
                            {form.errors.occupation}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="avatar">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.avatar && form.touched.avatar}
                        >
                          <FormLabel>Profile Photo</FormLabel>
                          {myAvatar !== "" && (
                            <Image
                              boxSize="200px"
                              objectFit="cover"
                              src={myAvatar}
                              alt="Profile Avatar"
                              borderRadius="md"
                              mb={3}
                            />
                          )}
                          <Input
                            {...field}
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarUpload}
                            p={1}
                          />
                          <FormErrorMessage>
                            {form.errors.avatar}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </SimpleGrid>
                </Box>

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
    </Box>
  );
}

export default PlayerRegisterForm;
