/* eslint-disable react/prop-types */
import { Grid, Text } from '@chakra-ui/react';

import CardBook from '../CardBook';
import { Link } from 'react-router-dom';

const CardBooks = ({
  books,
  refetchBooks
}) => {
  return (
    <>
      {books.length ? (
        <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          {books.map((book) => (
            <CardBook key={book.id} {...book} refetchBooks={refetchBooks} />
          ))}
        </Grid>
      ) : (
        <Text>
          No data book. You can create book in{' '}
          <Text as={Link} to="/books/create" color="blue.500">here</Text>
        </Text>
      )}
    </>
  )
}

export default CardBooks;
