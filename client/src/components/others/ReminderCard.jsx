import { Box, Card, CardBody, Heading, Text, Stack } from "@chakra-ui/react";
import { formatTime } from "../../helper/timeFormat";

export default function ReminderCard({
  teamName,
  title,
  message,
  date,
  sender,
}) {
  return (
    <Card
      maxW="sm"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 
    0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <CardBody>
        <Stack spacing="2">
          <Box display="flex" justifyContent="space-between">
            <Heading size="sm" color="purple.500" mb={3}>
              Reminder
            </Heading>
            {/* <DeleteIcon boxSize={4} /> */}
          </Box>

          <Box>
            <Text
              fontSize=".8rem"
              display="inline"
              fontWeight="600"
              color="#4A5568"
            >
              From Team
            </Text>
            <Text fontSize=".8rem" color="#4A5568">
              {teamName}
            </Text>
          </Box>
          <Box>
            <Text fontSize=".8rem" fontWeight="600" color="#4A5568">
              Sender
            </Text>
            <Text fontSize=".8rem">{sender}</Text>
          </Box>
          <Box>
            <Text fontSize=".8rem" fontWeight="600" color="#4A5568">
              Date
            </Text>
            <Text fontSize=".8rem">{formatTime(date)}</Text>
          </Box>
          <Box>
            <Text fontSize=".8rem" fontWeight="600" color="#4A5568">
              Title
            </Text>
            <Text fontSize=".8rem">{title}</Text>
          </Box>
          <Box>
            <Text fontSize=".8rem" fontWeight="600" color="#4A5568">
              Message
            </Text>
            <Text fontSize=".8rem">{message}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
