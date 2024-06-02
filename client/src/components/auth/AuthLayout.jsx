// AuthLayout.js
import { Box } from "@chakra-ui/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box width="100%">
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.1rem",
          },
        }}
      />
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
