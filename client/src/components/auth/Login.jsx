import React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Hide,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import AuthHero from "./AuthHero";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../apis/api";
import useStore from "../../zustand/store";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useStore((state) => state);

  const handleLogin = async (values, formik) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, values);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Login failed:", error.message);
      toast.error(error.response.data.msg);
    } finally {
      formik.setSubmitting(false);
    }
  };
  return (
    <Box w="100%" boxShadow="lg" display="flex" minH="100vh">
      <Hide breakpoint="(max-width: 800px)">
        <AuthHero
          heading="Welcome back! "
          description="Log in to continue your journey and dive back into the world of sports."
          reviewText="It was the beginning of my transformative experience. As a dedicated player, finding the right platform to showcase my skills and connect with professional teams was crucial."
          reviewerName="John Snow"
          reviewerRole="Player"
          reviewerPhoto="https://bit.ly/dan-abramov"
        />
      </Hide>
      <Box
        id="formBox"
        p={{ base: "1rem", md: "1rem", lg: "5rem" }}
        // flex="1"
        width={{ base: "90vw", md: "90vw", lg: null }}
        margin={{ base: "auto", md: "auto", lg: null }}
        boxShadow={{
          base: "0 4px 6px rgba(0, 0, 0, 0.2)",
          md: "0 4px 6px rgba(0, 0, 0, 0.2)",
          lg: "none",
        }}
      >
        <Box>
          <Heading fontSize="1.5rem">Login to XPLAY</Heading>
          <Box mt={4} fontSize=".8rem">
            <Text display="inline" mr={1}>
              Dont Have an account?
            </Text>
            <Text
              color="purple.500"
              cursor="pointer"
              display="inline"
              fontWeight="500"
              onClick={() => navigate("/auth/register")}
            >
              register
            </Text>
          </Box>
        </Box>
        <Box mt={8}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleLogin}
          >
            {(props) => (
              <Form>
                <Field name="email" mt={4}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.submitCount > 0}
                      mb={4}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        maxW="500px"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" mt={4}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.submitCount > 0}
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
                  loadingText="Logging in"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
