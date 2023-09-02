import { Card, CardBody, Grid, Skeleton } from "@chakra-ui/react";

/* eslint-disable no-unused-vars */
const CardBooksLoading = () => {
  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
      {Array(4).fill(0).map((_, idx) => (
        <Card
          key={idx}
          overflow="hidden"
          boxShadow="none"
          border="1px solid"
          borderColor="gray.200"
        >
          <Skeleton aspectRatio={16 / 9} />

          <CardBody p={3} display="flex" flexDir="column" gap={1}>
            <Skeleton height="25px" mb={2} />
            <Skeleton height="15px" />
            <Skeleton height="15px" />
            <Skeleton height="15px" />
          </CardBody>
        </Card>
      ))}
    </Grid>
  )
}

export default CardBooksLoading;
