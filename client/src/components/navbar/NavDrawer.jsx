import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Avatar,
  Text,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
import { NavItems } from "../Header";
import useStore from "../../zustand/store";
import { Link, useNavigate } from "react-router-dom";

export default function NavDrawer({ isOpen, onOpen, onClose }) {
  const { user } = useStore((state) => state);
  const navigate = useNavigate();
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={3}>
                <Avatar
                  size="md"
                  src={user ? user.avatar : ""}
                  name={user ? user.fullName : ""}
                />
                <Box>
                  <Text fontWeight="600" fontSize="1rem">
                    {user ? user.fullName : ""}
                  </Text>
                  <Text fontSize=".8rem">Player</Text>
                </Box>
              </Box>

              <List
                display="flex"
                flexDirection="column"
                gap="1rem"
                fontSize="1rem"
                mt="2rem"
              >
                <ListItem listStyleType="none" fontWeight="600">
                  <Link to={"/profile"}>Profile</Link>
                </ListItem>
                <NavItems onClose={onClose} user={user} />
              </List>
              <Button
                size="xs"
                colorScheme="red"
                mt="1rem"
                onClick={() => {
                  localStorage.clear("token");
                  navigate("/auth/login");
                }}
              >
                Logout
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
