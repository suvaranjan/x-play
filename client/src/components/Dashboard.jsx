import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import { Box } from "@chakra-ui/react";

function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <Box>
      <Hero />
    </Box>
  );
}

export default Dashboard;
