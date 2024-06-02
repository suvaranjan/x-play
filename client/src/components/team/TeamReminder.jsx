// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Card,
//   CardBody,
//   CardFooter,
//   Divider,
//   Heading,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import MyHeading from "../others/MyHeading";
// import ReminderForm from "../others/ReminderForm";
// import { ArrowBackIcon, BellIcon, DeleteIcon } from "@chakra-ui/icons";
// import {
//   checkManagerAndGetTeams,
//   getMyReminders,
//   sendReminder,
// } from "../../apis/api";
// import toast from "react-hot-toast";
// import ReminderCard from "./../others/ReminderCard";

// function TeamReminder() {
//   const [isOpenForm, setIsOpenForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [teams, setTeams] = useState([]);
//   const [myReminders, setMyReminders] = useState([]);
//   const token = localStorage.getItem("token");

//   const handleOpenForm = () => {
//     setIsOpenForm(!isOpenForm);
//   };

//   useEffect(() => {
//     fetchMyReminders();
//   }, []);

//   const handleSubmit = async (formData) => {
//     console.log(formData);
//     try {
//       const res = sendReminder(token, formData);

//       toast.promise(res, {
//         loading: `sending...`,
//         success: (res) => {
//           console.log(res.data);
//           return "Reminder Sent";
//         },
//         error: (e) => {
//           console.log(e);
//           return e.response.data.msg;
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCheckManagerAndGetTeams = async () => {
//     try {
//       setIsLoading(true);
//       const res = await checkManagerAndGetTeams(token);
//       // console.log(res);
//       setTeams(res.data);
//       setIsOpenForm(true);
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchMyReminders = async () => {
//     try {
//       const res = await getMyReminders(token);
//       setMyReminders(res.data);
//       console.log(res);
//     } catch (error) {
//       console.log(error.response.message);
//     }
//   };

//   return (
//     <Box>
//       <MyHeading
//         title="Team Reminder"
//         description="send reminders to players or managers for upcoming events"
//       />

//       {!isOpenForm && (
//         <Box className="container" mt="2rem">
//           <Button
//             leftIcon={<BellIcon />}
//             onClick={handleCheckManagerAndGetTeams}
//             fontWeight="400"
//             colorScheme="purple"
//             isLoading={isLoading}
//             loadingText="Checking"
//           >
//             Send Reminder
//           </Button>
//         </Box>
//       )}

//       <Box className="container" mb="2rem">
//         {isOpenForm && (
//           <Button
//             leftIcon={<ArrowBackIcon />}
//             onClick={handleOpenForm}
//             fontWeight="400"
//             mb="1rem"
//           >
//             Go Back
//           </Button>
//         )}
//         {isOpenForm && teams.length > 0 && (
//           <ReminderForm handleFormSubmit={handleSubmit} teams={teams} />
//         )}
//       </Box>

//       <Box className="container" mb="2rem" mt="2rem">
//         <Text fontSize="1.3rem" fontWeight="600" color="#4A5568" mb="1rem">
//           Your Reminders
//         </Text>

//         {/*  use here simple grid and map myReminders array over <ReminderCard give here teamName,sender,date,title,message/>  also implement next prev buttons*/}
//       </Box>
//     </Box>
//   );
// }

// export default TeamReminder;

import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyHeading from "../others/MyHeading";
import { ArrowBackIcon, BellIcon } from "@chakra-ui/icons";
import {
  checkManagerAndGetTeams,
  getMyReminders,
  sendReminder,
} from "../../apis/api";
import toast from "react-hot-toast";
import ReminderCard from "../others/ReminderCard";
import ReminderForm from "./../others/ReminderForm";

function TeamReminder() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingReminders, setLoadingReminders] = useState(true);
  const [teams, setTeams] = useState([]);
  const [myReminders, setMyReminders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  const handleOpenForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  useEffect(() => {
    fetchMyReminders();
  }, [currentPage]);

  const handleSubmit = async (formData) => {
    try {
      const res = sendReminder(token, formData);

      toast.promise(res, {
        loading: `sending...`,
        success: (res) => {
          console.log(res.data);
          return "Reminder Sent";
        },
        error: (e) => {
          console.log(e);
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckManagerAndGetTeams = async () => {
    try {
      setIsLoading(true);
      const res = await checkManagerAndGetTeams(token);
      // console.log(res);
      setTeams(res.data);
      setIsOpenForm(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyReminders = async () => {
    try {
      setLoadingReminders(true);
      const res = await getMyReminders(token, currentPage);
      setMyReminders(res.data.reminders);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error.response.message);
    } finally {
      setLoadingReminders(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box>
      <MyHeading
        title="Team Reminder"
        description="send reminders to players or managers for upcoming events"
      />

      {!isOpenForm && (
        <Box className="container" mt="2rem">
          <Button
            leftIcon={<BellIcon />}
            onClick={handleCheckManagerAndGetTeams}
            fontWeight="400"
            colorScheme="purple"
            isLoading={isLoading}
            loadingText="Checking"
          >
            Send Reminder
          </Button>
        </Box>
      )}

      <Box className="container" mb="2rem">
        {isOpenForm && (
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={handleOpenForm}
            fontWeight="400"
            mb="1rem"
          >
            Go Back
          </Button>
        )}
        {isOpenForm && teams.length > 0 && (
          <ReminderForm handleFormSubmit={handleSubmit} teams={teams} />
        )}
      </Box>

      <Box className="container" mb="2rem" mt="2rem">
        <Text fontSize="1.3rem" fontWeight="600" color="#4A5568" mb="1rem">
          Your Reminders
        </Text>
        {!loadingReminders && myReminders.length !== 0 && (
          <Box>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={4}>
              {myReminders.map((reminder) => (
                <ReminderCard
                  key={reminder._id}
                  teamName={reminder.teamName}
                  sender={reminder.sender}
                  date={reminder.date}
                  title={reminder.title}
                  message={reminder.message}
                />
              ))}
            </SimpleGrid>
            <Box
              display="flex"
              justifyContent="space-between"
              margin="0 auto"
              gap="2"
              mt="1rem"
            >
              <Button
                colorScheme="purple"
                fontWeight="400"
                variant="outline"
                onClick={handlePrevPage}
                isDisabled={currentPage === 1}
              >
                Prev
              </Button>
              <Button
                colorScheme="purple"
                fontWeight="400"
                color="#000"
                onClick={handleNextPage}
                isDisabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
        {loadingReminders && (
          <Spinner
            mt={3}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        )}

        {!loadingReminders && myReminders.length == 0 && (
          <Text fontSize=".9rem" mt={4}>
            You have no reminders.
          </Text>
        )}
      </Box>
    </Box>
  );
}

export default TeamReminder;
