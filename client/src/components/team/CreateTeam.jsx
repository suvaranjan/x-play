import React from "react";
import { Box, Code, Text } from "@chakra-ui/react";
import TeamForm from "./TeamForm";
import MyHeading from "../others/MyHeading";
import { createTeam } from "../../apis/api";
import toast from "react-hot-toast";

function CreateTeam() {
  const token = localStorage.getItem("token");

  const handleTeamSubmit = async (values, formik) => {
    try {
      const res = createTeam(token, values);

      toast.promise(res, {
        loading: `creating...`,
        success: (res) => {
          console.log(res.data);
          return "Team Created";
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
    <Box mb="2rem">
      <MyHeading title="Create Team" description="Form for create your team." />
      <Box className="container" mb={3}>
        <Code
          colorScheme="orange"
          children="Note: You can add players and update team information even after the team has been created."
        />
      </Box>
      <TeamForm
        onSubmit={handleTeamSubmit}
        initialValues={null}
        TeamPoster=""
      />
    </Box>
  );
}

export default CreateTeam;
