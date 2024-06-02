import {
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyHeading from "./others/MyHeading";
import {
  deleteAllNotifications,
  getNotifications,
  markAllReadNotifications,
  markReadNotification,
} from "../apis/api";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";

function Notification() {
  const token = localStorage.getItem("token");
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const {
    notificationCount,
    setNotificationCount,
    decrementNotificationCount,
  } = useStore((state) => state);

  useEffect(() => {
    fetchNotifiactions();
  }, []);

  const fetchNotifiactions = async () => {
    try {
      setisLoading(true);
      const res = await getNotifications(token);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleClick = async (notification) => {
    navigate(notification.redirectUrl);
    if (!notification.read) {
      try {
        const res = await markReadNotification(token, notification._id);
        decrementNotificationCount();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAllRead = async () => {
    try {
      const res = await markAllReadNotifications(token);
      console.log(res);
      setNotificationCount(0);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllDelete = async () => {
    try {
      const res = await deleteAllNotifications(token);
      console.log(res);
      setNotificationCount(0);
      setNotifications([]);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <MyHeading title="Notification" description="Your recent notification" />
      <Flex
        // justifyContent="flex-end"
        className="container"
        mb={3}
        gap={2}
      >
        <Button
          colorScheme="purple"
          type="submit"
          fontWeight="400"
          variant="outline"
          size="sm"
          onClick={handleAllRead}
          isDisabled={notifications.length == 0}
        >
          Mark all as read
        </Button>
        <Button
          colorScheme="red"
          type="submit"
          fontWeight="400"
          variant="outline"
          size="sm"
          onClick={handleAllDelete}
          isDisabled={notifications.length == 0}
        >
          Delete All
        </Button>
      </Flex>

      <Box className="container">
        {!isLoading &&
          notifications.length > 0 &&
          notifications.map((n, i) => {
            return (
              <NotificationMsg
                notification={n}
                handleClick={handleClick}
                key={i}
              />
            );
          })}
        {isLoading && (
          <Spinner
            mt="1rem"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        )}
      </Box>
    </Box>
  );
}

function NotificationMsg({ notification, handleClick }) {
  return (
    <Stack
      direction="row"
      border="1px solid #A0AEC0"
      p={2}
      borderRadius="md"
      bg={notification.read ? "#FAFAFA" : "green.50"}
      cursor="pointer"
      onClick={() => handleClick(notification)}
      mb={2}
    >
      <Text
        fontSize="1rem"
        color={notification.read ? "#000" : "green.700"}
        fontWeight="500"
      >
        {notification.message}
      </Text>
    </Stack>
  );
}

export default Notification;
