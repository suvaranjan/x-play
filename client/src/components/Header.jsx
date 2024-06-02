import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  Hide,
  Icon,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import NavDrawer from "./navbar/NavDrawer";
import { getUser, newNotificationCount } from "../apis/api";
import useStore from "../zustand/store";

function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notificationCount, setNotificationCount, user, setUser } = useStore(
    (state) => state
  );
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    } else {
      fetchNotifiactionCount();
      console.log(token);
    }

    if (!user) {
      fetchUser();
    }
  }, []);

  const fetchNotifiactionCount = async () => {
    console.log("run");
    try {
      const res = await newNotificationCount(token);
      setNotificationCount(res.data.newNotification);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUser(token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    localStorage.clear("token");
    navigate("/auth/login");
  };

  return (
    <>
      <Box
        // border="2px solid red"
        p="1.5rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
      >
        <Box>
          <Heading fontSize="1.2rem">XPlay</Heading>
        </Box>
        <Hide breakpoint="(max-width: 660px)">
          <List display="flex" gap="2.5rem" fontSize="1rem">
            <NavItems onClose={onClose} user={user} />
          </List>
        </Hide>

        <Box>
          <Hide breakpoint="(max-width: 660px)">
            <Box display="flex" alignItems="center" gap="1rem">
              <NotificationBell count={notificationCount} />
              <AvatarMenu handleLogout={handleLogout} user={user} />
            </Box>
          </Hide>
          <Show breakpoint="(max-width: 660px)">
            <HamburgerIcon
              height="40px"
              width="30px"
              onClick={onOpen}
              ml="1.2rem"
            />
          </Show>
        </Box>
      </Box>
      <NavDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default Header;

export function NavItems({ onClose, user }) {
  const navigate = useNavigate();
  return (
    <>
      <ListItem listStyleType="none" fontWeight="600">
        <Link>Home</Link>
      </ListItem>
      <ListItem listStyleType="none">
        <Menu isLazy>
          <MenuButton fontWeight="600">
            Match <ChevronDownIcon boxSize={5} />
          </MenuButton>
          <MenuList>
            <MenuItem>Create Match</MenuItem>
            <MenuItem>Matches</MenuItem>
          </MenuList>
        </Menu>
      </ListItem>

      <ListItem listStyleType="none">
        <Menu isLazy>
          <MenuButton fontWeight="600">
            Teams
            <ChevronDownIcon boxSize={5} />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                navigate("/create-team");
                onClose();
              }}
            >
              Create Team
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/teams");
                onClose();
              }}
            >
              Teams
            </MenuItem>
            {user && user.userType == "Player" && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/team-invitations");
                    onClose();
                  }}
                >
                  Team Invitations
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/team-contracts");
                    onClose();
                  }}
                >
                  Team Contracts
                </MenuItem>
              </>
            )}
            {user && user.userType == "Team" && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/team-join-requests");
                    onClose();
                  }}
                >
                  Team Join requests
                </MenuItem>
              </>
            )}
            {user &&
              (user.userType === "Team" ? (
                <MenuItem
                  onClick={() => {
                    navigate("/team-reminder");
                    onClose();
                  }}
                >
                  Reminders
                </MenuItem>
              ) : (
                user.userType === "Player" && (
                  <MenuItem
                    onClick={() => {
                      navigate("/team-reminder");
                      onClose();
                    }}
                  >
                    Team Reminders
                  </MenuItem>
                )
              ))}
          </MenuList>
        </Menu>
      </ListItem>
      <ListItem listStyleType="none">
        <Menu isLazy>
          <MenuButton
            onClick={() => {
              navigate("/players");
              onClose();
            }}
            fontWeight="600"
          >
            Players
          </MenuButton>
        </Menu>
      </ListItem>
    </>
  );
}

function AvatarMenu({ handleLogout, user }) {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" src={user ? user.avatar : ""} />
      <MenuList>
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          gap={2}
          // alignItems="center"
          // justifyContent="center"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              name={user ? user.fullName : ""}
              src={user ? user.avatar : ""}
              size="sm"
            />
            <Box>
              <Text fontSize=".9rem" fontWeight="600">
                {user ? user.fullName : ""}
              </Text>
              <Text fontSize=".8rem">{user ? user.email : ""}</Text>
            </Box>
          </Box>
          <Divider borderColor="#A0AEC0" />
          {/* <List fontSize=".9rem" fontWeight="500" gap={2}>
            <ListItem>Profile</ListItem>
            <ListItem>Players</ListItem>
          </List> */}
          <Button
            onClick={() => navigate("/profile")}
            size="xs"
            colorScheme="purple"
            variant="outline"
          >
            Profile
          </Button>

          <Button size="xs" colorScheme="red" onClick={handleLogout}>
            logout
          </Button>
        </Box>
      </MenuList>
    </Menu>
  );
}

const NotificationBell = ({ count }) => {
  const navigate = useNavigate();
  return (
    <Badge
      borderRadius="full"
      px="2"
      colorScheme="purple"
      cursor="pointer"
      onClick={() => navigate("/notification")}
    >
      <Icon as={BellIcon} boxSize={6} />
      {count > 0 && (
        <Badge borderRadius="full" px="2" fontSize="1em" color="purple.700">
          {count}
        </Badge>
      )}
    </Badge>
  );
};
