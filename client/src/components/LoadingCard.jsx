import { Card, CardBody, Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingCard() {
  return (
    <Card maxW="md" width="330px">
      <CardBody>
        <Skeleton height="170px" borderRadius="lg" />
        <Skeleton height="20px" mt={3} />
        <Stack mt="2" spacing="2">
          <Skeleton height="8px" />
          <Skeleton height="8px" />
          <Skeleton height="8px" />
          <Skeleton height="8px" />
          <Skeleton height="8px" />
        </Stack>
      </CardBody>
    </Card>
  );
}
