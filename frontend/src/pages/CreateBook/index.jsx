import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import useMutation from "../../lib/hooks/useMutation";
import { createBook } from "../../repositories/book";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [createBookForm, setCreateBookForm] = useState({
    title: '',
    author: '',
    publisher: '',
    year: 0,
    pages: 0,
    image: null
  });

  const handleRejection = useCallback((errorCode) => {
    if (errorCode === 'file-invalid-type') {
      toast({
        title: 'Image error',
        description: 'File type is not supported',
        status: 'error'
      });
      return;
    }

    toast({
      title: 'Image error',
      description: 'Something went wrong',
      status: 'error'
    })
  }, [toast]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      handleRejection(fileRejections[0].errors[0].code);
      return;
    }

    setCreateBookForm((prev) =>({
      ...prev,
      image: acceptedFiles[0]
    }));
  }, [handleRejection]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleChangeInput = useCallback((e) => {
    setCreateBookForm({
      ...createBookForm,
      [e.target.name]: e.target.value
    });
  }, [createBookForm]);

  const createBookMutation = useMutation({
    apiFn: createBook,
    onSuccess: () => {
      toast({
        title: 'Create book success',
        status: 'success'
      });

      navigate('/');
    },
    onError: () => {
      toast({
        title: 'Create book failed',
        status: 'error'
      });
    } 
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!createBookForm.image) {
      toast({
        title: 'Image is required',
        status: 'error'
      });
      return;
    }

    createBookMutation.mutate(createBookForm);
  }, [createBookForm, createBookMutation, toast]);

  return (
    <Box
      display="grid"
      placeContent="center"
      position="absolute"
      w="100vw"
      h="100vh" top="0"
    >
      <Box
        w="800px"
        boxShadow='2xl'
        rounded="lg"
        p={6}
      >
        <Text fontSize="3xl" fontWeight="bold" mb={5} color="blue.500">Create Book</Text>

        <form onSubmit={handleSubmit}>
          <HStack alignItems="start" spacing={5}>
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
                  value={createBookForm.title}
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
                  value={createBookForm.author}
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
                  value={createBookForm.publisher}
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
                    value={createBookForm.year}
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
                    value={createBookForm.pages}
                  />
                </FormControl>
              </HStack>
            </VStack>

            <FormControl>
              <FormLabel>
                Image
              </FormLabel>

              <Box
                border="2px"
                w="100%"
                aspectRatio={16 / 9}
                borderColor="gray.200"
                borderStyle="dashed"
                borderRadius="md"
                p={createBookForm.image ? 0 : 4}
                textAlign="center"
                display={createBookForm.image ? 'inline-block' : 'grid'}
                placeContent={createBookForm.image ? 'none' : 'center'}
                cursor="pointer"
                {...getRootProps()}
              >
                {createBookForm.image ? (
                  <Image
                    src={URL.createObjectURL(createBookForm.image)}
                    alt="Image book"
                    w="100%"
                    aspectRatio={16 / 9}
                    objectFit="cover"
                  />
                ) : (
                  <>
                    <Input {...getInputProps()} />
                    {
                      isDragActive ?
                        <Text>Drop the image here ...</Text> :
                        <Text>Drag and drop some image here, or click to select files</Text>
                    }
                  </>
                )}
              </Box>
            </FormControl>
          </HStack>

          <HStack justifyContent="end">
            <Button
              type="submit"
              colorScheme="blue"
              mt={8}
              isLoading={createBookMutation.isLoading}
              loadingText="Creating"
              w="100%"
            >
              Create Book
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  )
}

export default CreateBook;
