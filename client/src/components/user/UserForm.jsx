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
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import userSchema from "../../yup/userSchema";
import { handleImageUpload } from "../../helper/imageUpload";

function UserForm({ onSubmit }) {
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
    profilePhoto: "",
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
            validationSchema={userSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
                        isInvalid={form.errors.address && form.touched.address}
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
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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
                  <Field name="profilePhoto">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.profilePhoto && form.touched.profilePhoto
                        }
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
                          {form.errors.profilePhoto}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>
                <Flex justifyContent="flex-end" mt={4}>
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

export default UserForm;
