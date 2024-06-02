import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Hide,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import MyHeading from "../others/MyHeading";
import UserForm from "../user/UserForm";
import AuthHero from "./AuthHero";
import { baseUrl } from "../../apis/api";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PlayerRegisterForm from "../others/PlayerRegisterForm";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  registerAs: Yup.string().required("Registering as is required"),
});

function Signup() {
  const [myEmail, setMyEmail] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [myUserType, setMyUserType] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values, formik) => {
    const registrationData = {
      email: myEmail,
      password: myPassword,
      userType: myUserType,
      ...values,
    };

    let url = `${baseUrl}/register`;

    if (myUserType === "Player") {
      url = `${baseUrl}/register-player`;
    }

    try {
      const res = axios.post(url, registrationData);

      toast.promise(res, {
        loading: `Registering...`,
        success: (res) => {
          console.log(res.data);
          navigate("/auth/login");
          return "Registration Successful";
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

  return (
    <>
      <Box>
        {!showUserForm && !showPlayerForm && (
          <Box w="100%" boxShadow="lg" display="flex" minH="100vh">
            <Hide breakpoint="(max-width: 800px)">
              <AuthHero
                heading="Start your journey with us."
                description="Discover a world where passion meets profession. Join a community of players. Sign up today and take the first step towards a brighter future in your sporting career."
                reviewText="It was the beginning of my transformative experience. As a dedicated player, finding the right platform to showcase my skills and connect with professional teams was crucial."
                reviewerName="John Doe"
                reviewerRole="Player"
                reviewerPhoto="https://bit.ly/dan-abramov"
              />
            </Hide>
            <Box
              id="formBox"
              p={{ base: "1rem", md: "1rem", lg: "5rem" }}
              width={{ base: "90vw", md: "90vw", lg: null }}
              margin={{ base: "auto", md: "auto", lg: null }}
              boxShadow={{
                base: "0 4px 6px rgba(0, 0, 0, 0.2)",
                md: "0 4px 6px rgba(0, 0, 0, 0.2)",
                lg: "none",
              }}
            >
              <Box>
                <Heading fontSize="1.5rem">Register to XPLAY</Heading>
                <Box mt={4} fontSize=".8rem">
                  <Text display="inline" mr={1}>
                    Have an account?
                  </Text>
                  <Text
                    color="purple.500"
                    cursor="pointer"
                    display="inline"
                    fontWeight="500"
                    onClick={() => navigate("/auth/login")}
                  >
                    Login
                  </Text>
                </Box>
              </Box>
              <Box mt={8}>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    registerAs: "Player",
                  }}
                  validationSchema={SignupSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={(values, actions) => {
                    setMyEmail(values.email);
                    setMyPassword(values.password);
                    setMyUserType(values.registerAs);

                    if (values.registerAs === "Player") {
                      setShowUserForm(false);
                      setShowPlayerForm(true);
                    } else {
                      setShowPlayerForm(false);
                      setShowUserForm(true);
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="registerAs">
                        {({ field, form }) => (
                          <FormControl
                            as="fieldset"
                            isInvalid={
                              form.errors.registerAs && form.submitCount > 0
                            }
                            mt={4}
                            mb={4}
                          >
                            <FormLabel as="legend" mb={4}>
                              Choose a Role
                            </FormLabel>
                            <RadioGroup
                              {...field}
                              value={field.value}
                              onChange={(value) =>
                                form.setFieldValue("registerAs", value)
                              }
                            >
                              <SimpleGrid
                                spacing="24px"
                                columns={{ base: 1, md: 2, lg: 2 }}
                              >
                                <Box
                                  borderWidth={field.value === "Player" ? 1 : 0}
                                  borderColor="purple.500"
                                  p={field.value === "Player" ? 2 : 0}
                                  borderRadius="md"
                                >
                                  <Radio value="Player" colorScheme="purple">
                                    Player
                                  </Radio>
                                </Box>
                                <Box
                                  borderWidth={field.value === "Team" ? 1 : 0}
                                  borderColor="purple.500"
                                  p={field.value === "Team" ? 2 : 0}
                                  borderRadius="md"
                                >
                                  <Radio value="Team" colorScheme="purple">
                                    Team Manager
                                  </Radio>
                                </Box>
                                <Box
                                  borderWidth={
                                    field.value === "Referee" ? 1 : 0
                                  }
                                  borderColor="purple.500"
                                  p={field.value === "Referee" ? 2 : 0}
                                  borderRadius="md"
                                >
                                  <Radio value="Referee" colorScheme="purple">
                                    Referee
                                  </Radio>
                                </Box>
                                <Box
                                  borderWidth={field.value === "Fan" ? 1 : 0}
                                  borderColor="purple.500"
                                  p={field.value === "Fan" ? 2 : 0}
                                  borderRadius="md"
                                >
                                  <Radio value="Fan" colorScheme="purple">
                                    Fan
                                  </Radio>
                                </Box>
                              </SimpleGrid>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.registerAs}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="email" mt={4}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.email && form.submitCount > 0
                            }
                            mb={4}
                          >
                            <FormLabel>Email</FormLabel>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Email"
                              maxW="500px"
                            />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="password" mt={4}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.password && form.submitCount > 0
                            }
                          >
                            <FormLabel>Password</FormLabel>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Password"
                              maxW="500px"
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Button
                        mt={4}
                        colorScheme="purple"
                        isLoading={props.isSubmitting}
                        type="submit"
                        loadingText="Registering..."
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        )}

        {!showPlayerForm && showUserForm && (
          <>
            <MyHeading
              title={`Finish Registration Process`}
              description="Fill up this form to complete your registration"
            />
            <UserForm onSubmit={handleRegister} />
          </>
        )}
        {!showUserForm && showPlayerForm && (
          <>
            <MyHeading
              title={`Finish Registration Process`}
              description="Fill up this form to complete your registration"
            />
            <PlayerRegisterForm onSubmit={handleRegister} />
          </>
        )}
      </Box>
    </>
  );
}

export default Signup;
