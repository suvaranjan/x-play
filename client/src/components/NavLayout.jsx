import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@chakra-ui/react";

export default function NavLayout() {
  return (
    <>
      <Box w="100%">
        <Toaster
          toastOptions={{
            style: {
              fontSize: "1.1rem",
            },
          }}
        />
        <Header />
        <Outlet />
      </Box>
    </>
  );
}
