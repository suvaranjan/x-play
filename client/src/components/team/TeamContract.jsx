import { useRef, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Button,
  FormErrorMessage,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import contractSchema from "../../yup/contractSchema";

function TeamContract({ onSubmit, playerName }) {
  const initialValues = {
    teamRole: "",
    teamRolePeriod: "",
    teamRoleName: "",
    startDate: "",
    period: "",
    borrowFee: 0,
    sellingFee: 0,
    commissionOnRenting: 0,
    commissionOnWinning: 0,
    jerseyNumber: "",
  };

  const handleSubmit = (values, formik) => {
    const contractInfo = {
      ...values,
    };
    onSubmit(contractInfo, formik);
  };

  return (
    <Box minH="100vh">
      <Box className="container">
        <Box bg="purple.100" p={3} borderRadius="md" mb="1.5rem">
          <Text fontSize="1rem" fontWeight="600" mb={2}>
            Team Contract Form
          </Text>
          <Text fontSize="1rem" display="inline" mr={1}>
            You are Assigning contract to
          </Text>
          <Text
            fontSize="1rem"
            fontWeight="600"
            color="purple.500"
            display="inline"
          >
            {playerName}
          </Text>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={contractSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={8}>
                <SimpleGrid
                  columns={{ base: 1, md: 1, lg: 2 }}
                  spacing={4}
                  className="test-nutral-1"
                >
                  <Field name="teamRole">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.teamRole && form.touched.teamRole
                        }
                      >
                        <FormLabel>Team Role</FormLabel>
                        <Input {...field} placeholder="Example: Striker" />
                        <FormErrorMessage>
                          {form.errors.teamRole}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="teamRolePeriod">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.teamRolePeriod &&
                          form.touched.teamRolePeriod
                        }
                      >
                        <FormLabel>Team Role Period</FormLabel>
                        <Input {...field} placeholder="Example : 1 year" />
                        <FormErrorMessage>
                          {form.errors.teamRolePeriod}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="teamRoleName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.teamRoleName && form.touched.teamRoleName
                        }
                      >
                        <FormLabel>Team Role Name</FormLabel>
                        <Input
                          {...field}
                          placeholder="Example: Primary Forward Attacker"
                        />
                        <FormErrorMessage>
                          {form.errors.teamRoleName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="startDate">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.startDate && form.touched.startDate
                        }
                      >
                        <FormLabel>Start Date</FormLabel>
                        <Input {...field} type="date" />
                        <FormErrorMessage>
                          {form.errors.startDate}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="period">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.period && form.touched.period}
                      >
                        <FormLabel>Contract Period</FormLabel>
                        <Input {...field} placeholder="Example: 1 year" />
                        <FormErrorMessage>
                          {form.errors.period}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="borrowFee">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.borrowFee && form.touched.borrowFee
                        }
                      >
                        <FormLabel>Borrow Fee</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter borrow fee"
                        />
                        <FormErrorMessage>
                          {form.errors.borrowFee}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="sellingFee">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.sellingFee && form.touched.sellingFee
                        }
                      >
                        <FormLabel>Selling Fee</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter selling fee"
                        />
                        <FormErrorMessage>
                          {form.errors.sellingFee}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="commissionOnRenting">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.commissionOnRenting &&
                          form.touched.commissionOnRenting
                        }
                      >
                        <FormLabel>Commission on Renting</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter commission on renting"
                        />
                        <FormErrorMessage>
                          {form.errors.commissionOnRenting}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="commissionOnWinning">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.commissionOnWinning &&
                          form.touched.commissionOnWinning
                        }
                      >
                        <FormLabel>Commission on Winning</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter commission on winning"
                        />
                        <FormErrorMessage>
                          {form.errors.commissionOnWinning}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="jerseyNumber">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.jerseyNumber && form.touched.jerseyNumber
                        }
                      >
                        <FormLabel>Jersey Number</FormLabel>
                        <Input {...field} placeholder="Enter jersey number" />
                        <FormErrorMessage>
                          {form.errors.jerseyNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
  );
}

export default TeamContract;
