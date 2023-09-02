import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useCallback, useState } from "react";

import useMutation from "../../lib/hooks/useMutation";
import { getBook, updateBook } from "../../repositories/book";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../lib/hooks/useFetch";

const EditBook = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id: bookId } = useParams();
  const [editBookForm, setEditBookForm] = useState({
    title: '',
    author: '',
    publisher: '',
    year: 0,
    pages: 0
  });

  useFetch({
    apiFn: () => getBook(bookId),
    onSuccess: (data) => {
      setEditBookForm({
        title: data.book.title,
        author: data.book.author,
        publisher: data.book.publisher,
        year: data.book.year,
        pages: data.book.pages
      });
    }
  });

  const handleChangeInput = useCallback((e) => {
    setEditBookForm({
      ...editBookForm,
      [e.target.name]: e.target.value
    });
  }, [editBookForm]);

  const updateBookMutation = useMutation({
    apiFn: (dataBook) => updateBook(bookId, dataBook),
    onSuccess: () => {
      toast({
        title: 'Update book success',
        status: 'success'
      });

      navigate('/');
    },
    onError: () => {
      toast({
        title: 'Update book failed',
        status: 'error'
      });
    } 
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(editBookForm);

    updateBookMutation.mutate(editBookForm);
  }, [editBookForm, updateBookMutation]);

  return (
    <Box
      display="grid"
      placeContent="center"
      position="absolute"
      w="100vw"
      h="100vh" top="0"
    >
      <Box
        w="500px"
        boxShadow='2xl'
        rounded="lg"
        p={6}
      >
        <Text fontSize="3xl" fontWeight="bold" mb={5} color="blue.500">Edit Book</Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={2} w="100%">
            <FormControl>
              <FormLabel>
                Title
              </FormLabel>
              <Input
                name="title"
                onChange={handleChangeInput}
                placeholder="Title"
                required
                value={editBookForm.title}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Author
              </FormLabel>
              <Input
                name="author"
                onChange={handleChangeInput}
                placeholder="Author"
                required
                value={editBookForm.author}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Publisher
              </FormLabel>
              <Input
                name="publisher"
                onChange={handleChangeInput}
                placeholder="Publisher"
                required
                value={editBookForm.publisher}
              />
            </FormControl>
            <HStack w="100%">
              <FormControl w="100%">
                <FormLabel>
                  Year
                </FormLabel>
                <Input
                  name="year"
                  type="number"
                  onChange={handleChangeInput}
                  placeholder="Year"
                  min="1800"
                  max="2099"
                  step="1"
                  required
                  value={editBookForm.year}
                />
              </FormControl>
              <FormControl w="100%">
                <FormLabel>
                  Pages
                </FormLabel>
                <Input
                  name="pages"
                  type="number"
                  min="1"
                  onChange={handleChangeInput}
                  placeholder="Pages"
                  required
                  value={editBookForm.pages}
                />
              </FormControl>
            </HStack>
          </VStack>

          <HStack justifyContent="end">
            <Button
              type="submit"
              colorScheme="blue"
              mt={8}
              isLoading={updateBookMutation.isLoading}
              loadingText="Updating"
              w="100%"
            >
              Update Book
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  )
}

export default EditBook;
