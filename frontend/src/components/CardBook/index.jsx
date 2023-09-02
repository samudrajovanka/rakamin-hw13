/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Table,
  Td,
  Text,
  Tr,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import useOAuth from '../../stores/oAuth';
import useMutation from '../../lib/hooks/useMutation';
import { deleteBook } from '../../repositories/book';
import { useCallback } from 'react';

const CardBook = ({
  id,
  title,
  author,
  publisher,
  year,
  pages,
  image,
  refetchBooks
}) => {
  const toast = useToast();
  const oAuth = useOAuth((state) => state);


  const deleteMutation = useMutation({
    apiFn: () => deleteBook(id),
    onSuccess: () => {
      toast({
        title: 'Book deleted successfully',
        status: 'success'
      });

      refetchBooks();
    },
    onError: () => {
      toast({
        title: 'Failed to delete book',
        status: 'error'
      });
    }
  });

  const handleDelete = useCallback(() => {
    if (!oAuth.isLogged) return

    deleteMutation.mutate();
  }, [deleteMutation, oAuth.isLogged]);

  return (
    <Card
      overflow="hidden"
      boxShadow="none"
      border="1px solid"
      borderColor="gray.200"
      transition="box-shadow 0.2s ease-in-out"
      _hover={{
        boxShadow: '0 0 15px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Image
        src={`http://localhost:8000/${image}`}
        alt={`Book cover ${title}`}
        aspectRatio={16 / 9}
        objectFit="cover"
      />

      <CardBody p={3}>
        <Text fontWeight="medium" fontSize="xl">{title}</Text>

        <Table mt={3} color="gray.500">
          <tbody>
            <Tr>
              <Td p={0}>Publisher</Td>
              <Td p={0} textAlign="right">{publisher}</Td>
            </Tr>
            <Tr>
              <Td p={0}>Author</Td>
              <Td p={0} textAlign="right">{author}</Td>
            </Tr>
            <Tr>
              <Td p={0}>Year</Td>
              <Td p={0} textAlign="right">{year}</Td>
            </Tr>
            <Tr>
              <Td p={0}>Pages</Td>
              <Td p={0} textAlign="right">{pages}</Td>
            </Tr>
          </tbody>
        </Table>
      </CardBody>

      {oAuth.isLogged ? (
        <CardFooter display="flex" gap={4} p={3}>
          <Text as={Link} to={`/books/${id}/edit`} display="inline-block" w="100%">
            <Button
              colorScheme="yellow"
              disabled={deleteMutation.isLoading}
              w="100%"
            >
              Edit
            </Button>
          </Text>
          <Button
            w="100%"
            colorScheme="red"
            onClick={handleDelete}
            isLoading={deleteMutation.isLoading}
          >
            Delete
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default CardBook;
